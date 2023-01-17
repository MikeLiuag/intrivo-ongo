import React, { useState, useEffect } from 'react';
import {
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
// import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import * as Network from 'expo-network';
import { useTranslation } from 'react-i18next';
import RecaptchaWrapper from '../components/RecaptchaWrapper';
import Carousel from '../components/IntroSteps/Carousel';
import { BlueButton } from '../components/Buttons/BlueButton';
import Arrow from '../components/Svg/arrow';
import IntroStep from '../components/IntroSteps';
import { registration, validateEmail, networkError } from '../store/app/slice';
import { clearErrors } from '../store/user/actions';
import { colors } from '../theme';
import { LogEvent, LogOnboarding } from '../analytics';
import useIsFloatingKeyboard from '../utilis/keyboard';

const maxSteps = 7;

const isNetConnected = () => Network.getNetworkStateAsync().then((state) => state.isConnected);

const SignUpSteps = ({ navigation }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [backPressed, setBackPressed] = useState(false);

  const buttonText = [
    t('button.continue'),
    t('button.setPass'),
    t('button.verify'),
    t('button.continue'),
    // 'Continue',
    // 'Continue',
    // 'Continue',
    // 'Continue',
    // 'Continue',
  ];

  const [data, setData] = useState({
    email: null,
    phoneNumber: null,
    countryCode: 'US',
    callingCode: '+1',
    password: null,
    phoneVerified: false,
    otpVal: '',
    otp: ['-', '-', '-', '-'],
  });

  const recaptchaIntegration = useSelector((s) => s.app.recaptchaIntegration);
  const $recaptcha = React.useRef();

  const isEmailVerified = useSelector((state) => state.app.isEmailVerified);
  const error = useSelector((state) => state.app.error);
  const isLoading = false;

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  useEffect(() => {
    if (step === 2) {
      setData((current) => ({ ...current, password: null }));
    }
    LogOnboarding(step);
  }, [step]);

  const hardwareBackPressCustom = () => {
    LogOnboarding(step, true);
    dispatch(clearErrors());
    if (step === 1) {
      navigation.navigate('LoginScreen');
      return true;
    }
    setStep(step - 1);
    setBackPressed(true);
    return true;
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressCustom);
    };
  });

  // this effect controls which step to show
  useEffect(() => {
    if (step === 1 && isEmailVerified && !error && !backPressed) {
      setStep(2);
    }
  }, [error, step, backPressed, isEmailVerified]);

  const validate = (stepToValidate) => {
    const stepsValidation = {
      1: () => {
        const regex =
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(data.email);
      },
      2: () => {
        const regex =
          // eslint-disable-next-line no-useless-escape
          /^(?=.*[A-Z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@$%#^&*()_+|~=`{}\[\]:";'<>?,.\/])[A-Za-z\d-!$%^&@#*()_+|~=`{}\[\]:";'<>?,.\/]{8,}$/;
        return regex.test(data.password);
      },
      3: () => !!data.phoneNumber,
      4: () => data.otp && !data.otp.some((item) => item === '-'),
    };
    return stepsValidation[stepToValidate] ? stepsValidation[stepToValidate]() : true;
  };

  const formatPhonenumber = () => {
    const formattedPhone = data.phoneNumber.replace('-', '');
    return `${data.callingCode}${formattedPhone}`;
  };

  return !isLoading ? (
    <LinearGradient colors={['#ffffff', '#F3F6FC']} start={{ x: 0, y: 0 }} style={{ flex: 1 }}>
      <SafeAreaView edges={['right', 'top', 'left', 'bottom']} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{ flex: 1, justifyContent: 'flex-start' }}
          enabled={!floating}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              paddingHorizontal: 25,
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
              hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
              onPress={() => {
                LogOnboarding(step, true);
                setBackPressed(true);
                if (step <= 1) {
                  // dispatch(logoutUser());
                  navigation.navigate('LoginScreen');
                } else {
                  setStep(step - 1);
                }
              }}
            >
              <Arrow style={{ height: 45, width: 45 }} />
            </TouchableOpacity>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
              }}
            >
              <Carousel currentStep={step} maxStep={maxSteps} />
            </View>
            <View style={{ flex: 1 }} />
          </View>
          <View
            style={{
              flexBasis: 60,
              flexShrink: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Text allowFontScaling={false} style={styles.stepCounter}>
              {t('screens.intro.step')} {step}/{maxSteps}
            </Text>
          </View>
          <View
            style={{
              flexBasis: hp('60%'),
              flexGrow: 4,
              flexShrink: 1,
              alignItems: 'center',
            }}
          >
            <ScrollView
              scrollEnabled={step !== 5}
              keyboardShouldPersistTaps='handled'
              style={{
                width: '100%',
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flex: 1 }}
            >
              <IntroStep
                currentStep={step}
                data={data}
                setField={(name, value) => setData((current) => ({ ...current, [name]: value }))}
                errorMessage={error}
              />
              {recaptchaIntegration && <RecaptchaWrapper ref={$recaptcha} />}
              {error && error !== 'No Internet' ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
            </ScrollView>
          </View>
          <View
            style={{
              paddingBottom: 24,
              alignItems: 'center',
            }}
          >
            <BlueButton
              disabled={!validate(step, data.dependentScreen)}
              title={buttonText[step - 1]}
              style={styles.button}
              action={async () => {
                if (step === 1) {
                  if (await isNetConnected()) {
                    LogEvent('OnboardingEmail_click_Continue');
                    await dispatch(validateEmail({ email: data.email.toLowerCase() }));
                  } else {
                    dispatch(networkError());
                  }
                }
                if (step === 2) {
                  if (await isNetConnected()) {
                    LogEvent('OnboardingPassword_click_Set');
                    setStep(3);
                  } else {
                    dispatch(networkError());
                  }
                }
                if (step === 3) {
                  LogEvent('OnboardingPhone_click_Verify');
                  Keyboard.dismiss();
                  const token = await $recaptcha?.current?.getToken();
                  dispatch(
                    registration({
                      email: data.email.toLowerCase(),
                      phone: formatPhonenumber(),
                      password: data.password,
                      recaptchaToken: token,
                    })
                  );
                }
                setBackPressed(false);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  ) : (
    <View style={[styles.indicatorContainer, styles.horizontal]}>
      <ActivityIndicator animating size='large' style={{ opacity: 1 }} color='#26A9E0' />
    </View>
  );
};

export default SignUpSteps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp('2%'),
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    color: 'black',
  },
  stepCounter: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    letterSpacing: 1.5,
    color: colors.primaryBlue,
  },
  arrow: {
    // height: 48,
    // width: 48,
  },
  button: {
    width: wp('86%'),
    marginHorizontal: wp('4%'),
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
