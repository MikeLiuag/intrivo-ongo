/* eslint-disable global-require */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import formatUrl from '../../components/modularTestFlow/utils/formatUrl';
import {
  getCompletedLongCovidQuizApi,
  getCurrentQuestionnairesResultTemporaryApi,
  getLongCovidTemplatesApi,
  getQuizApi,
  getSnifflesAssessmentApi,
  getTemplatesApi,
  postTestResultData,
  submitResultLongCovidTemporaryApi,
  submitResultSnifflesTemporaryApi,
} from '../../endpoints/modularTestFlow';

export const getTemplates = createAsyncThunk(
  'modularTestFlow/getTemplates',
  async (type, { rejectWithValue }) => {
    try {
      // const { data } = await getTemplatesApi(type); // we are calling this api only for showing loader it will be replaced with actual
      const { data: response } =
        type === '0000e111-de6f-4886-a50b-26bb9d1cfca5'
          ? await getTemplatesApi(type)
          : require('../../components/modularTestFlow/utils/carestart.json');
      const steps = {};
      response.steps.forEach((step) => {
        steps[step.id] = step;
      });
      return { steps, flowUuid: type };
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to Fetch Templates',
        status: error?.response.status,
      });
    }
  }
);

export const getUploadTest = createAsyncThunk(
  'modularTestFlow/uploadCompletedTest',
  async (_, { rejectWithValue }) => {
    try {
      await getTemplatesApi(); // we are calling this api only for showing loader it will be replaced with actual
      const { data: response } = require('../../utilis/templateUploadTest.json');
      const steps = {};
      response.steps.forEach((step) => {
        steps[step.id] = step;
      });
      const type = 'upload_test';
      return { steps, type };
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage,
        subtitle: 'Unable to fetch upload test',
      });
    }
  }
);

export const getQuiz = createAsyncThunk(
  'modularTestFlow/getQuiz',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getQuizApi();
      const steps = {};
      data.data.steps.forEach((step) => {
        steps[step.id] = step;
      });
      const type = 'quiz';
      return { steps, type };
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to fetch quiz',
        status: error?.response.status,
      });
    }
  }
);

export const getSnifflesAssessment = createAsyncThunk(
  'modular/getSnifflesAssesment',
  async (type, { rejectWithValue }) => {
    try {
      const { data: response } = await getSnifflesAssessmentApi(type);
      const steps = {};
      response.data.steps.forEach((step) => {
        steps[step.id] = step;
      });
      return { steps, flowUuid: response.data.uuid };
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to fetch sniffles assesment',
        status: error?.response.status,
      });
    }
  }
);

export const getLongCovidQuiz = createAsyncThunk(
  'modular/getLongCovidQuiz',
  async (_, { rejectWithValue }) => {
    try {
      const { data: response } = await getLongCovidTemplatesApi();
      // const response = require('../../utilis/templateLongCovid.json');
      const steps = {};
      response.data.steps.forEach((step) => {
        steps[step.id] = step;
      });
      return { steps, flowUuid: response.uuid };
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to fetch long covid quiz',
        status: error?.response.status,
      });
    }
  }
);

export const saveTestNameAndUuid = createAction('test/saveTestNameAndUuid');

export const addTemplateToStack = createAsyncThunk(
  'modularTestFlow/addTemplateToStack',
  async (templateId, { rejectWithValue }) => {
    try {
      return templateId;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to go to next step',
        status: error?.response.status,
      });
    }
  }
);

export const formatAndPostData = createAsyncThunk(
  'modularTestFlow/formatAndPostData',
  async ({ url, data }, { rejectWithValue, getState }) => {
    try {
      const modularState = getState().modularTestFlow;
      const formatedUrl = formatUrl({ url, modularState });
      if (!formatedUrl) {
        return rejectWithValue({
          message: 'Formatind error',
          subtitle: 'Unable to format and post result data',
        });
      }
      return postTestResultData({ url: formatedUrl, data });
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to format and post result data',
        status: error?.response.status,
      });
    }
  }
);

export const getCompletedLongCovidQuiz = createAsyncThunk(
  'modularTestFlow/getCompletedLongCovidQuiz',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { users } = getState().user;
      const longCovidResults = [];
      const getLongCovidPromises = users.map((uuid) => getCompletedLongCovidQuizApi(uuid));
      const results = await Promise.all(getLongCovidPromises.map((p) => p.catch((e) => e)));
      const successfulResults = results
        .map((r, i) => ({ userId: users[i], ...r }))
        .filter((r) => !(r instanceof Error));
      successfulResults.forEach(({ userId, data }) => {
        (data?.data || []).forEach((d) => longCovidResults.push({ ...d, userId }));
      });
      return longCovidResults;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to fetch data',
        status: error?.response.status,
      });
    }
  }
);

export const submitSnifflesTemporary = createAsyncThunk(
  'modular/submitSnifflesTemporary',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const answersIds = [];
      Object.keys(data).forEach((key) => {
        if (!Array.isArray(data[key])) {
          answersIds.push({
            questionnaire_answer_ids: [data[key].id],
          });
        } else {
          const questionnaireAnswerIds = data[key].map((item) => item.id);
          answersIds.push({
            questionnaire_answer_ids: questionnaireAnswerIds,
          });
        }
      });
      const formatedData = {
        data: {
          user_questionnaire: {
            user_questionnaire_answers: answersIds,
          },
        },
      };
      const { data: resp } = await submitResultSnifflesTemporaryApi(formatedData);
      const { data: resultResponse } = await getCurrentQuestionnairesResultTemporaryApi(
        resp.data?.related_object?.id
      );
      return resultResponse.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to submit results',
        status: error?.response.status,
      });
    }
  }
);

