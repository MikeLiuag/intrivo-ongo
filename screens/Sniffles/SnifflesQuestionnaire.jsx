/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, BackHandler, Platform, KeyboardAvoidingView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { fonts } from '../../theme/fonts';
import snifflesSteps from './questionnaireSteps';
import DependentsList from '../Dependents/DependentsList';
import { colors } from '../../theme';
import {
  clearSniffles,
  setSnifflesState,
  submitSnifflesAppointment,
} from '../../store/sniffles/slice';
import HeaderComp from '../../components/HeaderComp';
import QuizProgressBar from '../../components/QuizLoader';
import CloseIcon from '../../components/Svg/close';
import commonStyles from './styles';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import CompletedScreen from '../../components/CompletedScreen';
import { resetToDashboard } from '../../utilis/navigationHelper';
import { LogEvent } from '../../analytics';
import { checkUserAppointmentStatus, updateUser } from '../../store/user/slice';
import { getDifferenceInYears } from '../../utilis/dateTime';

const successTranslationsPath = 'screens.sniffles.review';
const existingAppointmentModalTranslationPath = 'screens.sniffles.existingAppointmentModal';

// index of step that has no blue button
const stepsWithoutNextButton = [0, 1, 4, 5, 6];

const SnifflesQuestionnaire = () => {
  const floating = useIsFloatingKeyboard();
  const contactPhoneNumber = useSelector(
    ({
      app: {
        firebase: { deliverySupportPhone },
      },
    }) => deliverySupportPhone
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const snifflesState = useSelector(({ sniffles }) => sniffles);
  const { usersLookup, users } = useSelector(({ user }) => user);

  const [step, setStep] = useState(0);
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
  const existingAppointmentRequest = useRef();
  const [warning, setWarning] = useState(null);

  const { userId, updateUserInfo, promoCode } = snifflesState;

  const steps = snifflesSteps(snifflesState);

  const {
    title,
    subtitle,
    component: StepComponent,
    isDisabled: buttonDisabled,
    analyticsName,
    isNext = false,
  } = steps[step];

  const progress = ((step + 1) / steps.length) * 100;
  const isLastStep = step === steps.length - 1;

  const onChangeState = (value, fieldName, goToNextStep) => {
    if (goToNextStep) onPressNext();

    dispatch(setSnifflesState({ value, fieldName }));
  };

  const onBack = () => {
    LogEvent(`Sniffles_POC_${analyticsName}_click_Back`);
    if (!step || step === 0) return onChangeState('', 'userId');
    if (isNext) {
      // onChangeState('', 'promoCode');
      return setStep((currentStep) => currentStep + 1);
    }
    if (steps[step - 2]?.skip) {
      return setStep((currentStep) => currentStep - 2);
    }

    return setStep((currentStep) => currentStep - 1);
  };

  const onExit = () => {
    if (!userId) {
      LogEvent('Sniffles_POC_User_click_Close');
    } else {
      LogEvent(`Sniffles_POC_${analyticsName}_click_Close`);
    }
    navigation.navigate('Home');
    dispatch(clearSniffles());
  };

  useEffect(() => {
    LogEvent(`Sniffles_POC_${analyticsName}_screen`);
  }, [analyticsName]);

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  });

  const resetNavigationAndState = () => {
    LogEvent('Sniffles_POC_ApptConf_click_Close');
    resetToDashboard(navigation);
    dispatch(clearSniffles());
  };

  const onBackToSelectSlot = () => {
    setWarning(null);
    setStep(1);
  };

  const onFlowComplete = () => {
    dispatch(submitSnifflesAppointment())
      .unwrap()
      .then(() => {
        setIsCompletedModalVisible(true);
        if (updateUserInfo) {
          dispatch(updateUser(updateUserInfo));
        }
      })
      .catch((error) => {
        if (error.errorCode === '400032') {
          setWarning({
            title: t(`errors.sniffles.slotUnavailable.title`),
            description: t(`errors.sniffles.slotUnavailable.subtitle`, {
              phone: contactPhoneNumber,
            }),
            cta: t(`errors.sniffles.slotUnavailable.button`),
            onAction: onBackToSelectSlot,
            onClose: onBackToSelectSlot,
          });
        }
      });
  };

  const onPressNext = () => {
    LogEvent(`Sniffles_POC_${analyticsName}_click_${isLastStep ? 'Submit' : 'Next'}`);
    if (steps[step]?.skip && !snifflesState?.isRedeemed) {
      return setStep((currentStep) => currentStep + 2);
    }
    if (isLastStep) {
      return onFlowComplete();
    }

    return setStep((currentStep) => currentStep + 1);
  };

  const onExistingAppointmentModalClose = () => {
    LogEvent('Sniffles_POC_SchError_click_Close');
    dispatch(clearSniffles());
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Dashboard',
          state: {
            routes: [
              {
                name: 'CareList',
              },
            ],
          },
        },
      ],
    });
    existingAppointmentRequest.current = null;
  };

  const navigateToExistingAppointmentDetails = () => {
    LogEvent('Sniffles_POC_SchError_click_View');
    dispatch(clearSniffles());
    navigation.reset({
      index: 0,
      routes: [
        { name: 'Dashboard' },
        {
          name: 'AppointmentDetails',
          params: {
            appointment: existingAppointmentRequest.current,
            userId: existingAppointmentRequest.current?.user_id,
          },
        },
      ],
    });
    existingAppointmentRequest.current = null;
  };

  const ageWarningCta = () => {
    setWarning(null);
  };

  const onSelectUser = (id) => {
    dispatch(checkUserAppointmentStatus({ userId: id })).then(() => {
      const primaryAge = getDifferenceInYears(usersLookup[users[0]].dob);
      if (primaryAge < 18) {
        setWarning({
          title: t('errors.sniffles.primaryAgeTooYoung.title'),
          description: t('errors.sniffles.primaryAgeTooYoung.subtitle'),
          cta: t('errors.sniffles.primaryAgeTooYoung.button'),
          onAction: ageWarningCta,
          onClose: ageWarningCta,
        });
        return;
      }
      if (id !== users[0]) {
        const dependentAge = getDifferenceInYears(usersLookup[id].dob);
        if (dependentAge < 3) {
          setWarning({
            title: t('errors.sniffles.dependentAgeTooYoung.title'),
            description: t('errors.sniffles.dependentAgeTooYoung.subtitle'),
            cta: t('errors.sniffles.dependentAgeTooYoung.button'),
            onAction: ageWarningCta,
            onClose: ageWarningCta,
          });
          return;
        }
      }
      const { pendingAppointment } = usersLookup[id];
      const hasPendingPOCAppointment = (pendingAppointment || []).find(
        (p) => p?.purpose === 'sniffles_observation'
      );
      LogEvent(`Sniffles_POC_User_click_${users[0] === id ? 'me' : 'dependent'}`);

      if (hasPendingPOCAppointment) {
        existingAppointmentRequest.current = hasPendingPOCAppointment;
        setWarning({
          title: t(`${existingAppointmentModalTranslationPath}.title`),
          description: t(`${existingAppointmentModalTranslationPath}.subtitle`),
          cta: t(`${existingAppointmentModalTranslationPath}.buttonTitle`),
          onAction: navigateToExistingAppointmentDetails,
          onClose: onExistingAppointmentModalClose,
        });
        return;
      }
      onChangeState(id, 'userId');
    });
  };

  const skipSteps = (stepsCount) => setStep((prevStepCount) => prevStepCount + stepsCount);

  if (warning) {
    return (
      <CompletedScreen
        visible
        result={0}
        background
        warningType
        titleStyle={styles.modalTitle}
        onClose={warning.onClose}
        onPressButton={warning.onAction}
        title={warning.title}
        descr={warning.description}
        buttonTitle={warning.cta}
        analyticName='Sniffles_POC_SchErro'
      />
    );
  }

  if (isCompletedModalVisible) {
    return (
      <CompletedScreen
        buttonTitle={t(`${successTranslationsPath}.gotIt`)}
        onPressButton={resetNavigationAndState}
        visible
        result={2}
        background
        onClose={resetNavigationAndState}
        title={t(`${successTranslationsPath}.successTitle`)}
        descr={t(`${successTranslationsPath}.successSubtitle`)}
        analyticName='Sniffles_POC_ApptConf'
      />
    );
  }

  if (!userId) {
    LogEvent('Sniffles_POC_User_screen');
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
      hasCouponCode={!!promoCode}
      analyticsName={analyticsName}
      onBack={onBack}
    />
  );

  const renderButton = () =>
    !stepsWithoutNextButton.includes(step) && (
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
          {!steps[step]?.withoutButton && renderButton()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SnifflesQuestionnaire;

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
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.familyBold,
    marginHorizontal: 10,
  },
});
