import React from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceForm from '../components/SingleChoiceForm';

const Smoking = ({ isUsingTobaccoProducts, onChangeState }) => {
  const { t } = useTranslation();

  const options = [t('yesNo.Yes'), t('yesNo.No')];

  return (
    <SingleChoiceForm
      options={options}
      fieldName='isUsingTobaccoProducts'
      choosedOption={isUsingTobaccoProducts}
      onSelectOption={onChangeState}
    />
  );
};

export default Smoking;
