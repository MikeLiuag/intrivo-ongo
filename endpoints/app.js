import { axiosRaw } from 'axios';
import axios, { axiosInstanceFormData } from '../utilis/axios';

export async function checkEmail({ email }) {
  return axios.post(`/exists/email`, { email });
}

export function register({
  email,
  phone,
  password,
  device_name = 'test',
  route,
  recaptcha_token = null,
}) {
  return axios.post('/signup', {
    email,
    phone,
    password,
    route,
    device_name,
    recaptcha_token,
  });
}

export function verifyPhone({ phoneId, otpCode }) {
  return axios.post(`/2fa/phone/${phoneId}`, {
    verification_code: otpCode,
  });
}

export function verifyEmail({ emailId, otpCode }) {
  return axios.post(`/2fa/email/${emailId}`, {
    verification_code: otpCode,
  });
}

export const getPromos = () => axios.get('/promos');

export function login(data) {
  return axios.post('/jwt/token', data);
}

export function logout() {
  return axios.delete('/jwt/logout');
}

export function validate(data) {
  return axios.post('/jwt/verify', data);
}

export function refreshToken(data) {
  return axios.put('/jwt/refresh', data);
}

export function resendCode(phoneId) {
  return axios.get(`/phones/${phoneId}/retry`);
}

export function getReleases() {
  return axios.get('/reference/releases');
}

export function getObservationTypes() {
  return axios.get('/reference/observation-types');
}

export function getRelationshipTypes() {
  return axios.get('/reference/relationships');
}

export function getEthnicitiesTypes() {
  return axios.get('/reference/ethnicities');
}

export function getRacesTypes() {
  return axios.get('/reference/races');
}

export function postForgotPasswordCode(data) {
  return axios.post('/forgot', data);
}

export function postResetPassword({ email, code, password }) {
  return axios.post('/reset', {
    email,
    verification_code: code,
    password,
    password_confirmation: password,
  });
}

export function postObservation(id, data) {
  return axios.post(`/users/${id}/observations`, data);
}

export function getCodeType(code) {
  return axios.get(`/codes/${code}`);
}

export function postProctoringSessions() {
  return axios.post(`/users/me/live_sessions`, {
    data: {
      session_purpose: 'general_resource',
      // session_purpose: 'proctored_covid_19_test',
      // entitled_product_id: 'on_go_proctoring_session',
      // payment_record: {
      //   payment_intent_id: '',
      //   vendor: 'STRIPE',
      // },
    },
  });
}

export function getProctoringSessions(id) {
  return axios.get(`/users/me/live_sessions/${id}?with=live_session_users,media,meeting&role=user`);
}

export function putProctoringSessionsJoin(id) {
  return axios.put(
    `/users/me/live_sessions/${id}/join?with=live_session_users,media,meeting&role=user`
  );
}

export function putProctoringSessionsEnd(id) {
  return axios.put(`/users/me/live_sessions/${id}/end?role=user`);
}

export function putProctoringSessions(id, data) {
  return axios.put(`/users/me/live_sessions/${id}?role=user`, data);
}

export function getCareGuidance(id) {
  return axios.get(`/users/${id}/care_guidance`);
}

export function getTestsListAPI(id) {
  return axios.get(`/users/${id}/test_options`);
}
// export function addObservationResult(id, observationId, data) {
//   return axios.patch(`/users/${id}/observations/${observationId}`, data);
// }
export function getBannerAPI(id) {
  return axios.get(`/users/${id}/message_banners`);
}

export function getProctorLoaderContentsAPI(id) {
  return axios.get(`/users/${id}/care_guidance/telehealth/waiting`);
}

export function getProctorFailureContentsAPI(id) {
  return axios.get(`/users/${id}/care_guidance/telehealth/not_available`);
}

export function deleteAccountAPI(id, data) {
  return axios.post(`/users/${id}/user_removal_requests`, data);
}

export function getDeleteAccountRequestsAPI(id) {
  return axios.get(`/users/${id}/user_removal_requests`);
}

export function postFeedback(data) {
  return axios.post(`/feedbacks`, data);
}

export function searchPharmacies(zipcode) {
  return axios.get(`/pharmacies?filter[zipcode][]=${zipcode}`);
}

export function postMedicationRequest(userId, data) {
  return axios.post(
    `/users/${userId}/medication_requests`,
    {
      data,
    },
    {
      headers: {
        ServiceName: 'LEDIAN',
      },
    }
  );
}

export function getMedicationRequests(userId) {
  return axios.get(`/users/${userId}/medication_requests`, {
    headers: {
      ServiceName: 'LEDIAN',
    },
  });
}

export function sendEmailForComingSoonAPI(data) {
  return axios.post(`/analytics/events`, data);
}

export function sendZoomEventsAPI(data) {
  return axios.post(`/analytics/events`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function searchInsuranceProviders(searchQuery) {
  return axios.get(`/insurance_providers?q=${searchQuery}`);
}

export function uploadDocumentsAPI(uuid, data) {
  return axiosInstanceFormData.post(`/users/${uuid}/documents`, data);
}

export function postImageRecognition(data) {
  return axios.post('/images_annotate', data);
}
