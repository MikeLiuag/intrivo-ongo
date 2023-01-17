import React from 'react';
import MultipleChoiceForm from '../components/MultipleChoiceForm';

export const SYMPTOMS = [
  { displayName: 'Fever', name: 'fever' },
  { displayName: 'Chills', name: 'chills' },
  { displayName: 'Fatigue', name: 'fatigue' },
  { displayName: 'Feeling poorly', name: 'feeling_poorly' },
  { displayName: 'Sweats', name: 'sweats' },
  { displayName: 'Weight gain', name: 'weight_gain' },
  { displayName: 'Weight loss', name: 'weight_loss' },
  { displayName: 'Unexpected weight change', name: 'unexpected_weight_change' },
  { displayName: 'Sleep disturbances', name: 'sleep_disturbance' },
  { displayName: 'Other ', name: 'other' },
  // { displayName: 'None of the above', name: 'none_of_the_above' },
];

const mockedSymptoms = SYMPTOMS.map((e) => e.displayName);

const Symptoms = ({ symptoms, onChangeState }) => (
  <MultipleChoiceForm
    fieldName='symptoms'
    choosedOptions={symptoms}
    options={mockedSymptoms}
    onSelectOption={onChangeState}
  />
);

export default Symptoms;
