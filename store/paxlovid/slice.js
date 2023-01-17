/* eslint-disable camelcase */
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { searchPharmacies, postMedicationRequest, uploadDocumentsAPI } from '../../endpoints/app';
import { getGenderFromDisplayName } from '../../utilis/helpers';

const textToBoolean = (text) => {
  const lowText = text.toLowerCase();
  if (lowText === 'yes') return true;
  return false;
};
const SLICE_NAME = 'paxlovid';

const composeDefaultSetter = (name) =>
  createAsyncThunk(`${SLICE_NAME}/${name}`, async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        status: error?.response.status || '',
      });
    }
  });

export const setParams = composeDefaultSetter('setParams');

export const setUserInfo = createAction(`${SLICE_NAME}/setUserInfo`);

export const setVaccinationStatus = createAction(`${SLICE_NAME}/setVaccinationStatus`);

export const setSexStatus = createAction(`${SLICE_NAME}/setSexStatus`);

export const setBoosterStatus = createAction(`${SLICE_NAME}/setBoosterStatus`);

export const setMedicationStatus = createAction(`${SLICE_NAME}/setMedicationStatus`);

export const setMedications = createAction(`${SLICE_NAME}/setMedications`);

export const setBreastFeedingStatus = createAction(`${SLICE_NAME}/setBreastFeedingStatus`);

export const setAllergyStatus = createAction(`${SLICE_NAME}/setAllergyStatus`);

export const setAllergies = createAction(`${SLICE_NAME}/setAllergies`);

export const setRiskFactorStatus = createAction(`${SLICE_NAME}/setRiskFactorStatus`);

export const setSelectedPharmacy = createAction(`${SLICE_NAME}/setSelectedPharmacy`);

export const setTermsAcceptedTime = createAction(`${SLICE_NAME}/setTermsAcceptedTime`);

export const setPharmaciesList = createAsyncThunk(
  `${SLICE_NAME}/setPharmaciesList`,
  async (searchQuery, { rejectWithValue }) => {
    try {
      let pharmacies = [];
      if (searchQuery.length >= 5) {
        const pharmacyList = await searchPharmacies(searchQuery);
        pharmacies = pharmacyList.data.data;
      } else {
        pharmacies = [];
      }
      return pharmacies;
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || '',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        status: error?.response.status || '',
      });
    }
  }
);

