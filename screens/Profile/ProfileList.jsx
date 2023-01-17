import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import { falseBioSetting, logoutUser, setZoomSession } from '../../store/app/slice';
import { colors } from '../../theme/index';
import SelectorComponent from '../../components/SelectorComponent';
import { LogEvent } from '../../analytics';
import CompletedScreen from '../../components/CompletedScreen';
import Icon from '../../components/Icon';
import { IS_DEV, QR_CODE_URL } from '../../utilis/axios';
import { getTemplates } from '../../store/modularTestFlow/slice';
import PrescriptionIcon from '../../assets/svgs/prescription.svg';
import { openLink } from '../../utilis/link';
import { getCarePlans, getQRToken, getSelfie, postUserSelfie } from '../../store/user/slice';
import { setMedicationState } from '../../store/medicationFlow/slice';
import LeftArrow from '../../components/Svg/arrowLeftIcon';
import { fonts } from '../../theme/fonts';
import HeaderComp from '../../components/HeaderComp';

const QR_ENABLED = true;
const QR_URL = `${QR_CODE_URL}/share`;

export default ({
  navigation,
  route: {
    params: { isOTP },
  },
}) => {
  const {
    users,
    usersLookup,
    isAnyUserMemberOfOrg: isOrg,
    showCarePlan,
  } = useSelector((s) => s.user);
  const user = users.length !== 0 ? usersLookup[users[0]] : null;
  const userId = user?.uuid;
  const dispatch = useDispatch();
  const { mainUserSelfie: selfie } = useSelector((state) => state.user);
  const { t } = useTranslation();

  const [isSavedModalVisible, setSavedModalVisible] = useState(false);

  const getCarePlansCallback = useCallback(
    () => users.forEach((uuid) => dispatch(getCarePlans({ userId: uuid }))),
    [users, dispatch]
  );

  const getQrCode = useCallback(() => {
    if (QR_ENABLED) dispatch(getQRToken({ uuid: userId }));
  }, [dispatch, userId]);

  const getUserSelfie = useCallback(() => {
    dispatch(getSelfie({ uuid: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getSelfie({ uuid: userId }));
  }, [dispatch, user, userId]);

  useEffect(() => {
    getCarePlansCallback();
    getQrCode();
  }, [dispatch, users, getCarePlansCallback, userId, getQrCode, getUserSelfie]);

  useEffect(() => {
    LogEvent('Profile_screen');
    if (isOTP) {
      setSavedModalVisible(true);
      setTimeout(() => setSavedModalVisible(false), 2000);
    }
  }, [isOTP, navigation]);

  const userType = isOrg ? 'Org' : '';

  const handleLogOut = () => {
    LogEvent(`${userType}Profile_click_LogOut`);
    dispatch(falseBioSetting());
    dispatch(logoutUser());
    LogEvent('LogOut');
  };

  const getUserInitials = () => {
    const firstNameLetter = user?.first_name.slice(0, 1);
    const firstLastnameLetter = user?.last_name.slice(0, 1);
    return firstNameLetter + firstLastnameLetter;
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePassport = () => {
    navigation.navigate('Shop');
  };

  const handleSelfie = () => {
    navigation.navigate('FilePicker', {
      onImagePicked: (file) => {
        dispatch(
          postUserSelfie({
            uuid: userId,
            selfie: file,
          })
        );
      },
      maskType: 'selfie',
      title: 'How would you like to upload your selfie (photo of your face)?',
      needToResize: false,
      analyticName: 'Profile',
      confirmText: t('profile.list.pictureSaved'),
    });
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={handleGoBack}>
          <LeftArrow color='#323232' />
        </TouchableOpacity>
        <Text style={styles.header}>{t('profile.list.header')}</Text>
        <TouchableOpacity
          onPress={handleLogOut}
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
        >
          <Text style={styles.headerLog}>{t('profile.list.logout')}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ paddingTop: 24, paddingHorizontal: 24 }}>
          <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.avatar} onPress={handleSelfie}>
              {selfie ? (
                <Image
                  source={{ uri: selfie }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <Text style={styles.avatarText}>{getUserInitials()}</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.name}>{user?.fullName}</Text>
            <TouchableOpacity style={styles.passportContainer} onPress={handlePassport}>
              <QRCode
                size={24}
                value={`${QR_URL}/${user?.qrToken}`}
                color={colors.primaryYellow}
                backgroundColor={colors.primaryBlue}
              />
              <Text style={styles.passportText}>{t('profile.list.passport')}</Text>
            </TouchableOpacity>
          </View>
          <SelectorComponent
            style={{ paddingLeft: 24, fontSize: 14 }}
            type='inAll'
            disableTopRoundBorder
            data={[
              {
                title: t('profile.list.basic'),
                icon: <Icon type='MaterialIcons' name='assignment-ind' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`${userType}Profile_click_BasicInfo`);
                  navigation.navigate('BasicInfo');
                },
              },
              {
                title: t('profile.list.health'),
                icon: <Icon type='MaterialIcons' name='favorite' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`${userType}Profile_click_HealthInfo`);
                  navigation.navigate('HealthInfo');
                },
              },
              {
                title: t('profile.list.prescriptions'),
                icon: <PrescriptionIcon />,
                onClick: () => {
                  LogEvent('Profile_click_Prescriptions');
                  navigation.navigate('PrescriptionList');
                },
              },
              {
                title: t('profile.list.carePlan'),
                icon: <Icon type='MaterialIcons' name='assignment' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`${userType}Profile_click_CarePlan`);
                  navigation.navigate('CarePlanSelector');
                },
                hidden: !showCarePlan,
              },
              {
                title: t('profile.list.depend'),
                icon: <Icon type='MaterialIcons' name='escalator-warning' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`${userType}Profile_click_Dependents`);
                  navigation.navigate('DependentsList', {
                    addNewStyle: 'header',
                  });
                },
              },
              {
                title: t('profile.list.events'),
                icon: <Icon type='MaterialIcons' name='event' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`${userType}Profile_click_Dependents`);
                  navigation.navigate('HomeEvents');
                },
              },
              ...(IS_DEV
                ? [
                    {
                      title: t('profile.list.orderHistory'),
                      icon: (
                        <Icon type='MaterialIcons' name='shopping-basket' size={24} isGradient />
                      ),
                      onClick: () => {
                        LogEvent(`${userType}Profile_click_OrderHistory`);
                        navigation.navigate('OrderHistory');
                      },
                    },
                  ]
                : []),
              {
                hidden: !user?.organizations?.length,
                title: t('profile.list.org'),
                icon: <Icon type='MaterialIcons' name='account-balance' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`${userType}Profile_click_Organization`);
                  navigation.navigate('OrganizationList', {
                    uuid: users[0],
                  });
                },
              },
              {
                hidden: true, //! user?.is_member_of_organization,
                title: t('profile.list.routine'),
                icon: <Icon type='MaterialIcons' name='beenhere' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`${userType}Profile_click_Routines`);
                  navigation.navigate('Routines', {
                    uuid: users[0],
                  });
                },
              },
              {
                title: t('profile.list.accountSett'),
                icon: <Icon type='Ionicons' name='ios-settings-sharp' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`${userType}Profile_click_Settings`);
                  navigation.navigate('AccSettingsScreen');
                },
              },
              {
                title: t('profile.list.faq'),
                icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                onClick: () => {
                  LogEvent(`${userType}Profile_click_Help`);
                  openLink(navigation, false, {
                    url: 'https://www.letsongo.com/faq?isMobileApp',
                    useWebView: true,
                  });
                },
              },
              ...(IS_DEV
                ? [
                    {
                      title: 'Web modular flow',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        navigation.navigate('WebModularFlow', {
                          url: 'https://guest-dev.letsongo.com/modular-test-flow/ongo-one?target_app_type=webview',
                        });
                      },
                      hidden: false,
                    },
                  ]
                : []),
              ...(__DEV__
                ? [
                    {
                      title: 'Modular Test Flow',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        LogEvent(`${userType}Profile_click_Help`);
                        const type = '0000e111-de6f-4886-a50b-26bb9d1cfca5';
                        dispatch(getTemplates(type));
                        navigation.navigate('ModularTestFlow', {
                          navigateExit: () => navigation.goBack(),
                          type,
                        });
                      },
                    },
                    {
                      title: 'Carelist Flow',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        LogEvent(`${userType}Profile_click_Help`);
                        const type = '0000e111-de6f-4886-a50b-26bb9d1cfca6';
                        dispatch(getTemplates(type));
                        navigation.navigate('ModularTestFlow', {
                          navigateExit: () => navigation.pop(2),
                          type,
                        });
                      },
                    },
                    {
                      title: 'Long Covid Flow',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        navigation.navigate('LongCovidInfo');
                      },
                    },
                    {
                      title: 'Telehealth Flow',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        navigation.navigate('TelehealthInfo');
                      },
                    },
                    {
                      title: 'Sniffles',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        navigation.navigate('SnifflesIntro');
                      },
                    },
                    {
                      title: 'Sniffles Telehealth',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        navigation.navigate('SnifflesTelehealthIntro');
                      },
                    },
                    {
                      title: 'Sniffles Assesment Info v.A',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        navigation.navigate('AssessmentInfoVA');
                      },
                    },
                    {
                      title: 'Sniffles Assesment Info v.B',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        navigation.navigate('AssessmentInfoVB');
                      },
                    },
                    {
                      title: 'Medication Flow',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: () => {
                        dispatch(
                          setMedicationState({
                            value: false,
                            fieldName: 'fromTimeline',
                          })
                        );
                        navigation.navigate('MedicationIntro', {
                          userId: users[0],
                        });
                      },
                    },
                    {
                      title: 'Zoom telehealth',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: async () => {
                        const meetingId = '9614088293';
                        const password = 'ep9GDL';
                        const sdkKey = 'ajxBy5uNCWUpCVpiehiykVM8TJ5rlvbDgkpF';
                        const jwt =
                          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJhanhCeTV1TkNXVXBDVnBpZWhpeWtWTThUSjVybHZiRGdrcEYiLCJhcHBLZXkiOiJhanhCeTV1TkNXVXBDVnBpZWhpeWtWTThUSjVybHZiRGdrcEYiLCJtbiI6Ijk2MTQwODgyOTMiLCJyb2xlIjowLCJpYXQiOjE2NjgwMzEyNzEsImV4cCI6MTY2ODA2MDA3MSwidG9rZW5FeHAiOjE2NjgwNjAwNzF9.N4CngOxz7glTXBkfUPXZD8QYo3a6yJkY1Q6v2HvTjPE';
                        navigation.navigate('ZoomWebView', {
                          // https://intrivo.zoom.us/j/84413057575?pwd=aGxhM1VCYnA5MnVTZ3V0NC9nY0pMUT09
                          url: `https://zoom-dev.intrivo.com?sdkKey=${sdkKey}&meetingId=${meetingId}&password=${password}&jwt=${jwt}&userName=Test`,
                        });
                      },
                    },
                    {
                      title: 'Zoom Sniffles',
                      icon: <Icon type='MaterialIcons' name='live-help' size={24} isGradient />,
                      onClick: async () => {
                        const meetingId = '9614088293';
                        const password = 'WnFwQzlNMVFxVis3Q3ZLUHNlVExQZz09';
                        const sdkKey = 'ajxBy5uNCWUpCVpiehiykVM8TJ5rlvbDgkpF';
                        const jwt =
                          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJhanhCeTV1TkNXVXBDVnBpZWhpeWtWTThUSjVybHZiRGdrcEYiLCJhcHBLZXkiOiJhanhCeTV1TkNXVXBDVnBpZWhpeWtWTThUSjVybHZiRGdrcEYiLCJtbiI6Ijk2MTQwODgyOTMiLCJyb2xlIjowLCJpYXQiOjE2NzI5NTYzNDUsImV4cCI6MTY3Mjk2MzU0NSwidG9rZW5FeHAiOjE2NzI5NjM1NDV9.Ho8TWSBwSU0kqDXHlNLFYbAD8BBXXb7xuPQ0ebd012s';
                        // TODO only works with actual jwt token
                        // navigation.navigate('ZoomWebView', {
                        //   // https://intrivo.zoom.us/j/84413057575?pwd=aGxhM1VCYnA5MnVTZ3V0NC9nY0pMUT09
                        //   url: `https://zoom-dev.intrivo.com?sdkKey=${sdkKey}&meetingId=${meetingId}&password=${password}&jwt=${jwt}&userName=Test`,
                        // });
                        dispatch(
                          setZoomSession({
                            meetingId,
                            password,
                            sdkKey,
                            jwt,
                            userName: 'Test',
                            purpose: 'sniffles',
                          })
                        );
                      },
                    },
                  ]
                : []),
            ]}
          />
        </View>

        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          onPress={() => {
            LogEvent(`${userType}Profile_click_Privacy`);
            openLink(navigation, false, {
              url: 'https://www.intrivo.com/privacy-policy',
              useWebView: false,
            });
          }}
        >
          <Text
            style={{
              marginTop: 20,
              marginBottom: 48,
              alignItems: 'center',
              alignSelf: 'center',
              color: '#999999',
              fontWeight: '600',
            }}
          >
            {t('profile.list.policy')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <CompletedScreen title={t('profile.basicInfo.compModal')} visible={isSavedModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingRight: 24,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  header: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
  },
  headerLog: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primaryBlue,
  },
  titleText: {
    fontSize: 24,
    color: '#000',
    paddingTop: hp('2%'),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: hp('0.6%'),
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.borderBottomColor,
    borderBottomWidth: 1,
    paddingVertical: 22,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 70,
    height: 70,
    backgroundColor: colors.primaryYellow,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarText: {
    color: colors.white,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
  },
  name: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeGigantic,
    marginVertical: 16,
  },
  passportContainer: {
    backgroundColor: colors.primaryBlue,
    width: '100%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    flexDirection: 'row',
  },
  passportText: {
    color: colors.primaryYellow,
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeLarge,
    marginLeft: 8,
  },
});
