import React, { useRef, useEffect, useState, createElement } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Linking,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { CheckBox } from 'react-native-elements';
import * as Device from 'expo-device';
import { useNavigation } from '@react-navigation/native';
import { currentVersion, currentBuild } from '../../utilis/constants';
import OtpInput from '../OtpInput';
import InputLeftLabel from '../InputLeftLabel';
import { getAddresses } from '../../store/address/slice';
import { resendVerificationCode, resendVerificationCodeToEmail } from '../../store/user/slice';
import InfoForm from '../InfoForm';
import { stringifyNumber, parseHtmlForTags } from '../../helpers/functions';
import { colors } from '../../theme';

import CustomPhoneInput from '../CustomPhoneInput';
import { LogEvent } from '../../analytics';
import { openLink } from '../../utilis/link';

const getSubtitles = (t, step, data) => {
  if (step === 2) return null;
  if (step === 8 && !data.dependentScreen) return 'Enter number of dependents below';
  if (step === 8 && data.dependentScreen) return t(`introSteps.8.2.subtitle`);
  return t(`introSteps.${step}.subtitle`);
};

const getTitles = (t, step, data) => {
  if (step === 8 && !data.dependentScreen) return t(`introSteps.8.1.title`);
  if (step === 8 && data.dependentScreen) {
    return `Tell us about your ${stringifyNumber(data.currentDependent + 1)} dependent`;
  }
  return t(`introSteps.${step}.title`);
};
const getTitles2 = (t, step) => t(`introSteps.${step}.title2`);

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const IntroStep = ({ currentStep, data, setField, verifyByEmail, changeVerify, skipVerify }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const phoneRef = useRef(null);
  const addresses = useSelector((state) => state.address.addresses);
  const phoneNumber = useSelector((state) => state.app.phoneNumber);
  const email = useSelector((state) => state.app.email);
  const [isResendActive, setResendActive] = useState(true);
  const onResend = () => {
    LogEvent('OnboardingAuthPhone_click_Resend');
    setResendActive(false);
    setTimeout(() => {
      setResendActive(true);
    }, 5000);
    dispatch(resendVerificationCode());
  };
  const onResendToEmail = () => {
    LogEvent('OnboardingAuthEmail_click_Resend');
    dispatch(resendVerificationCodeToEmail());
  };
  const verificationCodeRef = useRef(null);
  const [scrollIsOnBottom, setScrollIsOnBottom] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (currentStep === 5) {
      dispatch(getAddresses());
    }
  }, [currentStep, dispatch]);

  const searchAddresses = (search) => dispatch(getAddresses(search));
  const subtitle = getSubtitles(t, currentStep, data);
  const title = getTitles(t, currentStep, data);
  const title2 = getTitles2(t, currentStep, data);

  const showEmailOrPhone = () =>
    !verifyByEmail ? ` ${data.phoneNumber || phoneNumber}` : `${data.email || email}`;

  const changeTitle = () => {
    if (skipVerify && currentStep === 3) {
      return t('introSteps.3.skipTitle');
    }
    return title;
  };

  const onHelp = () => {
    if (verifyByEmail) {
      LogEvent('OnboardingAuthEmail_click_Help');
    } else {
      LogEvent('OnboardingAuthPhone_click_Help');
    }
    Linking.openURL(
      `mailto:support@letsongo.com?subject=${t(
        'introSteps.4.supportMailSubjectOnboarding'
      )}&body=${t('introSteps.4.supportMailBody')}${email},  ` +
        `App Version:${currentVersion}-${currentBuild},  ${Device.osName}${Device.osVersion}`
    );
  };

  const getSteps = (step) => {
    const steps = {
      1: () => (
        <InputLeftLabel
          value={data.email}
          action={(text) => setField('email', text)}
          placeholder={t('placeholder.email')}
          autoCapitalize='none'
          autoCompleteType='email'
          textContentType='username'
          keyboardType='email-address'
        />
      ),
      2: () => {
        const hasUppercase = /[A-Z]/g;
        const hasNumber = /\d/g;
        const hasSpecialCharacter = /[-!$%^&*()@#_+|~=`{}[\]:";'<>?,./]/;
        const length = /^.{8,}$/;
        const validNumber = [hasUppercase, hasNumber, hasSpecialCharacter, length]
          .map((item) => (data.password ? item.test(data.password) : false))
          .filter((item) => !!item).length;
        return (
          <View style={styles.passwordContainer}>
            <InputLeftLabel
              placeholder={t('placeholder.pass')}
              value={data.password}
              secureTextEntry={!data.visible}
              action={(text) => setField('password', text)}
              hideShow
              hideShowAction={() => setField('visible', !data.visible)}
              showPassword={data.visible}
              textContentType='newPassword'
              autoCompleteType='password'
            />
            <View style={styles.passwordIndicators}>
              {[...Array(4).keys()].map((item) => (
                <View style={validNumber > item ? styles.valid : styles.invalid} />
              ))}
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text allowFontScaling={false} style={styles.passwordInfo}>
                  {t('introSteps.2.characters')}
                </Text>
                <Text allowFontScaling={false} style={styles.passwordInfo}>
                  {t('introSteps.2.symbols')}
                </Text>
              </View>
              <View style={styles.col}>
                <Text allowFontScaling={false} style={styles.passwordInfo}>
                  {t('introSteps.2.uppercase')}
                </Text>
                <Text allowFontScaling={false} style={styles.passwordInfo}>
                  {t('introSteps.2.number')}
                </Text>
              </View>
            </View>
          </View>
        );
      },
      3: () => <CustomPhoneInput data={data} setField={setField} />,
      4: () => (
        <>
          <View ref={verificationCodeRef} style={styles.codeInputInner}>
            <View style={styles.codeInputContainer}>
              <OtpInput
                onChange={(code) => {
                  setField('otpVal', code);
                  setField('otp', code.split(''));
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.resendeCodeBtn}
              disabled={!isResendActive}
              onPress={!verifyByEmail ? onResend : onResendToEmail}
            >
              <Text style={isResendActive ? styles.sendTextActive : styles.sendTextInactive}>
                {t('introSteps.4.sendCode')}
              </Text>
            </TouchableOpacity>
            {!verifyByEmail && !skipVerify && (
              <TouchableOpacity style={styles.resendeCodeBtn} onPress={() => changeVerify()}>
                <Text style={styles.sendTextActive}>{t('introSteps.4.sendCodeToMail')}</Text>
              </TouchableOpacity>
            )}
            {skipVerify && (
              <TouchableOpacity style={styles.resendeCodeBtn} onPress={() => skipVerify(1)}>
                <Text style={styles.sendTextActive}>Skip Verification</Text>
              </TouchableOpacity>
            )}
            <View style={styles.containerHelp}>
              <Text style={styles.labelHelp}>{t('introSteps.4.helpText')}</Text>
              <TouchableOpacity onPress={onHelp}>
                <Text style={styles.buttonHelp}>{t('introSteps.4.helpButton')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ),
      5: () => (
        <View style={styles.checkboxContainer}>
          {scrollIsOnBottom ? (
            <CheckBox
              title={t('warning.CheckBoxText')}
              titleProps={{ allowFontScaling: false }}
              checked={data.eula}
              containerStyle={{
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
              size={26}
              checkedColor={colors.primaryBlue}
              uncheckedColor='black'
              onPress={() => setField('eula', !data.eula)}
              textStyle={{
                color: colors.greyDark,
                fontFamily: 'Museo_500',
                fontSize: 16,
              }}
            />
          ) : (
            <Text
              allowFontScaling={false}
              style={{
                color: colors.greyGrey,
                fontFamily: 'Museo_500',
                fontSize: 16,
                marginLeft: 20,
                marginTop: 10,
                // allowFontScaling: false,
              }}
            >
              {t('warning.Scroll')}
            </Text>
          )}
        </View>
      ),
      6: () => (
        <View>
          <InputLeftLabel
            value={data.zipcode}
            action={(zipcode) => setField('zipcode', zipcode)}
            placeholder={t('placeholder.zip')}
            keyboardType='default'
            textContentType='postalCode'
            autoCompleteType='postal-code'
          />
        </View>
      ),
      7: () => <InfoForm data={data} setData={(value) => setField('yourInfo', value)} />,
      8: () =>
        data.dependentScreen === 0 ? (
          <TextInput
            placeholder='# of dependents'
            onChangeText={(value) => {
              if (Number(value) || Number(value) === 0) {
                const numberOfDependents = Number(value);
                setField('dependents', numberOfDependents);
                const dependentArray = [...Array(numberOfDependents).keys()].map((item) => ({
                  name: '',
                  lastName: '',
                  birthday: '',
                  height: '',
                  weight: '',
                }));
                setField('dependentInfo', dependentArray);
              } else {
                setField('dependents', '');
              }
            }}
            value={data.dependents}
            style={styles.inputContainerDependent}
            keyboardType='number-pad'
            textContentType='none'
            autoCompleteType='off'
          />
        ) : (
          <InfoForm
            data={data}
            setData={(value) => setField('dependentInfo', value)}
            isDependant
            dependentNumber={data.currentDependent}
          />
        ),
    };

    return steps[step] && steps[step]();
  };
  return (
    <View style={styles.container}>
      <Text
        allowFontScaling={false}
        style={
          currentStep === 5
            ? {
                ...styles.title,
                textTransform: 'capitalize',
                width: '100%',
                marginBottom: 20,
              }
            : { ...styles.title }
        }
      >
        {changeTitle()}
      </Text>
      {currentStep === 1 || currentStep === 6 ? (
        <Text allowFontScaling={false} style={styles.title}>
          {title2}
        </Text>
      ) : null}
      {[5].includes(currentStep) ? (
        <View style={currentStep === 5 ? styles.eulaTextStyle : styles.subtitleContainer}>
          <ScrollView
            showsVerticalScrollIndicator
            persistentScrollbar
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                setScrollIsOnBottom(true);
              }
            }}
            scrollEventThrottle={400}
            style={
              currentStep === 5 && {
                flex: 1,
                marginHorizontal: -wp('5%'),
                paddingHorizontal: wp('6%'),
              }
            }
          >
            {subtitle && (
              <Text
                allowFontScaling={false}
                style={[currentStep === 5 ? styles.eulaSubtitle : styles.subtitle]}
              >
                {parseHtmlForTags(subtitle).map((e) => {
                  if (e.attributes) {
                    return createElement(
                      Text,
                      {
                        style: e.style,
                        onPress: () => {
                          openLink(navigation, false, {
                            url: e.attributes.href,
                            useWebView: false,
                          });
                        },
                      },
                      e.child
                    );
                  }
                  return createElement(Text, { style: e.style }, e.child);
                })}
              </Text>
            )}
          </ScrollView>
        </View>
      ) : (
        <Text allowFontScaling={false} style={styles.subtitle}>
          {subtitle}
          {currentStep === 4 && showEmailOrPhone()}
        </Text>
      )}
      <View style={currentStep === 5 ? styles.eulaStepContainer : styles.stepContainer}>
        {getSteps(
          currentStep,
          setField,
          searchAddresses,
          addresses,
          verificationCodeRef,
          onResend,
          onResendToEmail,
          phoneRef
        )}
      </View>
    </View>
  );
};

export default IntroStep;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // width: wp('86%'),
    marginHorizontal: wp('6%'),
  },
  codeFieldRoot: {
    justifyContent: 'space-between',
  },
  cellRoot: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lagoonBlue,
    backgroundColor: colors.lagoonBlue,
    marginRight: 15,
    paddingLeft: 5,
  },
  cellRootLast: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lagoonBlue,
    backgroundColor: colors.lagoonBlue,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
    marginRight: 5,
  },
  cellTextLast: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  eulaStepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    marginTop: hp('2%'),
    flex: 1,
  },
  subtitleContainer: {
    height: hp('40%'),
  },
  eulaTextStyle: {
    flex: 6,
    // flexShrink: 1,
    // flexGrow: 1,
    // flexBasis: hp('55%'),
    // height: hp('50%'),
    // marginBottom: -hp('2%'),
  },
  checkboxContainer: {
    // marginBottom: 20,
    // paddingHorizontal: wp('5%'),
    // flex: 1,
    width: wp('96%'),
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    paddingHorizontal: wp('13%'),
  },
  otpBoxesContainer: {
    flexDirection: 'row',
  },
  otpBox: {
    padding: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 40,
    height: 80,
    width: 80,
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  heightPicker: {
    width: wp('92%'),
    height: hp('8.5%'),
    position: 'relative',
    textAlign: 'center',
    borderWidth: 1,
    marginVertical: hp('1%'),
    paddingHorizontal: Platform.OS === 'ios' ? hp('1.5%') : hp('0.57%'),
    paddingTop: hp('2.4%'),
    fontSize: 20,
    borderColor: colors.greyLight,
    borderRadius: hp('2%'),

    justifyContent: 'center',
    backgroundColor: colors.greyWhite,
  },
  otpContainer: {
    width: 80,
    height: 80,
    padding: 30,
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  filledOtpBox: {
    padding: 8,
    marginRight: 10,
    height: 42,
    width: 42,
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 32,
    justifyContent: 'center',
    display: 'flex',
  },
  emptyOtpBox: {
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.primaryLightBlue,
    backgroundColor: colors.primaryLightBlue,
    opacity: 0.3,
    borderRadius: 40,
    height: 22,
    width: 22,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  inputContainer: {
    width: wp('84%'),
    borderRadius: 10,
    height: 60,
    marginTop: 5,
    textAlign: 'center',
    backgroundColor: colors.greyWhite,
    paddingLeft: 10,
  },
  inputContainerDependent: {
    width: wp('84%'),
    borderRadius: 10,
    height: 60,
    marginTop: 5,
    textAlign: 'left',
    backgroundColor: colors.greyWhite,
    paddingLeft: 18,
  },
  inputContainerAddress: {
    width: wp('90%'),
    borderRadius: 16,
    height: 60,
    textAlign: 'center',
    backgroundColor: colors.greyWhite,
    paddingLeft: 14,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: colors.greyExtraLight,
    borderWidth: 1,
    marginBottom: 16,
  },
  addressInput: {
    width: wp('80%'),
    borderRadius: 10,
    height: 60,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: colors.greyWhite,
    fontSize: 16,
  },
  inputText: {
    backgroundColor: colors.greyWhite,
    padding: 3,
    textAlign: 'center',
    borderTopRightRadius: wp('2.5%'),
    borderBottomRightRadius: wp('2.5%'),
  },
  row: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 40,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  passwordIndicators: {
    marginTop: 24,
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: 7,
    flexDirection: 'row',
  },
  passwordInfo: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: colors.greyMed,
  },
  valid: {
    width: wp('20%'),
    backgroundColor: colors.primaryBlue,
    height: 7,
    marginRight: 4,
    borderRadius: 10,
  },
  invalid: {
    width: wp('20%'),
    backgroundColor: colors.primaryBlue,
    opacity: 0.3,
    height: 7,
    marginRight: 4,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Museo_500',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.greyMidnight,
  },
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0.2,
    marginTop: 10,
    color: colors.greyMed,
    textAlign: 'center',
  },
  eulaSubtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 20,
    color: colors.greyDark,
  },
  passwordContainer: {
    // justifyContent: 'center',
    paddingHorizontal: wp('25%'),
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  send: {
    marginTop: 50,
    textAlign: 'center',
    display: 'flex',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.2,
    color: colors.primaryLightBlue,
  },
  codeInputInner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
  },
  codeInputContainer: {
    marginTop: 20,
    flexBasis: 60,
    marginBottom: 20,
  },
  resendeCodeBtn: {
    marginVertical: 10,
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
  button: {
    width: '100%',
    marginBottom: '10%',
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
