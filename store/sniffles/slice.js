import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getDateInAMonth, getTomorrowDate } from '../../utilis/dateTime';
import { getPaymentIntentsApi } from '../../endpoints/events';
import {
  rescheduleAppointment,
  getAvailableSlots,
  cancelAppointment,
  postAppointment,
  getSolutionsAPI,
} from '../../endpoints/sniffle';
import { getAppointmentDetails, postAppointmentRequest } from '../../endpoints/user';
import { NONE_OF_THE_ABOVE } from '../../screens/Medication/constants';
import { getGenderFromDisplayName } from '../../utilis/helpers';
import { saveToLocalStorage, SNIFFLES_ASSESSMENT_KEY } from '../../utilis/localStorage';

const SLICE_NAME = 'sniffles';

export const snifflesFieldNames = Object.freeze({
  USER_LOCATION: 'userLocation',
  USER_INFO: 'userInfo',
  SORE_THROAT: 'soreThroat',
  CONTACT_INFO: 'contactInfo',
  SELECTED_DATE: 'selectedDate',
  PAYMENT_RECORD: 'paymentRecord',
  PROMO_CODE: 'promoCode',
  SELECTED_PHARMACY: 'selectedPharmacy',
  SEX_AT_BIRTH: 'sexAtBirth',
  IS_MEDICATIONS: 'isMedications',
  IS_ALLERGIC: 'isAllergic',
  IS_SMOKE: 'isSmoke',
  IS_TOBACCO: 'isTobacco',
  IS_ALCOHOL: 'isAlcohol',
  HEALTHPROBLEMS: 'healthProblems',
  SYMPTOMS: 'symptoms',
  RISKFACTORS: 'riskFactors',
  EXPOSED_DIAGNOSIS: 'exposedDiagnosis',
  TEMPERATURE: 'temperature',
  TEMPERATURE_MEASUREMENT_UNIT: 'measurementUnit',
  FEVER: 'fever',
  IS_SORE_THROAT: 'isSoreThroat',
  DURATION_OF_SYMPTOMS: 'durationOfSymptoms',
  IS_TESTED_OF_COVID: 'isTestedOfCovid',
  ELIMINATION_SYMPTOMS: 'eliminationSymptoms',
  SOLUTIONS: 'solutions',
  HOW_TO_HELP: 'howToHelp',
  UPDATE_USER_INFO: 'updateUserInfo',
  INPROGRESS: 'inProgress',
});

export const setSnifflesState = createAction(`${SLICE_NAME}/setState`);

export const saveAndCleanSnifflesAssessment = createAsyncThunk(
  `${SLICE_NAME}/cleanSnifflesAssessment`,
  async (_, { getState }) => {
    try {
      const { temperature, fever, isSoreThroat, durationOfSymptoms, isTestedOfCovid, howToHelp } =
        getState().sniffles;
      const answers = {
        fever,
        temperature,
        isSoreThroat,
        durationOfSymptoms,
        isTestedOfCovid,
        howToHelp,
      };
      await saveToLocalStorage(SNIFFLES_ASSESSMENT_KEY, answers);
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const rescheduleSniffleAppointment = createAsyncThunk(
  `${SLICE_NAME}/rescheduleAppointment`,
  async ({ userId, appointmentId, data }, { rejectWithValue }) => {
    try {
      const { data: response } = await rescheduleAppointment(userId, appointmentId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        status: error?.response.status || '',
      });
    }
  }
);

export const submitSnifflesAppointment = createAsyncThunk(
  `${SLICE_NAME}/submitAppointment`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const data = getState().sniffles;
      const { usersLookup } = getState().user;
      const userInfo = usersLookup[data.userId];
      let formatedData = {
        meta: {
          have_sore_throat: data[snifflesFieldNames.SORE_THROAT],
        },
        // promo_code: data[snifflesFieldNames.PROMO_CODE],
        purpose: 'sniffles_observation',
        requested_time: data[snifflesFieldNames.SELECTED_DATE].date,
        requested_time_slot_id: data[snifflesFieldNames.SELECTED_DATE].id,
        user_email: data[snifflesFieldNames.CONTACT_INFO].email,
        user_location_snapshot: {
          address_1: data[snifflesFieldNames.USER_LOCATION].address_1,
          address_2: data[snifflesFieldNames.USER_LOCATION].address_2 ?? '',
          city: data[snifflesFieldNames.USER_LOCATION].city,
          zipcode: data[snifflesFieldNames.USER_LOCATION].zipcode,
          state: data[snifflesFieldNames.USER_LOCATION].state_id,
        },
        user_phone_number: data[snifflesFieldNames.CONTACT_INFO].phoneNumber,
        user_snapshot: {
          dob: userInfo.dob,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          sex: data[snifflesFieldNames.SEX_AT_BIRTH].toLowerCase(),
        },
      };
      if (data[snifflesFieldNames.PAYMENT_RECORD]?.amount === 0) {
        formatedData = {
          data: {
            ...formatedData,
            promo_code: data[snifflesFieldNames.PROMO_CODE],
          },
        };
      } else {
        formatedData = {
          data: {
            ...formatedData,
            payment_record: {
              payment_intent_id: data[snifflesFieldNames.PAYMENT_RECORD].paymentIntentId,
              vendor: 'stripe',
            },
          },
        };
      }
      const response = await postAppointment({
        uuid: data.userId,
        data: formatedData,
      });
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || 'Unable to submit appointment',
        status: error?.response.status || '',
        errorCode: error?.response?.data?.errors[0]?.code,
      });
    }
  }
);

