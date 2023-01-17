import React from 'react';
import { ScrollView } from 'react-native';
import MultiChoiceForm from './components/MultiChoiceForm';
import { snifflesFieldNames } from '../../store/sniffles/slice';
import { EXPOSED_DIAGNOSIS } from './constants';

const MedicationExposedDiagnosis = ({ onChangeState, exposedDiagnosis = [] }) => {
  const options = EXPOSED_DIAGNOSIS;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MultiChoiceForm
        options={options}
        selectedOptions={exposedDiagnosis}
        onSelectOption={(value) => onChangeState(value, snifflesFieldNames.EXPOSED_DIAGNOSIS)}
        buttonType='chips'
      />
    </ScrollView>
  );
};

export default MedicationExposedDiagnosis;
