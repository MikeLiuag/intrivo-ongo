/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import { fonts } from '../../../theme/fonts';
import questionSteps from './steps';
import { colors } from '../../../theme';
import HeaderComp from '../../../components/HeaderComp';
import QuizProgressBar from '../../../components/QuizLoader';
import CloseIcon from '../../../components/Svg/close';
import commonStyles from '../styles';
import useIsFloatingKeyboard from '../../../utilis/keyboard';
import { LogEvent } from '../../../analytics';
import { openLink } from '../../../utilis/link';
import CompletedScreen from '../../../components/CompletedScreen';
import { getDifferenceInDays } from '../../../utilis/dateTime';
import { resetWebShop } from '../../../utilis/navigationHelper';

const translationsPath = 'screens.sniffles.testRulingOut.questions';

const TestRulingOut = ({ route }) => {
  const floating = useIsFloatingKeyboard();

  const { t } = useTranslation();
  const navigation = useNavigation();

  const { observations } = useSelector((state) => state.user) || {};
  const { shopLink } = useSelector((s) => s.app);

  const [step, setStep] = useState(route?.params?.paxlovid ? 2 : 0);
  const [resultState, setResultState] = useState({
    hadCovidTest: route?.params?.paxlovid ? t(`${translationsPath}.question1.answer2`) : null,
    covidTestResult: route?.params?.paxlovid ? t(`${translationsPath}.question2.answer2`) : null,
    next: null,
    skipSecond: false,
  });

  const isTestedPositive =
    resultState?.covidTestResult === t(`${translationsPath}.question2.answer2`);

  const [showWarning, setShowWarning] = useState(false);

  const positiveResults = observations.filter(
    ({ result, date }) => result === 1 && getDifferenceInDays(date) <= 5
  );

  const steps = questionSteps({ ...resultState, positiveResults, isTestedPositive });

  const {
    title,
    subtitle,
    withButton,
    addStyle,
    component: StepComponent,
    isDisabled: buttonDisabled,
    skip,
    analyticName,
    showBack = true,
  } = steps[step];

  const progress = ((step + 1) / steps.length) * 100;

  useEffect(() => {
    LogEvent(`Sniffles_Home_${analyticName}_screen`);
  }, [analyticName, step]);

  const onExit = () => {
    if (showWarning) {
      LogEvent(`Sniffles_Home_Q3B_click_Close`);
    } else {
      LogEvent(`Sniffles_Home_${analyticName}_click_Close`);
    }
    navigation.navigate('Home');
  };

  const onBack = () => {
    LogEvent(`Sniffles_Home_${analyticName}_click_Back`);
    if (!step || step === 0) {
      if (route?.params?.paxlovid) {
        return navigation.pop(2);
      }
      return navigation.goBack();
    }

    if (steps[step - 2]?.skip) {
      return setStep((currentStep) => currentStep - 2);
    }
    return setStep((currentStep) => currentStep - 1);
  };

  const onPressNext = () => {
    LogEvent(`Sniffles_Home_${analyticName}_click_Next`);
    if (step === 0 && resultState?.hadCovidTest === t(`${translationsPath}.question1.answer1`)) {
      return navigation.navigate('Intrivo');
    }
    if (step === 1 && resultState?.hadCovidTest === t(`${translationsPath}.question2.answer1`)) {
      return navigation.navigate('AssessmentInfoVA');
    }
    if (step === 1 && resultState?.covidTestResult === t(`${translationsPath}.question2.answer1`)) {
      return navigation.navigate('AssessmentInfoVA', { skipLastQuestion: true });
    }
    if (step === 1 && isTestedPositive) {
      if (positiveResults.length) {
        return setStep((currentStep) => currentStep + 1);
      }

      return setShowWarning(true);
    }
    if (step === 2 && resultState?.next === t(`${translationsPath}.question3.answer1`)) {
      return navigation.navigate('AssessmentInfoVA');
    }
    if (step === 2 && resultState?.next === t(`${translationsPath}.question3.answer2`)) {
      return openLink(navigation, false, {
        url: shopLink,
        useWebView: true,
      });
    }
    if (skip) {
      return setStep((currentStep) => currentStep + 2);
    }
    return setStep((currentStep) => currentStep + 1);
  };

  const onChangeState = (value, fieldName, goToNextStep) => {
    if (goToNextStep) {
      onPressNext();
    }
    const tmpState = { ...resultState };
    tmpState[fieldName] = value;
    if (tmpState.hadCovidTest === t(`${translationsPath}.question1.answer3`))
      tmpState.skipSecond = true;
    else tmpState.skipSecond = false;
    setResultState(tmpState);
  };

  const skipSteps = (stepsCount) => setStep((prevStepCount) => prevStepCount + stepsCount);

  const renderStep = () => (
    <StepComponent
      {...resultState}
      addStyle={addStyle}
      skipSteps={skipSteps}
      onChangeState={onChangeState}
      positiveResults={positiveResults}
      showWarning={() => setShowWarning(true)}
    />
  );

  const renderButton = () =>
    withButton && <BlueButton title='Next' disabled={buttonDisabled} action={onPressNext} />;

  const onLinkPress = () => {
    resetWebShop(navigation);
    setShowWarning(false);
  };

  const onWarningButtonPress = () => {
    LogEvent(`Sniffles_Home_Q3B_click_Next`);
    navigation.navigate('Intrivo');
    setShowWarning(false);
  };

  if (showWarning) {
    LogEvent(`Sniffles_Home_Q3B_screen`);
    return (
      <CompletedScreen
        background
        warningType
        onClose={onExit}
        visible={showWarning}
        onLinkPress={onLinkPress}
        warningColor={colors.primaryBlue}
        onPressButton={onWarningButtonPress}
        title={t(`${translationsPath}.warning.title`)}
        descr={t(`${translationsPath}.warning.subtitle`)}
        buttonTitle={t(`${translationsPath}.warning.button`)}
        link={{
          text: t(`${translationsPath}.warning.linkText`),
          linkName: t(`${translationsPath}.warning.link`),
        }}
      />
    );
  }

  return (
    <SafeAreaView edges={['right', 'top', 'left', 'bottom']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}
        enabled={!floating}
      >
        <HeaderComp
          left={showBack ? 'arrow' : false}
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
  );
};

export default TestRulingOut;

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
