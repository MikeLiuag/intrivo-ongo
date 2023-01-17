import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import SingleSelectQuestion from '../../components/SingleSelectQuestion';
import paxStyles from './styles';
import { setBoosterStatus } from '../../store/paxlovid/slice';
import { LogEvent } from '../../analytics';

const VaccinationStatus = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const options = [
    t('paxlovid.eligibility.boosterStatus.yes'),
    t('paxlovid.eligibility.boosterStatus.no'),
  ];
  const [boosted, setBoosted] = useState(null);

  useEffect(() => {
    LogEvent('PE_Boosterinfo_screen');
  }, []);

  const onPressNext = () => {
    LogEvent('PE_Boosterinfo_Click_Next');
    dispatch(setBoosterStatus(boosted));
    navigation.navigate('EligibilityFormSex');
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Boosterinfo_Click_Close');
  };

  const onBack = () => LogEvent('PE_Boosterinfo_Click_Back');

  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      onPressButton={onPressNext}
      buttonTitle='paxlovid.eligibility.boosterStatus.submit'
      buttonDisabled={boosted === null}
    >
      <SingleSelectQuestion
        title={t('paxlovid.eligibility.boosterStatus.subtitle')}
        containerStyle={paxStyles.content}
        options={options}
        selected={boosted}
        onSelected={(option) => setBoosted(option)}
      />
    </PaxFlowWrapper>
  );
};

export default VaccinationStatus;