export const sendMedicationRequest = createAsyncThunk(
  `${SLICE_NAME}/sendMedicationRequest`,
  async (_, { getState, rejectWithValue }) => {
    const state = getState()[SLICE_NAME];
    try {
      const result = await postMedicationRequest(state.uuid, {
        purpose: 'paxlovid',
        observation_ids: [state.observationId],
        pharmacy_id: state.selectedPharmacy.id,
        user_snapshot: {
          first_name: state.eligibilityFormUserInfo.firstName,
          last_name: state.eligibilityFormUserInfo.lastName,
          dob: state.eligibilityFormUserInfo.dob,
          height: state.eligibilityFormUserInfo.height,
          weight: state.eligibilityFormUserInfo.weight,
          address: {
            country_code: 'US',
            state: state.eligibilityFormUserInfo.state_id,
            city: state.eligibilityFormUserInfo.city,
            zipcode: state.eligibilityFormUserInfo.zipcode,
            address_1: state.eligibilityFormUserInfo.address_1,
            address_2: state.eligibilityFormUserInfo.address_2,
          },
        },
        user_email: state.eligibilityFormUserInfo.email,
        user_phone_number: state.eligibilityFormUserInfo.phone,
        user_zipcode: state.eligibilityFormUserInfo.zipcode,
        document_ids: state.documents,
        paxlovid_data: {
          sex: getGenderFromDisplayName(state.sexAtBirth),
          symptoms: state.eligibilityFormUserInfo.symptoms.map((s) => s.name),
          symptoms_begin_date: state.eligibilityFormUserInfo.symptomsBeginDate,
          last_positive_date: state.eligibilityFormUserInfo.lastPositiveDate,
          fully_vaccinated: state.vaccinated === 'Yes',
          booster_vaccinated: state.boosted === 'Yes',
          taking_medications: state.selectedMedications.map((m) => m?.name || m),
          allergic_medications: state.selectedAllergies.map((m) => m?.name || m),
          health_risk_factors: state.selectedRiskFactors.map((r) => r.name),
          is_medication_allergies: textToBoolean(state.allergy),
          consent_agreed: state.termsAcceptedTime != null,
          consent_agreed_at: state.termsAcceptedTime,
          pregnant_or_breastfeeding: state.breastFeeding?.status,
          last_menstrual_period: state.breastFeeding?.date,
        },
      });
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

export const uploadDocumentsRequest = createAsyncThunk(
  `${SLICE_NAME}/uploadDocumentsRequest`,
  async ({ card, selfie, userId = '' }, { rejectWithValue, getState }) => {
    try {
      const postCardData = new FormData();
      const postSelfieData = new FormData();
      const uuid = userId || getState()[SLICE_NAME]?.uuid;
      postCardData.append('media[0][subtype]', 'identity_card_front');
      postCardData.append('media[0][file]', {
        uri: card.uri,
        type: card.uri.includes('.pdf') ? 'application/pdf' : 'image/jpeg',
        name: new Date().getTime() + card.uri.split('/').pop(),
      });
      postCardData.append('document_type', 'identity_card');
      postSelfieData.append('media[0][subtype]', 'selfie');
      postSelfieData.append('media[0][file]', {
        uri: selfie.uri,
        type: selfie.uri.includes('.pdf') ? 'application/pdf' : 'image/jpeg',
        name: new Date().getTime() + selfie.uri.split('/').pop(),
      });
      postSelfieData.append('document_type', 'selfie');
      const respCard = await uploadDocumentsAPI(uuid, postCardData);
      const respSelfie = await uploadDocumentsAPI(uuid, postSelfieData);
      return [respCard.data.data.uuid, respSelfie.data.data.uuid];
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage || 'Unable to upload documents',
        subtitle: error?.response?.data?.errors[0]?.message || '',
        // status: error?.response.status || '',
      });
    }
  }
);

const initialState = {
  uuid: null,
  observationId: null,
  eligibilityFormUserInfo: {},
  vaccinated: null,
  boosted: null,
  medication: null,
  selectedMedications: [],
  selectedRiskFactors: [],
  pharmaciesList: [],
  termsAcceptedTime: null,
  medicationRequest: null,
  pharmacy: null,
  deliveryJob: null,
  documents: null,
  selectedAllergies: [],
  allergy: null,
  breastFeeding: null,
  sexAtBirth: null,
};

export const paxlovidSlice = createSlice({
  name: `${SLICE_NAME}`,
  initialState,
  reducers: {
    clearSelections(state) {
      state.uuid = null;
      state.observationId = null;
      state.eligibilityFormUserInfo = {};
      state.vaccinated = null;
      state.boosted = null;
      state.selectedMedications = [];
      state.selectedRiskFactors = [];
      state.termsAcceptedTime = null;
      state.selectedAllergies = [];
      state.breastFeeding = null;
      state.allergy = null;
      state.sexAtBirth = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setParams.fulfilled, (state, { payload }) => {
        state.uuid = payload.uuid;
        state.observationId = payload.observationId;
        state.observationSymptoms = payload.observationSymptoms;
        if (payload.eligibilityFormUserInfo) {
          state.eligibilityFormUserInfo = payload.eligibilityFormUserInfo;
        }
      })
      .addCase(setUserInfo, (state, { payload }) => {
        state.eligibilityFormUserInfo = payload;
      })
      .addCase(setVaccinationStatus, (state, { payload }) => {
        state.vaccinated = payload;
      })
      .addCase(setBoosterStatus, (state, { payload }) => {
        state.boosted = payload;
      })
      .addCase(setBreastFeedingStatus, (state, { payload }) => {
        state.breastFeeding = payload;
      })
      .addCase(setMedicationStatus, (state, { payload }) => {
        state.medication = payload;
      })
      .addCase(setMedications, (state, { payload }) => {
        state.selectedMedications = payload;
      })
      .addCase(setAllergyStatus, (state, { payload }) => {
        state.allergy = payload;
      })
      .addCase(setAllergies, (state, { payload }) => {
        state.selectedAllergies = payload;
      })
      .addCase(setRiskFactorStatus, (state, { payload }) => {
        state.selectedRiskFactors = payload;
      })
      .addCase(setPharmaciesList.fulfilled, (state, { payload }) => {
        state.pharmaciesList = payload;
      })
      .addCase(setSelectedPharmacy, (state, { payload }) => {
        state.selectedPharmacy = payload;
      })
      .addCase(setTermsAcceptedTime, (state, { payload }) => {
        state.termsAcceptedTime = payload;
      })
      .addCase(setSexStatus, (state, { payload }) => {
        state.sexAtBirth = payload;
      })
      .addCase(sendMedicationRequest.fulfilled, (state, { payload }) => {
        state.medicationRequest = payload;
        state.pharmacy = payload?.pharmacy?.data;
      })
      .addCase(uploadDocumentsRequest.fulfilled, (state, { payload }) => {
        state.documents = payload;
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

export const { clearPaxlovid, clearSelections } = paxlovidSlice.actions;
export default paxlovidSlice.reducer;
