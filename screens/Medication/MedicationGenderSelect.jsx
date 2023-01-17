import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';
import SingleChoiceForm from '../../components/SingleChoiceForm';

const translationPath = 'screens.medicationFlow';

const MedicationGenderSelect = ({ onChangeState, sexAtBirth }) => {
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      t(`${translationPath}.genderSelect.options.0`),
      t(`${translationPath}.genderSelect.options.1`),
      t(`${translationPath}.genderSelect.options.2`),
    ],
    [t]
  );

  const choosedOption = () => {
    if (sexAtBirth !== null) {
      return sexAtBirth;
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
      fieldName={snifflesFieldNames.SEX_AT_BIRTH}
    />
  );
};

export default MedicationGenderSelect;
