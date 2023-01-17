import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { useSelector } from 'react-redux';
import InputLeftLabel from '../../../components/InputLeftLabel';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import { snifflesFieldNames } from '../../../store/sniffles/slice';
import AlertNote from '../../../components/AlertNote';
import { fonts } from '../../../theme/fonts';
import { colors } from '../../../theme';

const ContactInfo = ({ onChangeState, contactInfo, userId }) => {
  const { t } = useTranslation();
  const [data, setData] = useState(contactInfo);
  const { email, phoneNumber } = data;
  const { users, usersLookup } = useSelector(({ user }) => user);

  const {
    email: primaryUserEmail,
    phone: { number: primaryUserPhoneNumber },
  } = usersLookup[users[0]];

  const isDependent = userId !== users[0];

  const validate = () => {
    if (isDependent) return true;

    const regex =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return !!phoneNumber && regex.test(email);
  };

  const onChange = (value, fieldName) => {
    setData((current) => ({
      ...current,
      [fieldName]: value,
    }));
  };

  const onPressButton = () => {
    const newContactInfo = isDependent
      ? { email: primaryUserEmail, phoneNumber: primaryUserPhoneNumber }
      : data;

    onChangeState(newContactInfo, snifflesFieldNames.CONTACT_INFO, true);
  };

  const renderPrimaryUserView = () => (
    <>
      <InputLeftLabel
        value={phoneNumber}
        textContentType='telephoneNumber'
        autoCompleteType='tel'
        keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'}
        placeholder={t('placeholder.phoneNumber')}
        action={(value) => onChange(value, 'phoneNumber')}
      />
      <InputLeftLabel
        value={email}
        autoCapitalize='none'
        keyboardType='email-address'
        placeholder={t('placeholder.email')}
        action={(value) => onChange(value, 'email')}
      />
    </>
  );

  const renderDependentView = () => (
    <>
      <AlertNote
        style={styles.noteContainer}
        textStyle={styles.noteText}
        text={t('screens.telehealth.patient.note')}
      />
      <Text style={styles.label}>
        {t('placeholder.phoneNumber')}:{' '}
        <Text style={{ fontFamily: fonts.familyLight }}>{primaryUserPhoneNumber}</Text>
      </Text>
      <Text style={styles.label}>
        {t('placeholder.email')}:{' '}
        <Text style={{ fontFamily: fonts.familyLight }}>{primaryUserEmail}</Text>
      </Text>
      <Text style={[styles.label, styles.infoText]}>
        {t('screens.telehealth.patient.info1')}{' '}
        <Text style={{ fontFamily: fonts.familyLight }}>
          {t('screens.telehealth.patient.info2')}
        </Text>
        <Text>{t('screens.telehealth.patient.info3')}</Text>
      </Text>
    </>
  );

  const renderContent = () => (isDependent ? renderDependentView : renderPrimaryUserView)();

  return (
    <>
      <View style={styles.container}>{renderContent()}</View>
      <BlueButton
        title='Next'
        style={styles.button}
        disabled={!validate()}
        action={onPressButton}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginBottom: 20,
  },
  label: {
    fontFamily: fonts.familyBold,
    color: colors.greyDark,
    lineHeight: 22,
  },
  noteContainer: {
    marginTop: 15,
    marginBottom: 28,
  },
  noteText: {
    fontFamily: fonts.familyLight,
  },
  infoText: {
    textAlign: 'center',
    marginTop: '13%',
  },
});

export default ContactInfo;
