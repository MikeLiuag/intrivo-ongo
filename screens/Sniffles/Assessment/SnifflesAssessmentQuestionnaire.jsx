/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, BackHandler, Platform, KeyboardAvoidingView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import { fonts } from '../../../theme/fonts';
import snifflesSteps from './questionnaireSteps';
import { colors } from '../../../theme';
import {
  resetSnifflesInProgress,
  saveAndCleanSnifflesAssessment,
  setSnifflesState,
  snifflesFieldNames,
} from '../../../store/sniffles/slice';
import HeaderComp from '../../../components/HeaderComp';
import QuizProgressBar from '../../../components/QuizLoader';
import CloseIcon from '../../../components/Svg/close';
import commonStyles from '../styles';
import useIsFloatingKeyboard from '../../../utilis/keyboard';
import { resetToDashboard } from '../../../utilis/navigationHelper';
import { LogEvent } from '../../../analytics';
import TemperatureModal from '../../../components/Modals/TemperatureModal';

const modalTranslationPath = 'modals.temperature';

const SnifflesAssessmentQuestionnaire = ({ navigation, route }) => {
  const floating = useIsFloatingKeyboard();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const snifflesState = useSelector(({ sniffles }) => sniffles);
  const [isEnteringTemperature, setIsEnteringTemperature] = useState(false);
  const [isTemperaturePopupVisible, setIsTemperaturePopupVisible] = useState(false);

  const isNotSureFever =
    snifflesState.fever === t('screens.sniffles.assessmentQuestion.question1.option3');

  const { skipLastQuestion, didSkip = false, flow = 'A' } = route.params;

  const [step, setStep] = useState(route?.params.skipToStep || 0);
  const showReset = route?.params.showReset || false;
  const steps = snifflesSteps({
    ...snifflesState,
    isEnteringTemperature,
    skipLastQuestion,
    optionB: !!route?.params.optionB,
  });

  const {
    title,
    subtitle,
    withButton,
    addStyle,
    component: StepComponent,
    isDisabled: buttonDisabled,
    skip,
    analyticsName,
  } = steps[step];

  const progress = ((step + 1) / steps.length) * 100;
  const isLastStep = step === steps.length - 1;

  useEffect(() => {
    LogEvent(`Sniffles_Quiz${flow}_${analyticsName}_screen`);
  }, [analyticsName, step, flow]);

  const onBack = () => {
    LogEvent(`Sniffles_Quiz${flow}_${analyticsName}_click_Back`);
    if (!step || didSkip || flow === 'B') return navigation.goBack();

    if (steps[step - 2]?.skip) {
      return setStep((currentStep) => currentStep - 2);
    }
    return setStep((currentStep) => currentStep - 1);
  };

  const onExit = () => {
    LogEvent(`Sniffles_Quiz${flow}_${analyticsName}_click_Close`);
    resetToDashboard(navigation);
    dispatch(saveAndCleanSnifflesAssessment());
    dispatch(resetSnifflesInProgress());
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  });

  const onFlowComplete = () => {
    if (route?.params.optionB) {
      navigation.navigate('IntroToSolutionsOptionB', {
        flow,
        result: snifflesState[snifflesFieldNames.HOW_TO_HELP],
        showReset,
      });
    } else {
      navigation.navigate('IntroToSolutionsV2', { flow }); // changed
    }
  };

  const onPressNext = () => {
    if (isLastStep) {
      return onFlowComplete();
    }
    if (skip) {
      return setStep((currentStep) => currentStep + 2);
    }

    return setStep((currentStep) => currentStep + 1);
  };

  const onChangeState = (value, fieldName, goToNextStep) => {
    if (goToNextStep) {
      LogEvent(`Sniffles_Quiz${flow}_${analyticsName}_click_Next`);
      onPressNext();
    }

    dispatch(setSnifflesState({ value, fieldName }));
  };

  const skipSteps = (stepsCount) => setStep((prevStepCount) => prevStepCount + stepsCount);

  const onPressSkipTemperature = () => {
    if (!isNotSureFever) LogEvent(`Sniffles_QuizA_Q1_${snifflesState.fever}Popup_click_Skip`);
    setIsEnteringTemperature(false);
    setIsTemperaturePopupVisible(false);
    onPressNext();
  };

  const onPressRecordTemperature = () => {
    if (!isNotSureFever) LogEvent(`Sniffles_QuizA_Q1_${snifflesState.fever}Popup_click_DoIt`);
    setIsTemperaturePopupVisible(false);
    setIsEnteringTemperature(true);
    onPressNext();
  };

  const onSelectFeverOption = () => setIsTemperaturePopupVisible(true);

  const renderStep = () => (
    <StepComponent
      {...snifflesState}
      addStyle={addStyle}
      skipSteps={skipSteps}
      onChangeState={onChangeState}
      isNotSureFever={isNotSureFever}
      onSelectFeverOption={onSelectFeverOption}
    />
  );

  const renderTemperaturePopup = () => {
    const popUpTitle = isNotSureFever ? '.title2' : '.title1';
    const popUpDescription = isNotSureFever ? '.description2' : '.description1';

    return (
      <TemperatureModal
        onPressSkip={onPressSkipTemperature}
        onPressCTA={onPressRecordTemperature}
        isVisible={isTemperaturePopupVisible}
        title={t(modalTranslationPath + popUpTitle)}
        subtitle={t(modalTranslationPath + popUpDescription)}
        onPressClose={() => setIsTemperaturePopupVisible(false)}
      />
    );
  };

  const renderButton = () =>
    withButton && (
      <BlueButton
        style={styles.bottomButton}
        title='Next'
        disabled={buttonDisabled}
        action={onPressNext}
      />
    );

  return (
    <>
      {renderTemperaturePopup()}
      <SafeAreaView edges={['right', 'top', 'left', 'bottom']} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboard}
          enabled={!floating}
        >
          <HeaderComp
            left='arrow'
            onLeftClick={onBack}
            addStyle={styles.header}
            center={[title, styles.headerTitle]}
            right={[<CloseIcon width={14} height={14} />, onExit]}
            centerComp={() => <QuizProgressBar progres={`${progress}%`} />}
          />
          <View style={styles.content}>
            {!!title && <Text style={styles.title}>{t(title)}</Text>}
            {!!subtitle && <Text style={commonStyles.subtitle}>{t(subtitle)}</Text>}
            <View style={styles.stepContainer}>{renderStep()}</View>
            {renderButton()}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SnifflesAssessmentQuestionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  keyboard: { flex: 1 },
  headerTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
  },
  header: {
    paddingTop: 8,
  },
  content: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 12,
  },
  stepContainer: {
    flex: 1,
    marginTop: 6,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.greyDark2,
    fontFamily: fonts.familyLight,
  },
});
