import axios from '../utilis/axios';

export function postTestResultData({ url, data }) {
  return axios.post(`${url}`, data);
}

export function getTemplatesApi() {
  return axios.get(`/flows/0000e111-de6f-4886-a50b-26bb9d1cfca5`);
}

export function getQuizApi() {
  return axios.get(`/flows/0000bb0c-a2b2-47a8-a1b3-228830657c86`);
}

export function postAnswersQuizApi(data) {
  return axios.post('/analytics/events', data);
}

export function getLongCovidTemplatesApi() {
  return axios.get('/flows/00003fba-61bc-479f-b529-1043b2ac469d');
}

export function getSnifflesAssessmentApi({ type }) {
  return axios.get(`/flows/${type}`);
}

export function getCompletedLongCovidQuizApi(uuid) {
  return axios.get(`/users/${uuid}/user_questionnaires`);
}

export function submitResultLongCovidTemporaryApi(data) {
  return axios.post('/flows/00003fba-61bc-479f-b529-1043b2ac469d/user_flows', data);
}

export function submitResultSnifflesTemporaryApi(data) {
  return axios.post('/flows/0000b666-37d6-4a43-9e53-c0f1fd6a60cd/user_flows', data);
}

export function getCurrentQuestionnairesResultTemporaryApi(uuid) {
  return axios.get(`/user_questionnaires/${uuid}`);
}
