import React, { useState, useEffect, useCallback } from 'react';
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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import * as Network from 'expo-network';
import Carousel from '../components/IntroSteps/Carousel';
import { BlueButton } from '../components/Buttons/BlueButton';
import Arrow from '../components/Svg/arrow';
import IntroStep from '../components/IntroSteps';
import { verifyUserPhone, networkError, logoutUser, verifyUserEmail } from '../store/app/slice';
import {
  changePhone,
  fetchClientAgreement,
  resendVerificationCodeToEmail,
  setUserAgreementSetting,
  updateUser,
} from '../store/user/slice';
import { clearErrors } from '../store/user/actions';
import { colors } from '../theme';
import useIsFloatingKeyboard from '../utilis/keyboard';
import { LogOnboarding, LogEvent } from '../analytics';

const maxSteps = 7;

const IntroSteps = ({ navigation, route }) => {
  const [step, setStep] = useState(null);
  const [onBoardingInProgress, setOnBoardingInProgress] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const { t } = useTranslation();

  const buttonText = [
    t('button.continue'),
    t('button.setPass'),
    t('button.verify'),
    t('button.continue'),
    t('button.continue'),
    t('button.continue'),
    t('button.continue'),
    t('button.continue'),
    t('button.continue'),
  ];

  // for verifycation
  const [useEmail, setUseEmail] = useState(false);

  const editPhone = route?.params?.editPhone;

  const isNetConnected = () => Network.getNetworkStateAsync().then((state) => state.isConnected);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    phoneNumber: null,
    countryCode: 'US',
    callingCode: '+1',
    eula: false,
    address_1: null,
    address_2: null,
    city: null,
    state_id: null,
    zipcode: null,
    yourInfo: {},
    phoneVerified: false,
    otpVal: '',
    otp: ['-', '-', '-', '-'],
  });
  // calculate the which step we are on
  const { phoneId, otpRoute } = useSelector((state) => state.app);
  const { emailId } = useSelector((state) => state.app);
  const { users, usersLookup } = useSelector((state) => state.user) || {};
  const { didRegister } = useSelector((state) => state.app) || false;
  const user = (users[0] && usersLookup[users[0]]) || {};

  const eulaAgreement = user?.user_agreements?.data?.filter((item) =>
    item.collection_names.includes('eula')
  )[0];

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  // const [canSkip, setCanSkip] = useState(false);
  const canSkip = !didRegister;

  // log event
  useEffect(() => {
    LogOnboarding(step, useEmail);
  }, [step, useEmail]);

  useEffect(() => {
    // figure out if the phone has been verified or not
    const isPhone = !!user?.phone?.number && !editPhone;

    if (initialRender || !isPhone) {
      if (isPhone) {
        if (user?.first_name && user?.location?.zipcode && user?.dob && !onBoardingInProgress) {
          if (editPhone) {
            navigation.goBack();
            return;
          }

          navigation.replace('Dashboard');
        } else {
          setOnBoardingInProgress(true);
          if (user?.location?.zipcode) setStep(7);
          else if (user?.agreement_accepted_at) setStep(6);
          else setStep(5);
        }
      } else {
        setStep(phoneId || editPhone ? 4 : 3);
        if (!otpRoute?.includes('phone')) {
          setUseEmail(true);
        }
      }
      setData({
        countryCode: 'US',
        callingCode: '+1',
        phoneNumber: user?.phone?.number,
        eula: user?.agreement_accepted_at || false,
        address_1: user?.location?.address_1 || null,
        address_2: user?.location?.address_2 || null,
        city: user?.location?.city || null,
        state_id: user?.state_id || null,
        zipcode: user?.location?.zipcode || null,
        yourInfo: {
          name: user?.first_name,
          lastName: user?.last_name,
          weight: user?.weight,
          height: user?.height,
          birthday: user?.dob,
        },
        phoneVerified: false,
        otpVal: '',
        otp: ['-', '-', '-', '-'],
      });
    }
  }, [
    user?.phone,
    user?.first_name,
    phoneId,
    onBoardingInProgress,
    initialRender,
    navigation,
    user?.state_id,
    user?.last_name,
    user?.weight,
    user?.height,
    user?.dob,
    editPhone,
    user?.agreement_accepted_at,
    user?.location?.address_1,
    user?.location?.address_2,
    user?.location?.city,
    user?.location?.zipcode,
    otpRoute,
  ]);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  // const syncUserStoreWithState = () => {
  //   setData({
  //     ...data,
  //     phoneNumber:
  //       (user?.phones || []).filter((p) => p.is_primary).length > 0
  //         ? user.phones.filter((p) => p.is_primary)[0].number
  //         : null,
  //     eula: user?.agreement_accepted || false,
  //     address_1: user?.address_1 || null,
  //     address_2: user?.address_2 || null,
  //     city: user?.city || null,
  //     state_id: parseInt(user?.state_id || null, 10) || null,
  //     zipcode: user?.zipcode || null,
  //     dependents: user?.dependents.length || 0,
  //   });
  // };

  const handleVerify = () => {
    LogEvent('OnboardingAuthPhone_click_Email');
    setUseEmail(true);
    dispatch(resendVerificationCodeToEmail());
  };

  const hardwareBackPressCustom = () => {
    LogOnboarding(step, true);
    dispatch(clearErrors());
    if (editPhone) return navigation.goBack();
    if (step === 3 && !onBoardingInProgress) return dispatch(logoutUser());

    return setStep(step - 1);
  };

  const skipVerify = (val) => {
    setStep(step + val);
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressCustom);
    };
  });

  const validate = (stepToValidate, screen = -1) => {
    const stepsValidation = {
      3: () => !!data.phoneNumber,
      4: () => data.otp && !data.otp.some((item) => item === '-'),
      5: () => !!data.eula,
      6: () => {
        // eslint-disable-next-line no-useless-escape
        const regexZip = /^((\w{2,}[-\s.])+\w{2,})$|^(\w{4,})$/;

        return (
          // data.address_1?.length > 1 &&
          // data.address_1.replace(/\s/g, '').length &&
          // regex.test(data.address_1) &&
          // data.state_id &&
          // data.city?.length > 1 &&
          // data.city.replace(/\s/g, '').length &&
          // regex.test(data.city) &&
          regexZip.test(data.zipcode) && data.zipcode
        );
      },
      7: () =>
        data.yourInfo &&
        data.yourInfo.name &&
        data.yourInfo.name.replace(/\s/g, '').length &&
        data.yourInfo.lastName &&
        data.yourInfo.lastName.replace(/\s/g, '').length &&
        data.yourInfo.birthday,
      // && data.yourInfo.height &&
      // data.yourInfo.weight
    };
    return stepsValidation[stepToValidate] ? stepsValidation[stepToValidate](screen) : true;
  };

  const formatPhonenumber = () => {
    const formattedPhone = data.phoneNumber.replace('-', '');
    return `${data.callingCode}${formattedPhone}`;
  };

  return step !== null ? (
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
            {(step !== 3 || (step === 3 && !onBoardingInProgress)) && step !== 4 && step !== 5 && (
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
                hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
                onPress={() => {
                  LogOnboarding(step, true);
                  dispatch(clearErrors());
                  if (editPhone) navigation.goBack();
                  else if (step === 3 && !onBoardingInProgress) dispatch(logoutUser());
                  else setStep(step - 1);
                }}
              >
                <Arrow />
              </TouchableOpacity>
            )}
            {!editPhone && onBoardingInProgress && (
              <View
                style={{
                  flex: 2,
                  alignItems: 'center',
                }}
              >
                <Carousel currentStep={step} maxStep={maxSteps} />
              </View>
            )}
            {(step !== 3 || (step === 3 && !onBoardingInProgress)) && step !== 4 && step !== 5 && (
              <View style={{ flex: 1 }} /> // needed to center the view above
            )}
          </View>
          {!editPhone && onBoardingInProgress && (
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
          )}
          {step !== 5 ? (
            <View
              style={{
                flexBasis: hp('100%'),
                flexShrink: 1,
              }}
            >
              <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
              >
                <IntroStep
                  currentStep={step}
                  data={data}
                  setField={(name, value) => setData((current) => ({ ...current, [name]: value }))}
                  verifyByEmail={useEmail}
                  changeVerify={handleVerify}
                  skipVerify={canSkip ? skipVerify : undefined}
                />
                {user?.error && <Text style={styles.errorText}>{user.error}</Text>}
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
              }}
            >
              <IntroStep
                currentStep={step}
                data={data}
                setField={(name, value) => setData((current) => ({ ...current, [name]: value }))}
              />
            </View>
          )}
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
                if (step === 3) {
                  dispatch(
                    changePhone({
                      number: formatPhonenumber(),
                      countryCode: data.countryCode,
                    })
                  );
                  setStep((s) => s + 1);
                }
                if (step === 4) {
                  if (useEmail) {
                    LogEvent('OnboardingAuthEmail_click_Continue');
                    // Endpoint to verify user by email
                    dispatch(
                      verifyUserEmail({
                        emailId,
                        otpCode: data.otpVal,
                        editPhone,
                      })
                    ).then((res) => {
                      if (res?.payload?.isVerified) {
                        if (editPhone) {
                          navigation.pop(2);
                        } else {
                          setStep(step + 1);
                        }
                      }
                    });
                  } else {
                    LogEvent('OnboardingAuthPhone_click_Continue');
                    dispatch(
                      verifyUserPhone({
                        phoneId,
                        otpCode: data.otpVal,
                        editPhone,
                        canSkip,
                      })
                    ).then((res) => {
                      if (res?.payload?.isVerified) {
                        if (editPhone) {
                          navigation.pop(2);
                        } else {
                          setStep(step + 1);
                        }
                      }
                    });
                  }
                }
                if (step === 5) {
                  if (await isNetConnected()) {
                    LogEvent('OnboardingTerms_click_Continue');
                    const res = await dispatch(
                      updateUser({
                        agreementAccepted: new Date(),
                      })
                    );
                    if (eulaAgreement) {
                      const requestData = {
                        data: {
                          agreement_id: eulaAgreement.agreement_uuid,
                          option_value: 'accept',
                        },
                      };
                      await dispatch(setUserAgreementSetting({ requestData }));
                      if (!res.error) setStep(step + 1);
                    } else {
                      setStep(step + 1);
                    }
                  } else {
                    dispatch(networkError());
                  }
                }

                if (step === 6) {
                  if (await isNetConnected()) {
                    LogEvent('OnboardingLocation_click_Continue');
                    const res = await dispatch(
                      updateUser({
                        agreementAccepted: new Date(),
                        address_1: data.address_1,
                        address_2: data.address_2,
                        city: data.city,
                        state_id: data.state_id,
                        zipcode: data.zipcode,
                      })
                    );
                    if (res?.type.includes('fulfilled')) {
                      setStep(step + 1);
                    }
                  } else {
                    dispatch(networkError());
                  }
                }
                if (step === 7) {
                  if (await isNetConnected()) {
                    LogEvent('OnboardingInfo_click_Continue');
                    const res = await dispatch(
                      updateUser({
                        first_name: data.yourInfo.name,
                        last_name: data.yourInfo.lastName,
                        weight: Number.isNaN(data.yourInfo.weight) ? null : data.yourInfo.weight,
                        height: data.yourInfo.height,
                        dob: data.yourInfo.birthday,
                      })
                    );
                    if (res?.type.includes('fulfilled')) {
                      setData((current) => ({ ...current }));
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }],
                      });
                    }
                  } else {
                    dispatch(networkError());
                  }
                }
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

export default IntroSteps;

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
  button: {
    width: wp('86%'),
    marginHorizontal: wp('4%'),
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
