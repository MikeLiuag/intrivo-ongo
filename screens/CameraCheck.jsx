import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { BlueButton } from '../components/Buttons/BlueButton';
import HeaderComp from '../components/HeaderComp';
import { colors } from '../theme';
import { LogEvent } from '../analytics';

const cameraCheckImage = require('../assets/camera-check.png');

export default ({ onCameraPermission = () => null }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const handleButtonClick = async () => {
    LogEvent('TestCameraAccess_click_Continue');
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      LogEvent('CameraPermissionD_click_Deny');
      navigation.goBack();
      Linking.openSettings();
    }
    LogEvent('CameraPermissionD_click_Allow')
    onCameraPermission();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.screen}>
      <View style={{ paddingHorizontal: 24 }}>
        <HeaderComp
          center={[
            t('cameraPermission.header'),
            { fontSize: 16, color: 'black', fontFamily: 'Museo_700' },
          ]}
        />
      </View>
      <ScrollView>
        <Image source={cameraCheckImage} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.title}>{t('cameraPermission.title')}</Text>
          <Text style={styles.description}>
            {t('cameraPermission.testProcess')}
          </Text>
          <Text style={styles.description}>
            {t('cameraPermission.vaccineCard')}
          </Text>
          <Text style={styles.description}>
            {t('cameraPermission.liveChat')}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <BlueButton
          title={t('cameraPermission.button')}
          action={handleButtonClick}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: colors.primaryGhost,
  },
  container: {
    paddingHorizontal: 24,
    marginTop: 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 16,
  },
  description: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.311,
    marginTop: 27,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: '8.5%',
    marginTop: 16,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