export const cancelSniffleAppointment = createAsyncThunk(
  `${SLICE_NAME}/cancelAppointment`,
  async ({ userId, appointmentId }, { rejectWithValue }) => {
    try {
      const { data: response } = await cancelAppointment(userId, appointmentId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        status: error?.response.status || '',
      });
    }
  }
);

export const getTimeSlots = createAsyncThunk(
  `${SLICE_NAME}/getTimeSlots`,
  async ({ userId, usersLocation: customLocation = {} }, { rejectWithValue, getState }) => {
    const { userLocation } = getState().sniffles;
    try {
      const { data: response } = await getAvailableSlots({
        uuid: userId,
        end: getDateInAMonth().toISOString().slice(0, -5),
        start: getTomorrowDate().toISOString().slice(0, -5),
        purpose: 'sniffles_observation',
        zipcode: userLocation.zipcode,
        address1: userLocation.address_1,
        address2: userLocation.address_2 ?? '',
        city: userLocation.city,
        state: userLocation.state_id,
        ...customLocation,
      });
      return { slots: response.data, warning: response.meta.warning_for_ca };
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        status: error?.response.status || '',
      });
    }
  }
);

export const getAppointmentById = createAsyncThunk(
  `${SLICE_NAME}/getAppointmentById`,
  async ({ appointmentId, userId }, { rejectWithValue }) => {
    try {
      const { data: response } = await getAppointmentDetails(userId, appointmentId);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        status: error?.response.status || '',
      });
    }
  }
);

export const getSolutions = createAsyncThunk(
  `${SLICE_NAME}/getSolutions`,
  async ({ type }, { rejectWithValue, getState }) => {
    try {
      const { users } = getState().user;
      const { data: resp } = await getSolutionsAPI(users[0], type);
      return resp.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: 'Unible to fetch solutions',
      });
    }
  }
);

const initialSchedulingState = {
  userId: '',
  [snifflesFieldNames.USER_LOCATION]: {
    address_1: '',
    address_2: '',
    city: '',
    state_id: '',
    zipcode: '',
  },
  [snifflesFieldNames.SORE_THROAT]: null,
  [snifflesFieldNames.SELECTED_DATE]: null,
  [snifflesFieldNames.CONTACT_INFO]: {
    phoneNumber: '',
    email: '',
  },
  [snifflesFieldNames.PAYMENT_RECORD]: null,
  freeDates: [],
  [snifflesFieldNames.PROMO_CODE]: null,
  submitedInfo: null,
};

const initialTelehealthState = {
  userId: '',
  [snifflesFieldNames.USER_INFO]: {
    firstName: '',
    lastName: '',
    dob: '',
    height: null,
    weight: null,
    ...initialSchedulingState.userLocation,
    ...initialSchedulingState.contactInfo,
  },
  [snifflesFieldNames.SELECTED_PHARMACY]: null,
  [snifflesFieldNames.SEX_AT_BIRTH]: null,
  [snifflesFieldNames.IS_MEDICATIONS]: null,
  [snifflesFieldNames.IS_ALLERGIC]: null,
  [snifflesFieldNames.IS_SMOKE]: null,
  [snifflesFieldNames.IS_TOBACCO]: null,
  [snifflesFieldNames.IS_ALCOHOL]: null,
  [snifflesFieldNames.HEALTHPROBLEMS]: undefined,
  [snifflesFieldNames.SYMPTOMS]: {
    data: undefined,
    startDate: null,
  },
  [snifflesFieldNames.RISKFACTORS]: undefined,
  [snifflesFieldNames.DIAGNOSIS]: undefined,
  [snifflesFieldNames.UPDATE_USER_INFO]: null,
};

const initialAssessmentState = {
  [snifflesFieldNames.TEMPERATURE]: null,
  [snifflesFieldNames.IS_SORE_THROAT]: null,
  [snifflesFieldNames.FEVER]: null,
  [snifflesFieldNames.DURATION_OF_SYMPTOMS]: null,
  [snifflesFieldNames.IS_TESTED_OF_COVID]: null,
  [snifflesFieldNames.ELIMINATION_SYMPTOMS]: undefined,
  [snifflesFieldNames.SOLUTIONS]: null,
  [snifflesFieldNames.HOW_TO_HELP]: null,
};

