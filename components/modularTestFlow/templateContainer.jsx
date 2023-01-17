/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Header from './components/header';
import Footer from './components/footer';
import ContentWithImageV1 from './templates/ContentWithImageV1';
import ContentWithImageV2 from './templates/ContentWithImageV2';
import AgreementWithCheckV1 from './templates/AgreementWithCheckV1';
import ZipcodeInputV1 from './templates/ZipcodeInputV1';
import OptionalMultiSelectV1 from './templates/OptionalMultiSelectV1';
import MonthlyCalendarV1 from './templates/MonthlyCalendarV1';
import TimerV1 from './templates/TimerV1';
import TakePhotoV1 from './templates/TakePhotoV1';
import FormSingleSelectorV1 from './templates/FormSingleSelectorV1';
import TestResultV1 from './templates/TestResultV1';
import TestResultV2 from './templates/TestResultV2';
import TestCompleteV1 from './templates/TestCompleteV1';
import QuestionSelectV1 from './templates/QuestionSelectV1';
import { LogEvent } from '../../analytics';
import QuizResult from '../../screens/Vitamin/QuizResult';
import ResultSelectV1 from './templates/ResultSelectV1';
import parseForVars from './utils/parser';
import { axiosInstanceNoBase } from '../../utilis/axios';
import LoadingTemplate from './templates/LoadingTemplate';
import DisclaimerV1 from './templates/DisclaimerV1';
import ActionListV1 from './templates/ActionListV1';
import { getDifferenceInYears } from '../../utilis/dateTime';

const FULL_SCREEN_TEMPLATES = ['take_photo_v1', 'logic_only'];

const submitResult = async (submitObj, _vars) => {
  try {
    const url = parseForVars(submitObj.url, _vars);
    const data = {};
    Object.keys(submitObj.arguments).forEach((k) => {
      const arg = parseForVars(submitObj.arguments[k], _vars);
      if (arg !== undefined) data[k] = parseForVars(submitObj.arguments[k], _vars);
      return true;
    });
    const { data: resData } = await axiosInstanceNoBase(url, {
      method: submitObj.method || 'POST',
      data,
      headers: { ...(submitObj.headers || {}) },
    });
    return { success: true, response: resData };
  } catch (err) {
    return { success: false, response: err };
  }
};

const autoNext = (_autoNext, vars) => (_autoNext ? parseForVars(`{{${_autoNext}}}`, vars) : false);

