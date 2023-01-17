import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Linking } from 'react-native';
import { Camera } from 'expo-camera';
import { colors } from '../../theme';
import { LogEvent } from '../../analytics';
import { fonts } from '../../theme/fonts';
import { isCurrentTimeBetween } from '../../utilis/dateTime';
import LandingIntro from '../../components/LandingIntro';
import TelehealthDisclaimer from '../../components/TelehealthDisclaimer';
import CameraCheck from '../CameraCheck';

const IntroImage = require('../../assets/longcovid-intro.png');

const TelehealthInfo = ({ navigation }) => {
  const { t } = useTranslation();
  const isFlowAwailable = isCurrentTimeBetween('8:00', '20:00');

  const [showAudioPermissionsModal, setShowAudioPermissionsModal] = useState(false);
  const [showCameraPermissionModal, setShowCameraPermissionModal] = useState(false);

  const hasAudioPermissions = useRef(false);
  const hasCameraPermissions = useRef(false);

  useEffect(() => {
    LogEvent('LCOVID_Virtual_Intro_screen');
    Promise.all([Camera.getCameraPermissionsAsync(), Camera.getMicrophonePermissionsAsync()]).then(
      (results) => {
        hasCameraPermissions.current = results[0].granted;
        hasAudioPermissions.current = results[1].granted;
      }
    );
  }, []);

  const handleClose = () => {
    LogEvent('LCOVID_Virtual_Intro_click_Close');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  const handleBack = () => {
    LogEvent('LCOVID_Virtual_Intro_click_Back');
    navigation.goBack();
  };

  const goNext = () => navigation.navigate('TelehealthQuestionnaire');

  const handleStart = () => {
    LogEvent('LCOVID_Virtual_Intro_click_Schedule');

    if (hasCameraPermissions.current) {
      if (hasAudioPermissions.current) goNext();
      else setShowAudioPermissionsModal(true);
    } else setShowCameraPermissionModal(true);
  };

  const handleModalClose = () => {
    Promise.all([
      Camera.requestCameraPermissionsAsync(),
      Camera.requestMicrophonePermissionsAsync(),
    ]).then((results) => {
      setShowAudioPermissionsModal(false);
      const granted = results.reduce((acc, curr) => acc && curr.granted, true);
      if (granted) goNext();
      else Linking.openSettings();
    });
  };

  const handleCameraModalClose = async () => {
    const { granted } = await Camera.getCameraPermissionsAsync();
    if (granted) {
      hasCameraPermissions.current = true;
      setShowCameraPermissionModal(false);
      handleStart();
    }
  };

  if (showCameraPermissionModal) return <CameraCheck onCameraPermission={handleCameraModalClose} />;

  return (
    <View style={styles.container}>
      <LandingIntro
        title={' '}
        subtitle={t('screens.telehealth.info.title')}
        introBullets={[t('screens.telehealth.info.description1')]}
        headerImage={IntroImage}
        description={t('screens.telehealth.info.description2')}
        rightButton={{
          title: t('screens.telehealth.info.buttonCTA'),
          onAction: handleStart,
          disabled: !isFlowAwailable,
        }}
        visitTime={t('screens.telehealth.info.visit')}
        handleBack={handleClose}
        handleHeaderLeft={handleBack}
        border={false}
        headerBackground={false}
        withoutBulletNumberation
        descriptionTextStyle={styles.bulletTextStyle}
        bulletTextStyle={styles.bulletTextStyle}
        showPrivacyPolicy
        privacyPolicyAnalytic='LCOVID_Virtual_Intro_click_Privacy'
        isBeta
      />
      <TelehealthDisclaimer visible={showAudioPermissionsModal} onModalClose={handleModalClose} />
    </View>
  );
};

export default TelehealthInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bulletTextStyle: {
    lineHeight: 25,
    textAlign: 'center',
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyGrey,
  },
});
