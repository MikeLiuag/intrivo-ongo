import React from 'react';
import { useTranslation } from 'react-i18next';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';
import BinaryChoiceForm from '../../../../components/BinaryChoiceForm';

const Question2 = ({ onChangeState, isMedications }) => {
  const { t } = useTranslation();
  const options = [t('yesNo.Yes'), t('yesNo.No')];

  const choosedOption = () => {
    if (isMedications !== null) {
      return isMedications ? options[0] : options[1];
    }
    return null;
  };

  const onSelectOption = (value, fieldName) => {
    onChangeState(value === options[0], fieldName);
  };

  console.log(isMedications, 'isMedications');

  return (
    <>
      <BinaryChoiceForm
        options={options}
        choosedOption={choosedOption()}
        onSelectOption={onSelectOption}
        fieldName={snifflesFieldNames.IS_MEDICATIONS}
      />
    </>
  );
};

export default Question2;
