import axios from '../utilis/axios';

export function getAvailableSlots({
  uuid,
  zipcode,
  purpose,
  start,
  end,
  state,
  address1,
  address2,
  city,
}) {
  return axios.get(
    `/users/${uuid}/appointments/available_time_slots?purpose=${purpose}&start_time=${start}&end_time=${end}&address_1=${address1}&address_2=${address2}&city=${city}&zipcode=${zipcode}&state=${state}`
  );
}

export function rescheduleAppointment(userId, appointmentId, data) {
  return axios.post(`/users/${userId}/appointments/${appointmentId}/reschedule`, data);
}

export function cancelAppointment(userId, appointmentId) {
  return axios.post(`/users/${userId}/appointments/${appointmentId}/cancel`);
}

export function getActivities(userId) {
  return axios.get(`/users/${userId}/activities`);
}

export function getSolutionsAPI(uuid, type) {
  return axios.get(`/users/${uuid}/care_options?filter[feature]=${type}`);
}

export function postAppointment({ uuid, data }) {
  return axios.post(`/users/${uuid}/appointment_requests`, data);
}
export function postMedicationRequest(userId, data) {
  return axios.post(
    `/users/${userId}/medication_requests`,
    { data },
    {
      headers: {
        ServiceName: 'LEDIAN',
      },
    }
  );
}

export function checkMedicationEligibility(data) {
  return axios.post('medication_requests/eligibility_check', {
    data,
  });
}
