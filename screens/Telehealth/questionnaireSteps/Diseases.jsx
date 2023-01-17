import React from 'react';
import MultipleChoiceForm from '../components/MultipleChoiceForm';

export const DISEASES = [
  { displayName: 'Allergies', name: 'allergies' },
  { displayName: 'Asthma/breathing problems', name: 'asthma_or_breathing_problems' },
  { displayName: 'Arthritis', name: 'arthritis' },
  { displayName: 'Bleeding/clotting disorder', name: 'bleeding_or_clotting_disorder' },
  { displayName: 'Blood pressure disorder', name: 'blood_pressure_disorder' },
  { displayName: 'Blood transfusion', name: 'blood_transfusion' },
  { displayName: 'Bowel/stomach problems', name: 'bowel_or_stomach_problems' },
  { displayName: 'Cancer', name: 'cancer' },
  { displayName: 'Cholesterol disorder', name: 'cholesterol_disorder' },
  { displayName: 'Diabetes', name: 'diabetes' },
  { displayName: 'Eye disorder (e.g. glaucoma, cataract) ', name: 'eye_disorder' },
  { displayName: 'Gynecological issues', name: 'gynecological_issues' },
  { displayName: 'Heart diesase/disorder', name: 'heart_diesase_or_disorder' },
  { displayName: 'Lung disorder', name: 'lung_disorder' },
  { displayName: 'Liver disease', name: 'liver_disease' },
  {
    displayName: 'Neurological disorder/chronic headaches',
    name: 'neurological_disorder_or_chronic_headaches',
  },
  { displayName: 'Psychiatric disorder/illness', name: 'psychiatric_disorder_or_illness' },
  { displayName: 'Pulmonary embolus/DVT', name: 'pulmonary_embolus_or_dvt' },
  { displayName: 'Stroke', name: 'stroke' },
  { displayName: 'Seizure or epilepsy', name: 'seizure_or_epilepsy' },
  { displayName: 'Thyroid disorder', name: 'thyroid_disorder' },
  { displayName: 'Urinary/kidney disorder', name: 'urinary_or_kidney_disorder' },
  // { displayName: 'None of the above', name: 'none_of_the_above' },
];

const mockedDiseases = DISEASES.map((e) => e.displayName);

const Diseases = ({ diseases, onChangeState }) => (
  <MultipleChoiceForm
    fieldName='diseases'
    choosedOptions={diseases}
    options={mockedDiseases}
    onSelectOption={onChangeState}
  />
);

export default Diseases;
