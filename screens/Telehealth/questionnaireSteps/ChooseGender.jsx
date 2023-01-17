import React from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceForm from '../components/SingleChoiceForm';

const translationPath = 'screens.telehealth.questions.sex';

const ChooseGender = ({ gender, onChangeState }) => {
  const { t } = useTranslation();

  const options = [
    t(`${translationPath}.option1`),
    t(`${translationPath}.option2`),
    t(`${translationPath}.option3`),
  ];

  return (
    <SingleChoiceForm
      fieldName='gender'
      options={options}
      choosedOption={gender}
      onSelectOption={onChangeState}
    />
  );
};

export default ChooseGender;
