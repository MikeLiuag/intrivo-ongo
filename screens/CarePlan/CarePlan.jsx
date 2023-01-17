import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { setShowReviewScreen, setShowTooltip } from '../../store/app/slice';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import CloseIcon from '../../components/Svg/close';
import PickerDropdown from '../../components/Picker';
import Icon from '../../components/Icon';
import { LogEvent } from '../../analytics';
import {
  getOtherDocuments,
  getUserAppointment,
  getUserMedicationRequests,
} from '../../store/user/slice';
import { formats, getDifferenceInMonths, iso8601ToFormatted } from '../../utilis/dateTime';
import { firstCharToUpperCase } from '../../utilis/strings';
import { statusText } from './constant';
import { resetToDashboard } from '../../utilis/navigationHelper';
import MedicationIcon from '../../assets/svgs/medication.svg';

const translationPath = 'profile.carePlan';

const covidTreatmentPurposes = ['paxlovid'];
const initialEvalutions = {
  sniffles: [],
  covid: [],
};

const CarePlan = () => {
  const navigation = useNavigation();
  const { params: { from = '', purpose } = {} } = useRoute();
  const isSniffles = purpose === 'sniffles';

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, usersLookup } = useSelector((state) => state.user) || {};

  const [selectedUuid, setSelectedUuid] = useState(users?.[0] || null);
  const pickerUsers = users.map((u) => ({
    label: `${usersLookup[u].first_name} ${usersLookup[u].last_name}`,
    value: u,
  }));
  const { aptPhoneNumber } = useSelector((s) => s.app);
  const phone = aptPhoneNumber.replace(/[^0-9]/g, '');

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);

  const [allEvaluations, setAllEvaluations] = useState(initialEvalutions);

  const evaluations = allEvaluations[isSniffles ? 'sniffles' : 'covid'];

  const [testingDocuments, setTestingDocuments] = useState();
  const [imagingDocuments, setImagingDocuments] = useState();

  const analyticsName = isSniffles ? 'ProfileSnifflesCarePlan' : 'ProfileLCOVIDCarePlan';

  let titleConsultation = t('profile.carePlan.longCovidConsultation');
  if (isSniffles) titleConsultation = t('profile.carePlan.snifflesCosultation');

  const fetchDocuments = useCallback(() => {
    dispatch(getOtherDocuments({ userId: selectedUuid, purpose }))
      .unwrap()
      .then((data) => {
        const testingDoc = [];
        const imagingDoc = [];

        data.forEach((doc) => {
          if (doc.document_type === 'testing') {
            testingDoc.push(doc);
          } else if (doc.document_type === 'imaging') {
            imagingDoc.push(doc);
          }
        });

        setTestingDocuments(testingDoc);
        setImagingDocuments(imagingDoc);
      });
  }, [dispatch, selectedUuid, purpose]);

  const fetchEvaluations = useCallback(() => {
    dispatch(getUserMedicationRequests({ userId: selectedUuid }))
      .unwrap()
      .then((data) => {
        const sortedData = data?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));

        const snifflesEvaluations = sortedData?.filter((item) => item?.purpose === 'sniffles');
        const covidEvaluations = sortedData?.filter((item) =>
          covidTreatmentPurposes.includes(item?.purpose)
        );

        setAllEvaluations({
          sniffles: snifflesEvaluations,
          covid: covidEvaluations,
        });
      });
  }, [dispatch, selectedUuid]);

  const fetchAppointments = useCallback(() => {
    setAllEvaluations(initialEvalutions);
    let paramsPurpose = 'consultation';
    if (isSniffles) paramsPurpose = 'sniffles_consultation';

    dispatch(getUserAppointment({ userId: selectedUuid, purpose: paramsPurpose }))
      .unwrap()
      .then((data) => {
        const upcomingAppts = data.appointments.filter(
          (appt) =>
            appt?.live_session?.data?.session_purpose === paramsPurpose &&
            ['scheduled'].includes(appt?.status)
        );

        setUpcomingAppointments(upcomingAppts);

        const completedAppts = data.appointments.filter(
          (appt) =>
            appt?.live_session?.data?.session_purpose === paramsPurpose &&
            ['completed'].includes(appt?.status)
        );

        setCompletedAppointments(completedAppts);
      });
  }, [isSniffles, dispatch, selectedUuid]);

  const fetchAllData = useCallback(() => {
    Promise.all([fetchDocuments(), fetchEvaluations(), fetchAppointments()]);
  }, [fetchAppointments, fetchDocuments, fetchEvaluations]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    LogEvent(`${analyticsName}_screen`);
  }, [analyticsName]);

  const handleRightClick = () => {
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          LogEvent(`${analyticsName}_click_Close`);
          if (from === 'zoomViewer') {
            dispatch(
              setShowReviewScreen(
                purpose?.includes('sniffles') ? 'snifflesTelehealth' : 'longCovidTelehealth'
              )
            );
          } else if (from === 'MedicationFlow') {
            dispatch(setShowTooltip(true));
          }
          resetToDashboard(navigation);
        },
      },
      {
        text: t('yesNo.No'),
        style: 'cancel',
      },
    ]);
  };

  const goBack = () => {
    LogEvent(`${analyticsName}_click_Back`);
    navigation.goBack();
  };

  const onPressChangeAppointment = () => {
    if (upcomingAppointments.length) {
      LogEvent(`${analyticsName}_click_Change`);
    } else {
      LogEvent(`${analyticsName}_click_Request`);
    }
    Linking.openURL(`tel:${phone}`);
  };

  const onPressPastConsultations = () => {
    LogEvent(`${analyticsName}_click_Past`);
    const navigationPurpose = isSniffles ? 'sniffles_consultation' : 'consultation';
    navigation.navigate('PastConsultations', { userId: selectedUuid, purpose: navigationPurpose });
  };

  const renderAppointments = () => {
    if (upcomingAppointments.length) {
      return (
        <>
          {upcomingAppointments.map((appt) => (
            <Text style={styles.dateText}>
              {iso8601ToFormatted(appt.scheduled_time, formats.fullLongDate)}
            </Text>
          ))}
          <TouchableOpacity onPress={onPressChangeAppointment}>
            <Text style={styles.blueButtonText}>{t(`${translationPath}.changeAppointment`)}</Text>
          </TouchableOpacity>
        </>
      );
    }
    return (
      <>
        <Text style={styles.consultTypeText}>{t(`${translationPath}.noAppointment`)}</Text>
        <TouchableOpacity
          onPress={() => {
            LogEvent(`${analyticsName}_click_Request`);
            Linking.openURL(`tel:${aptPhoneNumber}`);
          }}
        >
          <Text style={[styles.blueButtonText, { paddingBottom: 8 }]}>
            {t('profile.carePlan.requestAppointment')}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const VisualConsultCard = () => {
    if (upcomingAppointments?.length || completedAppointments?.length) {
      return (
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Text style={styles.headerTitle}>{t(`${translationPath}.virtualConsultation`)}</Text>
            <View style={styles.iconWrapper}>
              <Icon type='MaterialIcons' name='favorite' size={16} isGradient />
            </View>
          </View>
          <View style={styles.innerBox}>
            <Text style={styles.upcomingText}>
              {upcomingAppointments?.length
                ? titleConsultation
                : t('profile.carePlan.upcomingVisit')}
            </Text>
            {renderAppointments()}
          </View>
          <TouchableOpacity onPress={onPressPastConsultations}>
            <Text style={styles.blueButtonText}>{t('profile.carePlan.pastConsultaion.title')}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const MedicationCard = () => (
    <View style={styles.item}>
      <View style={[styles.itemHeader, { marginBottom: 24 }]}>
        <Text style={styles.headerTitle}>{t(`${translationPath}.medications.title`)}</Text>
        <View style={styles.iconWrapper}>
          <MedicationIcon />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          LogEvent(`${analyticsName}_click_Meds`);
          navigation.navigate('PrescriptionList');
        }}
      >
        <Text style={styles.blueButtonText}>
          {t(`${translationPath}.medications.viewPrescriptions`)}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const ModuleSection = ({ title, icon, data }) =>
    data?.length > 0 && (
      <View style={styles.item}>
        <View style={styles.moduleHeader}>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.iconWrapper}>{icon}</View>
        </View>
        {data?.length === 0 ? (
          <Text style={styles.noDocument}>{t(`${translationPath}.noDocument`)}</Text>
        ) : null}
        {data &&
          data?.map((item) => (
            <View
              key={item.uuid}
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}
            >
              <Text style={styles.dateText}>
                {item.created_at ? iso8601ToFormatted(item.created_at, formats.fullLongDate) : null}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  LogEvent(`${analyticsName}_click_${title}`);
                  onViewDetails(item);
                }}
              >
                <Text style={styles.blueButtonText}>{t(`${translationPath}.viewDetails`)}</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    );

  const onViewDetailsTreatment = () => {
    LogEvent(`${analyticsName}_click_TreatDet`);
    navigation.navigate('TreatmentEvalutions', { evaluation: evaluations[0] });
  };

  const onPressPastEvaluations = () => {
    LogEvent(`${analyticsName}_click_TreatPast`);
    const isLastInMonth =
      evaluations?.length > 0 && getDifferenceInMonths(evaluations[0].created_at) === 0;

    navigation.navigate('PastEvaluations', {
      purpose,
      evaluations: isLastInMonth ? evaluations.slice(1) : evaluations || [],
    });
  };

  const TreatmentEvaluationCard = () => {
    if (evaluations?.length > 0) {
      const firstEvaluation =
        getDifferenceInMonths(evaluations[0].created_at) === 0 ? evaluations[0] : null;

      const observations =
        firstEvaluation && firstEvaluation?.meta?.provider_prescribing_reasons
          ? firstEvaluation?.meta?.provider_prescribing_reasons
              .filter((e) => e.type === 'observation')
              .map((e) => e.subtype)
              .join(', ')
          : null;

      const snifflesTreatmentText = t(
        `${translationPath}.treatmentEvaluation.treatmentForSniffles`,
        { observations: observations ? `for ${observations}` : '' }
      );
      const treatmentText = covidTreatmentPurposes.includes(firstEvaluation?.purpose)
        ? t(`${translationPath}.treatmentEvaluation.treatmentForCovid`)
        : snifflesTreatmentText;

      return (
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Text style={styles.headerTitle}>
              {t(`${translationPath}.treatmentEvaluation.title`)}
            </Text>
            <View style={styles.iconWrapper}>
              <Icon type='MaterialIcons' name='playlist-add-check' size={16} isGradient />
            </View>
          </View>
          <View style={styles.innerBox}>
            <Text style={styles.upcomingText}>
              {t(`${translationPath}.treatmentEvaluation.recent`)}
            </Text>

            {firstEvaluation ? (
              <>
                <View style={styles.treatment}>
                  <Text style={styles.treatmentText}>{treatmentText}</Text>
                  <Text style={styles.statusText}>
                    {firstCharToUpperCase(statusText[firstEvaluation?.status])}
                  </Text>
                </View>
                <Text style={styles.dateText}>
                  {iso8601ToFormatted(firstEvaluation?.created_at, formats?.fullLongDate)}
                </Text>
                <TouchableOpacity onPress={onViewDetailsTreatment}>
                  <Text style={styles.blueButtonText}>{t(`${translationPath}.viewDetails`)}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.consultTypeText}>
                {t(`${translationPath}.treatmentEvaluation.noEvaluations`)}
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={onPressPastEvaluations}>
            <Text style={styles.blueButtonText}>
              {t(`${translationPath}.treatmentEvaluation.past`)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const onViewDetails = (item) => {
    const doc = item.media[0];
    doc.uri = doc.url;
    navigation.navigate('FilePreview', {
      media: doc,
      header: ' ',
    });
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.conitaner}>
      <HeaderComp
        center={[
          t(isSniffles ? 'profile.carePlan.snifflesTitle' : 'profile.carePlan.covidTitle'),
          styles.headerTitle,
        ]}
        addStyle={styles.header}
        left='arrow'
        onLeftClick={goBack}
        right={[<CloseIcon width={14} height={14} />, handleRightClick]}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <PickerDropdown
          value={selectedUuid}
          style={styles.picker}
          items={pickerUsers}
          onChange={(value) => {
            setSelectedUuid(value);
          }}
          allowEmpty={false}
        />
        <VisualConsultCard />
        <TreatmentEvaluationCard />
        <ModuleSection
          title={t(`${translationPath}.testing`)}
          icon={<Icon type='MaterialIcons' name='science' size={16} isGradient />}
          data={testingDocuments}
        />
        <ModuleSection
          title={t(`${translationPath}.imaging`)}
          icon={<Icon type='MaterialIcons' name='gradient' size={16} isGradient />}
          data={imagingDocuments}
        />
        <MedicationCard />
      </ScrollView>
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
  picker: {
    marginHorizontal: 24,
  },
  item: {
    marginHorizontal: 24,
    borderColor: colors.greyExtraLight2,
    borderRadius: 16,
    justifyContent: 'center',
    marginVertical: hp('1%'),
    backgroundColor: colors.white,
    padding: 24,
    borderWidth: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderColor: colors.greyExtraLight2,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: colors.primaryPavement,
    borderRadius: 6,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    paddingVertical: 16,
    borderColor: colors.greyExtraLight2,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  upcomingText: {
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.greyWhite2,
    fontFamily: 'Museo_900',
  },
  consultTypeText: {
    fontSize: 14,
    lineHeight: 17,
    color: colors.greyDark2,
    fontFamily: 'Museo_500',
    marginTop: 10,
  },
  dateText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    marginTop: 5,
  },
  blueButtonText: {
    fontSize: 14,
    lineHeight: 17,
    color: colors.primaryBlue,
    fontFamily: 'Museo_700',
    marginTop: 5,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.greyExtraLight2,
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 16,
  },
  noDocument: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyGrey,
    fontFamily: 'Museo_500',
    marginTop: 5,
  },
  treatment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    lineHeight: 17,
    color: colors.greyWhite2,
    fontFamily: 'Museo_700',
  },
  treatmentText: {
    maxWidth: 180,
    fontSize: 14,
    lineHeight: 17,
    color: colors.greyDark2,
    fontFamily: 'Museo_500',
  },
  subtitleItalic: {
    fontFamily: 'Museo_500_Italic',
    fontSize: 13,
    lineHeight: 17,
    marginVertical: 7,
    marginBottom: 14,
    color: colors.greyDark4,
  },
});

export default CarePlan;
