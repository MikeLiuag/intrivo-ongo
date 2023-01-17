import qs from 'qs';
import axios, { axiosInstanceNoBase, axiosInstanceFormData, BASE_URL } from '../utilis/axios';

// *** use a test server ***
// import axiosTest from 'axios';

// const testHeaders = {
//   common: {
//     Accept: 'application/json',
//     'Content-Type': 'application/x-www-form-urlencoded',
//     Authorization: 'Bearer 922|B2KLFsBVaTiHNmuqGjEG5uphR9VevJkRwDjNAXpo',
//   },
// };

// sample test call
// return axiosTest.patch(
//   `https://9aa3f70b680c.ngrok.io/api/observations/${id}`,
//   data,
//   { headers: testHeaders }
// );

export function updatePhone({ number, countryCode, phoneId }) {
  const data = { number, country_code: countryCode || undefined };
  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
  if (phoneId) {
    return axios.put(`/phones/${phoneId}`, data);
  }
  return axios.post(`/phones`, data);
}

export function resendCode({ phoneId }) {
  return axios.get(`/retry/phone/${phoneId}`);
}

export function resendCodeToEmail({ emailId }) {
  return axios.get(`/retry/email/${emailId}`);
}

export function updateUsers({
  uuid,
  firstName,
  middleName,
  lastName,
  dob,
  sex,
  height,
  weight,
  agreementAccepted,
  race_id: raceId,
  ethnicity_id: ethnicityId,
}) {
  const data = {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    dob, // : dob ? new Date(dob).toISOString().slice(0, 10) : undefined,
    sex,
    height,
    weight,
    agreement_accepted_at: agreementAccepted,
    race_id: raceId,
    ethnicity_id: ethnicityId,
  };
  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
  return axios.put(`/users/${uuid}`, data);
}

export function updateLocation({ uuid, locationId, address1, address2, city, state, zipcode }) {
  const data = {
    address_1: address1,
    address_2: address2,
    city,
    state,
    zipcode,
  };
  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
  return !locationId
    ? axios.post(`/users/${uuid}/locations`, { ...data, name: 'address', country_code: 'US' })
    : axios.put(`/users/${uuid}/locations/${locationId}`, { ...data, country_code: 'US' });
}

export function updateEmail({ emailId, email }) {
  return axios.put(`/emails/${emailId}`, { email });
}

export function getLocation(uuid) {
  return axios.get(`/users/${uuid}/locations`);
}

export function getDependents() {
  return axios.get('/dependents/');
}

export function postDependent({ middle_name: middleName, ...data }) {
  const dataCleaned = {
    middle_name: middleName === '' ? undefined : middleName,
    ...data,
  };
  Object.keys(data).forEach((key) => data[key] === undefined && delete dataCleaned[key]);

  return axios.post('/dependents', dataCleaned);
}

export function removeDependent(id) {
  return axios.delete(`/dependents/${id}`);
}

export function getUser() {
  return axios.get('/me');
}

export function getObservations(id) {
  return axios.get(`/users/${id}/observations`);
}

export function fetchOrganizations(id) {
  return axios.get(`/organizations/${id}`);
}

export function fetchRoutines(id) {
  return axios.get(`/users/${id}/routines`);
}

export function fetchConsensts(id) {
  return axios.get(`/users/${id}/consents`);
}

export function postConsensts(id, data) {
  return axios.post(`/users/${id}/consents`, data);
}

export function fetchTasks(id) {
  return axios.get(`/users/${id}/tasks`);
}

export function getQRToken(id, minutes, dev) {
  return axiosInstanceNoBase.post(`${BASE_URL}/api/user/qrcode`, {
    userid: id,
    minutes,
    dev,
  });
}

export function postVaccineStatus(id, data) {
  return axios.post(`/users/${id}/immunization_status`, data);
}

export function getVaccineStatus(id) {
  return axios.get(
    `/users/${id}/immunization_status?immunization_type=covid_19&verified_from=user`
  );
}

