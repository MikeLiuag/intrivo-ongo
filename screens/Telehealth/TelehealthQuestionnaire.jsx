/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, BackHandler, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { differenceInYears } from 'date-fns';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { fonts } from '../../theme/fonts';
import telehealthSteps from './constants';
import DependentsList from '../Dependents/DependentsList';
import { setLongCovidState, clearLongCovid } from '../../store/longCovid/slice';
import { colors } from '../../theme';
import ScreenWrapper from '../ScreenWrapper';
import { dimensions } from '../../theme/dimensions';
import { LogEvent } from '../../analytics';

const TelehealthQuestionnaire = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();

  const [step, setStep] = useState(0);
  const {
    longCovid: longCovidState,
    user: { users, usersLookup },
  } = useSelector(({ longCovid, user }) => ({ longCovid, user }));

  const steps = telehealthSteps(longCovidState);

  const analyticsName = !longCovidState?.userInfo?.id
    ? 'LCOVID_Virtual_User'
    : `${steps[step]?.analytics}`;

  const {
    title,
    withoutButton,
    hasSeveralAnswers,
    component: StepComponent,
    isDisabled: buttonDisabled,
  } = steps[step];

  const progress = ((step + 1) / steps.length) * 100;
  const isLastStep = step === steps.length - 1;

  const isDependent = longCovidState.userInfo.id !== users[0];
  const age = longCovidState.userInfo.id
    ? differenceInYears(new Date(), new Date(usersLookup[longCovidState.userInfo.id].dob))
    : null;
  const isMinor = age < 18;

  useEffect(() => {
    if (step === 0) {
      LogEvent(isDependent ? `${analyticsName}_D_screen` : `${analyticsName}_M_screen`);
    } else {
      LogEvent(`${analyticsName}_screen`);
    }
  }, [step, analyticsName, isDependent]);

  const onBack = () => {
    LogEvent(`${analyticsName}_click_Back`);
    if (!step) return onChangeState({}, 'userInfo');
    if (isLastStep && !longCovidState.isPayedByInsurance) {
      return setStep((currentStep) => currentStep - 2);
    }

    return setStep((currentStep) => currentStep - 1);
  };

  const onExit = () => {
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          LogEvent(`${analyticsName}_click_Close`);
          goBack();
          dispatch(clearLongCovid());
        },
      },
      {
        text: t('yesNo.No'),
        style: 'cancel',
      },
    ]);
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  });

  const onPressNext = () => {
    LogEvent(`${analyticsName}_click_Next`);
    if (isLastStep) {
      return navigate('TelehealthReview');
    }

    return setStep((currentStep) => currentStep + 1);
  };

  const onChangeState = (value, fieldName, goToNextStep) => {
    if (goToNextStep) onPressNext();

    dispatch(setLongCovidState({ value, fieldName }));
  };

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

    onChangeState(userInfo, 'userInfo');
  };

  const skipSteps = (stepsCount) => setStep((prevStepCount) => prevStepCount + stepsCount);

  if (!longCovidState.userInfo.id) {
    LogEvent('LCOVID_Virtual_User_screen');
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
      skipSteps={skipSteps}
      isDependent={isDependent}
      onChangeState={onChangeState}
      isMinor={isMinor}
      // TODO @Ivan to fix
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...longCovidState}
    />
  );

  const renderDescription = () =>
    hasSeveralAnswers && (
      <Text style={styles.subtitle}>{t('screens.telehealth.questions.selectThatApply')}</Text>
    );

  const renderButton = () =>
    !withoutButton && (
      <BlueButton
        style={styles.bottomButton}
        title='Next'
        disabled={buttonDisabled}
        action={onPressNext}
      />
    );

  return (
    <ScreenWrapper navStyle='flow' onBack={onBack} onExit={onExit} progress={`${progress}%`}>
      <View style={styles.content}>
        <Text style={styles.title}>{t(title)}</Text>
        {renderDescription()}
        <View style={styles.stepContainer}>{renderStep()}</View>
        {renderButton()}
      </View>
    </ScreenWrapper>
  );
};

export default TelehealthQuestionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: dimensions.pageMarginHorizontal,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    lineHeight: 36,
  },
  stepContainer: {
    flex: 1,
    marginTop: 24,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.greyDark2,
    fontFamily: fonts.familyLight,
  },
  bottomButton: { marginBottom: 20 },
});
