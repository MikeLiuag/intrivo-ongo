import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { searchInsuranceProviders } from '../../endpoints/app';
import { postInsuranceCard, postUserInsurance, postAppointmentRequest } from '../../endpoints/user';
import { displayNameToName } from '../../screens/Telehealth/helper';
import { DISEASES } from '../../screens/Telehealth/questionnaireSteps/Diseases';
import { ILLNESS_AREAS } from '../../screens/Telehealth/questionnaireSteps/SickAreas';
import { SYMPTOMS } from '../../screens/Telehealth/questionnaireSteps/Symptoms';
import { checkUserAppointmentStatus } from '../user/slice';

const SLICE_NAME = 'longCovid';

export const setLongCovidState = createAction(`${SLICE_NAME}/setState`);
export const applyPreviousAnswers = createAction(`${SLICE_NAME}/applyPreviousAnswers`);

const initialState = {
  stateId: '',
  gender: '',
  pregnantOrNursing: undefined,
  diseases: undefined,
  symptoms: undefined,
  sickAreas: undefined,
  isSmoking: undefined,
  isConsumingAlcohol: undefined,
  isPayedByInsurance: undefined,
  isUsingTobaccoProducts: undefined,
  termsAndConditionsAccepted: false,
  userInfo: {
    id: '',
    fullName: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phoneNumber: '',
  },
  insuranceInfo: {
    insuranceName: '',
    firstName: '',
    birthDay: '',
    lastName: '',
    relationship: '',
    memberId: '',
    insuranceId: '',
    frontCard: undefined,
    backCard: undefined,
  },
  updateUserInfo: null,
};

export const getInsuranceProviders = createAsyncThunk(
  `${SLICE_NAME}/getInsuranceProviders`,
  async (searchQuery, { rejectWithValue }) => {
    try {
      const result = await searchInsuranceProviders(searchQuery);
      return result.data.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        status: error?.response.status || '',
      });
    }
  }
);

export const uploadInsuranceCard = createAsyncThunk(
  `${SLICE_NAME}/postInsuranceCard`,
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const result = await postInsuranceCard(id, data);
      return result.data.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        status: error?.response.status || '',
      });
    }
  }
);

export const createUserInsurance = createAsyncThunk(
  `${SLICE_NAME}/createUserInsurance`,
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const result = await postUserInsurance(id, { data });
      return result.data.data;
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
  async (data, { getState, rejectWithValue, dispatch }) => {
    const state = getState()[SLICE_NAME];
    const symptoms = state.symptoms.map((e) => displayNameToName(e, SYMPTOMS));
    const riskFactors = state.diseases.map((e) => displayNameToName(e, DISEASES));
    const illnessAreas = state.sickAreas.map((e) => displayNameToName(e, ILLNESS_AREAS));
    try {
      const result = await postAppointmentRequest(state.userInfo.id, {
        purpose: 'consultation',
        user_email: state.userInfo.email,
        user_phone_number: state.userInfo.phoneNumber,
        user_geo_state: state.stateId,
        user_snapshot: {
          dob: state.userInfo.dob,
          first_name: state.userInfo.firstName,
          last_name: state.userInfo.lastName,
          sex: (state.gender && state.gender === data?.gender?.from
            ? data.gender.to
            : state.gender
          ).toLowerCase(),
        },
        user_location_snapshot: {
          address_1: state.userInfo.address_1,
          address_2: state.userInfo.address_2,
          city: state.userInfo.city,
          state: state.userInfo.state_id,
          zipcode: state.userInfo.zipcode,
        },
        user_insurance_snapshot: state.userInsurance
          ? {
              document_id: state.userInsurance.document_id,
              insurance_provider_name: state.userInsurance.insurance_name,
              member_id: state.userInsurance.member_id,
              relationship_to_policy_holder: state.userInsurance.relationship_to_policy_holder,
              policy_holder_first_name: state.userInsurance.policy_holder_first_name,
              policy_holder_last_name: state.userInsurance.policy_holder_last_name,
              policy_holder_dob: state.userInsurance.policy_holder_dob,
            }
          : null,
        meta: {
          consent_agreed: true,
          consent_agreed_at: new Date().toISOString(),
          smoker_ever: state.isSmoking === 'Yes',
          consumes_alcohol: state.isConsumingAlcohol === 'Yes',
          other_tobacco_products: state.isUsingTobaccoProducts === 'Yes',
          pregnant_nursing: state.pregnantOrNursing === 'Yes',
          illness_area: illnessAreas.length > 0 ? illnessAreas : ['none_of_the_above'],
          risk_factors: riskFactors.length > 0 ? riskFactors : ['none_of_the_above'],
          symptoms: symptoms.length > 0 ? symptoms : ['none_of_the_above'],
          payment_method: state.userInsurance ? 'insurance' : 'cash',
        },
      });
      dispatch(checkUserAppointmentStatus({ userId: state.userInfo.id }));
      return result.data.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle:
          error?.response?.data?.errors[0]?.message || 'Failed to create appointment request',
        status: error?.response.status || '',
      });
    }
  }
);

export const longCovidSlice = createSlice({
  name: `${SLICE_NAME}`,
  initialState,
  reducers: {
    clearLongCovid: (state) => ({ ...initialState, userId: state.userId }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(setLongCovidState, (state, { payload: { fieldName, value } }) => {
        state[fieldName] = value;
      })
      .addCase(applyPreviousAnswers, (state, { payload }) => {
        state.gender = payload.gender;
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

export const { clearLongCovid } = longCovidSlice.actions;
export default longCovidSlice.reducer;
