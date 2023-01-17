import React from 'react';
import { useTranslation } from 'react-i18next';
import SelectSymptomForm from '../../../../components/SelectSymptomForm';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';

const SYMPTOMS_LIST = [
  { displayName: 'Sore throat', name: 'sore_throat' },
  { displayName: 'Runny nose', name: 'runny_nose' },
  { displayName: 'Fever greater than 100.4 F / 38 C', name: 'fever_greater_than_1004' },
  { displayName: 'Sinus congestion', name: 'sinus_congestion' },
  { displayName: 'Coughing', name: 'coughing' },
  { displayName: 'Shortness of breath', name: 'shortness_of_breath' },
  { displayName: 'Nausea', name: 'nausea' },
  { displayName: 'Headache', name: 'headache' },
  { displayName: 'Diarrhea', name: 'diarrhea' },
  { displayName: 'New Onset fatigue', name: 'new_onset_fatigue' },
  { displayName: 'Swollen lymph nodes in your neck', name: 'swollen_lymph_nodes_in_your_neck' },
  { displayName: 'White or red spots on tonsils', name: 'white_or_red_spots_on_tonsils' },
  { displayName: 'Wheezing', name: 'wheezing' },
  { displayName: 'Bloody nasal discharge', name: 'bloody_nasal_discharge' },
  { displayName: 'Sinus tenderness', name: 'sinus_tenderness' },
  { displayName: 'Weight loss or weight gain', name: 'weight_loss_or_weight_gain' },
  { displayName: 'Sleep disturbances', name: 'sleep_disturbances' },
  { displayName: 'Sweats', name: 'sweats' },
  { displayName: 'Chills', name: 'chills' },
  { displayName: 'Other', name: 'other' }, // OTHER
  { displayName: 'None of the Above', name: 'none_of_the_above' }, // NONE
];

const Symptoms = ({ onChangeState, symptoms: symptomsState }) => {
  const { t } = useTranslation();

  const onChangeData = ({ symptoms: newSymptoms, symptomStartDate }) => {
    onChangeState({ data: newSymptoms, startDate: symptomStartDate }, snifflesFieldNames.SYMPTOMS);
  };

  return (
    <>
      <SelectSymptomForm
        symptomsList={SYMPTOMS_LIST}
        symptoms={symptomsState.data}
        symptomStartDate={symptomsState.startDate}
        editable
        onChangeData={onChangeData}
        buttonType='chips'
      />
    </>
  );
};

export default Symptoms;
