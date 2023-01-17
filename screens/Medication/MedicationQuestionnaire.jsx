/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { fonts } from '../../theme/fonts';
import { medicationQuestionnaireSteps } from './constant';
import { setMedicationState } from '../../store/medicationFlow/slice';
import MedFlowWrapper from './components/MedFlowWrapper';
import { LogEvent } from '../../analytics';
import commonStyles from './styles';
import DependentsList from '../Dependents/DependentsList';

const customScreens = ['MedicationUserInfo', 'MedicationFormIdentify', 'TermsConsent'];

const MedicationQuestionnaire = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();

  const { t } = useTranslation();

  const [step, setStep] = useState(0);

  const { medicationFlow: medicationFlowState } = useSelector(({ medicationFlow, user }) => ({
    medicationFlow,
    user,
  }));
  const { users, usersLookup } = useSelector((state) => state.user) || {};

  const {
    activeScreen = '',
    isAllergic = null,
    medicationInUse = null,
    hasCode = null,
    userId = '',
    isRedeemed = false,
  } = medicationFlowState;

  const steps = medicationQuestionnaireSteps(medicationFlowState);

  const {
    title,
    subtitle,
    withoutButton = false,
    component: StepComponent,
    isDisabled: buttonDisabled,
    analyticName,
    buttonTitle = '',
  } = steps[step];

  useEffect(() => {
    if (analyticName) {
      LogEvent(`Sniffles_Async_${analyticName}_screen`);
    }
    dispatch(
      setMedicationState({
        value: steps[step]?.name || '',
        fieldName: 'activeScreen',
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const progress = ((step + 1) / steps.length) * 100;
  const isLastStep = step === steps.length - 1;

  const onBack = () => {
    if (analyticName) {
      LogEvent(`Sniffles_Async_${analyticName}_click_Back`);
    }
    if (!step) {
      if (userId) {
        onChangeState(null, 'userId');
        onChangeState({}, 'userInfo');
      }
      return goBack();
    }
    let stepCount = step;
    if (
      (activeScreen === 'MedicationUseStatus' && userId) ||
      (activeScreen === 'MedicationAllergyStatus' &&
        medicationInUse?.toUpperCase()?.includes('NO')) ||
      (activeScreen === 'MedicationRespiratoryStatus' && isAllergic?.toUpperCase()?.includes('NO'))
    ) {
      stepCount -= 2;
    } else if (activeScreen === 'MedicationStripePayment') {
      stepCount -= 2;
    } else if (activeScreen === 'MedicationCodeVerify') {
      stepCount += 1;
    } else {
      stepCount -= 1;
    }
    setStep(stepCount);
    return true;
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  });

  const onPressNext = () => {
    if (analyticName) {
      LogEvent(`Sniffles_Async_${analyticName}_click_Next`);
    }
    if (isLastStep) {
      return navigate('MedicationReview');
    }
    if (
      // (activeScreen === 'MedicationSymptomsCheck' && userId) ||
      (activeScreen === 'TermsConsent' && !isRedeemed) ||
      (activeScreen === 'MedicationCodeVerify' && hasCode?.toUpperCase()?.includes('YES'))
    ) {
      return skipSteps(2);
    }

    return setStep((currentStep) => currentStep + 1);
  };

  const onChangeState = (value, fieldName, goToNextStep) => {
    if (goToNextStep) onPressNext();

    dispatch(setMedicationState({ value, fieldName }));
  };

  const skipSteps = (stepsCount) => setStep((prevStepCount) => prevStepCount + stepsCount);

  const onSelectUser = (id) => {
    const user = usersLookup[id];
    const currentUser = usersLookup[users[0]];

    const userInfo = {
      id,
      fullName: user.fullName,
      firstName: user.first_name,
      lastName: user.last_name,
      dob: user.dob,
      email: currentUser?.email,
      phoneNumber: currentUser?.phone?.number,
    };

    onChangeState(id, 'userId');
    onChangeState(userInfo, 'userInfo');
  };

  if (!userId) {
    LogEvent(`Sniffles_Async_User_screen`);
    return (
      <DependentsList
        hideArrows
        includeSelf
        headerLeft={null}
        addNewStyle='list'
        headerRight={['x', onBack]}
        header={t('dependentsList.header')}
        title='Who is this appointment for?'
        onSelectUser={(id) => onSelectUser(id)}
      />
    );
  }

  const renderStep = () => (
    <StepComponent
      skipSteps={skipSteps}
      onChangeState={onChangeState}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...medicationFlowState}
      onPressNext={onPressNext}
      userId={userId}
    />
  );

  const isCustomScreen = customScreens.includes(activeScreen);
  const isUserScreen = customScreens.slice(0, 2).includes(activeScreen);

  const renderButton = () =>
    !withoutButton ? (
      <BlueButton
        style={[styles.bottomButton, isCustomScreen ? { marginHorizontal: 24 } : {}]}
        title={buttonTitle ? t(buttonTitle) : t('screens.medicationFlow.buttons.next')}
        disabled={buttonDisabled}
        action={onPressNext}
      />
    ) : null;

  return (
    <>
      <MedFlowWrapper
        progress={progress}
        onBack={onBack}
        onPressButton={onPressNext}
        analyticName={analyticName}
      >
        <View
          style={[
            styles.content,
            isCustomScreen
              ? {
                  paddingHorizontal: 0,
                  marginTop: isUserScreen ? 0 : 30,
                }
              : {},
          ]}
        >
          {!!title && (
            <Text style={[styles.title, isCustomScreen ? { paddingHorizontal: 24 } : {}]}>
              {t(title)}
            </Text>
          )}
          {!!subtitle && <Text style={commonStyles.subtitle}>{t(subtitle)}</Text>}
          <KeyboardAvoidingView
            style={styles.stepContainer}
            behavior={Platform.select({ ios: 'padding' })}
          >
            {renderStep()}
          </KeyboardAvoidingView>
          {renderButton()}
        </View>
      </MedFlowWrapper>
    </>
  );
};

export default MedicationQuestionnaire;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
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
  bottomButton: { marginBottom: 20 },
});
