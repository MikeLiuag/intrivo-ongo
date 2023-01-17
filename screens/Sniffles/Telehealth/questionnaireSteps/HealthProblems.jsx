import React from 'react';
import { ScrollView } from 'react-native';
import MultiChoiceForm from '../../../Medication/components/MultiChoiceForm';
import { HEALTH_PROBLEMS } from './constants';

const HealthProblems = ({ onChangeState, healthProblems = [] }) => {
  const onDataChange = (value, fieldName) => onChangeState(value, fieldName);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MultiChoiceForm
        options={HEALTH_PROBLEMS}
        selectedOptions={healthProblems}
        onSelectOption={(value) => onDataChange(value, 'healthProblems')}
        buttonType='chips'
      />
    </ScrollView>
  );
};

export default HealthProblems;
