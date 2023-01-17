import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { LogEvent } from '../../../../analytics';
import { BlueButton } from '../../../../components/Buttons/BlueButton';
import CompletedScreen from '../../../../components/CompletedScreen';
import MultiSelectQuestion from '../../../../components/MultiSelectQuestion';
import { setMedicationState } from '../../../../store/medicationFlow/slice';
import { clearSniffles, snifflesFieldNames } from '../../../../store/sniffles/slice';
import { resetToDashboard } from '../../../../utilis/navigationHelper';

const translationsPath = 'screens.sniffles.assessmentQuestion.intro';

const IntroQuestion = ({ onChangeState, eliminationSymptoms }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const options = [
    {
      displayName: t(`${translationsPath}.option1.title`),
      subtitle: t(`${translationsPath}.option1.subtitle`),
      value: 'trouble_breathing',
    },
    {
      displayName: t(`${translationsPath}.option2.title`),
      subtitle: t(`${translationsPath}.option2.subtitle`),
      value: 'seizure',
    },
    {
      displayName: t(`${translationsPath}.option3.title`),
      subtitle: t(`${translationsPath}.option3.subtitle`),
      value: 'disoriented_or_confused',
    },
    {
      displayName: t(`${translationsPath}.option4.title`),
      subtitle: t(`${translationsPath}.option4.subtitle`),
      value: 'liqueids_down',
    },
    {
      displayName: t(`${translationsPath}.option5.title`),
      subtitle: t(`${translationsPath}.option5.subtitle`),
      value: 'swallow_liquids',
    },
  ];
  const onSelectOption = (value, fieldName) => {
    onChangeState(value, fieldName);
  };

  const onNextPress = () => {
    if (eliminationSymptoms.length === 0) {
      dispatch(
        setMedicationState({
          fieldName: 'showFirstQuestion',
          value: false,
        })
      );
      onChangeState(null, null, true);
    } else {
      setShowCompleteModal(true);
    }
  };

  const resetNavigationAndState = () => {
    resetToDashboard(navigation);
    dispatch(clearSniffles());
  };

  if (showCompleteModal) {
    LogEvent('Sniffles_QuizA_Warn_screen');
    return (
      <CompletedScreen
        visible
        warningType
        result={2}
        background
        buttonTitle='Done'
        onPressButton={() => {
          LogEvent('Sniffles_QuizA_Warn_click_Done');
          resetNavigationAndState();
        }}
        onClose={() => {
          LogEvent('Sniffles_QuizA_Warn_click_Close');
          resetNavigationAndState();
        }}
        title={t(`${translationsPath}.warning.title`)}
        descr={t(`${translationsPath}.warning.subtitle`)}
      />
    );
  }

  return (
    <>
      <MultiSelectQuestion
        options={options}
        fieldName={snifflesFieldNames.ELIMINATION_SYMPTOMS}
        onSelectOption={onSelectOption}
        choosedOptions={eliminationSymptoms}
      />
      <BlueButton title='Next' action={onNextPress} disabled={!eliminationSymptoms} />
    </>
  );
};

export default IntroQuestion;
