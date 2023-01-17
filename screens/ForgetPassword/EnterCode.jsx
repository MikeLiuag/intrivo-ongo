import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import * as Linking from 'expo-linking';
import { useTranslation } from 'react-i18next';
import * as Device from 'expo-device';
import * as Network from 'expo-network';
import HeaderComp from '../../components/HeaderComp';
import InputLeftLabel from '../../components/InputLeftLabel';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { requestForgotPasswordCode, networkError } from '../../store/app/slice';
import { colors } from '../../theme';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import { LogEvent } from '../../analytics';
import OtpInput from '../../components/OtpInput';
import { currentBuild, currentVersion } from '../../utilis/constants';

const validateCode = (email) => {
  const regex = /^[0-9]+$/;
  return regex.test(email);
};

export default ({ navigation, route }) => {
  const { email, otpRoute } = route?.params || {};
  const isOnlyEmailRoute = otpRoute?.includes('phone');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [isResendActive, setResendActive] = useState(true);
  const [useEmail, setUseEmail] = useState(true);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  const isNetConnected = () =>
    Network.getNetworkStateAsync()
      .then((state) => state.isConnected)
      .catch((err) => {
        if (err.code == 'ERR_NETWORK_NO_ACCESS_NETWORKINFO') return false;
      });

  useEffect(() => {
    async function checkInternet() {
      const isConnected = await isNetConnected();
      if (!isConnected) {
        dispatch(networkError());
      }
    }
    checkInternet();
  }, [dispatch]);

  useEffect(() => {
    LogEvent(
      useEmail ? 'ForgotPassAuthEmail_screen' : 'ForgotPassAuthPhone_screen'
    );
  }, [useEmail]);

  const ButtonHandler = async () => {
    if (useEmail) {
      LogEvent('ForgotPassAuthEmail_click_Continue');
    } else {
      LogEvent('ForgotPassAuthPhone_click_Continue');
    }
    if (!validateCode(code)) {
      setCodeError('Please enter valid code');
    } else if (await isNetConnected()) {
      navigation.navigate('EnterNewPassword', { email, code });
    } else {
      dispatch(networkError());
    }
  };

  const handleResendCode = (routeName) => {
    if (useEmail) {
      LogEvent('ForgotPassAuthEmail_click_Resend');
    } else {
      LogEvent('ForgotPassAuthPhone_click_Resend');
    }
    setResendActive(false);
    setTimeout(() => {
      setResendActive(true);
    }, 5000);
    dispatch(requestForgotPasswordCode({ email, route: routeName }));
  };

  const sendCodeToMail = () => {
    LogEvent('ForgotPassAuthPhone_click_Email');
    setUseEmail(true);
    setResendActive(false);
    setTimeout(() => {
      setResendActive(true);
    }, 5000);
    dispatch(requestForgotPasswordCode({ email, route: 'email' }));
  };

  const sendCodeToPhone = () => {
    LogEvent('ForgotPassAuthEmail_click_Phone');
    setUseEmail(false);
    setResendActive(false);
    setTimeout(() => {
      setResendActive(true);
    }, 5000);
    dispatch(requestForgotPasswordCode({ email, route: 'phone' }));
  };

  const onHelp = () => {
    if (useEmail) {
      LogEvent('ForgotPassAuthEmail_click_Help');
    } else {
      LogEvent('ForgotPassAuthPhone_click_Help');
    }
    Linking.openURL(
      `mailto:support@letsongo.com?subject=${t(
        'resetPassword.supportMailSubject'
      )}&body=${t('resetPassword.supportMailBody')}${email},  ` +
        `App Version:${currentVersion}-${currentBuild},  ${Device.osName}${Device.osVersion}`
    );
  };

  const handleGoBack = () => {
    if (useEmail) {
      LogEvent('ForgotPassAuthEmail_click_Back');
    } else {
      LogEvent('ForgotPassAuthPhone_click_Back');
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <View style={styles.profileHeader}>
        {!route.params.hideBack ? (
          <HeaderComp left="arrow" onLeftClick={handleGoBack} />
        ) : null}
      </View>
      <LinearGradient
        colors={['#ffffff', '#F3F6FC']}
        start={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-60}
          enabled={!floating}
        >
          <View style={styles.TitleView}>
            <Text style={styles.TextTitle1}>
              {useEmail
                ? t('resetPassword.enterEmailCode')
                : t('resetPassword.enterCode')}
            </Text>
            <Text style={styles.subTitle}>
              {useEmail
                ? t('resetPassword.enterEmailCodeSubtitle', { email })
                : t('resetPassword.enterCodeSubtitle', { phone: 'your phone' })}
            </Text>
          </View>
          <View style={styles.containerInput}>
            {/* <InputLeftLabel
              autoCapitalize="none"
              error={codeError}
              placeholder={t('resetPassword.code')}
              textContentType="oneTimeCode"
              value={code}
              action={(value) => {
                setCode(value);
                setCodeError(false);
              }}
              keyboardType="numeric"
              secureTextEntry
              maxLength={4}
            /> */}

            <OtpInput onChange={setCode} />
          </View>
          <View style={styles.containerResend}>
            <TouchableOpacity
              disabled={!isResendActive}
              onPress={() => handleResendCode(useEmail ? 'email' : 'phone')}
            >
              <Text
                style={
                  isResendActive
                    ? styles.TextResendActive
                    : styles.TextResendInactive
                }
              >
                {t('resetPassword.resend')}
              </Text>
            </TouchableOpacity>
            {isOnlyEmailRoute ? (
              <TouchableOpacity
                onPress={useEmail ? sendCodeToPhone : sendCodeToMail}
              >
                <Text style={styles.TextResendActive}>
                  {useEmail
                    ? t('introSteps.4.sendCodeToPhone')
                    : t('introSteps.4.sendCodeToMail')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.containerHelp}>
            <Text style={styles.labelHelp}>{t('resetPassword.needHelp')}</Text>
            <Text style={styles.buttonHelp} onPress={() => onHelp()}>
              {t('resetPassword.emailUs')}
            </Text>
          </View>
          <View style={styles.spacer} />
          <View style={styles.ViewBlueButton}>
            <BlueButton
              title="Continue"
              action={ButtonHandler}
              disabled={!validateCode(code)}
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
    backgroundColor: colors.greyWhite,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.greyWhite,
    marginHorizontal: 10,
  },
  headerBtn: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  TitleView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 26,
    flexGrow: 1,
  },
  TextTitle1: {
    fontSize: 24,
    fontFamily: 'Museo_700',
    color: colors.greyDark2,
    textAlign: 'center',
  },
  subTitle: {
    marginTop: 10,
    fontFamily: 'Museo_500',
    fontSize: 16,
    color: colors.greyMed,
  },
  TextDiscrption: {
    fontSize: 12,
    color: colors.greyGrey,
    textAlign: 'center',
    marginTop: 16,
  },
  containerInput: {
    paddingHorizontal: wp('4%'),
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 16,
    flexBasis: 40,
  },
  ViewBlueButton: {
    paddingHorizontal: wp('4%'),
    paddingBottom: 35,
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  containerResend: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  TextResendActive: {
    fontSize: 16,
    color: colors.primaryBlue,
    fontFamily: 'Museo_700',
    padding: 5,
  },
  TextResendInactive: {
    fontSize: 16,
    color: colors.greyGrey,
    fontFamily: 'Museo_700',
    padding: 5,
  },
  spacer: {
    flexShrink: 20,
    flexBasis: 10,
    flexGrow: 1,
    minHeight: 20,
  },
  containerHelp: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  labelHelp: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    color: colors.greyMed,
  },
  buttonHelp: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: colors.primaryBlue,
    marginStart: 3,
  },
});
