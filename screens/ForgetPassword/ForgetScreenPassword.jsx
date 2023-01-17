import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../../components/HeaderComp';
import RecaptchaWrapper from '../../components/RecaptchaWrapper';
import InputLeftLabel from '../../components/InputLeftLabel';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { requestForgotPasswordCode, validateForgotEmail } from '../../store/app/slice';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import { LogEvent } from '../../analytics';
import { colors } from '../../theme';

const validateEmailReg = (email) => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export default ({ navigation, route }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState(route.params && route.params.email ? route.params.email : '');
  const [emailError, setEmailError] = useState(false);

  const recaptchaIntegration = useSelector((s) => s.app.recaptchaIntegration);
  const $recaptcha = React.useRef();

  const fromProfile = route.params?.fromProfile;

  const dispatch = useDispatch();

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  useEffect(() => {
    LogEvent(fromProfile ? 'ProfileSettingsEditPassword_screen' : 'ForgotPassEmail_screen');
  }, [fromProfile]);

  const ButtonHandler = async () => {
    LogEvent(
      fromProfile ? 'ProfileSettingsEditPassword_click_Cont' : 'ForgotPassEmail_click_Continue'
    );
    if (validateEmailReg(email)) {
      const res = await dispatch(validateForgotEmail({ email: email.toLowerCase() }));
      if (res?.type.includes('fulfilled')) {
        const token = await $recaptcha?.current?.getToken();
        const response = await dispatch(
          requestForgotPasswordCode({ email, route: 'email', recaptchaToken: token })
        );
        const { payload } = response;
        if (response?.type.includes('fulfilled'))
          navigation.navigate('ForgotEnterCode', { email, otpRoute: payload });
      }
    } else {
      setEmailError('Please enter a valid email');
    }
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <View style={styles.profileHeader}>
        <HeaderComp
          left='arrow'
          onLeftClick={() => {
            LogEvent(
              fromProfile ? 'ProfileSettingsEditPassword_click_Back' : 'ForgotPassEmail_click_Back'
            );
            navigation.goBack();
          }}
        />
      </View>
      <LinearGradient colors={['#ffffff', '#F3F6FC']} start={{ x: 0, y: 0 }} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={20}
          contentContainerStyle={{
            backgroundColor: 'red',
          }}
          enabled={!floating}
        >
          <View style={styles.TitleView}>
            <Text style={styles.TextTitle1}>{t('forgetPassword.title')}</Text>
            <Text style={styles.TextDiscrption}>{t('forgetPassword.textDescription')}</Text>
          </View>
          <View style={styles.containerInput}>
            <InputLeftLabel
              autoCapitalize='none'
              error={emailError}
              placeholder={t('forgetPassword.placeholder')}
              textContentType='emailAddress'
              value={email}
              action={(value) => {
                setEmail(value);
                setEmailError(false);
              }}
              keyboardType='email-address'
              autoCompleteType='email'
            />
          </View>
          {recaptchaIntegration && <RecaptchaWrapper ref={$recaptcha} />}
          <View style={styles.spacer} />
          <View style={styles.ViewBlueButton}>
            <BlueButton
              title={t('forgetPassword.button')}
              action={ButtonHandler}
              disabled={!email}
            />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  headerBtn: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  TitleView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 60,
    flexGrow: 0.3,
  },
  TextTitle1: {
    fontSize: 24,
    fontFamily: 'Museo_700',
    color: '#333333',
    textAlign: 'center',
  },
  TextDiscrption: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 26,
  },
  containerInput: {
    paddingHorizontal: wp('4%'),
    paddingTop: 16,
    justifyContent: 'flex-start',
  },
  ViewBlueButton: {
    paddingHorizontal: wp('4%'),
    paddingBottom: 46,

    // flexShrink: 1,
    // justifyContent: 'flex-end',
  },
  spacer: {
    flexShrink: 20,
    flexBasis: 10,
    flexGrow: 1,
    minHeight: 20,
  },
  red: {
    fontFamily: 'Museo_700',
    color: colors.statusRed,
  },
});
