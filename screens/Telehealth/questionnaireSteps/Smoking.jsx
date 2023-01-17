import React from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceForm from '../components/SingleChoiceForm';

const Smoking = ({ isSmoking, onChangeState }) => {
  const { t } = useTranslation();

  const options = [t('yesNo.Yes'), t('yesNo.No')];

  return (
    <SingleChoiceForm
      options={options}
      fieldName='isSmoking'
      choosedOption={isSmoking}
      onSelectOption={onChangeState}
    />
  );
};

export default Smoking;
