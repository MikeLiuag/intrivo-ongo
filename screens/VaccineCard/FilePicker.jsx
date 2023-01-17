import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform, Modal, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import SelectorComponent from '../../components/SelectorComponent';
import CheckIcon from '../../components/Svg/checkIcon';
import TakePhoto from '../../components/Scanner/index';
import { setHasExternalFilePermissions } from '../../store/app/slice';
import { uploadVaccineCard } from '../../store/user/slice';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { isFileTypeIsSupported, resizeFile } from '../../utilis/file';
import { LogEvent } from '../../analytics';
import Icon from '../../components/Icon';

const PADDING_SIDES = 24;
export const MAX_FILE_SIZE = 500000; // 500kb is max size to send without resizing
export const FILE_SIZE_THRESHOLD = 1000000;
const DOCUMENT_TYPE = ['image/*', 'application/pdf'];

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default ({ route, uuid: uuidFromProps }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  const { hasExternalFilePermissions } = useSelector((s) => s.app);
  const isConsentModalVisible = Platform.OS === 'android' && !hasExternalFilePermissions;
  const setIsConsentModalVisible = () => {
    dispatch(setHasExternalFilePermissions());
  };

  const uuid = uuidFromProps !== undefined ? uuidFromProps : route?.params?.uuid || null;

  const { analyticName, confirmText = t('vaccine.picker.comp') } = route.params;
  useEffect(() => {
    LogEvent(`${analyticName}_screen`);
  }, [analyticName]);

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressCustom);
    };
  });

  const hardwareBackPressCustom = () => {
    if (route.params?.onClose) {
      route.params?.onClose();
    }
  };

  const updateFile = async (selectedFile) => {
    if (route.params.onImagePicked) {
      route.params.onImagePicked(selectedFile);
      setModalVisible(true);
    } else if (selectedFile.size > MAX_FILE_SIZE && isFileTypeIsSupported(selectedFile)) {
      const reducedFileSize =
        selectedFile.size /
        (selectedFile.size > FILE_SIZE_THRESHOLD ? 2 * MAX_FILE_SIZE : MAX_FILE_SIZE);

      resizeFile(selectedFile, reducedFileSize).then((resizedPhoto) => {
        postFileToServer(resizedPhoto);
        setModalVisible(true);
      });
    } else {
      postFileToServer(selectedFile);
      setModalVisible(true);
    }
  };

  const postFileToServer = async (file) => {
    setLoading(true);
    const photo = {
      uri: file.uri,
      type: file.uri.includes('.pdf') ? 'application/pdf' : 'image/jpeg',
      name: new Date().getTime() + file.uri.split('/').pop(),
    };
    const postData = new FormData();
    postData.append('file', photo);
    postData.append('document_type', 'covid_19_vaccine_card');

    const res = await dispatch(uploadVaccineCard({ uuid, postData }));
    setLoading(false);
    if (res?.type.includes('fulfilled')) {
      setModalVisible(true);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: DOCUMENT_TYPE,
    });
    if (result.type === 'success') {
      if (result.mimeType.includes('image')) {
        updateFile({
          ...result,
          mime_type: 'image',
        });
      } else {
        const { uri } = await PdfThumbnail.generate(result.uri, 0);
        updateFile({
          ...result,
          mime_type: 'application/pdf',
          thumbUri: uri,
        });
      }
    }
  };

  const pickImage = async () => {
    const premissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (premissionResult.granted === false) {
      alert('Permission required to access the gallery!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      const file = await FileSystem.getInfoAsync(result.uri);
      updateFile({
        ...file,
        mime_type: 'image',
      });
    }
  };

  const getPhoto = async (photo) => {
    setIsCameraEnabled(false);
    if (route?.params?.onImagePicked) {
      route.params.onImagePicked(photo);
    } else {
      postFileToServer(photo);
    }
    setModalVisible(true);
  };

  useEffect(() => {
    const dispatchChanges = async () => {
      await sleep(1500);
      if (!isLoading) {
        if (route && route.params && route.params.isFromOrgConsent) {
          navigation.navigate('VaccineEdit');
        } else navigation.goBack();
      }
    };
    if (isModalVisible) dispatchChanges();
  }, [dispatch, isModalVisible, isLoading, route, navigation]);

  const handleClose = () => {
    LogEvent(`${analyticName}_click_Close`);
    navigation.goBack();
    if (route.params?.onClose) {
      route.params?.onClose();
    }
  };
  return (
    <>
      {isCameraEnabled ? (
        <TakePhoto
          onCaptureImage={getPhoto}
          maskType={route.params.maskType}
          maskTitle={route.params?.maskTitle}
          onCancel={() => setIsCameraEnabled(false)}
          needToResize={route?.params?.needToResize}
        />
      ) : (
        <>
          <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
            <HeaderComp
              left={route?.params?.isFromOrgConsent ? 'arrow' : 'x'}
              onLeftClick={handleClose}
              addStyle={styles.profileHeader}
            />
            <View style={styles.container}>
              <Text style={styles.vaccineText}>{route?.params?.title}</Text>
              <View style={{ marginTop: 32 }}>
                <SelectorComponent
                  style={styles.selectContainer}
                  arrow={false}
                  data={[
                    {
                      title: t('vaccine.picker.photo'),
                      icon: <Icon type='MaterialIcons' name='camera-alt' size={24} isGradient />,
                      profileColor: colors.primaryPavement,
                      onClick: () => {
                        LogEvent(`${analyticName}_click_Photo`);
                        setIsCameraEnabled(true);
                      },
                    },
                    {
                      title: t('vaccine.picker.library'),
                      icon: <Icon type='MaterialIcons' name='photo' size={24} isGradient />,
                      profileColor: colors.primaryPavement,
                      onClick: () => {
                        LogEvent(`${analyticName}_click_Library`);
                        pickImage();
                      },
                      hidden: Platform.OS === 'android',
                    },
                    {
                      title: t('vaccine.picker.file'),
                      icon: <Icon type='MaterialIcons' name='file-upload' size={24} isGradient />,
                      profileColor: colors.primaryPavement,
                      onClick: () => {
                        LogEvent(`${analyticName}_click_Upload`);
                        pickDocument();
                      },
                    },
                  ]}
                />
              </View>
              {route?.params?.isFromOrgConsent && (
                <View style={styles.skipContainer}>
                  <Text style={styles.skipText}>
                    {t('vaccine.picker.org.question')}
                    <Text style={styles.skipLink} onPress={() => navigation.goBack()}>
                      {t('vaccine.picker.org.skip')}
                    </Text>
                  </Text>
                </View>
              )}
            </View>
          </SafeAreaView>

          <Modal visible={isModalVisible} style={{ margin: 0 }}>
            <View style={styles.modalView}>
              <View style={styles.modalCenter}>
                <View style={styles.modalIconView}>
                  <CheckIcon width={67} height={67} />
                </View>
                <Text style={styles.modalText}>{confirmText}</Text>
              </View>
            </View>
          </Modal>
          <Modal visible={isConsentModalVisible} transparent style={styles.modal}>
            <View style={styles.infoModalContainer}>
              <View style={styles.infoContentContainer}>
                <Text style={styles.infoTitle}>{t('vaccine.picker.modal.title')}</Text>
                <Text style={styles.infoSubtitle}>{t('vaccine.picker.modal.subtitle')}</Text>
                <BlueButton
                  title={t('vaccine.button.continue')}
                  action={() => setIsConsentModalVisible(false)}
                  style={{ marginTop: 20 }}
                />
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginLeft: PADDING_SIDES,
    marginRight: PADDING_SIDES,
  },
  modalIconView: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#666666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  modalText: {
    marginTop: 20,
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 34,
  },
  modalView: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '100%',
    height: hp('100%'),
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCenter: {
    alignItems: 'center',
    marginBottom: hp('15%'),
  },
  doneSection: {
    marginTop: hp('21.5%'),
    width: '100%',
    alignItems: 'center',
  },
  vaccineText: {
    fontFamily: 'Museo_500',
    fontSize: 24,
  },
  profileHeader: {
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('6.4%'),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  skipContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    textAlign: 'center',
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 18,
  },
  skipLink: {
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
  },
  loadingComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    fontSize: 16,
  },
  modal: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoModalContainer: {
    paddingHorizontal: 24,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  infoContentContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 100, height: 100 },
    padding: 24,
  },
  infoTitle: {
    marginBottom: 20,
    fontFamily: 'Museo_900',
    fontSize: 14,
    lineHeight: 16,
  },
  infoSubtitle: {
    marginBottom: 20,
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 16,
  },
});