const initialState = {
  ...initialSchedulingState,
  ...initialTelehealthState,
  ...initialAssessmentState,
};

export const getSnifflesProductInfo = createAsyncThunk(
  `${SLICE_NAME}/getSnifflesProductCost`,
  async (productId, { rejectWithValue }) => {
    try {
      const requestData = {
        data: {
          count: 1,
          entitled_product_id: productId,
        },
      };

      const { data: response } = await getPaymentIntentsApi(requestData);

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        status: error?.response.status || '',
      });
    }
  }
);

export const createAppointmentRequest = createAsyncThunk(
  `${SLICE_NAME}/createAppointmentRequest`,
  async (paymentIntentId, { getState, rejectWithValue }) => {
    const {
      userId,
      riskFactors,
      diagnosis,
      symptoms,
      selectedPharmacy,
      allergicMedications,
      activeMedications,
      isSmoke,
      isTobacco,
      isAlcohol,
      healthProblems,
      sexAtBirth,
      promoCode,
      paymentRecord,
      userInfo: {
        firstName,
        lastName,
        dob,
        phoneNumber,
        email,
        address_1: address1,
        address_2: address2,
        city,
        state_id: stateId,
        zipcode,
      },
    } = getState()[SLICE_NAME];
    const exposedTo =
      diagnosis?.length > 0 ? diagnosis.map(({ value }) => value) : [NONE_OF_THE_ABOVE];
    const symptomsNames =
      symptoms?.data.length > 0 ? symptoms.data.map(({ name }) => name) : [NONE_OF_THE_ABOVE];

    try {
      const response = await postAppointmentRequest(userId, {
        promo_code: paymentRecord?.amount === 0 ? promoCode : undefined,
        payment_record:
          paymentRecord?.amount === 0
            ? undefined
            : {
                payment_intent_id: paymentIntentId,
                vendor: 'stripe',
              },
        purpose: 'sniffles_consultation',
        sniffles_consultation_meta: {
          consent_agreed: true,
          consent_agreed_at: new Date().toISOString(),
          consumes_alcohol: isAlcohol,
          exposed_to: exposedTo,
          health_problems: healthProblems?.map(({ value }) => value),
          is_medication_allergies: !!allergicMedications?.length,
          is_taking_medications: !!activeMedications?.length,
          medication_allergies: allergicMedications,
          other_tobacco_products: isTobacco,
          pharmacy_id: selectedPharmacy.id,
          risk_factors:
            riskFactors?.length > 0 ? riskFactors.map(({ value }) => value) : [NONE_OF_THE_ABOVE],
          smoker_ever: isSmoke,
          symptoms: symptomsNames,
          symptoms_begin_date: symptoms.startDate,
          taking_medications: activeMedications,
        },
        user_email: email,
        user_location_snapshot: {
          address_1: address1,
          address_2: address2,
          city,
          state: stateId,
          zipcode,
        },
        user_phone_number: phoneNumber,
        user_snapshot: {
          dob,
          first_name: firstName,
          last_name: lastName,
          sex: getGenderFromDisplayName(sexAtBirth),
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle:
          error?.response?.data?.errors[0]?.message || 'Failed to create appointment request',
        status: error?.response.status || '',
      });
    }
  }
);

export const snifflesSlice = createSlice({
  name: `${SLICE_NAME}`,
  initialState,
  reducers: {
    clearSniffles: (state) => ({
      ...initialState,
      isRedeemed: false,
      promoCode: null,
      inProgress: state[snifflesFieldNames.INPROGRESS],
    }),
    resetSnifflesInProgress: (state) => {
      state[snifflesFieldNames.INPROGRESS] = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(setSnifflesState, (state, { payload: { fieldName, value } }) => {
        state[fieldName] = value;
      })
      .addCase(saveAndCleanSnifflesAssessment.fulfilled, (state) => {
        state[snifflesFieldNames.TEMPERATURE] = null;
        state[snifflesFieldNames.FEVER] = null;
        state[snifflesFieldNames.IS_SORE_THROAT] = null;
        state[snifflesFieldNames.DURATION_OF_SYMPTOMS] = null;
        state[snifflesFieldNames.IS_TESTED_OF_COVID] = null;
        state[snifflesFieldNames.ELIMINATION_SYMPTOMS] = undefined;
        state[snifflesFieldNames.HOW_TO_HELP] = null;
      })
      .addCase(submitSnifflesAppointment, (state, { payload }) => {
        state.submitedInfo = payload;
      })
      .addCase(getTimeSlots.fulfilled, (state, { payload }) => {
        state.freeDates = payload.slots;
      })
      .addCase(getSolutions.fulfilled, (state, { payload }) => {
        state.solutions = payload;
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

export const { clearSniffles, resetSnifflesInProgress } = snifflesSlice.actions;
export default snifflesSlice.reducer;
