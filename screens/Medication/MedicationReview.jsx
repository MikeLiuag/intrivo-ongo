import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import ReviewDetails from '../../components/ReviewDetails';
import { formats, iso8601ToFormatted } from '../../utilis/dateTime';

const translationPath = 'screens.medicationFlow.review';

const MedicationReview = ({ onPressNext }) => {
  const { t } = useTranslation();
  const {
    userInfo: {
      firstName,
      lastName,
      dob,
      phoneNumber,
      email,
      height,
      weight,
      address_1: address1,
      address_2: address2,
      city: userCity,
      zipcode: userZipcode,
      state_id: stateId,
    },
    sexAtBirth,
    symptoms,
    exposedDiagnosis,
    activeMedications,
    allergicMedications,
    isHospitalized,
    selectedPharmacy,
  } = useSelector(({ medicationFlow }) => medicationFlow);
  const address = `${address1} ${address2 || ''} ${userCity || ''}, ${stateId} ${
    userZipcode || ''
  }`;

  const generateArrayOrNone = (array) =>
    array?.length ? array.join(', ') : t(`${translationPath}.none`);

  const data = [
    {
      title: t(`${translationPath}.patientInfo`),
      data: [
        { label: t(`${translationPath}.name`), value: `${firstName} ${lastName}` },
        {
          label: t(`${translationPath}.birthday`),
          value: iso8601ToFormatted(dob, formats.longDateWithFullMonth),
        },
        {
          label: t(`${translationPath}.height`),
          value: `${parseInt(height / 12, 10)}ft ${parseInt(height % 12, 10)}in`,
        },
        { label: t(`${translationPath}.weight`), value: `${weight}lbs` },
        {
          label: t(`${translationPath}.email`),
          value: email,
        },
        { label: t(`${translationPath}.phoneNumber`), value: phoneNumber },
        {
          label: t(`${translationPath}.address`),
          value: address,
        },
      ],
    },
    {
      title: 'Medical Profile',
      data: [
        { label: 'Gender: ', value: sexAtBirth },
        {
          label: t(`${translationPath}.symptoms`),
          value: generateArrayOrNone(
            symptoms?.map(({ displayName }) =>
              displayName === 'None of the above' ? 'None' : displayName
            )
          ),
        },
        {
          label: 'Exposure: ',
          value: generateArrayOrNone(
            exposedDiagnosis?.map(({ displayName }) =>
              displayName === 'None of the above' ? 'None' : displayName
            )
          ),
        },
        {
          label: t(`${translationPath}.activieMedications`),
          value: generateArrayOrNone(activeMedications),
        },
        {
          label: t(`${translationPath}.allergiesToMedications`),
          value: generateArrayOrNone(allergicMedications),
        },
        {
          label: t(`${translationPath}.pastRespiratoryIllnesses`),
          value: isHospitalized,
        },
      ],
      isSeparated: true,
    },
    {
      title: t(`${translationPath}.preferredPharmacy`),
      data: [
        { label: '', value: selectedPharmacy.name || '', isBold: true },
        {
          label: '',
          value: `${selectedPharmacy.addressLine1 ? `${selectedPharmacy.addressLine1}` : ''}`,
        },
        {
          label: '',
          value: `${selectedPharmacy.addressLine2 ? `${selectedPharmacy.addressLine2}` : ''}`,
        },
        {
          label: '',
          value: `${`${selectedPharmacy.city}, ${selectedPharmacy.country} ${selectedPharmacy.zipcode}`}`,
        },
      ],
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReviewDetails
        data={data}
        onPressButton={onPressNext}
        buttonTitle={t(`${translationPath}.button`)}
      />
    </ScrollView>
  );
};

export default MedicationReview;
