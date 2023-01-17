/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { validateEmail } from '../app/slice';
import {
  getGroupsApi,
  getEmployeesApi,
  getEmployeeRoutinesApi,
  getEmployeeTasksApi,
  postEmployeeObservationsApi,
  createEmployeeApi,
  addEmployeeToOrganizationApi,
  addEmployeeToGroupApi,
  addEmployeeEmailApi,
  addEmployeePhoneApi,
  getOrganizationDetailsByCodeApi,
  enrollUserApi,
  createConsentApi,
  getUserEnrolledDetailsApi,
} from '../../endpoints/bulkTesting';
import { getRoutines, getTasks } from '../user/slice';
import { i18next } from '../../utilis/i18n';
import { iso8601ToFormatted, formats } from '../../utilis/dateTime';

const PER_PAGE = 50;

export const getGroups = createAsyncThunk(
  'bulkTesting/getGroups',
  async (_, { rejectWithValue }) => {
    try {
      const { data: response } = await getGroupsApi();
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitleResend'),
        status: error?.response.status,
      });
    }
  }
);

const getFormattedEmployees = (employees, hasRoutines, translations, state, dispatch) => {
  const data = [];
  const uuidsToRemove = [];
  employees.forEach((item) => {
    if (hasRoutines) {
      const user = item.user.data;
      const pendingDate = state.bulkTesting.pendingObservations[user.uuid];
      if (
        !pendingDate ||
        item.status === 'Pending' ||
        new Date(item?.updated_at).getTime() >= pendingDate
      ) {
        if (pendingDate) {
          uuidsToRemove.push(user.uuid);
        }
        let status = '';
        let date = '';
        let showWarning = false;
        if (item.status === 'Pass') {
          status = translations('bulkTesting.employees.complete');
          date = ` ${translations('bulkTesting.employees.nextDue')} ${iso8601ToFormatted(
            item.next_due_date0,
            'MMM dd'
          )}`;
        } else if (item.status === 'Fail') {
          status = translations('bulkTesting.employees.fail');
          date = ` ${translations('bulkTesting.employees.nextDue')} ${iso8601ToFormatted(
            item.created_at,
            'MMM dd'
          )}`;
          showWarning = true;
        } else if (item.status === 'Pending') {
          status = translations('bulkTesting.employees.pending');
          date = '';
        } else {
          status = translations('bulkTesting.employees.incomplete');
          date = ` ${translations('bulkTesting.employees.dueNow')}`;
        }

        data.push({
          uuid: user.uuid,
          first_name: user.first_name,
          last_name: user.last_name,
          status,
          date,
          showWarning,
        });
      } else {
        data.push({
          uuid: user.uuid,
          first_name: user.first_name,
          last_name: user.last_name,
          status: translations('bulkTesting.employees.pending'),
          date: '',
          showWarning: false,
        });
      }
    } else {
      let date = '';
      let showWarning = false;
      if (item.latest_observation) {
        date = `${translations('bulkTesting.employees.lastTested')}${iso8601ToFormatted(
          item.latest_observation?.data.updated_at,
          'MMM dd'
        )}`;
        showWarning =
          item.latest_observation.data.result === 'positive' &&
          Math.round(new Date().getTime() / 1000) -
            Math.round(new Date(item.latest_observation?.data.updated_at).getTime() / 1000) <
            864000;
      } else {
        date = translations('bulkTesting.employees.notTested');
      }
      data.push({
        uuid: item.uuid,
        first_name: item.first_name,
        last_name: item.last_name,
        status: '',
        date,
        observationDate: iso8601ToFormatted(
          item.latest_observation?.data.updated_at,
          formats.longDateWithFullMonth
        ),
        observationResult: item.latest_observation?.data.result,
        showWarning,
      });
    }
  });
  if (uuidsToRemove.length > 0) {
    dispatch(removePersistedPendingObservation({ uuids: uuidsToRemove }));
  }
  return data;
};

