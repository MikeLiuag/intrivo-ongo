import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import * as Device from 'expo-device';
import { currentVersion, currentBuild } from '../utilis/constants';
import { BlueButton } from '../components/Buttons/BlueButton';
import { loginUser, verify, verifyUserPhone } from '../store/app/slice';
import { resendVerificationCode } from '../store/user/slice';
import OtpInput from '../components/OtpInput';
import { colors } from '../theme';

const PhoneVerification = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { email, password, editPhone, phoneId, emailRoute } = route?.params || {};
  const [otp, setOtp] = useState('');
  const [isResendActive, setResendActive] = useState(true);
  const [useEmail, setUseEmail] = useState(emailRoute);
  const dispatch = useDispatch();

  const onResend = () => {
    setResendActive(false);
    setTimeout(() => {
      setResendActive(true);
    }, 5000);
    if (editPhone) {
      dispatch(resendVerificationCode());
    } else if (useEmail) {
      onSendToMail();
    } else {
      onSendToPhone();
    }
  };
  // }

  const onSendToMail = () => {
    setUseEmail(true);
    dispatch(
      loginUser({
        email: route.params.email,
        password: route.params.password,
        route: 'email',
      })
    );
  };

  const onSendToPhone = () => {
    setUseEmail(false);
    dispatch(loginUser({ email, password, route: 'phone' }));
  };

  const onHelp = () => {
    Linking.openURL(
      `mailto:support@letsongo.com?subject=${t('introSteps.4.supportMailSubjectLogin')}&body=${t(
        'introSteps.4.supportMailBody'
      )}${email},  ` +
        `App Version:${currentVersion}-${currentBuild},  ${Device.osName}${Device.osVersion}`
    );
  };

  return (
    <LinearGradient colors={['#ffffff', '#F3F6FC']} start={{ x: 0, y: 0 }} style={{ flex: 1 }}>
      <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' && 'padding'}
          style={styles.codeInputInner}
        >
          <View style={styles.headerHand}>
            <Text style={styles.title}>{t('introSteps.4.title')}</Text>
            <Text style={styles.subtitle}>
              {t('introSteps.4.subtitle')}
              {editPhone || !useEmail ? t('introSteps.4.phone') : email}
            </Text>
          </View>
          <View style={styles.otpContainer}>
            <OtpInput onChange={setOtp} />
          </View>
          <TouchableOpacity
            style={styles.resendeCodeBtn}
            disabled={!isResendActive}
            onPress={onResend}
          >
            <Text style={isResendActive ? styles.sendTextActive : styles.sendTextInactive}>
              {t('introSteps.4.newCode')}
            </Text>
          </TouchableOpacity>
          {!editPhone && !emailRoute ? (
            <TouchableOpacity style={styles.resendeCodeBtn} onPress={onSendToMail}>
              <Text style={styles.sendTextActive}>
                {useEmail ? t('introSteps.4.sendCodeToPhone') : t('introSteps.4.sendCodeToMail')}
              </Text>
            </TouchableOpacity>
          ) : null}
          <View style={styles.containerHelp}>
            <Text style={styles.labelHelp}>{t('introSteps.4.helpText')}</Text>
            <TouchableOpacity onPress={onHelp}>
              <Text style={styles.buttonHelp}>{t('introSteps.4.helpButton')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            {otp.length < 6 ? (
              <BlueButton title={t('button.continue')} style={styles.button} blank />
            ) : (
              <BlueButton
                title={t('button.continue')}
                style={styles.button}
                action={() => {
                  if (!editPhone) {
                    dispatch(
                      verify({
                        verification_code: otp,
                      })
                    );
                  } else {
                    dispatch(
                      verifyUserPhone({
                        phoneId,
                        otpCode: otp,
                        editPhone,
                      })
                    ).then((res) => {
                      if (res?.payload?.isVerified) {
                        navigation.navigate('BasicInfo', {
                          phoneVerified: true,
                        });
                      }
                    });
                  }
                }}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PhoneVerification;

const styles = StyleSheet.create({
  buttonBack: {
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  headerHand: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? hp('12%') : hp('8%'),
  },
  codeInputInner: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
  },
  title: {
    fontFamily: 'Museo_500',
    fontSize: 22,
    lineHeight: 26,
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0.2,
    marginTop: 10,
    color: colors.greyDark,
  },
  otpContainer: {
    marginTop: 20,
    flexBasis: 60,
    width: '100%',
  },
  resendeCodeBtn: {
    marginTop: 16,
    paddingHorizontal: wp('8%'),
  },
  sendTextActive: {
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
    fontSize: 16,
  },
  sendTextInactive: {
    fontFamily: 'Museo_700',
    color: colors.greyGrey,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
    marginTop: 20,
  },
  button: {
    width: '100%',
  },
  containerHelp: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
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
