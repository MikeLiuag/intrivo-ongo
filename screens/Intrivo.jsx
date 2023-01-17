import React, { useState, useEffect, useCallback } from 'react';
import { Alert, BackHandler } from 'react-native';
import IntrivoWorkflow from 'IntrivoWorkflow';
import IntivoWorkflowOne from 'IntrivoWorkflow-One';
import IntrivoWorkflowCareStart from 'IntrivoWorkflowCareStart';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { useTranslation } from 'react-i18next';
import { createObservation, getTestsList, setNagativeTestComplete } from '../store/app/slice';
import { getQRToken, getUserReportSetting } from '../store/user/slice';
import ScanBarCode from './ScanBarCode';
import DependentsList from './Dependents/DependentsList';
import { LogEvent } from '../analytics';
import AnthemConsentScreen from './Anthem/AnthemConsentScreen';
import CompletedScreen from '../components/CompletedScreen';
import { QR_CODE_URL } from '../utilis/axios';
import NIHStack from './NIHReporting';
import { getDifferenceInYears } from '../utilis/dateTime';

// notification settings
const notificationAfterNSecs = (name) => (name === 'On/Go One' ? 14 * 60 : 9 * 60);
const notificationContent = {
  title: 'Please return immediately to the On/Go app',
  body: 'Your test result is ready and must be read within the given timeframe to be valid.',
  data: { showInApp: false },
  sound: true,
};

const selectTest = (testName) => {
  switch (testName) {
    case 'Anthem':
    case 'Carestart':
    case 'CareStart':
      return 'CareStart';
    case 'On/Go':
      return 'On/Go';
    case 'On/Go One':
      return 'On/Go One';
    default:
      return null;
  }
};

const DashBoardScreens = ['Timeline', 'Home', 'Wallet', 'ProfileList'];

