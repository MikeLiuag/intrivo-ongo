import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Modal, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HeaderComp from '../../components/HeaderComp';
import ProctoringScreen from './ProctoringScreen';
import LoaderComp from './LoaderProctor';
import TeleHealthScreen from './TeleHealth';
import DisclosureScreen from './DisclosureScreen';
import { proctorSessionCompleted, setHasAudioFilePermissions } from '../../store/app/slice';

import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import CloseIcon from '../../components/Svg/close';
import { LogEvent } from '../../analytics';
import CameraCheck from '../../screens/CameraCheck';

const TeleHealth = ({ route: { params } }) => {
  const navigation = useNavigation();
  const [step, setStep] = useState(params?.step || 0);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onCameraPermission = () => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  const { users } = useSelector((s) => s.user);
  const uuid = users?.[0];

  const { hasAudioPermissions } = useSelector((s) => s.app);
  const isConsentModalVisible = !hasAudioPermissions;
  const setIsConsentModalVisible = () => {
    dispatch(setHasAudioFilePermissions());
  };

  const logStep = useCallback(() => {
    switch (step) {
      case 0:
        return 'CheckVideo';
      case 1:
        return 'Before';
      case 2:
        return 'Wait';
      case 3:
        return 'Call';
      default:
        return '';
    }
  }, [step]);

  useEffect(() => {
    LogEvent(`CareSolutions${logStep()}_screen`);
  }, [step, logStep]);

  const screens = [
    hasPermission ? (
      <ProctoringScreen
        onContinue={() => {
          LogEvent(`CareSolutions${logStep()}_click_Continue`);
          setStep((s) => s + 1);
        }}
      />
    ) : null,
    <DisclosureScreen
      onContinue={() => {
        LogEvent(`CareSolutions${logStep()}_click_Continue`);
        setStep((s) => s + 1);
      }}
      onBack={() => {
        LogEvent(`CareSolutions${logStep()}_click_NoThanks`);
        navigation.goBack();
      }}
    />,
    <LoaderComp
      uuid={uuid}
      onContinue={() => {
        LogEvent(`CareSolutions${logStep()}_click_Continue`);
        setStep((s) => s + 1);
      }}
      title={params?.loaderTitle}
      anotherFlow={!!params?.step}
    />,
    <TeleHealthScreen
      onContinue={() => {
        LogEvent(`CareSolutions${logStep()}_click_End`);
        navigation.goBack();
      }}
    />,
  ];

  if (hasPermission === false) return <CameraCheck onCameraPermission={onCameraPermission} />;

  return (
    <>
      <SafeAreaView
        edges={step !== 3 ? ['right', 'top', 'left'] : ['right', 'left']}
        style={styles.conitaner}
      >
        {step !== 1 && (
          <HeaderComp
            color={step !== 2 ? null : 'black'}
            left={step !== 2 ? null : 'arrow'}
            onLeftClick={() => {
              LogEvent(`CareSolutions${logStep()}_click_Back`);
              navigation.goBack();
            }}
            center={[
              t('screens.proctoring.live.header'),
              { fontSize: 16, color: 'black', fontFamily: 'Museo_700' },
            ]}
            addStyle={{
              paddingTop: 24,
              paddingRight: 32,
              paddingLeft: 16,
              paddingBottom: step !== 2 ? 0 : 10,
              backgroundColor: 'transparent',
            }}
            right={[
              <CloseIcon width={14} height={14} />,
              () => {
                LogEvent(`CareSolutions${logStep()}_click_Close`);
                dispatch(proctorSessionCompleted());
                navigation.goBack();
              },
            ]}
          />
        )}
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: 20,
            flex: 1,
          }}
        >
          {screens[step]}
        </View>
      </SafeAreaView>

      <Modal
        visible={isConsentModalVisible}
        transparent
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          }}
        >
          <View style={{ flex: 3 }} />
          <View
            style={{
              // flex: 1,
              backgroundColor: 'white',
              borderRadius: 20,
              shadowColor: 'black',
              shadowOffset: { width: 100, height: 100 },
              padding: 24,
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: 'Museo_900' }}>{t('screens.proctoring.live.chat')}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: 'Museo_300' }}>{t('screens.proctoring.live.speak')}</Text>
            </View>
            <BlueButton
              title={t('screens.proctoring.live.button')}
              action={() => setIsConsentModalVisible(false)}
              style={{ marginTop: 20 }}
            />
          </View>
          <View style={{ flex: 2 }} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  cameraConitaner: {
    ...StyleSheet.absoluteFillObject,
    minHeight: 500,
  },
  testHeader: {
    alignSelf: 'center',
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.greyMed,
    marginBottom: 40,
  },
  conitaner: {
    flex: 1,
    backgroundColor: colors.greyWhite,
    //   // paddingTop: 90,
    //   // paddingHorizontal: 24,
    //   paddingBottom: 20,
  },
  title: {
    fontFamily: 'Museo_900',
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    color: colors.greyMed,
  },
  textContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 51,
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    flex: 1,
    marginTop: 32,
  },
  text1: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  text2: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    color: colors.greyMed,
    lineHeight: 24,
    marginTop: 16,
  },
  cameraTop: {
    backgroundColor: 'black',
    width: '100%',
    height: 138,
    // position: 'absolute',
    top: 0,
  },
  camTitle: {
    position: 'absolute',
    top: 162,
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  cameraBotButons: {
    paddingHorizontal: 40,
    // position: 'absolute',
    // bottom: 0,
    backgroundColor: 'black',
    width: '100%',
    // paddingBottom: 60,
    height: 210,
    justifyContent: 'center',
    marginTop: 'auto',
  },
  camControlBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonType: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 16,
  },
  imageBackground: {
    backgroundColor: colors.primaryPavement,
    height: 48,
    width: 48,
    marginRight: 16,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: 'hidden',
  },
  rowImage: {
    width: 48,
    height: 48,
  },
  rowHeader: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: colors.greyDark2,
  },
  rowText: {
    fontSize: 14,
    fontFamily: 'Museo_500',
    color: colors.greyMed,
  },
  donthaveText: {
    marginTop: 90,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Museo_900',
    color: colors.greyMed,
    fontSize: 18,
  },
  starttestText: {
    marginTop: 7,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Museo_900',
    color: colors.primaryBlue,
    fontSize: 18,
  },
});

export default TeleHealth;
