import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PaxFlowWrapper from './components/PaxFlowWrapper';
import { setBreastFeedingStatus, setSexStatus } from '../../store/paxlovid/slice';
import SingleSelectQuestion from '../../components/SingleSelectQuestion';
import paxStyles from './styles';
import { LogEvent } from '../../analytics';

const translationPath = 'paxlovid.eligibility';

function EligibilityFormSex({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const options = [
    t(`${translationPath}.genderSelect.options.0`),
    t(`${translationPath}.genderSelect.options.1`),
    t(`${translationPath}.genderSelect.options.2`),
  ];
  const [sex, setSex] = useState(null);

  useEffect(() => {
    LogEvent('PE_Gender_screen');
  }, []);

  const onPressNext = () => {
    LogEvent('PE_Gender_Click_Next');
    dispatch(setSexStatus(sex));
    if (sex === options[1]) {
      dispatch(setBreastFeedingStatus(null));
      navigation.navigate('EligibilityMedicationStatus');
    } else {
      navigation.navigate('EligibilityFormBreastFeeding');
    }
  };

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Gender_Click_Close');
  };

  const onBack = () => LogEvent('PE_Gender_Click_Back');

  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onBack={onBack}
      onPressButton={onPressNext}
      buttonTitle='paxlovid.eligibility.vaccinationStatus.submit'
      buttonDisabled={sex === null}
    >
      <SingleSelectQuestion
        title={t(`${translationPath}.genderSelect.title`)}
        containerStyle={paxStyles.content}
        options={options}
        selected={sex}
        onSelected={(option) => setSex(option)}
      />
    </PaxFlowWrapper>
  );
}

export default EligibilityFormSex;
