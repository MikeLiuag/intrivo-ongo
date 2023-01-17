import React from 'react';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';
import BinaryChoiceForm from '../../components/BinaryChoiceForm';

const MedicationRespiratoryStatus = ({ onChangeState, isHospitalized }) => {
  const choosedOption = () => {
    if (isHospitalized !== null) {
      return isHospitalized;
    }
    return null;
  };

  const onSelectOption = (value, fieldName) => {
    onChangeState(value, fieldName);
  };

  return (
    <>
      <BinaryChoiceForm
        choosedOption={choosedOption()}
        onSelectOption={onSelectOption}
        fieldName={snifflesFieldNames.IS_HOSPITALIZED}
      />
    </>
  );
};

export default MedicationRespiratoryStatus;
