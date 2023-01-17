import React from 'react';
import MultipleChoiceForm from '../components/MultipleChoiceForm';

export const ILLNESS_AREAS = [
  {
    displayName: 'Head, eyes, ears, nose, or throat',
    name: 'head_eyes_ears_nose_or_throat',
  },
  { displayName: 'Cardiovascular', name: 'cardiovascular' },
  { displayName: 'Respiratory', name: 'respiratory' },
  { displayName: 'Gastrointestinal', name: 'gastrointestinal' },
  { displayName: 'Neurological', name: 'neurological' },
  { displayName: 'Musculoskeletal', name: 'musculoskeletal' },
  { displayName: 'Urinary/Genital', name: 'urinary_or_genital' },
  { displayName: 'Skin', name: 'skin' },
  { displayName: 'Psychiatric', name: 'psychiatric' },
  { displayName: 'Blood/Lymphatic', name: 'blood_or_lymphatic' },
  { displayName: 'Endocrine', name: 'endocrine' },
  // { displayName: 'None of the above', name: 'none_of_the_above' },
];

const mockedAreas = ILLNESS_AREAS.map((e) => e.displayName);

const SickAreas = ({ sickAreas, onChangeState }) => (
  <MultipleChoiceForm
    fieldName='sickAreas'
    choosedOptions={sickAreas}
    options={mockedAreas}
    onSelectOption={onChangeState}
  />
);

export default SickAreas;
