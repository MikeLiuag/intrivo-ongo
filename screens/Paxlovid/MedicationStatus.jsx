import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import SingleSelectQuestion from '../../components/SingleSelectQuestion';
import paxStyles from './styles';
import { setMedicationStatus } from '../../store/paxlovid/slice';
import { LogEvent } from '../../analytics';

const VaccinationStatus = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const options = [
    t('paxlovid.eligibility.medicationStatus.yes'),
    t('paxlovid.eligibility.medicationStatus.no'),
  ];
  const [medication, setMedication] = useState(null);

  useEffect(() => {
    LogEvent('PE_Medinfo1_screen');
  }, []);

  const onPressNext = () => {
    LogEvent('PE_Medinfo1_Click_Next');
    dispatch(setMedicationStatus(medication));
    if (medication === options[0]) {
      navigation.navigate('EligibilityFormMedicationSelect');
    } else {
      navigation.navigate('EligibilityFormAllergy');
    }
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Medinfo1_Click_Close');
  };

  const onBack = () => LogEvent('PE_Medinfo1_Click_Back');

  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      onPressButton={onPressNext}
      buttonTitle='paxlovid.eligibility.medicationStatus.submit'
      buttonDisabled={medication === null}
    >
      <SingleSelectQuestion
        title={t('paxlovid.eligibility.medicationStatus.subtitle')}
        containerStyle={paxStyles.content}
        options={options}
        selected={medication}
        onSelected={(option) => setMedication(option)}
      />
    </PaxFlowWrapper>
  );
};

export default VaccinationStatus;
