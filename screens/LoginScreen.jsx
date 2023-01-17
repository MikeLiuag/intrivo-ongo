import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
  supportedAuthenticationTypesAsync,
  AuthenticationType,
} from 'expo-local-authentication';
import { useTranslation } from 'react-i18next';
// import * as Keychain from 'react-native-keychain';
import RecaptchaWrapper from '../components/RecaptchaWrapper';
import { BlueButton } from '../components/Buttons/BlueButton';
import {
  // checkTokenExpiration,
  falseBioSetting,
  loginUser,
  loginWithBio,
  requestForgotPasswordCode,
  setTokenByBio,
  validateForgotEmail,
} from '../store/app/slice';
import InputLeftLabel from '../components/InputLeftLabel';
// Svg-s
import LogoSvg from '../assets/logo';
import { colors } from '../theme';
import { branding } from '../assets/brandingConsts';

import useIsFloatingKeyboard from '../utilis/keyboard';
import { LogEvent } from '../analytics';

const backgroundImage = require('../assets/backgroundImage.png');

export default ({ navigation }) => {
  const savedEmail = useSelector((state) => state.app.savedEmail) || '';

  const { t } = useTranslation();

  const [email, setEmail] = useState(savedEmail);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const dispatch = useDispatch();
  const { phoneId, bioToken, bioSetting, globalError, otpRoute } = useSelector(
    (state) => state.app
  );

  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const recaptchaIntegration = useSelector(s => s.app.recaptchaIntegration);
  const $recaptcha = React.useRef();

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  // *** Biometric authentication code
  const [bioCompatible, setBioCompatible] = useState(false);
  const [bioType, setBioType] = useState(null);
  const [didAskBio, setDidAskBio] = useState(false);

  // each time the login screen is loaded, check to see if the user has bio auth capabilities
  useEffect(() => {
    const isBioCompatible = async () => {
      const compatible = await hasHardwareAsync();
      const enrolled = await isEnrolledAsync();
      const types = await supportedAuthenticationTypesAsync();
      // const isTokenValid = await dispatch(checkTokenExpiration());
      setBioType(AuthenticationType[types[0]]);
      setBioCompatible(compatible && enrolled/* && isTokenValid.payload} */);
    };
    LogEvent('Login_screen');
    isBioCompatible();
  }, []);
  const bioString = () => {
    if (bioType === 'FINGERPRINT') {
      return Platform.OS === 'android'
        ? t('bioType.fingerPrint')
        : t('bioType.touch');
    }
    return t('bioType.face');
  };

  // Prompt the user to use bio auth either the first time they login,
  //    of if the user clicks the bio icon when on subsequent logins
  const askBioLogin = ({
    email: emailProp = null,
    password: passwordProp = null,
    recaptchaToken: recaptchaTokenProp = null,
  }) => {
    LogEvent('Biometric_screen');
    Alert.alert(
      t('screens.login.alertBio.setup', { biotype: bioString() }),
      t('screens.login.alertBio.question', { biotype: bioString() }),
      [
        {
          text: t('screens.login.alertBio.dontAllow'),
          onPress: () => {
            LogEvent('Biometric_click_DontAllow');
            dispatch(falseBioSetting());
            if (emailProp && passwordProp) {
              dispatch(loginUser({ email: emailProp, password: passwordProp, recaptchaToken: recaptchaTokenProp }));
            }
          },
        },
        {
          text: 'OK',
          onPress: () => {
            LogEvent('Biometric_click_OK');
            setBioCompatible(false); // to prevent auto logging in on the first tiem
            dispatch(setTokenByBio());
            if (emailProp && passwordProp) {
              dispatch(loginUser({ email: emailProp, password: passwordProp, recaptchaToken: recaptchaTokenProp }));
            }
          },
        },
      ]
    );
  };

  // This function brings up the actual bio prompt
  const bioLogin = useCallback(async () => {
    const result = await authenticateAsync();
    if (result.success) {
      dispatch(loginWithBio());
    }
  }, [dispatch]);

  // Called the first time the user accesses the login screen
  //  to attempt to login using bio auth if everything is setup
  useEffect(() => {
    if (
      !!bioCompatible &&
      !!bioSetting &&
      !!bioToken &&
      !globalError &&
      !didAskBio
    ) {
      bioLogin();
      setDidAskBio(true);
    } else if (globalError) setDidAskBio(true);
  }, [bioCompatible, bioLogin, bioSetting, bioToken, globalError, didAskBio]);

  const bioAuthHandler = () => {
    if (!bioSetting) {
      askBioLogin({ email: null, password: null });
    } else if (!bioToken) {
      Alert.alert(
        t('screens.login.alertBio.firstLogin', { biotype: bioString() })
      );
    } else bioLogin();
  };

  useEffect(() => {
    // login was successful
    if (phoneId) {
      navigation.navigate('PhoneVerificationScreen', {
        email: email.toLowerCase(),
        password,
        emailRoute: !otpRoute?.includes("phone")
      });
    }
  }, [navigation, phoneId, email, password, otpRoute]);

  const loginHandler = async () => {
    LogEvent('Login_click_LogIn');
    Keyboard.dismiss();
    if (email.length < 1) {
      setEmailError(true);
    } else if (password.length < 1) {
      setPasswordError(true);
    } else if (password === 'LetsOnGo123!') {
      // org onboarding
      const res = await dispatch(
        validateForgotEmail({ email: email.toLowerCase() })
      );
      if (res?.type.includes('fulfilled')) {
        const response = await dispatch(
          requestForgotPasswordCode({ email, route: 'email' })
        );
        if (response?.type.includes('fulfilled'))
          navigation.navigate('ForgotEnterCode', { email, hideBack: true });
      } else {
        setEmailError(true);
        setPasswordError(true);
      }
    } else if (bioCompatible && bioSetting === null) {
      // if this is the first login
      const recaptchaToken = await $recaptcha?.current?.getToken();
      askBioLogin({ email: email.toLowerCase(), password, recaptchaToken });
    } else {
      // if there is no bio hardware or the user said no to using it,
      //  then use the regular password login
      // await Keychain.setGenericPassword(email, password);
      const recaptchaToken = await $recaptcha?.current?.getToken();
      dispatch(loginUser({ email: email.toLowerCase(), password, recaptchaToken }));
    }
  };
  const handleForgotPass = () => {
    LogEvent('Login_click_ForgotPassword');
    navigation.navigate('ForgetScreenPassword');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}
        enabled={!floating}
      >
        <View style={styles.logoWrapper}>
          <LogoSvg width={wp('55%')} height={wp('12%')} />
          <View style={styles.logoTextSection}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 14,
                letterSpacing: 0.2,
                color: branding.colorNewUser,
                textAlign: 'center',
              }}
            >
              {t('screens.login.new')}
            </Text>
            <Text> </Text>
            <Text
              onPress={async () => {
                LogEvent('Login_click_SignUp');
                navigation.navigate('SignUpSteps', { reset: true });
              }}
              style={{
                fontSize: 14,
                lineHeight: 14,
                letterSpacing: 0.2,
                fontWeight: '700',
                color: colors.primaryBlue,
                textAlign: 'center',
              }}
            >
              {t('screens.login.singUp')}
            </Text>
          </View>
        </View>
        <View style={styles.inputSection}>
          <View style={{ marginBottom: 8 }}>
            <InputLeftLabel
              autoCapitalize="none"
              error={emailError}
              placeholder="Email"
              textContentType="username"
              value={email}
              action={(value) => {
                setEmail(value);
                setEmailError(false);
              }}
              keyboardType="email-address"
              autoCompleteType="email"
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            {/* if you need to add face id button,just add this as props faceId faceIdAction={() => navigation.navigate('somewhere')} */}
            <InputLeftLabel
              error={passwordError}
              placeholder={t('placeholder.pass')}
              // textContentType="password"
              value={password}
              secureTextEntry={passwordVisible}
              action={(value) => {
                setPassword(value);
                setPasswordError(false);
              }}
              hideShow
              hideShowAction={() => setPasswordVisible(!passwordVisible)}
              showPassword={passwordVisible}
              faceIdAction={bioAuthHandler}
              faceId={bioCompatible && bioSetting !== null}
              bioAuthType={bioType}
              textContentType="password"
              autoCompleteType="password"
            />
          </View>
          {recaptchaIntegration && <RecaptchaWrapper ref={$recaptcha}/>}
          <BlueButton
            title={t('screens.login.loginButt')}
            action={loginHandler}
          />
          <Text
            onPress={handleForgotPass}
            style={{
              fontSize: 16,
              color: colors.primaryBlue,
              marginTop: 24,
              marginBottom: 48,
              fontWeight: '700',
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            {t('screens.login.forgPass')}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: wp('8%'),
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    marginTop: 150,
  },
  logoWrapperKeyboard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  logoTextSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
  },
  inputSection: {
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
    marginTop: hp('16%'),
  },
  inputSectionKeyboard: {
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
    marginTop: hp('20%'),
  },
});
