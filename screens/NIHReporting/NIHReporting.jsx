import React, { createElement, useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import CloseIcon from '../../components/Svg/close';
import { BlueButton } from '../../components/Buttons/BlueButton';
import ReportSelect from '../../components/Buttons/SelectButton';
import SelectButton from '../../components/modularTestFlow/components/buttons/select';
import { LogEvent } from '../../analytics';
import { parseHtmlForTags } from '../../helpers/functions';
import { fetchClientAgreement, setUserAgreementSetting } from '../../store/user/slice';
import CompletedScreen from '../../components/CompletedScreen';

const NIHReporting = ({ route, navigation: subNavigation }) => {
  const { onAction, testName } = route.params;
  const fromProfile = route.params?.route?.params?.fromProfile;
  const agreementId = route.params.agreementId
    ? route.params.agreementId
    : route.params?.route?.params?.agreementId;
  const onSaveReportingSetting = route.params?.route?.params?.onSaveReportingSetting;

  const { usersLookup } = useSelector((s) => s.user);
  const listToDisplay = Object.values(usersLookup);
  const primaryUser = listToDisplay[0];
  const { user_agreements: userAgreement } = primaryUser;
  const shareResultAgreement = userAgreement.data.filter(
    (item) => item.agreement_subject === 'Share results'
  )[0];
  const agreementValue = shareResultAgreement
    ? shareResultAgreement?.user_agreement_option?.data?.value
    : null;
  const [selectedOption, setSelectedOption] = useState(agreementValue);
  const [agreementData, setAgreementData] = useState();
  const [isSavedModalVisible, setSavedModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const Select = fromProfile ? ReportSelect : SelectButton;

  const getAgreementDetail = useCallback(async () => {
    const response = await dispatch(fetchClientAgreement({ agreementId }));
    const { payload } = response;
    if (response?.type.includes('fulfilled')) {
      const { data } = payload;
      setAgreementData(data);
    }
  }, [agreementId, dispatch]);

  useEffect(() => {
    if (fromProfile) {
      LogEvent('ProfileSettingsReporting_screen');
    } else {
      LogEvent('ShareResults_screen');
    }
    getAgreementDetail();
  }, [fromProfile, getAgreementDetail]);

  const handleRightClick = () => {
    LogEvent('ShareResults_click_Close');
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          navigation.navigate('Dashboard');
        },
      },
      {
        text: t('yesNo.No'),
        style: 'cancel',
      },
    ]);
  };

  const saveSetting = async () => {
    const requestData = {
      data: {
        agreement_id: agreementData.uuid,
        option_value: selectedOption,
      },
    };
    await dispatch(setUserAgreementSetting({ requestData }));
    if (!fromProfile) {
      LogEvent('ShareResults_click_Next');

      onAction();
    } else {
      LogEvent('ProfileSettingsReporting_click_Save');
      ModalOn(true);
    }
  };

  const goBack = () => {
    LogEvent('ProfileSettingsReporting_click_Back');
    navigation.goBack();
  };

  const onSuccessSave = useCallback(() => {
    onSaveReportingSetting?.();
    navigation.goBack();
  }, [onSaveReportingSetting, navigation]);

  const ModalOn = useCallback(
    (res) => {
      if (res) {
        setSavedModalVisible(true);
        setTimeout(() => onSuccessSave(), 2000);
      }
    },
    [onSuccessSave]
  );

  const onPressAccountSettings = () => {
    navigation.push('NIHStack', {
      agreementId,
      fromProfile: true,
      onSaveReportingSetting: onAction,
    });
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.conitaner}>
      <HeaderComp
        center={[
          fromProfile
            ? t('reporting.title')
            : testName !== 'CareStart' && t('reporting.shareResult'),
          styles.headerTitle,
        ]}
        addStyle={styles.header}
        left={fromProfile ? 'arrow' : null}
        onLeftClick={goBack}
        right={[fromProfile ? null : <CloseIcon width={14} height={14} />, handleRightClick]}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {!fromProfile &&
          (testName === 'CareStart' ? (
            <View style={{ marginHorizontal: 16 }}>
              <Text style={styles.carestartTitle}>{t('reporting.shareHelp')}</Text>
              <TouchableOpacity
                style={styles.margin12}
                onPress={() => {
                  LogEvent('ShareResults_click_Learn');
                  subNavigation.navigate('NIHLearn', {
                    content: agreementData.content,
                  });
                }}
              >
                <Text style={styles.carestartSubtitle}>{t('reporting.learnAbout')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.topView}>
              <Text style={styles.title}>{t('reporting.helpBuild')}</Text>
              <TouchableOpacity
                style={styles.margin12}
                onPress={() => {
                  LogEvent('ShareResults_click_Learn');
                  subNavigation.navigate('NIHLearn', {
                    content: agreementData.content,
                  });
                }}
              >
                <Text style={styles.carestartSubtitle}>{t('reporting.learnAbout')}</Text>
              </TouchableOpacity>
            </View>
          ))}
        <View style={styles.contentView}>
          {agreementData?.options?.data?.map((item) => (
            <Select
              key={item.value}
              title={item.subject}
              subTitle={item.description}
              titleStyle={styles.reportingTitle}
              subTitleStyle={styles.reportingDescription}
              disableLeftBackground
              active={selectedOption === item.value}
              action={() => {
                setSelectedOption(item.value);
              }}
              showBottomLink={fromProfile && item.value !== 'do_not_report'}
              bottomLinkText={t('reporting.informationShared')}
              bottomLinkClick={() => {
                if (item.value === 'report_all') {
                  LogEvent('ProfileSettingsReporting_click_Learn1');
                } else {
                  LogEvent('ProfileSettingsReporting_click_Learn2');
                }
                subNavigation.navigate('ReportResult', {
                  type: item.value,
                });
              }}
            />
          ))}
          {!agreementData && (
            <View style={styles.loader}>
              <ActivityIndicator size='large' color='#26A9E0' />
            </View>
          )}
        </View>
        {!fromProfile && (
          <Text style={styles.noteText}>
            <Text style={styles.note}>{t('reporting.note')}:</Text>{' '}
            {parseHtmlForTags(t('reporting.noteDescription'), {
              blue: styles.blueText,
            }).map((e) =>
              createElement(
                Text,
                {
                  style: e.style,
                  onPress: onPressAccountSettings,
                },
                e.child
              )
            )}
          </Text>
        )}

        <View style={styles.footer}>
          <BlueButton
            style={styles.blueButton}
            title={fromProfile ? t('button.save') : t('footer.Next')}
            disabled={!selectedOption}
            action={saveSetting}
          />
        </View>
      </ScrollView>
      <CompletedScreen title={t('reporting.informationSaved')} visible={isSavedModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conitaner: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },
  header: {
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
  },
  headerTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Museo_700',
  },
  carestartTitle: {
    fontSize: 24,
    lineHeight: 36,
    color: colors.black,
    fontFamily: 'Museo_900',
  },
  carestartSubtitle: {
    fontSize: 14,
    lineHeight: 28,
    color: colors.primaryBlue,
    fontFamily: 'Museo_700',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.greyMed,
    fontFamily: 'Museo_300',
  },
  topView: {
    alignItems: 'center',
  },
  contentView: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: heightPercentageToDP('2%'),
  },
  noteText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.greyMed,
    fontFamily: 'Museo_300',
    marginHorizontal: 24,
    marginTop: 20,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.greyMed,
    fontFamily: 'Museo_700',
  },
  blueButton: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  backbutton: {
    flex: 4,
    marginRight: 8,
    backgroundColor: '#D6E9F1',
    borderWidth: 0,
  },
  nextButton: {
    flex: 7,
    marginLeft: 8,
  },
  nextButtonText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
  },
  backbuttonText: {
    color: colors.black,
    fontFamily: 'Museo_700',
    fontSize: 16,
  },
  learnButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  margin12: {
    marginTop: 12,
  },
  reportingTitle: {
    color: colors.greyDark2,
  },
  reportingDescription: {
    color: colors.greyMed,
  },
  blueText: {
    color: colors.primaryBlue,
    fontFamily: 'Museo_700',
  },
  loader: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NIHReporting;
