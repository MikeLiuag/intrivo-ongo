import React from 'react';
import { useTranslation } from 'react-i18next';
import BinaryChoiceForm from '../../../components/BinaryChoiceForm';
import { snifflesFieldNames } from '../../../store/sniffles/slice';

const SoreThroat = ({ onChangeState, soreThroat }) => {
  const { t } = useTranslation();
  const options = [t('yesNo.Yes'), t('yesNo.No')];

  const choosedOption = () => {
    if (soreThroat !== null) {
      return soreThroat ? options[0] : options[1];
    }
    return null;
  };

  const onSelectOption = (value, fieldName) => {
    onChangeState(value === options[0], fieldName);
  };

  return (
    <>
      <BinaryChoiceForm
        choosedOption={choosedOption()}
        onSelectOption={onSelectOption}
        fieldName={snifflesFieldNames.SORE_THROAT}
      />
    </>
  );
};

export default SoreThroat;
