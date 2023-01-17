import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../theme';
import { iso8601ToFormatted } from '../../utilis/dateTime';
import CompletedScreen from '../../components/CompletedScreen';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import { parseHtmlForTags } from '../../helpers/functions';
import { clearSelections, sendMedicationRequest } from '../../store/paxlovid/slice';
import { fetchObservations } from '../../store/user/slice';
import { dimensions } from './styles';
import { fonts } from '../../theme/fonts';
import { LogEvent } from '../../analytics';
import { resetToCarePlan } from '../../utilis/navigationHelper';

const DATE_FORMAT = 'MMM. dd, yyyy';

const EligibilityFormReview = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isCompletedModalVisible, setCompletedModalVisible] = React.useState(false);
  const medicationRequest = React.useRef();
  const {
    eligibilityFormUserInfo,
    vaccinated,
    boosted,
    selectedMedications,
    selectedRiskFactors,
    selectedPharmacy,
    sexAtBirth,
    breastFeeding,
    selectedAllergies,
    uuid,
  } = useSelector((state) => state.paxlovid);
  console.log(uuid, '---uuid');
  const fullName = `${eligibilityFormUserInfo.firstName} ${eligibilityFormUserInfo.lastName}`;
  const birthday = iso8601ToFormatted(eligibilityFormUserInfo.dob, DATE_FORMAT);
  const { email, phone } = eligibilityFormUserInfo;
  const heightDisplay = `${parseInt(eligibilityFormUserInfo.height / 12, 10)}ft ${
    eligibilityFormUserInfo.height % 12
  }in`;
  const weightDisplay = `${eligibilityFormUserInfo.weight}lbs`;
  const address = `${eligibilityFormUserInfo.address_1} ${eligibilityFormUserInfo.address_2 || ''}`;

  useEffect(() => {
    LogEvent('PE_Review_screen');
    // navigation.addListener('beforeRemove', (e) => {
    //   if (isCompletedModalVisible) {
    //     e.preventDefault();
    //     setCompletedModalVisible(false);
    //   }
    // });
  }, []);

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Review_Click_Close');
  };

  const onBack = () => LogEvent('PE_Review_Click_Back');

  const onModalClose = () => {
    LogEvent('PE_Submitsuccess_Click_Close');
    setCompletedModalVisible(false);
    if (medicationRequest.current) {
      resetToCarePlan(navigation, { from: 'EligibilityFormReview', purpose: 'long_covid' });
    } else {
      navigation.navigate('Dashboard');
    }
    dispatch(clearSelections());
  };

  const onPressNext = async () => {
    LogEvent('PE_Review_Click_Submit');
    dispatch(sendMedicationRequest())
      .unwrap()
      .then((result) => {
        LogEvent('PE_Submitsuccess_screen');
        medicationRequest.current = result;
        dispatch(fetchObservations());
        setCompletedModalVisible(true);
      });
  };

  const renderHtmlRow = (displayKey, value) => (
    <Text style={styles.sectionText}>
      {parseHtmlForTags(`${displayKey} ${value}`).map((e) =>
        React.createElement(Text, { style: e.style }, e.child)
      )}
    </Text>
  );

  const getVaccinationStatusDisplayText = (fullyVaccinated, boosterVaccinated) => {
    if (fullyVaccinated && boosterVaccinated) {
      return t('paxlovid.review.statusFullyVaccinatedBooster');
    }
    if (fullyVaccinated) {
      return t('paxlovid.review.statusFullyVaccinated');
    }
    return t('paxlovid.review.statusNotVaccinated');
  };

  const emptySection = <Text style={styles.sectionText}>{t('paxlovid.review.none')}</Text>;

  const renderSymptomsList = (symptoms) =>
    symptoms?.map((s) =>
      React.createElement(Text, { style: styles.sectionText }, ` \u2022 ${s.displayName}`)
    );

  const renderCombinedList = (list) => {
    if (list.length === 0) {
      return emptySection;
    }
    return (
      <Text style={styles.sectionText}>{list.map((e) => e?.displayName || e).join(', ')}</Text>
    );
  };

  const renderPharmacy = (pharmacy) =>
    pharmacy && (
      <>
        <Text style={{ ...styles.sectionText, fontFamily: fonts.familyBold }}>{pharmacy.name}</Text>
        <Text style={styles.sectionText}>{pharmacy.address_line_1}</Text>
        {pharmacy.address_line_1 && pharmacy.address_line_2.length > 2 && (
          <Text style={styles.sectionText}>{pharmacy.address2}</Text>
        )}
        <Text
          style={styles.sectionText}
        >{`${pharmacy.city}, ${pharmacy.state} ${pharmacy.zipcode}`}</Text>
      </>
    );

  return (
    <PaxFlowWrapper
      headerTitle='paxlovid.review.reviewTitle'
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      onPressButton={onPressNext}
      buttonTitle='paxlovid.review.submit'
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('paxlovid.review.title')}</Text>
        <Text style={styles.sectionTitle}>{t('paxlovid.review.patientInformationTitle')}</Text>
        {renderHtmlRow(t('paxlovid.review.name'), fullName)}
        {renderHtmlRow(t('paxlovid.review.birthday'), birthday)}
        {renderHtmlRow(t('paxlovid.review.email'), email)}
        {renderHtmlRow(t('paxlovid.review.phone'), phone)}
        {renderHtmlRow(t('paxlovid.review.height'), heightDisplay)}
        {renderHtmlRow(t('paxlovid.review.weight'), weightDisplay)}
        {renderHtmlRow(t('paxlovid.review.address'), address)}
        {renderHtmlRow(t('paxlovid.review.city'), eligibilityFormUserInfo.city)}
        {renderHtmlRow(t('paxlovid.review.state'), eligibilityFormUserInfo.state_id)}
        {renderHtmlRow(t('paxlovid.review.gender'), sexAtBirth)}
        {breastFeeding &&
          renderHtmlRow(
            t('paxlovid.review.pregnancy'),
            breastFeeding.status ? 'Pregnant' : 'Not Pregnant'
          )}
        {breastFeeding &&
          breastFeeding.date &&
          renderHtmlRow(
            t('paxlovid.review.menstrualPeriod'),
            iso8601ToFormatted(breastFeeding.date, DATE_FORMAT)
          )}
        <Divider orientation='horizontal' color={colors.greyGrey} style={styles.divier} />

        <Text style={styles.sectionTitle}>{t('paxlovid.review.symptomsTitle')}</Text>
        <View style={styles.symptoms}>{renderSymptomsList(eligibilityFormUserInfo.symptoms)}</View>
        {renderHtmlRow(
          t('paxlovid.review.dateSymptomsBegan'),
          iso8601ToFormatted(eligibilityFormUserInfo.symptomsBeginDate, DATE_FORMAT)
        )}
        {renderHtmlRow(
          t('paxlovid.review.dateLastPositive'),
          iso8601ToFormatted(eligibilityFormUserInfo.lastPositiveDate, DATE_FORMAT)
        )}
        <Text style={{ ...styles.sectionText, fontFamily: 'Museo_300_Italic', marginTop: 20 }}>
          {t('paxlovid.review.symptomsNote')}
        </Text>

        <Divider orientation='horizontal' color={colors.greyGrey} style={styles.divier} />

        <Text style={styles.sectionTitle}>{t('paxlovid.review.vaccinationStatusTitle')}</Text>
        <Text style={styles.sectionText}>
          {getVaccinationStatusDisplayText(vaccinated === 'Yes', boosted === 'Yes')}
        </Text>

        <Divider orientation='horizontal' color={colors.greyGrey} style={styles.divier} />

        <Text style={styles.sectionTitle}>{t('paxlovid.review.medicationsTitle')}</Text>
        {renderCombinedList(selectedMedications)}

        <Divider orientation='horizontal' color={colors.greyGrey} style={styles.divier} />

        <Text style={styles.sectionTitle}>{t('paxlovid.review.allergiesMedication')}</Text>
        {renderCombinedList(selectedAllergies)}

        <Divider orientation='horizontal' color={colors.greyGrey} style={styles.divier} />

        <Text style={styles.sectionTitle}>{t('paxlovid.review.riskFactorsTitle')}</Text>
        {renderCombinedList(selectedRiskFactors)}

        <Text style={styles.sectionTitle}>{t('paxlovid.review.preferredPharmacyTitle')}</Text>
        {renderPharmacy(selectedPharmacy)}
      </ScrollView>
      {isCompletedModalVisible && (
        <CompletedScreen
          title={t('paxlovid.review.submitSuccess')}
          descr={t('paxlovid.review.submitSuccessDescription')}
          animated
          result={2}
          background
          onClose={onModalClose}
        />
      )}
    </PaxFlowWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: dimensions.pageMarginHorizontal,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontFamily: fonts.familyBold,
    color: colors.black,
  },
  sectionTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyMidnight,
    marginVertical: 20,
  },
  sectionText: {
    fontSize: dimensions.fontNormal,
    fontFamily: fonts.familyLight,
    color: colors.greyDark,
    lineHeight: 22,
  },
  symptoms: {
    marginBottom: 20,
  },
  divier: {
    marginTop: 20,
  },
});

export default EligibilityFormReview;
