/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, BackHandler, Platform, KeyboardAvoidingView } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  CommonActions,
  useIsFocused,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import { fonts } from '../../../theme/fonts';
import snifflesSteps from './questionnaireSteps';
import DependentsList from '../../Dependents/DependentsList';
import { colors } from '../../../theme';
import { clearSniffles, setSnifflesState } from '../../../store/sniffles/slice';
import HeaderComp from '../../../components/HeaderComp';
import QuizProgressBar from '../../../components/QuizLoader';
import CloseIcon from '../../../components/Svg/close';
import commonStyles from '../styles';
import useIsFloatingKeyboard from '../../../utilis/keyboard';
import { resetToDashboard } from '../../../utilis/navigationHelper';
import { LogEvent } from '../../../analytics';
import CompletedScreen from '../../../components/CompletedScreen';

const successTranslationsPath = 'screens.sniffles.snifflesTelehealth.success';

const SnifflesTelehealthQuestionnaire = () => {
  const floating = useIsFloatingKeyboard();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const snifflesState = useSelector(({ sniffles }) => sniffles);

  const [step, setStep] = useState(0);
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);

  const { userId } = snifflesState;

  const steps = snifflesSteps(snifflesState);

  const {
    title,
    subtitle,
    withButton,
    addStyle,
    component: StepComponent,
    isDisabled: buttonDisabled,
    skip,
    analyticName,
    isNext,
  } = steps[step];

  const progress = ((step + 1) / steps.length) * 100;
  const isLastStep = step === steps.length - 1;

  useEffect(() => {
    if (userId) {
      LogEvent(`Sniffles_Virtual_${analyticName}_screen`);
    }
  }, [analyticName, isFocused, step, userId]);

  const onBack = () => {
    if (analyticName === 'Review') {
      LogEvent('Sniffles_Virtual_Review_click_Back');
    } else {
      LogEvent(`Sniffles_Virtual_${analyticName}_click_Back`);
    }

    if (!step) return onChangeState('', 'userId');
    if (isNext) {
      // onChangeState('', 'promoCode');
      return setStep((currentStep) => currentStep + 1);
    }
    if (steps[step - 2]?.skip) {
      return setStep((currentStep) => currentStep - 2);
    }
    return setStep((currentStep) => currentStep - 1);
  };

  const resetNavigationAndState = () => {
    resetToDashboard(navigation);
    dispatch(clearSniffles());
  };

  const onExit = () => {
    if (!userId) {
      LogEvent('Sniffles_Virtual_User_click_Close');
    } else {
      LogEvent(`Sniffles_Virtual_${analyticName}_click_Close`);
    }
    resetNavigationAndState();
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  });

  const onFlowComplete = () => {
    navigation.dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      }),
    });
    dispatch(clearSniffles());
  };

  const onPressNext = () => {
    if (isLastStep) {
      LogEvent(`Sniffles_Virtual_${analyticName}_click_Submit`);
      return setIsCompletedModalVisible(true);
    }
    LogEvent(`Sniffles_Virtual_${analyticName}_click_Next`);
    if (skip) {
      // const skipStep = (defaultStep = 2, currStep = 1) => {
      //   const skipSteps = defaultStep;
      //   if (steps[step + currStep].skip) return skipStep(skipSteps + 1, currStep + 1);
      //   return skipSteps;
      // };  // TODO skips multiple step, needs more testing
      return setStep((currentStep) => currentStep + 2);
    }

    return setStep((currentStep) => currentStep + 1);
  };

  const onChangeState = (value, fieldName, goToNextStep) => {
    if (goToNextStep) {
      onPressNext();
    }

    dispatch(setSnifflesState({ value, fieldName }));
  };

  const onSelectUser = (id) => {
    LogEvent('Sniffles_Virtual_User_click_Add');
    onChangeState(id, 'userId');
  };

  const skipSteps = (stepsCount) => setStep((prevStepCount) => prevStepCount + stepsCount);

  useEffect(() => {
    if (isCompletedModalVisible) {
      LogEvent('Sniffles_Virtual_Conf_screen');
    }
  }, [isCompletedModalVisible]);

  if (isCompletedModalVisible) {
    return (
      <CompletedScreen
        checkmark
        visible
        result={2}
        background
        onClose={() => {
          LogEvent('Sniffles_Virtual_Conf_click_Close');
          onFlowComplete();
        }}
        title={t(`${successTranslationsPath}.title`)}
        descr={t(`${successTranslationsPath}.desctiption`)}
        buttonTitle={t(`${successTranslationsPath}.button`)}
        onPressButton={() => {
          LogEvent('Sniffles_Virtual_Conf_click_GotIt');
          onFlowComplete();
        }}
      />
    );
  }

  if (!userId) {
    if (isFocused) {
      LogEvent('Sniffles_Virtual_User_screen');
    }
    return (
      <DependentsList
        hideArrows
        includeSelf
        headerLeft={null}
        addNewStyle='list'
        headerRight={['x', onExit]}
        header={t('dependentsList.header')}
        title='Who is this appointment for?'
        onSelectUser={(id) => onSelectUser(id)}
      />
    );
  }

  const renderStep = () => (
    <StepComponent
      {...snifflesState}
      skipSteps={skipSteps}
      onChangeState={onChangeState}
      addStyle={addStyle}
    />
  );

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
  );
};

export default SnifflesTelehealthQuestionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 24,
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
    marginLeft: 12,
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
  bottomButton: {},
});