export function postVaccineCard(id, data) {
  return axiosInstanceFormData.post(`/users/${id}/documents`, data);
}

export function deleteVaccineCard(immunizationId, documentId) {
  return axios.delete(`/immunization_status/${immunizationId}/documents/${documentId}`);
}

export function postDoseInfo(id, data) {
  return axios.post(`/users/${id}/immunization_records`, data);
}

export function updateDoseInfo(id, data) {
  return axios.put(`/immunization_records/${id}`, data);
}

export function deleteDoseInfo(immunizationId, doseId) {
  return axios.delete(`/immunization_status/${immunizationId}/immunization_records/${doseId}`);
}

export function orgInvations(uuid) {
  return axios.get(`/users/${uuid}/invites?status[]=invited`);
}

export function setInviteState(userId, invitesId, data) {
  return axios.patch(`/users/${userId}/invites/${invitesId}`, data);
}

export function getUserAgreements(userId, collectionName) {
  return axios.get(`/users/${userId}/user_agreements`, {
    params: {
      collection_names: collectionName,
    },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  });
}

export function getClientAgreements(agreementId) {
  return axios.get(`/agreements/${agreementId}`);
}

export function postUserAgreement(userId, data) {
  return axios.post(`/users/${userId}/user_agreements`, data);
}

export function getUserAgreementById(userId, userAgreementId) {
  return axios.get(`/users/${userId}/user_agreements/${userAgreementId}`);
}

export function postInsuranceCard(id, data) {
  return axiosInstanceFormData.post(`/users/${id}/documents`, data);
}

export function postUserInsurance(id, data) {
  return axios.post(`/users/${id}/insurance`, data);
}

export function postAppointmentRequest(userId, data) {
  return axios.post(`/users/${userId}/appointment_requests`, { data });
}

export function getAppointmentRequests(userId) {
  return axios.get(`/users/${userId}/appointment_requests`);
}

// purpose: long_covid/sniffles
export function getAppointments(userId, { purpose = 'consultation' }) {
  return axios.get(`/users/${userId}/appointments`, {
    params: {
      live_session_purpose: purpose,
    },
    paramsSerializer: (params) => qs.stringify(params),
  });
}

export function getAppointmentDetails(userId, appointmentId) {
  return axios.get(`/users/${userId}/appointments/${appointmentId}`);
}

export function joinLiveSession(userId, sessionId) {
  return axios.put(`/users/${userId}/live_sessions/${sessionId}/join`);
}

export function endLiveSession(userId, sessionId) {
  return axios.put(`/users/${userId}/live_sessions/${sessionId}/end`);
}

// purpose: long_covid/sniffles
export function getLiveSessions(userId, { purpose = 'consultation' }) {
  return axios.get(`/users/${userId}/live_sessions`, {
    params: {
      session_purpose: purpose,
    },
    paramsSerializer: (params) => qs.stringify(params),
  });
}

export function getVisitSummary(userId, sessionId) {
  return axios.get(
    `/users/${userId}/live_sessions/${sessionId}/documents?filter[document_type][]=visit_summary`
  );
}

/*
  documentType: covid_19_vaccine_card/insurance_card/identity_card/selfie/testing/imaging/visit_summary/observation_proof/general
  purpose: long_covid/sniffles
*/
export function getUserDocuments(userId, { documentType = [], purpose = ['long_covid'] }) {
  return axios.get(`/users/${userId}/documents`, {
    params: {
      filter: {
        purpose,
        document_type: documentType,
      },
    },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  });
}

export function getUserPrescriptions(userId) {
  return axios.get(`/users/${userId}/prescriptions`);
}

export function postDeliveryJob(userId, data) {
  return axios.post(
    `/users/${userId}/delivery_jobs`,
    { data },
    { headers: { ServiceName: 'DODUO' } }
  );
}

export function getDeliveryJob(userId, deliveryJobId) {
  return axios.get(`/users/${userId}/delivery_jobs/${deliveryJobId}`, {
    headers: { ServiceName: 'DODUO' },
  });
}
