import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import { setVaccinationStatus } from '../../store/paxlovid/slice';
import SingleSelectQuestion from '../../components/SingleSelectQuestion';
import paxStyles from './styles';
import { LogEvent } from '../../analytics';

const VaccinationStatus = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const options = [
    t('paxlovid.eligibility.vaccinationStatus.yes'),
    t('paxlovid.eligibility.vaccinationStatus.no'),
  ];
  const [vaccinated, setVaccinated] = useState(null);

  useEffect(() => {
    LogEvent('PE_Vaccinfo_screen');
  }, []);

  const onPressNext = () => {
    LogEvent('PE_Vaccinfo_Click_Next');
    dispatch(setVaccinationStatus(vaccinated));
    if (vaccinated === options[0]) {
      navigation.navigate('EligibilityBoosterStatus');
    } else {
      navigation.navigate('EligibilityFormSex');
    }
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Vaccinfo_Click_Close');
  };

  const onBack = () => LogEvent('PE_Vaccinfo_Click_Back');

  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      onPressButton={onPressNext}
      buttonTitle='paxlovid.eligibility.vaccinationStatus.submit'
      buttonDisabled={vaccinated === null}
    >
      <SingleSelectQuestion
        title={t('paxlovid.eligibility.vaccinationStatus.subtitle')}
        containerStyle={paxStyles.content}
        options={options}
        selected={vaccinated}
        onSelected={(option) => setVaccinated(option)}
      />
    </PaxFlowWrapper>
  );
};

export default VaccinationStatus;
