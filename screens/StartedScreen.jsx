import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Modal,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import * as Network from 'expo-network';
import { useTranslation } from 'react-i18next';
import { BlueButton } from '../components/Buttons/BlueButton';
import LogoSvg from '../assets/logo';
import { colors } from '../theme';
import { networkError } from '../store/app/slice';
import { LogEvent } from '../analytics';

const backgroundImage = require('../assets/backgroundImage.png');

const isNetConnected = () =>
  Network.getNetworkStateAsync().then((state) => state.isConnected);

export default ({ navigation }) => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

  const [showModal, setShowModal] = useState(Platform.OS === 'android');

  // log event
  useEffect(() => {
    LogEvent('GetStarted_screen');
    if(Platform.OS === 'android'){
      LogEvent('WifiAlert_screen');
    }
  },[])

  const handleButton = async () => {
    LogEvent('GetStarted_click_GetStarted')
    await navigation.navigate('SignUpSteps', { reset: true });
  };

  const handleModal = () => {
    LogEvent('WifiAlert_click_Continue');
    setShowModal(false);
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View
        style={{
          flex: 1,
          height: '100%',
          marginTop: hp('20%'),
          flexDirection: 'column',
          alignContent: 'space-between',
        }}
      >
        <View style={styles.logoWrapper}>
          <LogoSvg width={wp('60%')} height={wp('15%')} />
          <View style={styles.logoTextSection}>
            <Text
              allowFontScaling={false}
              onPress={async () =>
                navigation.navigate('SignUpSteps', { reset: true })
              }
              style={styles.logoText}
            >
              {t('screens.started.title')}
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 24, marginRight: 24 }}>
          <BlueButton
            title={t('screens.started.button')}
            action={handleButton}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 24,
              marginBottom: 48,
            }}
          >
            <Text style={{ alignSelf: 'center' }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.greyWhite,
                  letterSpacing: 0.2,
                  lineHeight: 24,
                  textAlign: 'center',
                }}
              >
                {t('screens.started.haveAccount')}
              </Text>
              <Text> </Text>
              <Text
                onPress={async () => {
                  if (await isNetConnected()) {
                    LogEvent('GetStarted_click_SignIn')
                    navigation.navigate('LoginScreen');
                  } else {
                    dispatch(networkError());
                  }
                }}
                style={{
                  fontSize: 16,
                  color: colors.primaryBlue,
                  letterSpacing: 0.2,
                  lineHeight: 28,
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                {t('screens.started.signIn')}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <Modal
        visible={showModal}
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
              <Text style={{ fontFamily: 'Museo_900' }}>
                {t('screens.started.modal.title')}
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: 'Museo_300' }}>
                {t('screens.started.modal.subtitle')}
              </Text>
            </View>
            <BlueButton
              title={t('screens.started.modal.button')}
              action={handleModal}
              style={{ marginTop: 20 }}
            />
          </View>
          <View style={{ flex: 2 }} />
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
    lineHeight: 28,
    color: colors.primaryBlue,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  passwordSection: {
    marginBottom: 32,
    flexDirection: 'row',
    backgroundColor: colors.greyWhite,
    borderWidth: 1,
    borderColor: colors.lagoonBlue,
    borderRadius: 16,
    padding: 24,
    color: '#2D3142',
    fontSize: 16,
    justifyContent: 'space-between',
  },
  passwordInput: {
    width: '75%',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logoWrapperKeyboard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  logoTextSection: {
    flexDirection: 'row',
    marginTop: 10,
    flexGrow: 1,
  },
  inputSection: {
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
    marginTop: hp('24%'),
    height: hp('36%'),
  },
  inputSectionKeyboard: {
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
    marginTop: hp('5%'),
    marginBottom: hp('24%'),
  },
  input: {
    // backgroundColor: "border: 1px solid #D8E1F8"
    backgroundColor: colors.greyWhite,
    borderWidth: 1,
    borderColor: colors.lagoonBlue,
    borderRadius: 16,
    padding: 24,
    color: colors.ebonyClay,
    fontSize: 16,
  },
  faceIdWrapper: {
    backgroundColor: colors.greyWhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('3%'),
    marginVertical: hp('3%'),
    borderRadius: wp('5%'),
    paddingHorizontal: wp('10%'),
  },
  error: {
    textAlign: 'center',
    display: 'flex',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: colors.statusRed,
  },
});
