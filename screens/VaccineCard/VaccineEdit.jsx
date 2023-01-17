import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

import { useTranslation } from 'react-i18next';
import HeaderComp from '../../components/HeaderComp';
import DependentsList from '../Dependents/DependentsList';
import DotsIcon from '../../components/Svg/dotsIcon';

import AddDose from '../../components/AddDose';
import DoseInfo from '../../components/DoseInfo';
import { replaceVaccineCard, removeVaccineCard } from '../../store/user/slice';
import { LogEvent } from '../../analytics';

export default ({ navigation, route }) => {
  const { uuid: uuidFromProps } = route.params || {};
  const [uuid, setUuid] = useState(uuidFromProps || null);
  const { usersLookup } = useSelector((s) => s.user);
  const { document } = uuid ? usersLookup[uuid]?.immunization || {} : {};

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [isTextVisible, setTextVisible] = useState(true);

  useEffect(() => {
    if (!uuid) {
      LogEvent('VaccineCardUser_screen');
    } else {
      LogEvent('VaccineCardView_screen');
    }
  }, [uuid]);

  useEffect(() => {
    if (uuid && !document?.media[0]) {
      navigation.navigate('FilePicker', {
        uuid,
        isFromOrgConsent: false,
        maskType: 'card',
        title: t('vaccine.picker.title'),
        needToResize: true,
        onClose: navigation.goBack,
      });
    }
  }, [document, navigation, t, uuid]);
  const createTwoButtonAlert = () =>
    Alert.alert(t('vaccine.edit.alert.title'), t('vaccine.edit.alert.subtitle'), [
      {
        text: 'NO',
        onPress: () => handleModalNo(),
        style: 'cancel',
      },
      { text: 'YES', onPress: () => handleModalYes() },
    ]);

  const handleReupload = () => {
    LogEvent('VaccineCardView_click_ReUpload');
    setTextVisible(false);
    createTwoButtonAlert();
  };

  const handleModalYes = () => {
    setMenuModalVisible(false);
    setTextVisible(true);
    dispatch(
      replaceVaccineCard({
        uuid,
        immunizationId: usersLookup[uuid].immunization.uuid,
        documentId: document.uuid,
        doseInfo: usersLookup[uuid].immunization.doseInfo,
      })
    );
  };

  const removeVaccinationCard = () => {
    LogEvent('VaccineCardView_click_Remove');
    setMenuModalVisible(false);
    setTextVisible(true);
    dispatch(
      removeVaccineCard({
        uuid,
        immunizationId: usersLookup[uuid].immunization.uuid,
        documentId: document.uuid,
      })
    );
  };

  const handleModalNo = () => {
    setMenuModalVisible(false);
    setTextVisible(true);
  };

  if (!uuid)
    return (
      <DependentsList
        title={t('vaccine.edit.depend.title')}
        onSelectUser={setUuid}
        header={t('vaccine.edit.depend.header')}
        headerLeft={null}
        headerRight={[
          'x',
          () => {
            LogEvent('VaccineCardUser_click_Close');
            navigation.navigate('Dashboard');
          },
        ]}
        hideArrows
        addNewStyle='list'
        includeSelf
        from='VaccineCardUser'
      />
    );
  const renderImage = () =>
    document?.media[0] && document?.media[0].mime_type.includes('image') ? (
      <Image
        source={{
          uri: document.media[0]?.uri,
        }}
        resizeMode='contain'
        style={{ height: wp('100%'), width: '100%' }}
      />
    ) : (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: 'Museo_700',
            fontSize: 18,
          }}
        >
          {t('vaccine.edit.preview')}
        </Text>
      </View>
    );

  const handleClose = () => {
    LogEvent('VaccineCardView_click_Close');
    navigation.navigate('Dashboard');
  };

  const handleMenu = () => {
    LogEvent('VaccineCardView_click_Menu');
    setMenuModalVisible((v) => !v);
  };

  const handleImagePreview = () => {
    LogEvent('VaccineCardView_click_Image');
    navigation.navigate('FilePreview', {
      media: document.media[0],
      analyticName: 'VaccineCard',
    });
  };

  const handleCancel = () => {
    LogEvent('VaccineCardView_click_Cancel');
    setMenuModalVisible(false);
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.screen}>
      <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
        <HeaderComp
          center={[t('vaccine.header'), { fontSize: 16, color: 'black', fontFamily: 'Museo_700' }]}
          left='x'
          onLeftClick={handleClose}
          addStyle={styles.profileHeader}
          right={[<DotsIcon />, handleMenu]}
        />
      </View>
      <View style={{ marginBottom: 20, flex: 1 }}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePreview}>
          {document?.media[0]?.uri && renderImage()}
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'flex-start', paddingVertical: 20 }}>
          <FlatList
            data={usersLookup[uuid]?.immunization?.doseInfo}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <DoseInfo
                dose={item.dose_number}
                vaccine={item.manufacturer}
                date={item.date}
                onPress={() => {
                  LogEvent('VaccineCardView_click_DoseInfo');
                  navigation.navigate('AddDoseInfo', {
                    uuid,
                    editable: true,
                    data: item,
                  });
                }}
              />
            )}
            ListFooterComponent={
              <AddDose
                onPress={() => {
                  LogEvent('VaccineCardView_click_Dose');
                  navigation.navigate('AddDoseInfo', { uuid, editable: false });
                }}
              />
            }
          />
        </View>
      </View>
      <Modal
        isVisible={isMenuModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={() => setMenuModalVisible(false)}
      >
        {isTextVisible && (
          <View style={styles.menuModalView}>
            <TouchableOpacity onPress={() => handleReupload()}>
              <View style={styles.menuModalRowFirst}>
                <Text allowFontScaling={false} style={styles.rowText}>
                  {t('vaccine.button.reupload')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeVaccinationCard()}>
              <View style={styles.modalRow}>
                <Text allowFontScaling={false} style={styles.rowTextCancel}>
                  {t('vaccine.button.remove')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <View style={styles.modalRow}>
                <Text allowFontScaling={false} style={styles.rowTextCancel}>
                  {t('vaccine.button.cancel')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    backgroundColor: '#EBEBEB',
    marginTop: 15,
    width: '100%',
    minHeight: '10%',
  },
  container: {
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
    marginTop: 10,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  Container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  doneText: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '500',
    color: '#2A4D9B',
  },
  doneSection: {
    marginTop: hp('21.5%'),
    width: '100%',
    alignItems: 'center',
  },
  patternBottom: {
    flexDirection: 'row',
  },
  patternTop: {
    alignItems: 'flex-end',
  },
  patternSection: {
    marginTop: hp('14%'),
  },
  menuModalView: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: 'auto',
    bottom: 0,
  },
  menuModalRowFirst: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  rowText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  modalRow: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  rowTextCancel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EB5757',
  },
  imageModal: {
    marginVertical: Platform.OS === 'ios' ? 40 : 10,
    padding: 10,
  },
  closeImage: {
    marginBottom: 5,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editConteiner: {
    position: 'absolute',
    top: 26,
    right: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 40,
    height: 40,
    zIndex: 2,
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
  },
  modalText: {
    marginTop: 20,
    fontFamily: 'Museo_500',
    fontSize: 20,
    lineHeight: 34,
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
});
