import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import { setAllergyStatus } from '../../store/paxlovid/slice';
import SingleSelectQuestion from '../../components/SingleSelectQuestion';
import paxStyles from './styles';
import { LogEvent } from '../../analytics';

function EligibilityFormAllergy({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const options = [
    t('paxlovid.eligibility.vaccinationStatus.yes'),
    t('paxlovid.eligibility.vaccinationStatus.no'),
  ];
  const [allergy, setAllergy] = useState(null);

  useEffect(() => {
    LogEvent('PE_MedAllergy1_screen');
  }, []);

  const onPressNext = () => {
    LogEvent('PE_MedAllergy1_Click_Next');
    dispatch(setAllergyStatus(allergy));
    if (allergy === options[0]) {
      navigation.navigate('EligibilityFormAllergySelect');
    } else {
      navigation.navigate('EligibilityRiskFactorStatus');
    }
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_MedAllergy1_Click_Close');
  };

  const onBack = () => LogEvent('PE_MedAllergy1_Click_Back');

  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onPressButton={onPressNext}
      onBack={onBack}
      buttonTitle='paxlovid.eligibility.vaccinationStatus.submit'
      buttonDisabled={allergy === null}
    >
      <SingleSelectQuestion
        title={t('paxlovid.eligibility.allergy.title')}
        containerStyle={paxStyles.content}
        options={options}
        selected={allergy}
        onSelected={(option) => setAllergy(option)}
      />
    </PaxFlowWrapper>
  );
}

export default EligibilityFormAllergy;
