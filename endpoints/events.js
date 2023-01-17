import axios from '../utilis/axios';

export function getEventsApi() {
  return axios.get('/events');
}

export function createEventApi(data) {
  return axios.post('/events', data);
}

export function getDefaultPromoCode() {
  return axios.get('/promo_codes?default=true');
}

export function getPromoCodeDetails({ promoCode, productId }) {
  return axios.get(`/promo_codes/${promoCode}?entitled_product_id=${productId}`);
}

export function getPromoCodeUrl(promoCode) {
  return axios.get(`/promo_codes/${promoCode}/validate`);
}

export function getEventDetailsApi(eventId) {
  return axios.get(`/events/${eventId}`);
}

export function getPromoCodeWithParams({ promoCode, productId, vendor }) {
  return axios.get(
    `/promo_codes/${promoCode}/validate?entitled_product_id=${productId}&vendor=${vendor}`
  );
}

export function getEventMembersApi(eventId) {
  return axios.get(`/events/${eventId}/observations`);
}

export function deleteEventApi(eventId) {
  return axios.delete(`/events/${eventId}`);
}

export function removeMemberApi(eventId, memberId) {
  return axios.delete(`/events/${eventId}/members/${memberId}`);
}

export function getEventDetailsByCodeApi(eventCode) {
  return axios.get(`/events?code=${eventCode}`);
}

export function joinEventApi(eventId) {
  return axios.post(`/events/${eventId}/members`);
}

export function leaveEventApi({ eventId, userId }) {
  return axios.delete(`/events/${eventId}/members/${userId}`);
}

export function getPaymentIntentsApi(data) {
  return axios.post('/payments/payment_intents', data);
}

export function getDiscountCodeApi({ eventId, data }) {
  return axios.post(`events/${eventId}/promo_codes`, data);
}
