import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import AgreementCheck from '../../../components/AgreementCheck';

const TermsConsent = ({ onChangeState, userInfo, userId }) => {
  const [isChecked, setIsChecked] = useState();

  const { t } = useTranslation();
  const {
    firebase: { snifflesPOCTermsConsent },
    user: { usersLookup },
  } = useSelector(({ app: { firebase }, user }) => ({
    firebase,
    user,
  }));

  const userDob = userInfo?.dob || usersLookup[userId]?.dob;

  const isUserAdult = new Date().getFullYear() - new Date(userDob).getFullYear() >= 18;
  const postScrollText = !isUserAdult
    ? 'screens.telehealth.termsAndConditions.checkboxLabelDependent'
    : 'warning.CheckBoxText';

  const onNextPress = async () => {
    onChangeState(null, null, true);
  };

  return (
    <>
      <AgreementCheck
        agreementText={snifflesPOCTermsConsent}
        style={styles.content}
        preScrollText={t('warning.Scroll')}
        postScrollText={t(postScrollText)}
        isChecked={isChecked}
        onChecked={(checked) => setIsChecked(checked)}
      />
      <BlueButton title='Next' disabled={!isChecked} action={onNextPress} />
    </>
  );
};

export default TermsConsent;

const styles = StyleSheet.create({
  content: {
    marginBottom: 20,
  },
});

const adultTerms = `For patients who are minors, a parent or legal guardian must be present during the patient’s visit. I understand the minor will not be seen without a parent or legal guardian present.`;
