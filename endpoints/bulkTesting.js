import axios from '../utilis/axios';

export function getGroupsApi() {
  return axios.get(`/admin/groups`, {
    params: {
      sort: 'name'
    }
  });
}

export function getEmployeesApi(groupId, routineStatus, searchQuery, sort, page, perPage, hasRoutines, cancelToken) {
  if(hasRoutines) {
    return axios.get(`/admin/user_routines`, {
      params: {
        "filter[user_routine_status]": routineStatus,
        "filter[group_ids]": groupId,
        q: searchQuery,
        sort,
        page,
        per_page: perPage,
      },
      cancelToken,
    });
  } else {
    return axios.get(`/admin/groups/${groupId}/users`, {
      params: {
        q: searchQuery,
        sort,
        page,
        per_page: perPage,
        with: 'latest_observation',
      },
      cancelToken,
    });
  }
}

export function getEmployeeRoutinesApi(employeeId) {
  return axios.get(`/admin/users/${employeeId}/routines`);
}

export function getEmployeeTasksApi(employeeId) {
  return axios.get(`/admin/users/${employeeId}/tasks`);
}

export function postEmployeeObservationsApi(employeeId, data) {
  return axios.post(`/admin/users/${employeeId}/observations`, data);
}

export function createEmployeeApi(data) {
  return axios.post('/admin/users', data);
}

export function addEmployeeToOrganizationApi(organizationId, data) {
  return axios.post(`/admin/organizations/${organizationId}/users`, data);
}

export function addEmployeeToGroupApi(groupId, data) {
  return axios.post(`/admin/groups/${groupId}/users`, data);
}

export function addEmployeeEmailApi(uuid, data) {
  return axios.post(`/admin/users/${uuid}/emails`, data);
}

export function addEmployeePhoneApi(uuid, data) {
  return axios.post(`/admin/users/${uuid}/phones`, data);
}

export function getOrganizationDetailsByCodeApi(code) {
  return axios.get(`/organization_codes/${code}`);
}

export function enrollUserApi(uuid, data) {
  return axios.post(`/users/${uuid}/organization_users`, data);
}

export function createConsentApi(uuid, data) {
  return axios.post(`/users/${uuid}/consents`, data);
}

export function getUserEnrolledDetailsApi(uuid, uuidOrg) {
  return axios.get(`/users/${uuid}/organization_users/${uuidOrg}`);
}