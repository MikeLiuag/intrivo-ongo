import React from 'react';
import { useTranslation } from 'react-i18next';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';
import BinaryChoiceForm from '../../../../components/BinaryChoiceForm';

const Question3 = ({ onChangeState, isAllergic }) => {
  const { t } = useTranslation();
  const options = [t('yesNo.Yes'), t('yesNo.No')];

  const choosedOption = () => {
    if (isAllergic !== null) {
      return isAllergic ? options[0] : options[1];
    }
    return null;
  };

  const onSelectOption = (value, fieldName) => {
    onChangeState(value === options[0], fieldName);
  };

  return (
    <>
      <BinaryChoiceForm
        options={options}
        choosedOption={choosedOption()}
        onSelectOption={onSelectOption}
        fieldName={snifflesFieldNames.IS_ALLERGIC}
      />
    </>
  );
};

export default Question3;
