import React from 'react';
import { ScrollView } from 'react-native';
import MultiChoiceForm from '../../../Medication/components/MultiChoiceForm';
import { DIAGNOSIS } from './constants';

const MedicationExposedDiagnosis = ({ onChangeState, diagnosis = [] }) => {
  const onDataChange = (value, fieldName) => onChangeState(value, fieldName);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MultiChoiceForm
        options={DIAGNOSIS}
        selectedOptions={diagnosis}
        onSelectOption={(value) => onDataChange(value, 'diagnosis')}
        buttonType='chips'
      />
    </ScrollView>
  );
};

export default MedicationExposedDiagnosis;
