import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import ReviewDetails from '../../../../components/ReviewDetails';
import { formats, iso8601ToFormatted } from '../../../../utilis/dateTime';
import { LogEvent } from '../../../../analytics';
import { states } from '../../../../utilis/mock';

const translationPath = 'screens.sniffles.snifflesTelehealth.review';

const ReviewSnifflesTelehealthDetails = ({
  userInfo: {
    firstName,
    lastName,
    dob,
    height,
    weight,
    email,
    phoneNumber,
    state_id: stateId,
    address_1: address1,
    address_2: address2,
    city: userCity,
    zipcode: userZipcode,
  },
  sexAtBirth,
  symptoms,
  diagnosis,
  riskFactors,
  activeMedications,
  allergicMedications,
  isSmoke,
  isTobacco,
  isAlcohol,
  healthProblems,
  selectedPharmacy: {
    name = '',
    address_line_1: addressLine1 = '',
    address_line_2: addressLine2 = '',
    city = '',
    country = '',
    zipcode = '',
  } = {},
  onChangeState,
}) => {
  const { t } = useTranslation();
  const address = `${address1} ${address2 || ''} ${userCity || ''}, ${stateId} ${
    userZipcode || ''
  }`;
  const generateArrayOrNone = (array) =>
    array?.length ? array.join(', ') : t(`${translationPath}.none`);
  const data = [
    {
      title: t(`${translationPath}.userInfo.title`),
      data: [
        { label: t(`${translationPath}.userInfo.name`), value: `${firstName} ${lastName}` },
        {
          label: t(`${translationPath}.userInfo.birthday`),
          value: iso8601ToFormatted(dob, formats.longDateWithFullMonth),
        },
        {
          label: t(`${translationPath}.userInfo.height`),
          value: `${parseInt(height / 12, 10)}ft ${parseInt(height % 12, 10)}in`,
        },
        { label: t(`${translationPath}.userInfo.weight`), value: `${weight}lbs` },
        {
          label: t(`${translationPath}.userInfo.address`),
          value: address,
        },
      ],
    },
    {
      title: t(`${translationPath}.contactInfo.title`),
      data: [
        { label: t(`${translationPath}.contactInfo.phone`), value: phoneNumber },
        { label: t(`${translationPath}.contactInfo.email`), value: email },
      ],
    },
    {
      title: t(`${translationPath}.visitLocation.title`),
      data: [
        {
          label: t(`${translationPath}.visitLocation.state`),
          value: `${states?.find((i) => i.value === stateId)?.label}`,
        },
      ],
    },
    {
      title: 'Medical Profile',
      data: [
        { label: t(`${translationPath}.sexAtBirth.title`), value: sexAtBirth },
        {
          label: t(`${translationPath}.riskFactors.title`),
          value: generateArrayOrNone(riskFactors?.map(({ displayName }) => displayName)),
        },
        {
          label: t(`${translationPath}.symptoms.title`),
          value: generateArrayOrNone(symptoms?.data?.map(({ displayName }) => displayName)),
        },
        {
          label: t(`${translationPath}.diagnosis.title`),
          value: generateArrayOrNone(diagnosis.map(({ displayName }) => displayName)),
        },
        {
          label: t(`${translationPath}.activeMedications.title`),
          value: generateArrayOrNone(activeMedications),
        },
        {
          label: t(`${translationPath}.allergicMedications.title`),
          value: generateArrayOrNone(allergicMedications),
        },
        {
          label: t(`${translationPath}.isSmoke.title`),
          value: isSmoke ? t('yesNo.Yes') : t('yesNo.No'),
        },
        {
          label: t(`${translationPath}.isTobacco.title`),
          value: isTobacco ? t('yesNo.Yes') : t('yesNo.No'),
        },
        {
          label: t(`${translationPath}.isAlcohol.title`),
          value: isAlcohol ? t('yesNo.Yes') : t('yesNo.No'),
        },
        {
          label: t(`${translationPath}.healthProblems.title`),
          value: generateArrayOrNone(healthProblems.map(({ displayName }) => displayName)),
        },
      ],
      isSeparated: true,
    },
    {
      title: t(`${translationPath}.selectedPharmacy.title`),
      data: [
        { label: '', value: name || '', isBold: true },
        {
          label: '',
          value: `${addressLine1 ? `${addressLine1}` : ''}`,
        },
        {
          label: '',
          value: `${addressLine2 ? `${addressLine2}` : ''}`,
        },
        {
          label: '',
          value: `${`${city}, ${country} ${zipcode}`}`,
        },
      ],
    },
  ];
  useEffect(() => {
    LogEvent('Sniffles_Virtual_Review_screen');
  }, []);
  const onPressSubmit = () => {
    onChangeState(null, null, true);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReviewDetails
        data={data}
        onPressButton={onPressSubmit}
        buttonTitle={t(`${translationPath}.button`)}
      />
    </ScrollView>
  );
};

export default ReviewSnifflesTelehealthDetails;