const TemplateContainer = ({ navigateExit }) => {
  const intervalRef = useRef();
  const remainingRef = useRef();
  const localVarsRef = useRef({});
  const setLocalVars = (_vars) => {
    localVarsRef.current = _vars;
    return true;
  };
  const [globalVars, setGlobalVars] = useState({});

  const navigation = useNavigation();

  const flowId = useSelector((state) => state.modularTestFlow.flowUuid);
  const templates = useSelector((state) => state.modularTestFlow.templates[flowId]);
  const firstTemplateId = Object.keys(templates)[0];
  const [templateIdStack, setTemplateIdStack] = useState([firstTemplateId]);
  const templateId = useRef(firstTemplateId);
  const currentTemplate = templates[templateId.current];

  const { users, usersLookup } = useSelector((s) => s.user);
  const user = users[0] && usersLookup[users[0]];
  const systemVars = useMemo(
    () => ({
      today: new Date(),
      first_name: user.first_name,
      is_minor: getDifferenceInYears(user?.dob) < 14,
      flow_id: flowId,
    }),
    [user?.dob, user.first_name, flowId]
  );

  const analyticName = currentTemplate?.analytics_name
    ? currentTemplate?.analytics_name?.replace('-', '_')
    : currentTemplate?.step_name;

  const varsGlobalSystem = { global: globalVars, system: systemVars };

  const [backEnabled, setBackEnabled] = useState(
    parseForVars(`{{${currentTemplate?.back_button?.enabled}}}`, varsGlobalSystem)
  );
  const [backVisible, setBackVisible] = useState(
    parseForVars(`{{${currentTemplate?.back_button?.visibility}}}`, varsGlobalSystem)
  );
  const [nextEnabled, setNextEnabled] = useState(
    parseForVars(`{{${currentTemplate?.next_button?.enabled}}}`, varsGlobalSystem)
  );

  // analytics
  useEffect(() => {
    LogEvent(`${analyticName}_screen`);
  }, [analyticName]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const pushTemplateId = (id) => {
    const newStack = [...templateIdStack];
    newStack.push(id);
    templateId.current = id;
    setTemplateIdStack(newStack);
  };

  const popTemplateId = () => {
    const newStack = [...templateIdStack];
    const poppedElement = newStack.pop();
    const topElement = newStack[newStack.length - 1];
    templateId.current = topElement;
    // LogEvent(`${templateId.current.analytic_name}_screen`);
    setTemplateIdStack(newStack);
    return poppedElement;
  };

  const onBack = () => {
    LogEvent(`${analyticName}_click_Back`);

    const allVars = {
      global: globalVars,
      system: systemVars,
    };

    if (templateIdStack.length > 1) {
      popTemplateId();

      setBackEnabled(
        parseForVars(`{{${templates[templateId.current]?.back_button?.enabled}}}`, allVars)
      );
      setBackVisible(
        parseForVars(`{{${templates[templateId.current]?.back_button?.visibility}}}`, allVars)
      );
      setNextEnabled(
        parseForVars(`{{${templates[templateId.current]?.next_button?.enabled}}}`, allVars)
      );
      setLocalVars({});
    } else {
      navigation.goBack();
    }
    setLocalVars({});
  };

  const onExit = (data) => {
    LogEvent(`${analyticName}_click_Close`);

    navigateExit(data);
  };

  const updateGlobalVars = (_putGlobalObj, _dropGlobalArr = [], _vars) => {
    // disabled in order to extract just the local vars in a separate object
    // eslint-disable-next-line no-unused-vars
    const { global, system, ...local } = _vars;

    Object.keys(_putGlobalObj || {}).forEach((key) => {
      if (_putGlobalObj[key] === 'timer') {
        remainingRef.current = local.timer.remaining;
        intervalRef.current = setInterval(() => {
          remainingRef.current -= 1;
          setGlobalVars((s) => ({
            ...s,
            [key]: { type: 'timer', remaining: remainingRef.current },
          }));
          handleUpdateVars(
            {
              global: {
                [key]: { type: 'timer', remaining: remainingRef.current },
              },
            },
            true
          );
          if (remainingRef.current < 1) {
            clearInterval(intervalRef.current);
          }
        }, 1000);
      }

      const parsedVar = parseForVars(`{{${_putGlobalObj[key]}}}`, _vars);
      if (parsedVar) {
        setGlobalVars((s) => ({
          ...s,
          [key]: parsedVar,
        }));
      }
    });

    _dropGlobalArr.forEach((item) => {
      if (globalVars[item]?.type === 'timer') {
        clearInterval(intervalRef.current);
      }

      setGlobalVars((s) => {
        // disabled because we need to specify a name since the item are extracting out is a var [item]
        // eslint-disable-next-line no-unused-vars
        const { [item]: droppedItem, ...rest } = s;
        return rest;
      });
    });
  };

  const onNext = () => handleUpdateVars({ triggeredByNext: true });

  const goNext = async (id, _vars = {}) => {
    const template = templates[id];
    let allVars = { ..._vars };
    if (template?.template_arguments?.submit_result && !_vars.submitted_response) {
      const res = await submitResult(template.template_arguments.submit_result, allVars);
      allVars = { ...allVars, submit_result: res };
    }

    let templateFound = false;
    template.step_logic.forEach((item) => {
      if (!templateFound && parseForVars(`{{${item.condition}}}`, allVars)) {
        if (Object.keys(templates).includes(item.step)) {
          templateFound = true;
          pushTemplateId(item.step);
          setBackEnabled(
            parseForVars(`{{${templates[item.step]?.back_button?.enabled}}}`, varsGlobalSystem)
          );
          setBackVisible(
            parseForVars(`{{${templates[item.step]?.back_button?.visibility}}}`, varsGlobalSystem)
          );
          setNextEnabled(
            parseForVars(`{{${templates[item.step]?.next_button?.enabled}}}`, varsGlobalSystem)
          );
        }
      }
    });

    // dispatch(pushAnswers(allVars));
    if (templateFound) {
      updateGlobalVars(template.put_global, template.drop_global, allVars);

      setLocalVars({});
      LogEvent(`${analyticName}_click_Next`);
    } else {
      onExit({ ...allVars.global });
    }
  };

  const handleUpdateVars = async (vars = {}) => {
    const { global: _globalVars = {}, ..._localVars } = vars;

    const localVarsCurrent = localVarsRef.current;

    const allVars = {
      ...localVarsCurrent,
      ..._localVars,
      global: { ...globalVars, ..._globalVars },
      system: systemVars,
    };

    // // determine if we should go next automatically
    if (autoNext(templates[templateId.current]?.auto_next, allVars) || _localVars.triggeredByNext) {
      goNext(templateId.current, allVars);
    } else {
      setBackEnabled(
        parseForVars(`{{${templates[templateId.current]?.back_button?.enabled}}}`, allVars)
      );
      setBackVisible(
        parseForVars(`{{${templates[templateId.current]?.back_button?.visibility}}}`, allVars)
      );
      setNextEnabled(
        parseForVars(`{{${templates[templateId.current]?.next_button?.enabled}}}`, allVars)
      );
      setLocalVars({ ...localVarsRef.current, ..._localVars });
    }
  };

  const getProgres = () => {
    const index = Object.keys(templates).findIndex((item) => item === currentTemplate.id);
    const procent =
      ((index + 1) * 100) /
      Object.keys(templates).filter((i) => templates[i].template_name !== 'submit_result_v1')
        .length;
    return `${procent}%`;
  };

  const getTemplate = () => {
    const propsToInject = {
      args: currentTemplate.template_arguments,
      vars: varsGlobalSystem,
      onAction: handleUpdateVars,
    };

    if (currentTemplate?.template_name) {
      switch (currentTemplate.template_name) {
        case 'content_with_image_v1':
          return <ContentWithImageV1 {...propsToInject} />;
        case 'content_with_image_v2':
          return <ContentWithImageV2 {...propsToInject} />;
        case 'agreement_with_check_v1':
          return <AgreementWithCheckV1 {...propsToInject} />;
        case 'zipcode_input_v1':
          return <ZipcodeInputV1 {...propsToInject} />;
        case 'optional_multi_select_v1':
          return <OptionalMultiSelectV1 {...propsToInject} />;
        case 'question_select_v1':
          return <QuestionSelectV1 {...propsToInject} />;
        case 'question_multiply_select_v1':
          return <QuestionSelectV1 multi {...propsToInject} />;
        case 'result_select_v1':
          return <ResultSelectV1 handleClose={onExit} {...propsToInject} />;
        case 'monthly_calendar_v1':
          return <MonthlyCalendarV1 {...propsToInject} />;
        case 'timer_comp_v1':
          return <TimerV1 {...propsToInject} />;
        case 'take_photo_v1':
          return <TakePhotoV1 {...propsToInject} />;
        case 'form_single_selector_v1':
          return <FormSingleSelectorV1 {...propsToInject} />;
        case 'test_result_v1':
          return <TestResultV1 {...propsToInject} />;
        case 'test_result_v2':
          return <TestResultV2 {...propsToInject} />;
        case 'test_complete_v1':
          return <TestCompleteV1 {...propsToInject} />;
        case 'quiz_result_v1':
          return <QuizResult {...propsToInject} />;
        case 'disclaimer_v1':
          return <DisclaimerV1 {...propsToInject} />;
        case 'submit_result_v1':
          return <LoadingTemplate {...propsToInject} />;
        case 'action_list_v1':
          return <ActionListV1 {...propsToInject} />;
        default:
          return (
            <View>
              <Text>ERROR</Text>
            </View>
          );
      }
    } else {
      navigation.goBack();
      return true;
    }
  };

  const isFullScreen = FULL_SCREEN_TEMPLATES.includes(currentTemplate.template_name);

  const ScreenWrapper = isFullScreen ? View : SafeAreaView;

  return (
    <ScreenWrapper style={styles.screen} key={currentTemplate.id}>
      {!isFullScreen && (
        <Header
          title={currentTemplate?.template_arguments?.title}
          compInsteadTitle={currentTemplate?.template_arguments?.title === null}
          progres={getProgres()}
          hideBackButton={!backVisible}
          enableBackButton={backEnabled}
          onBack={onBack}
          onExit={onExit}
          vars={varsGlobalSystem}
        />
      )}
      <View style={styles.contentContainer}>{getTemplate()}</View>
      {!isFullScreen && (
        <Footer
          containerStyle={styles.containerNextButton}
          buttonStyle={styles.nextButton}
          overrideButtonText={currentTemplate?.next_button?.text_logic[0]?.text}
          nextEnabled={nextEnabled}
          onNext={onNext}
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  containerNextButton: {
    width: '100%',
  },
  nextButton: {
    width: '100%',
    fontFamily: 'Museo_700',
    fontSize: 16,
  },
});

export default TemplateContainer;
