import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';
import { formats, iso8601ToFormatted } from '../../utilis/dateTime';
import { clearLongCovid, createAppointmentRequest } from '../../store/longCovid/slice';
import CompletedScreen from '../../components/CompletedScreen';
import { LogEvent } from '../../analytics';
import { getStateNameByStateId } from '../../utilis/helpers';
import ScreenWrapper from '../ScreenWrapper';
import { resetToDashboard } from '../../utilis/navigationHelper';

const translationPath = 'screens.telehealth.review';

function TelehealthReview() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { goBack, navigate } = navigation;
  const { t } = useTranslation();
  const {
    userInfo: { firstName: userFirstName, lastName: userLastName, dob, phoneNumber, email },
    gender,
    symptoms,
    diseases,
    sickAreas,
    isSmoking,
    stateId,
    isPayedByInsurance,
    isConsumingAlcohol,
    isUsingTobaccoProducts,
    insuranceInfo: { memberId, insuranceName, firstName, lastName, relationship },
  } = useSelector(({ longCovid }) => longCovid);

  const getArrayValue = (array) =>
    array?.length ? array.join(', ') : t(`${translationPath}.none`);

  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);

  useEffect(() => {
    LogEvent('LCOVID_Virtual_Review_screen');
  }, []);

  const handleClose = () => {
    LogEvent('LCOVID_Virtual_Review_click_Close');
    navigate('Dashboard');
    dispatch(clearLongCovid());
  };

  const onPressSubmit = () => {
    LogEvent('LCOVID_Virtual_Review_click_Submit');
    dispatch(
      createAppointmentRequest({
        gender: {
          from: t('screens.telehealth.questions.sex.option3'),
          to: 'other',
        },
      })
    )
      .unwrap()
      .then(() => {
        setIsCompletedModalVisible(true);
      });
  };

  const onModalClose = () => {
    LogEvent('LCOVID_Virtual_Confirmation_click_Close');
    setIsCompletedModalVisible(false);
    resetToDashboard(navigation);
    dispatch(clearLongCovid());
  };

  <Text style={[styles.noteText, { fontWeight: '400' }]}>
    {t('screens.telehealth.note')}
    <Text>{t('screens.telehealth.description')}</Text>
  </Text>;

  const Section = ({ title, info = [] }) => (
    <View style={styles.section}>
      <Text style={styles.title}>{t(translationPath + title)}</Text>
      {info.map(({ label, value }) => (
        <Text style={styles.label}>
          {t(translationPath + label)}
          {': '}
          <Text style={{ fontFamily: fonts.familyLight }}>{value}</Text>
        </Text>
      ))}
    </View>
  );

  const renderPaymentInfo = () =>
    isPayedByInsurance ? (
      <Section
        title='.paymentInformation'
        info={[
          { label: '.providerName', value: insuranceName },
          { label: '.firstName', value: firstName },
          { label: '.lastName', value: lastName },
          { label: '.relationship', value: relationship },
          { label: '.id', value: memberId },
        ]}
      />
    ) : (
      <View style={[styles.section, styles.cashPayContainer]}>
        <Text style={styles.title}>{t(`${translationPath}.paymentInformation`)}</Text>
        <Text style={[styles.label, { fontFamily: fonts.familyLight }]}>
          {t(`${translationPath}.cashPay`)}
        </Text>
      </View>
    );

  if (isCompletedModalVisible) {
    LogEvent('LCOVID_Virtual_Confirmation_screen');
    return (
      <CompletedScreen
        title={t(`${translationPath}.allSet`)}
        descr={t(`${translationPath}.successMessage`)}
        visible={isCompletedModalVisible}
        result={2}
        background
        animated
        onClose={onModalClose}
        buttonTitle={t(`${translationPath}.gotIt`)}
        onPressButton={onModalClose}
      />
    );
  }

  return (
    <ScreenWrapper onBack={goBack} onExit={handleClose} title={t(`${translationPath}.header`)}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.caption}>{t('paxlovid.review.title')}</Text>
          <Section
            title='.patientInfo'
            info={[
              { label: '.name', value: `${userFirstName} ${userLastName}` },
              {
                label: '.birthday',
                value: iso8601ToFormatted(dob, formats.fullLongDate),
              },
            ]}
          />
          <Section
            title='.contactInfo'
            info={[
              { label: '.number', value: phoneNumber },
              {
                label: '.email',
                value: email,
              },
            ]}
          />
          <Section
            title='.visitLocation'
            info={[{ label: '.state', value: getStateNameByStateId(stateId) }]}
          />
          <Section
            title='.medicalProfileTitle'
            info={[
              { label: '.sex', value: gender },
              {
                label: '.conditions',
                value: getArrayValue(symptoms),
              },
              { label: '.smoker', value: isSmoking === 'Yes' ? t('yesNo.Yes') : t('yesNo.No') },
              {
                label: '.otherTobacco',
                value: isUsingTobaccoProducts === 'Yes' ? t('yesNo.Yes') : t('yesNo.No'),
              },
              {
                label: '.alcohol',
                value: isConsumingAlcohol === 'Yes' ? t('yesNo.Yes') : t('yesNo.No'),
              },
              {
                label: '.conditionsInLastMonths',
                value: getArrayValue(diseases),
              },
              { label: '.concernsInLastMonths', value: getArrayValue(sickAreas) },
            ]}
          />
          {renderPaymentInfo()}
        </View>
        <Text style={[styles.noteText, { fontWeight: '400' }]}>
          <Text>{t('screens.telehealth.review.description')}</Text>
        </Text>
        <BlueButton
          title={t(`${translationPath}.button`)}
          style={styles.button}
          action={onPressSubmit}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

export default TelehealthReview;

const styles = StyleSheet.create({
  caption: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    lineHeight: 36,
    color: colors.black,
    paddingTop: 15,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  section: {
    borderBottomWidth: 1,
    borderColor: colors.greyLight,
    paddingVertical: 24,
  },
  label: {
    fontFamily: fonts.familyBold,
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 20,
    color: colors.greyMidnight,
    marginBottom: 20,
  },
  noteText: {
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 22,
    color: colors.greyDark,
    fontWeight: '300',
    marginTop: 20,
    marginHorizontal: 24,
    marginBottom: 35,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  cashPayContainer: {
    borderBottomWidth: 0,
  },
});
