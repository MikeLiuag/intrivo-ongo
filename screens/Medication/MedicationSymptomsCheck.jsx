import React from 'react';
import { ScrollView } from 'react-native';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';
import SelectSymptomForm from '../../components/SelectSymptomForm';
import { SYMPTOMS } from './constants';
import { BlueButton } from '../../components/Buttons/BlueButton';

const MedicationSymptomsCheck = ({ onChangeState, symptoms, symptomsBeginDate, onPressNext }) => {
  const onChangeData = ({ symptoms: newSymptoms, symptomStartDate }) => {
    onChangeState(newSymptoms, snifflesFieldNames.SYMPTOMS);
    onChangeState(symptomStartDate, snifflesFieldNames.SYMPTOMS_BEGIN_DATE);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
      <SelectSymptomForm
        editable
        symptoms={symptoms}
        symptomStartDate={symptomsBeginDate}
        onChangeData={onChangeData}
        symptomsList={SYMPTOMS}
        buttonType='chips'
      />
      <BlueButton
        disabled={
          symptoms === null ||
          symptoms?.length === 0 ||
          (symptoms?.length > 0 && !symptomsBeginDate && !symptoms[0]?.none)
        }
        title='Next'
        action={onPressNext}
      />
    </ScrollView>
  );
};

export default MedicationSymptomsCheck;
