import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { displayNameToName } from '../../screens/Telehealth/helper';
import { DISEASES, EXPOSED_DIAGNOSIS, NONE_OF_THE_ABOVE } from '../../screens/Medication/constants';
import { postMedicationRequest, checkMedicationEligibility } from '../../endpoints/sniffle';
import { getGenderFromDisplayName } from '../../utilis/helpers';

const textToBoolean = (text) => {
  const lowText = text.toLowerCase();
  if (lowText === 'yes') return true;
  return false;
};

const SLICE_NAME = 'medicationFlow';
export const snifflesFieldNames = Object.freeze({
  USER_LOCATION: 'userLocation',
  USER_INFO: 'userInfo',
  DOCUMENT: 'document',
  SORE_THROAT: 'soreThroat',
  CONTACT_INFO: 'contactInfo',
  SELECTED_DATE: 'selectedDate',
  PAYMENT_RECORD: 'paymentRecord',
  SELECTED_PHARMACY: 'selectedPharmacy',
  SEX_AT_BIRTH: 'sexAtBirth',
  MEDICATION_IN_USE: 'medicationInUse',
  ACTIVE_MEDICATIONS: 'activeMedications',
  IS_ALLERGIC: 'isAllergic',
  IS_HOSPITALIZED: 'isHospitalized',
  ALLERGIC_MEDICATIONS: 'allergicMedications',
  SYMPTOMS: 'symptoms',
  SYMPTOMS_BEGIN_DATE: 'symptomsBeginDate',
  DIAGNOSIS: 'diagnosis',
  HAS_CODE: 'hasCode',
  MEDICAL_CONDITIONS: 'medicalConditions',
});

const initialState = {
  isLoading: false,
  userId: null,
  userInfo: {},
  document: {},
  sexAtBirth: null,
  symptoms: null,
  symptomsBeginDate: null,
  exposedDiagnosis: [],
  medicationInUse: null,
  activeMedications: [],
  isAllergic: null,
  allergicMedications: [],
  isHospitalized: null,
  medicalConditions: [],
  selectedPharmacy: {},
  hasCode: null,
  promoCode: null,
  paymentRecord: {},
  termsConsent: null,
  activeScreen: '',
  fromTimeline: null,
  updateUserInfo: null,
  showFirstQuestion: true,
  isRedeemed: false,
  existFluStrepIn14: false,
};

export const setMedicationState = createAction(`${SLICE_NAME}/setMedicationState`);

export const createMedicationRequest = createAsyncThunk(
  `${SLICE_NAME}/createMedicationRequest`,
  async (data, { getState, rejectWithValue }) => {
    const state = getState()[SLICE_NAME];
    const symptoms =
      state.symptoms?.length > 0 ? state.symptoms.map(({ name }) => name) : [NONE_OF_THE_ABOVE];
    const riskFactors =
      state.medicalConditions?.length > 0
        ? state.medicalConditions.map((e) => displayNameToName(e?.displayName, DISEASES))
        : [NONE_OF_THE_ABOVE];
    const exposedDiagnosis =
      state.exposedDiagnosis?.length > 0
        ? state.exposedDiagnosis.map((e) => displayNameToName(e?.displayName, EXPOSED_DIAGNOSIS))
        : [NONE_OF_THE_ABOVE];

    try {
      const result = await postMedicationRequest(state?.userId, {
        purpose: 'sniffles',
        document_ids: state.document?.ids || [],
        pharmacy_id: state.selectedPharmacy.id,
        promo_code: state?.paymentRecord?.amount === 0 ? state.promoCode : undefined,
        payment_record:
          state?.paymentRecord?.amount === 0
            ? undefined
            : {
                payment_intent_id: state.paymentRecord.paymentIntentId,
                vendor: 'stripe',
              },
        user_snapshot: {
          dob: state.userInfo.dob,
          first_name: state.userInfo.firstName,
          last_name: state.userInfo.lastName,
          height: state.userInfo.height,
          weight: state.userInfo.weight,
          address: {
            address_1: state.userInfo.address_1,
            address_2: state.userInfo.address_2,
            city: state.userInfo.city,
            state: state.userInfo.state_id,
            zipcode: state.userInfo.zipcode,
            country_code: 'US',
          },
        },
        user_phone_number: state.userInfo.phoneNumber,
        user_email: state.userInfo.email,
        user_zipcode: state.userInfo.zipcode,
        sniffles_data: {
          sex: getGenderFromDisplayName(state.sexAtBirth),
          symptoms,
          exposed_to: exposedDiagnosis,
          medical_conditions: riskFactors,
          is_taking_medications: textToBoolean(state.medicationInUse),
          taking_medications: state.activeMedications,
          is_medication_allergies: textToBoolean(state.isAllergic),
          medication_allergies: state.allergicMedications,
          hospitalized_for_respiratory_illnesses: textToBoolean(state.isHospitalized),
          preferred_pharmacy: state.selectedPharmacy.id,
          symptoms_begin_date: state.symptomsBeginDate,
          consent_agreed: true,
          consent_agreed_at: new Date(),
        },
      });
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

export const getServiceAvailability = createAsyncThunk(
  `${SLICE_NAME}/getServiceAvailability`,
  async (userInfo, { rejectWithValue }) => {
    try {
      const data = {
        purpose: 'sniffles',
        first_name: userInfo.firstName,
        last_name: userInfo.lastName,
        dob: userInfo.dob,
        height: userInfo.height,
        weight: userInfo.weight,
        phone_number: userInfo.phoneNumber,
        email: userInfo.email,
        address_1: userInfo.address_1,
        address_2: userInfo.address_2,
        city: userInfo.city,
        state: userInfo.state_id,
        zipcode: userInfo.zipcode,
      };
      const result = await checkMedicationEligibility(data);
      return result?.data?.data || {};
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || 'Failed to check Eligibility',
        status: error?.response.status || '',
      });
    }
  }
);

export const medicationFlowSlice = createSlice({
  name: 'medicationFlowSlice',
  initialState,
  reducers: {
    clearSelections(state) {
      state.userId = null;
      state.userInfo = {};
      state.document = {};
      state.sexAtBirth = null;
      state.symptoms = null;
      state.symptomsBeginDate = null;
      state.exposedDiagnosis = [];
      state.medicationInUse = null;
      state.activeMedications = [];
      state.isAllergic = null;
      state.allergicMedications = [];
      state.isHospitalized = null;
      state.medicalConditions = [];
      state.selectedPharmacy = {};
      state.hasCode = null;
      state.promoCode = null;
      state.paymentRecord = {};
      state.termsConsent = null;
      state.document = {};
      state.updateUserInfo = null;
      state.isRedeemed = false;
      state.showFirstQuestion = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setMedicationState, (state, { payload: { fieldName, value } }) => {
        state[fieldName] = value;
      })
      .addCase(createMedicationRequest.fulfilled, (state, { payload }) => {
        state.deliveryJobs = payload;
      });
  },
});

export const { setIsLoading, clearSelections } = medicationFlowSlice.actions;
export default medicationFlowSlice.reducer;