const Intrivo = ({ navigation, route }) => {
  const {
    uuid: uuidFromProps,
    testName: testNameFromProps,
    barcode: barcodeFromProps = null,
  } = route.params || {};
  const [isModal, setModal] = useState({ visible: false, result: null });
  const [uuid, setUuid] = useState(uuidFromProps || null);
  const [testName, setTestName] = useState(selectTest(testNameFromProps));
  const [barcode, setBarCode] = useState(barcodeFromProps || null);

  const [hasCameraPermission, setCameraPermission] = useState(false);

  const [anthemPreScreensCompleted, setAnthemPreScreensCompleted] = useState(null);
  const [symptomsArray, setSymptomsArray] = useState(null);
  const [observationsObject, setObservationObject] = useState({});

  const [curStepName, setCurStepName] = useState('ReadyToGo');
  const [needSendResult, setNeedSendResult] = useState(true);
  const [notificationCall, setNotificationCall] = useState(null);
  const [nihReporting, setNihReporting] = useState(false);
  const [agreementId, setAgreementId] = useState();

  const dispatch = useDispatch();
  const users = useSelector((s) => s.user.users);
  const usersLookup = useSelector((s) => s.user.usersLookup);
  const globalError = useSelector((state) => state.app.globalError) ?? null;

  // popup
  const carePopup = useSelector((state) => state.app.carePopup);
  const vitaminPopup = useSelector((state) => state.app.vitaminPopup);
  const quiz = useSelector((state) => state.app.quiz);
  const reportingPopup = useSelector((s) => s.app.reportingPopup);
  const paxlovidIntegration = useSelector((state) => state.app.paxlovidIntegration);
  const observations = useSelector((state) => state.user.observations);
  const sniffleNegativeResultTile = useSelector((state) => state.app.sniffleNegativeResultTile);
  const { snifflesAssessmentOptionB: optionB } = useSelector(({ app }) => app.firebase);

  const observationTypes = useSelector((s) => s.app.observationTypes);
  const { uuid: observationId } = observationTypes['covid-19-rapid-antigen-test'];

  const logTestName = useCallback(() => {
    switch (testName) {
      case 'On/Go':
        return 'OG';
      case 'On/Go One':
        return 'OGO';
      case 'CareStart':
        return 'CS';
      default:
        return null;
    }
  }, [testName]);

  const { t, i18n } = useTranslation();

  const hardwareBackPressCustom = () => true;

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressCustom);
    };
  });

  const checkUserAgreement = useCallback(async () => {
    const response = await dispatch(getUserReportSetting());
    const { payload } = response;
    if (response?.type.includes('fulfilled')) {
      const { data } = payload;
      if (data && data?.length > 0) {
        const shareResultAgreement = data.filter(
          (item) =>
            item.agreement_subject === 'Share results' &&
            (item.status === 'pending' || item.status === 'outdated')
        );
        if (shareResultAgreement.length > 0) {
          const pendingAgreement = shareResultAgreement[0];
          const { agreement_uuid: agreementUUID } = pendingAgreement;
          setAgreementId(agreementUUID);
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTestsList());
    checkUserAgreement();
  }, [dispatch, checkUserAgreement]);

  useEffect(() => {
    if (testName && uuid) {
      LogEvent(`Test_${logTestName()}_${curStepName}_screen`);
    }
  }, [logTestName, uuid, curStepName, testName]);

  useEffect(() => {
    if (testName) LogEvent('StartTestFlow', testName);
    if (!globalError && uuid) dispatch(getQRToken({ uuid }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testName, uuid, dispatch]);

  const handleRightClick = () => {
    LogEvent(`Test_${logTestName()}_ChooseUser-click-Close`);
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          LogEvent(`Test_${logTestName()}_ChooseUser-click-Close-yes`);
          navigation.navigate('Dashboard');
        },
      },
      {
        text: t('yesNo.No'),
        style: 'cancel',
      },
    ]);
  };

  // In order to start the appropriate test for the correct user, we need to check if
  //  the user's uuid and testName was supplied. If not, we need to navigate the user to
  //  the appropriate screen to collect that information before continuing.
  if (!testName)
    return (
      <ScanBarCode
        onSelectTest={(test, b) => {
          setTestName(selectTest(test));
          if (test === 'Anthem') {
            setBarCode(b);
            setAnthemPreScreensCompleted(false);
          }
        }}
        setCameraPermission={(status) => setCameraPermission(status)}
      />
    );

  if (!nihReporting && agreementId && reportingPopup) {
    return (
      <NIHStack
        testName={testName}
        agreementId={agreementId}
        onAction={() => {
          LogEvent('ShareResults_click_Next');
          setNihReporting(true);
        }}
      />
    );
  }
  if (!uuid)
    return (
      <DependentsList
        title={t('dependentsList.title')}
        onSelectUser={setUuid}
        header={t('dependentsList.header')}
        headerLeft={null}
        headerRight={['x', () => handleRightClick()]}
        hideArrows
        addNewStyle='list'
        includeSelf
        testName={testName}
      />
    );

  if (anthemPreScreensCompleted === false)
    return <AnthemConsentScreen onAction={() => setAnthemPreScreensCompleted(true)} />;

  const { first_name: fname, last_name: lname, dob } = usersLookup[uuid] || null;

  // switching between test flows
  const getTestComponent = () => {
    switch (testName) {
      case 'CareStart': {
        return IntrivoWorkflowCareStart;
      }
      case 'On/Go': {
        return IntrivoWorkflow;
      }
      case 'On/Go One': {
        return IntivoWorkflowOne;
      }
      default: {
        return null;
      }
    }
  };
  const TestComponent = getTestComponent();

  const isMinor = getDifferenceInYears(dob) < 14;

  const removeNotificationCall = async () => {
    await Notifications.cancelScheduledNotificationAsync(notificationCall);
  };

  const returnObservationName = (name) => {
    switch (name) {
      case 'CareStart':
        return 'CareStart™ COVID-19 Antigen Home Test';
      case 'On/Go':
        return 'On/Go™ COVID-19 Antigen Self-Test';
      case 'On/Go One':
        return 'On/Go™ One COVID-19 Antigen Self-Test';
      default:
        return 'On/Go™ COVID-19 Antigen Self-Test';
    }
  };

  const onStartSample = async ({ symptomsArray: symptomsArrayProp = [] }) => {
    LogEvent('TestTimerStarted');
    const observation = {
      observation_type_id: observationId,
      name: returnObservationName(testName),
      started_at: new Date(),
      description: 'Self-test app',
      data: { barcode, symptomsArray: symptomsArrayProp },
    };
    setSymptomsArray(symptomsArrayProp);
    setObservationObject(observation);

    const notification = await Notifications.scheduleNotificationAsync({
      content: {
        ...notificationContent,
      },
      trigger: { seconds: notificationAfterNSecs(testName) },
    });
    setNotificationCall(notification);
  };

  const formatResultObjs = (resultsObj) => {
    const resultData = {
      barcode: resultsObj.barcode ? resultsObj.barcode : null,
      result: resultsObj.result ? resultsObj.result : null,
      value: resultsObj.value ? resultsObj.value : null,
      success: resultsObj.success ? resultsObj.success : null,
      imageId: resultsObj.imageId ? resultsObj.imageId : null,
      zip: resultsObj.zipcode ? resultsObj.zipcode : null,
    };
    const questionnaireData = {
      result: resultsObj.questionnaireResult,
    };
    const data = {
      barcode,
      symptomsArray,
      result_data: resultData,
      questionnaire_data: questionnaireData,
    };
    return { resultData, questionnaireData, data };
  };

  const filterEventByResult = (result) => {
    switch (result) {
      case 1:
        return 'Positive';
      case 0:
        return 'Negative';
      default:
        return 'Invalid';
    }
  };

  const logEventByAction = (resultsObj) => {
    const testResult = filterEventByResult(resultsObj.questionnaireResult);
    if (resultsObj.logCDC) {
      LogEvent(`${testResult}_CDC`);
    }
    if (resultsObj.doCareAndGuidance) {
      return LogEvent(`${testResult}_Care`);
    }
    if (resultsObj.doRetest) {
      return LogEvent(`${testResult}_AnotherTest`);
    }
    if (resultsObj.doShare) {
      return LogEvent(`${testResult}_Share`);
    }
    if (resultsObj.closeButton) {
      return LogEvent(`${testResult}_Close`);
    }
    if (!carePopup && !vitaminPopup && !quiz) {
      return LogEvent(`${testResult}_Continue`);
    }
    return LogEvent(`${testResult}`);
  };

  const onStepAndResult = ({ stepName, resultsObj, type }) => {
    if (stepName === 'ResultsNegative') {
      dispatch(setNagativeTestComplete(true));
    }
    if (
      (curStepName !== 'ResultsNegative' && !vitaminPopup && !quiz) ||
      (curStepName !== 'ResultsPositive' && !carePopup)
    ) {
      LogEvent(`Test_${logTestName()}_${curStepName}_click_${type}`);
    }
    if (resultsObj) {
      const { data } = formatResultObjs(resultsObj);
      dispatch(
        createObservation({
          uuid,
          observation: { ...observationsObject, ended_at: new Date(), data },
        })
      );
      setNeedSendResult(false);
    }
    if (stepName) setCurStepName(stepName);
  };

  const onResults = async ({ resultsObj }) => {
    i18n.setDefaultNamespace('translation');
    // await i18n.reloadResources(null, 'translation');

    const { resultData, data, questionnaireData } = formatResultObjs(resultsObj);
    if (uuid && resultsObj.questionnaireResult >= 0) {
      LogEvent('TestFlowCompleted', resultData);
      logEventByAction(resultsObj);
      if (needSendResult)
        dispatch(
          createObservation({
            uuid,
            observation: { ...observationsObject, ended_at: new Date(), data },
          })
        );
      if (resultsObj.doShare) {
        const QR_URL = `${QR_CODE_URL}/share`;

        const user = usersLookup[users.find((f) => f === uuid)];
        const url = user.qrToken ? `${QR_URL}/${user.qrToken}?hideText=true` : null;
        navigation.reset({
          index: 0,
          routes: [
            { name: 'Dashboard' },
            {
              name: 'WebViewHandler',
              params: {
                url,
                viewshot: true,
                title: `${fname} ${lname} Health Passport`,
              },
            },
          ],
        });
        return;
      }
      // Goto vaccine screen
      if (resultsObj.doVaccine) {
        navigation.navigate('VaccineLanding');
        return;
      }
      if (resultsObj.doRetest) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }, { name: 'Intrivo', params: { testName } }],
        });
        return;
      }
      if (resultsObj.doCareAndGuidance) {
        LogEvent('Plus_Care');
        navigation.dispatch({
          ...CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Dashboard',
                state: {
                  index: 0,
                  routes: [
                    {
                      name: 'CareList',
                      params: {
                        showBack: true,
                      },
                    },
                  ],
                },
              },
            ],
          }),
        });
        return;
      }
      if (questionnaireData.result === 1 && carePopup) {
        LogEvent(`Test_${logTestName()}_Positive_click_Continue`);
        navigation.navigate('CarePopup', { type: logTestName() });
        return;
      }
      if (questionnaireData.result === 0 && vitaminPopup && !resultsObj.closeButton) {
        LogEvent(`Test_${logTestName()}_Negative_click_Continue`);
        navigation.navigate('VitaminPopup', { type: logTestName() });
        return;
      }
      if (questionnaireData.result === 0 && quiz && !resultsObj.closeButton) {
        LogEvent(`Test_${logTestName()}_Negative_click_Continue`);
        navigation.navigate('VitaminDQuiz');
        return;
      }

      if (resultsObj.doTreatment && !needSendResult && questionnaireData.result === 1) {
        if (users[0] === uuid) {
          LogEvent('TestResult_Positive_Mainuser_Click_Getrx');
        } else {
          LogEvent('TestResult_Positive_Depuser_Click_Getrx');
        }
        navigation.reset({
          index: 0,
          routes: [
            { name: 'Dashboard' },
            {
              name: 'PaxlovidIntro',
              params: {
                userId: uuid,
                observationId: observations[0].id,
                observation: observations[0],
              },
            },
          ],
        });
        return;
      }

      if (
        resultsObj.doTreatment &&
        !needSendResult &&
        questionnaireData.result === 0 &&
        sniffleNegativeResultTile
      ) {
        if (users[0] === uuid) {
          LogEvent('TestResult_Negative_Click_Getrx');
        } else {
          LogEvent('TestResult_Negative_Click_Getrx');
        }
        if (optionB) {
          navigation.reset({
            index: 0,
            routes: [
              { name: 'Dashboard' },
              {
                name: 'SnifflesAssessmentQuestionnaire',
                params: {
                  skipToStep: 4,
                  optionB: true,
                  flow: 'B',
                },
              },
            ],
          });
          return;
        }

        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }, { name: 'IntroToSolutionsV2', params: { flow: 'B' } }],
        });

        return;
      }

      setModal({
        visible: true,
        result: questionnaireData.result,
      });
    } else {
      if (notificationCall) removeNotificationCall();
      LogEvent('TestFlowNotCompleted', resultData);
      navigation.navigate('Home');
    }

    // i18n(); // since the Intrivo package replaces the translation file, we need to reinitialize the main translation
  };

  const navigateResult = (value) => {
    const nav =
      symptomsArray?.length && isModal.result === 0 && sniffleNegativeResultTile
        ? 'AssessmentInfoVB'
        : 'Timeline';
    const routes = DashBoardScreens.includes(nav)
      ? [{ name: 'Dashboard', state: { routes: [{ name: nav }] } }]
      : [{ name: 'Dashboard' }, { name: nav }];
    navigation.reset({
      index: 0,
      routes,
    });
    setModal({ ...isModal, visible: value });
  };

  return (
    <>
      <TestComponent
        fullApp
        skipVideo
        name={`${fname} ${lname}`}
        isMinor={isMinor}
        callbackResults={onResults}
        callbackStartTest={onStartSample}
        hasCameraPermission={hasCameraPermission}
        callbackStepAndResult={onStepAndResult}
        onExit={() => {
          // i18n(); // since the Intrivo package replaces the translation file, we need to reinitialize the main translation
          i18n.setDefaultNamespace('translation');
          navigation.navigate('Dashboard');
        }}
        logEvent={LogEvent}
        testingNav={{
          showCarePopup: carePopup,
          showVitaminPopup: vitaminPopup || quiz,
        }}
        paxlovidTreatmentFlag={paxlovidIntegration}
        sniffleNegativeResultTile={sniffleNegativeResultTile}
      />
      {isModal.visible && (
        <CompletedScreen
          visible={isModal.visible}
          result={isModal.result}
          animated
          setModal={navigateResult}
        />
      )}
    </>
  );
};

export default Intrivo;