export const submitLongCovidTemporary = createAsyncThunk(
  'modular/submitLongCovidTemporary',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const answersIds = [];
      Object.keys(data).forEach((key) => {
        if (!Array.isArray(data[key])) {
          answersIds.push({
            questionnaire_answer_ids: [data[key].id],
          });
        } else {
          const questionnaireAnswerIds = data[key].map((item) => item.id);
          answersIds.push({
            questionnaire_answer_ids: questionnaireAnswerIds,
          });
        }
      });
      const formatedData = {
        data: {
          user_questionnaire: {
            user_questionnaire_answers: answersIds,
          },
        },
      };
      const { data: resp } = await submitResultLongCovidTemporaryApi(formatedData);
      const { data: resultResponse } = await getCurrentQuestionnairesResultTemporaryApi(
        resp.data?.related_object?.id
      );
      dispatch(getCompletedLongCovidQuiz());
      return resultResponse.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to submit results',
        status: error?.response.status,
      });
    }
  }
);

export const getUserQuestionnaire = createAsyncThunk(
  'modular/getUserQuestionnaire',
  async (userQuestionnaireId, { dispatch, rejectWithValue }) => {
    try {
      const response = await getCurrentQuestionnairesResultTemporaryApi(userQuestionnaireId);
      return response?.data?.data;
    } catch (error) {
      return null;
    }
  }
);

export const popTemplateFromStack = createAction('modularTestFlow/removeTemplateFromStack');
export const pushAnswers = createAction('quiz/pushAnswers');

export const cleanAnswers = createAction('quiz/cleanAnswers');

const initialState = {
  templates: {},
  templateStack: [],
  answers: [],
  isTemplatesLoading: false,
  type: null,
  uploadTestTypeAndUuid: null,
  flowUuid: null,
  longCovidResults: [],
  longCovidCurrentResult: null,
  snifflesCurrentResult: null,
};

export const modularTestFlowSlice = createSlice({
  name: 'modularTestFlow',
  initialState,
  reducers: {
    clearModularTestFlow: () => initialState,
    clearLongCovidCurrentResult(state) {
      state.longCovidCurrentResult = null;
    },
    clearSnifflesCurrentResult(state) {
      state.snifflesCurrentResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTemplates.pending, (state) => {
        state.isTemplatesLoading = true;
      })
      .addCase(getTemplates.rejected, (state) => {
        state.isTemplatesLoading = false;
      })
      .addCase(getTemplates.fulfilled, (state, { payload }) => {
        state.isTemplatesLoading = false;
        const keys = Object.keys(payload.steps);
        if (keys.length > 0) {
          state.templateStack = [keys[0]];
        }
        state.templates[payload.flowUuid] = payload.steps;
        state.flowUuid = payload.flowUuid;
      })
      .addCase(getUploadTest.fulfilled, (state, { payload }) => {
        state.isTemplatesLoading = false;
        const keys = Object.keys(payload.steps);
        if (keys.length > 0) {
          state.templateStack = [keys[0]];
        }
        state.templates = payload.steps;
        state.answers = [];
        state.type = payload.type;
      })
      .addCase(getQuiz.fulfilled, (state, { payload }) => {
        state.isTemplatesLoading = false;
        const keys = Object.keys(payload.steps);
        if (keys.length > 0) {
          state.templateStack = [keys[0]];
        }
        state.templates = payload.steps;
        state.answers = [];
        state.type = payload.type;
      })
      .addCase(getLongCovidQuiz.fulfilled, (state, { payload }) => {
        state.isTemplatesLoading = false;
        const keys = Object.keys(payload.steps);
        if (keys.length > 0) {
          state.templateStack = [keys[0]];
        }
        state.templates[payload.flowUuid] = payload.steps;
        state.answers = [];
        state.flowUuid = payload.flowUuid;
      })
      .addCase(getSnifflesAssessment.fulfilled, (state, { payload }) => {
        state.isTemplatesLoading = false;
        const keys = Object.keys(payload.steps);
        if (keys.length > 0) {
          state.templateStack = [keys[0]];
        }
        state.templates[payload.flowUuid] = payload.steps;
        state.answers = [];
        state.flowUuid = payload.flowUuid;
      })
      .addCase(addTemplateToStack.fulfilled, (state, { payload }) => {
        if (payload) {
          state.templateStack.push(payload);
        }
      })
      .addCase(getCompletedLongCovidQuiz.fulfilled, (state, { payload }) => {
        state.longCovidResults = payload.map((item) => ({
          ...item,
          name: item.questionnaire.description,
          date: item.created_at,
        }));
      })
      .addCase(submitLongCovidTemporary.fulfilled, (state, { payload }) => {
        state.longCovidCurrentResult = payload;
      })
      .addCase(submitSnifflesTemporary.fulfilled, (state, { payload }) => {
        state.snifflesCurrentResult = payload;
      })
      .addCase(popTemplateFromStack, (state) => {
        if (state.templateStack.length > 0) {
          state.templateStack.pop();
        }
        if (state.answers.length > 0) {
          state.answers.pop();
        }
      })
      .addCase(pushAnswers, (state, { payload }) => {
        state.answers.push(payload);
      })
      .addCase(saveTestNameAndUuid, (state, { payload }) => {
        state.uploadTestTypeAndUuid = payload;
      })
      .addCase(cleanAnswers, (state) => {
        state.answers = [];
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected'),
        (state, { payload }) => {
          state.globalError = {
            message: payload?.message || undefined,
            subtitle: payload?.subtitle || undefined,
          };
        }
      );
  },
});
export const { clearModularTestFlow, clearLongCovidCurrentResult, clearSnifflesCurrentResult } =
  modularTestFlowSlice.actions;
export default modularTestFlowSlice.reducer;