export const getEmployees = createAsyncThunk(
  'bulkTesting/getEmployees',
  async (
    { groupId, type, searchQuery, isFirstPage, hasRoutines, translations },
    { dispatch, rejectWithValue, signal, getState }
  ) => {
    try {
      dispatch(getPersistedPendingObservations());
      let routineStatus = [];
      let sort = '';
      if (searchQuery.length >= 3) {
        sort = 'full_name';
        routineStatus = ['Due', 'Overdue', 'Not Started', 'Pass', 'Fail', 'Pending'];
      } else if (searchQuery.length > 0 && searchQuery.length < 3) {
        return {
          uuid: groupId,
          data: [],
          page: 1,
          total: 0,
        };
      } else if (type === 'complete') {
        sort = 'next_due_date';
        routineStatus = ['Pass', 'Fail', 'Pending'];
      } else {
        sort = 'full_name';
        routineStatus = ['Due', 'Overdue', 'Not Started'];
      }
      const source = axios.CancelToken.source();
      signal.addEventListener('abort', () => {
        source.cancel();
      });
      const { data: response } = await getEmployeesApi(
        [groupId],
        routineStatus,
        searchQuery,
        sort,
        isFirstPage ? 1 : getState().bulkTesting.currentPageEmployees + 1,
        PER_PAGE,
        hasRoutines,
        source.token
      );
      const data = getFormattedEmployees(
        response.data,
        hasRoutines,
        translations,
        getState(),
        dispatch
      );
      return {
        uuid: groupId,
        data,
        page: response?.meta?.pagination.current_page,
        total: response?.meta?.pagination.total,
      };
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const getEmployeeRoutines = createAsyncThunk(
  'bulkTesting/getEmployeeRoutines',
  async ({ employeeId, groupId }, { rejectWithValue, getState }) => {
    try {
      const { data: response } = await getEmployeeRoutinesApi(employeeId);
      const routines = [];
      const image = getState().user.usersLookup[getState().user.users[0]]?.organizations[0]?.uuid
        ? getState().user.organizationsLookup[
            getState().user.usersLookup[getState().user.users[0]]?.organizations[0].uuid
          ].image
        : undefined;
      const routineIds = [];
      getState().bulkTesting.groups.forEach((group) => {
        if (group.uuid === groupId) {
          group.routines.data.forEach((routine) => routineIds.push(routine.uuid));
        }
      });
      response.data.forEach(({ routine, ...d }) => {
        if (routineIds.includes(routine.data?.uuid)) {
          routines.push({
            userId: employeeId,
            routineId: routine?.data?.uuid,
            name: routine?.data?.name,
            description: routine?.data?.description,
            image,
            ...d,
          });
        }
      });
      return { uuid: employeeId, data: routines };
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response?.status,
      });
    }
  }
);

export const getEmployeeTasks = createAsyncThunk(
  'bulkTesting/getEmployeeTasks',
  async ({ employeeId }, { rejectWithValue }) => {
    try {
      const { data: response } = await getEmployeeTasksApi(employeeId);
      let data = {};
      if (response.data.length > 0 && response.data[0].meta) {
        const { meta } = response.data[0];
        data = {
          last_tested:
            !meta.last_tested || new Date(meta.last_tested).toString() === 'Invalid Date'
              ? '(not available)'
              : iso8601ToFormatted(meta.last_tested, 'MMM d, yyyy'),
          next_due_start:
            !meta.next_due_start || new Date(meta.next_due_start).toString() === 'Invalid Date'
              ? '(not available)'
              : iso8601ToFormatted(meta.next_due_start, 'MMM d, yyyy'),
        };
      } else {
        data = {
          last_tested: '(not available)',
          next_due_start: '(not available)',
        };
      }
      return { uuid: employeeId, data };
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const postEmployeeObservations = createAsyncThunk(
  'bulkTesting/postEmployeeObservations',
  async (
    { employeeId, groupId, selectedTab, observation, hasRoutines, translations },
    { dispatch, rejectWithValue, getState }
  ) => {
    const { data, observationData } = observation;
    try {
      const { data: response } = await postEmployeeObservationsApi(employeeId, {
        ...observationData,
        data: JSON.stringify(data),
      });
      const employees = getState().bulkTesting.employees[groupId].map((item) =>
        item.uuid === employeeId
          ? {
              ...item,
              status: translations('bulkTesting.employees.pending'),
              date: '',
            }
          : item
      );
      dispatch(
        setPersistedPendingObservation({
          uuid: employeeId,
          date: new Date(response.data.updated_at).getTime(),
        })
      );
      setTimeout(() => {
        dispatch(
          getEmployees({
            groupId,
            type: selectedTab,
            searchQuery: '',
            isFirstPage: true,
            hasRoutines,
            translations,
          })
        );
      }, 10000);
      return {
        uuid: groupId,
        data: employees,
        employeeId,
        task: {
          last_tested: iso8601ToFormatted(new Date(), 'MMM d, yyyy'),
          next_due_start: '(not available)',
        },
      };
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.notSaved.title'),
        subtitle: i18next.t('errors.notSaved.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const createEmployee = createAsyncThunk(
  'bulkTesting/createEmployee',
  async (
    { data, selectedTab, hasRoutines, translations },
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      const rejectResponse = getState().bulkTesting.createEmployeeFailure;
      let response;
      if (data.email.length > 0) {
        response = await dispatch(validateEmail({ email: data.email.toLowerCase() }));
      }
      if (!response || response.type?.includes('fulfilled')) {
        if (!rejectResponse || !rejectResponse.type) {
          response = await createEmployeeApi({
            first_name: data.first_name,
            last_name: data.last_name,
            identifier: data.identifier,
            sex: 'X',
            password: 'LetsOnGo123!',
          });
          const uuids = response.data.data.uuid;
          response = await dispatch(addEmployeeToOrganization({ uuids }));
          if (response?.type?.includes('fulfilled')) {
            response = await dispatch(addEmployeeToGroup({ uuids, data }));
          }
          if (response?.type?.includes('fulfilled') && data.email.length > 0) {
            response = await dispatch(addEmployeeEmail({ uuids, data }));
          }
          if (response?.type?.includes('fulfilled') && data.phone.length === 10) {
            response = await dispatch(addEmployeePhone({ uuids, data }));
          }
        } else if (rejectResponse && rejectResponse.identifier === data.identifier) {
          const uuids = rejectResponse?.uuid;
          if (rejectResponse.type.includes('bulkTesting/addEmployeeToOrganization')) {
            response = await dispatch(addEmployeeToOrganization({ uuids }));
            if (response?.type?.includes('fulfilled')) {
              response = await dispatch(addEmployeeToGroup({ uuids, data }));
            }
            if (response?.type?.includes('fulfilled') && data.email.length > 2) {
              response = await dispatch(addEmployeeEmail({ uuids, data }));
            }
            if (response?.type?.includes('fulfilled') && data.phone.length === 10) {
              response = await dispatch(addEmployeePhone({ uuids, data }));
            }
          } else if (rejectResponse.type.includes('bulkTesting/addEmployeeToGroup')) {
            response = await dispatch(addEmployeeToGroup({ uuids, data }));
            if (response?.type?.includes('fulfilled') && data.email.length > 2) {
              response = await dispatch(addEmployeeEmail({ uuids, data }));
            }
            if (response?.type?.includes('fulfilled') && data.phone.length === 10) {
              response = await dispatch(addEmployeePhone({ uuids, data }));
            }
          } else if (rejectResponse.type.includes('bulkTesting/addEmployeeEmail')) {
            if (data.email.length > 0) {
              response = await dispatch(addEmployeeEmail({ uuids, data }));
            } else {
              response = { type: 'fulfilled' };
            }
            if (response?.type?.includes('fulfilled') && data.phone.length === 10) {
              response = await dispatch(addEmployeePhone({ uuids, data }));
            } else if (data.phone.length === 0) {
              response = { type: 'fulfilled' };
            }
          } else if (rejectResponse.type.includes('bulkTesting/addEmployeePhone')) {
            if (data.phone.length === 10) {
              response = await dispatch(addEmployeePhone({ uuids, data }));
            } else {
              response = { type: 'fulfilled' };
            }
          }
        }
        dispatch(
          getEmployees({
            groupId: data.group,
            type: selectedTab,
            searchQuery: '',
            isFirstPage: true,
            hasRoutines,
            translations,
          })
        );
      } else {
        return rejectWithValue({
          message: i18next.t('errors.email.title'),
          subtitle: 'Try entering new email or leave blank',
        });
      }
      return response?.type?.includes('fulfilled')
        ? response
        : rejectWithValue({
            ...response.payload,
            type: response.type,
            identifier: data.identifier,
          });
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.notSaved.title'),
        subtitle: i18next.t('errors.notSaved.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const addEmployeeToOrganization = createAsyncThunk(
  'bulkTesting/addEmployeeToOrganization',
  async ({ uuids }, { rejectWithValue, getState }) => {
    try {
      const organizationId =
        getState().user.usersLookup[getState().user.users[0]]?.organizations[0].uuid;
      const { data: response } = await addEmployeeToOrganizationApi(organizationId, { uuids });
      return response;
    } catch (error) {
      return rejectWithValue({
        uuid: uuids,
        message: i18next.t('errors.notSaved.title'),
        subtitle: i18next.t('errors.notSaved.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const addEmployeeToGroup = createAsyncThunk(
  'bulkTesting/addEmployeeToGroup',
  async ({ uuids, data }, { rejectWithValue }) => {
    try {
      const { data: response } = await addEmployeeToGroupApi(data.group, { uuids });
      return response;
    } catch (error) {
      return rejectWithValue({
        uuid: uuids,
        message: i18next.t('errors.notSaved.title'),
        subtitle: i18next.t('errors.notSaved.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const addEmployeeEmail = createAsyncThunk(
  'bulkTesting/addEmployeeEmail',
  async ({ uuids, data }, { rejectWithValue }) => {
    try {
      const { data: response } = await addEmployeeEmailApi(uuids, {
        email: data.email.toLowerCase(),
      });
      return response;
    } catch (error) {
      return rejectWithValue({
        uuid: uuids,
        message: i18next.t('errors.notSaved.title'),
        subtitle: i18next.t('errors.notSaved.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const addEmployeePhone = createAsyncThunk(
  'bulkTesting/addEmployeePhone',
  async ({ uuids, data }, { rejectWithValue }) => {
    try {
      const { data: response } = await addEmployeePhoneApi(uuids, {
        country_code: 'US',
        number: `+1${data.phone}`,
      });
      return response;
    } catch (error) {
      return rejectWithValue({
        uuid: uuids,
        message: i18next.t('errors.notSaved.title'),
        subtitle: i18next.t('errors.notSaved.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

// async storage save and get pending observation
export const setPersistedPendingObservation = createAsyncThunk(
  'app/setPersistedPendingObservation',
  async ({ uuid, date }, { rejectWithValue }) => {
    try {
      const prevObservationsRaw = await AsyncStorage.getItem('pendingObservation');
      const prevObservations = JSON.parse(prevObservationsRaw) || {};
      prevObservations[uuid] = date;
      await AsyncStorage.setItem('pendingObservation', JSON.stringify(prevObservations));
      return true;
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response?.status,
      });
    }
  }
);

export const removePersistedPendingObservation = createAsyncThunk(
  'app/removePersistedPendingObservation',
  async ({ uuids }, { getState, rejectWithValue }) => {
    try {
      const prevObservationsRaw = await AsyncStorage.getItem('pendingObservation');
      const prevObservations = JSON.parse(prevObservationsRaw) || {};
      const tasks = { ...getState().bulkTesting.tasks };
      uuids.forEach((uuid) => {
        delete prevObservations[uuid];
        delete tasks[uuid];
      });
      await AsyncStorage.setItem('pendingObservation', JSON.stringify(prevObservations));
      return { observations: prevObservations, tasks };
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response?.status,
      });
    }
  }
);

export const getPersistedPendingObservations = createAsyncThunk(
  'app/getPersistedPendingObservations',
  async (_, { rejectWithValue }) => {
    try {
      const observationResultRaw = await AsyncStorage.getItem('pendingObservation');
      let observationResults = {};
      const tasks = {};
      if (observationResultRaw) {
        observationResults = JSON.parse(observationResultRaw) || {};
        Object.keys(observationResults).forEach((uuid) => {
          tasks[uuid] = {
            last_tested: iso8601ToFormatted(observationResults[uuid], 'MMM d, yyyy'),
            next_due_start: '(not available)',
          };
        });
      }
      return {
        observations: observationResults || {},
        tasks,
      };
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response?.status,
      });
    }
  }
);

export const getOrganizationDetailsByCode = createAsyncThunk(
  'bulkTesting/getOrganizationDetailsByCode',
  async (code, { rejectWithValue, getState }) => {
    try {
      const { data: response } = await getOrganizationDetailsByCodeApi(code);
      const groups = [];
      response.data.organization.groups?.data?.forEach((group) => {
        groups.push({
          label: group.name,
          value: group.uuid,
        });
      });
      const detailsPromises = getState().user.users.map((uuid) =>
        getUserEnrolledDetailsApi(uuid, response.data.organization?.uuid)
      );
      const combinedPromises = await Promise.all(detailsPromises);
      const users = [];
      combinedPromises.forEach((item) => {
        if (Object.keys(item.data.data).length > 0) {
          users.push(item.data.data.user.uuid);
        }
      });
      return {
        uuid: response.data.organization?.uuid,
        name: response.data.organization?.name,
        image: response.data.organization?.meta?.orgMetaData?.logo,
        groups,
        users,
      };
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to Fetch School Details',
        status: error?.response.status,
      });
    }
  }
);

export const addUserToOrganization = createAsyncThunk(
  'bulkTesting/addUserToOrganization',
  async (
    { dependentUUID, code, groupUUID, orgUUID, mainUser },
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      const consentData = {
        organization: orgUUID,
        signature: `${mainUser.first_name} ${mainUser.last_name}`,
        understand_agreement: false,
        data_being_collected: false,
        sunset_expiry: false,
        revocation_ability: false,
        legal_rights: false,
        org_membership: true,
        org_share_data: true,
        org_view_data: false,
        org_test_history: false,
        org_individual_tests: false,
        org_last_test: false,
        org_dependents: false,
        org_dependents_test_history: false,
        org_dependents_individual_tests: false,
        org_dependents_last_test: false,
      };
      await createConsentApi(dependentUUID, consentData);
      const data = {
        group_ids: [groupUUID],
        organization_code: code,
      };
      await enrollUserApi(dependentUUID, data);
      let selectedGroupName = '';
      getState().bulkTesting.organizationDetails.groups.forEach((group) => {
        if (group.value === groupUUID) {
          selectedGroupName = group.label;
        }
      });
      dispatch(getRoutines());
      dispatch(getTasks());
      return selectedGroupName;
    } catch (error) {
      const errStatusCode = error
        .toString()
        .slice(error.toString().length - 3, error.toString().length);
      if (errStatusCode === '409') {
        return rejectWithValue({
          message: 'User already added to group',
          subtitle: 'Please try a a different group',
          status: error?.response.status,
        });
      }
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to add to this group',
        status: error?.response.status,
      });
    }
  }
);

const initialState = {
  groups: [],
  employees: {},
  currentPageEmployees: 1,
  totalEmployees: 5,
  routines: [],
  tasks: {},
  createEmployeeFailure: undefined,
  globalError: null,
  isAddRecordLoading: false,
  pendingObservations: {},
  isEmployeesLoading: false,
  organizationDetails: {},
};

export const bulkTestingSlice = createSlice({
  name: 'bulkTesting',
  initialState,
  reducers: {
    clearBulkTesting: () => initialState,
    clearGlobalErrors(state) {
      state.globalError = null;
    },
    clearOrganizationDetails(state) {
      state.organizationDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.fulfilled, (state, { payload }) => {
        state.groups = payload;
        return state;
      })
      .addCase(getEmployees.pending, (state, { meta }) => {
        state.isEmployeesLoading = meta.arg.searchQuery.length === 0 && meta.arg.isFirstPage;
        return state;
      })
      .addCase(getEmployees.rejected, (state) => {
        state.isEmployeesLoading = false;
        return state;
      })
      .addCase(getEmployees.fulfilled, (state, { payload }) => {
        const { uuid, data, page, total } = payload;
        state.isEmployeesLoading = false;
        if (page === 1) {
          state.employees[uuid] = data;
        } else {
          state.employees[uuid] = [...state.employees[uuid], ...data];
        }
        state.currentPageEmployees = page;
        state.totalEmployees = total;
        return state;
      })
      .addCase(getEmployeeRoutines.fulfilled, (state, { payload }) => {
        const { uuid, data } = payload;
        state.routines[uuid] = data;
        return state;
      })
      .addCase(getEmployeeTasks.fulfilled, (state, { payload }) => {
        const { uuid, data } = payload;
        state.tasks[uuid] = data;
        return state;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.createEmployeeFailure = undefined;
        return state;
      })
      .addCase(createEmployee.rejected, (state, { payload }) => {
        state.createEmployeeFailure = payload;
        return state;
      })
      .addCase(postEmployeeObservations.pending, (state) => {
        state.isAddRecordLoading = true;
        return state;
      })
      .addCase(postEmployeeObservations.rejected, (state) => {
        state.isAddRecordLoading = false;
        return state;
      })
      .addCase(postEmployeeObservations.fulfilled, (state, { payload }) => {
        const { uuid, data, employeeId, task } = payload;
        state.employees[uuid] = data;
        state.tasks[employeeId] = task;
        state.isAddRecordLoading = false;
        return state;
      })
      .addCase(getPersistedPendingObservations.fulfilled, (state, { payload }) => {
        const { observations, tasks } = payload;
        state.pendingObservations = observations;
        state.tasks = { ...state.tasks, ...tasks };
        return state;
      })
      .addCase(removePersistedPendingObservation.fulfilled, (state, { payload }) => {
        const { observations, tasks } = payload;
        state.pendingObservations = observations;
        state.tasks = tasks;
        return state;
      })
      .addCase(getOrganizationDetailsByCode.fulfilled, (state, { payload }) => {
        state.organizationDetails = payload;
        return state;
      })
      .addCase(addUserToOrganization.fulfilled, (state, { payload }) => {
        state.organizationDetails.selectedGroupName = payload;
        state.organizationDetails.showUserEnrolledModal = true;
        return state;
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
export const { clearBulkTesting, clearOrganizationDetails } = bulkTestingSlice.actions;
export default bulkTestingSlice.reducer;
