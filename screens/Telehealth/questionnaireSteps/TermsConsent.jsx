import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AgreementCheck from '../../../components/AgreementCheck';

const TermsConsent = ({ termsAndConditionsAccepted, isDependent, isMinor, onChangeState }) => {
  const { t } = useTranslation();
  const { paxlovidTerms } = useSelector(({ app }) => app);
  const postScrollText =
    isDependent && isMinor
      ? 'screens.telehealth.termsAndConditions.checkboxLabelDependent'
      : 'warning.CheckBoxText';

  return (
    <AgreementCheck
      style={styles.content}
      agreementText={paxlovidTerms}
      preScrollText={t('warning.Scroll')}
      postScrollText={t(postScrollText)}
      isChecked={termsAndConditionsAccepted}
      onChecked={(checked) => onChangeState(checked, 'termsAndConditionsAccepted')}
    />
  );
};

export default TermsConsent;

const styles = StyleSheet.create({
  content: {
    marginTop: -16,
    marginBottom: 16,
  },
});
