import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';
import SingleChoiceForm from '../../components/SingleChoiceForm';

const translationPath = 'screens.medicationFlow';

const MedicationCodeCheck = ({ onChangeState, hasCode }) => {
  const { t } = useTranslation();
  const options = useMemo(
    () => [t(`${translationPath}.typical.yesNo.yes`), t(`${translationPath}.typical.yesNo.no`)],
    [t]
  );

  const choosedOption = () => {
    if (hasCode !== null) {
      return hasCode;
    }
    return null;
  };

  const onSelectOption = (value, fieldName) => {
    onChangeState(value, fieldName);
  };

  return (
    <SingleChoiceForm
      options={options}
      choosedOption={choosedOption()}
      onSelectOption={onSelectOption}
      fieldName={snifflesFieldNames.HAS_CODE}
    />
  );
};

export default MedicationCodeCheck;
