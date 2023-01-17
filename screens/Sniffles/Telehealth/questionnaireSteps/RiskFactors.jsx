import React from 'react';
import { ScrollView } from 'react-native';
import MultiChoiceForm from '../../../Medication/components/MultiChoiceForm';
import { RISK_FACTORS } from './constants';

const RiskFactors = ({ onChangeState, riskFactors = [] }) => {
  const onDataChange = (value, fieldName) => {
    onChangeState(value, fieldName);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MultiChoiceForm
        options={RISK_FACTORS}
        selectedOptions={riskFactors}
        onSelectOption={(value) => onDataChange(value, 'riskFactors')}
      />
    </ScrollView>
  );
};

export default RiskFactors;
