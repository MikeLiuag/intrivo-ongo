/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

import {
  updatePhone,
  fetchOrganizations,
  fetchRoutines,
  fetchTasks,
  getDependents,
  getObservations,
  getUser,
  postDependent,
  removeDependent,
  resendCode,
  updateUsers,
  updateLocation,
  updateEmail,
  getQRToken as getQRTokenFromAPI,
  fetchConsensts,
  postConsensts,
  resendCodeToEmail,
  postVaccineStatus,
  getVaccineStatus,
  postVaccineCard,
  deleteVaccineCard,
  postDoseInfo,
  updateDoseInfo,
  deleteDoseInfo,
  orgInvations,
  setInviteState,
  getUserAgreements,
  getClientAgreements,
  postUserAgreement,
  joinLiveSession,
  getAppointmentRequests,
  getAppointments,
  getUserDocuments,
  getLiveSessions,
  getVisitSummary,
  getUserPrescriptions,
  getDeliveryJob,
  postDeliveryJob,
} from '../../endpoints/user';
import { getActivities } from '../../endpoints/sniffle';
import { clearErrors, refreshState } from './actions';
import { IS_DEV } from '../../utilis/axios';
import { setTopic } from '../app/slice';
import { i18next } from '../../utilis/i18n';
import { INSURANCE_KEY, saveToLocalStorage, getFromLocalStorage } from '../../utilis/localStorage';
import { iso8601ToDate } from '../../utilis/dateTime';
import { getMedicationRequests, uploadDocumentsAPI } from '../../endpoints/app';

const initialState = {
  users: [],
  user: null,
  tasks: null,
  observations: [],
  organizations: null,
  routines: null,
  isLoading: false,
  isLoadingRoutines: false,
  isLoadingOrganizations: false,
  isLoadingTasks: false,
  isLoadingInfo: false,
  error: null,
  email: false,
  emailId: null,
  phoneId: null,
  phoneNumber: null,
  vaccinationData: null,
  doseInfo: [],
  updatedUser: false,
  invitationList: [],
  insuranceData: null,
  showCarePlan: false,
  showSniffles: false,
  showLongCovids: false,
  mainUserSelfie: null,
};

const DEFAULT_USER_NOUNS = {
  en: { userNoun: { key_one: 'employee', key_other: 'employees' } },
};

// There are two copies of this function
// app/slice: function used during 2fa call
// user/slice: function used during register / update phone
export const resendVerificationCode = createAsyncThunk(
  'user/resendCode',
  async (_, { getState, rejectWithValue }) => {
    try {
      const phoneId =
        getState().app.phoneId ||
        getState().user?.usersLookup[getState().user?.users[0]]?.phone?.uuid;
      if (phoneId) {
        await resendCode({ phoneId });
        return true;
      }
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleResend'),
      });
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleResend'),
        status: err?.response?.status,
      });
    }
  }
);

export const resendVerificationCodeToEmail = createAsyncThunk(
  'user/resendCodeToEmail',
  async (_, { getState, rejectWithValue }) => {
    try {
      const emailId =
        getState().app.emailId || getState().user?.usersLookup[getState().user?.users[0]]?.emailId;
      if (emailId) {
        await resendCodeToEmail({ emailId });
        return true;
      }
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleResend'),
      });
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleResend'),
        status: err?.response?.status,
      });
    }
  }
);

// The app only deals with the primary phone
// Check the user store to see if a primary phone is available
// if yes, then update the number for that phone id
// if no, create a new record that will default to primary
export const changePhone = createAsyncThunk(
  'user/updatePhone',
  async ({ number, countryCode }, { getState, rejectWithValue, dispatch }) => {
    try {
      const { usersLookup, users } = getState().user;
      const { phoneId: phoneIdState } = getState().app;
      const { phone } = usersLookup[users[0]] || {};
      const { number: existingNumber, uuid: phoneIdUser, isVerified } = phone;

      const phoneId = phoneIdState || phoneIdUser || null;

      if (existingNumber === number && isVerified) return true;
      if (existingNumber !== number) {
        await updatePhone({ number, countryCode, phoneId });
        dispatch(getCompleteUserData());
      }
      return true;
    } catch (err) {
      // console.log(i18next)
      return rejectWithValue({
        message: i18next.t('errors.phone.title'),
        subtitle: i18next.t('errors.phone.subtitle'),
        status: err?.response?.status,
      });
    }
  }
);

export const getQRToken = createAsyncThunk(
  'user/getQRToken',
  async ({ uuid, expireInMin = 30 }) => {
    try {
      const { data } = await getQRTokenFromAPI(uuid, expireInMin, IS_DEV);
      const qrToken = data.token;
      return { uuid, qrToken };
    } catch (err) {
      return false;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const uuid = data.uuid || getState().user.users[0];
      // const dataFormatted = data.dob
      //   ? { ...data, dob: new Date(data.dob).toISOString().slice(0, 10) }
      //   : data;
      // const { dob, ...dataFormatted } = data;
      const curUserObj = getState().user.usersLookup[uuid] || {};
      const {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email,
        state_id: state,
        address_1: address1,
        address_2: address2,
        city,
        zipcode,
        dob,
        height,
        weight,
        agreementAccepted,
        sex,
        raceId,
        ethnicityId,
      } = data;

      const userData = {
        firstName: firstName !== curUserObj.first_name ? firstName : undefined,
        middleName: middleName !== curUserObj.middle_name ? middleName : undefined,
        lastName: lastName !== curUserObj.last_name ? lastName : undefined,
        dob: dob !== curUserObj.dob ? dob : undefined,
        height: height !== curUserObj.height ? height : undefined,
        weight: weight !== curUserObj.weight ? weight : undefined,
        sex: sex !== curUserObj.sex ? sex : undefined,
        race_id: raceId !== curUserObj.race_id ? raceId : undefined,
        ethnicity_id: ethnicityId !== curUserObj.ethnicity_id ? ethnicityId : undefined,
        agreementAccepted,
      };
      Object.keys(userData).forEach((key) => userData[key] === undefined && delete userData[key]);

      const locationData = {
        address1: address1 !== curUserObj.location?.address_1 ? address1 : undefined,
        address2: address2 !== curUserObj.location?.address_2 ? address2 : undefined,
        city: city !== curUserObj.location?.city ? city : undefined,
        state: state !== curUserObj.location?.state ? state : undefined,
        zipcode: zipcode !== curUserObj.location?.zipcode ? zipcode : undefined,
      };
      const validLocationData = Object.fromEntries(
        Object.entries(locationData).filter(([key, v]) => key && v != null && v !== undefined)
      );

      if (Object.keys(userData).length)
        await updateUsers({
          uuid,
          ...userData,
        });
      if (Object.keys(validLocationData).length) {
        const locationId = curUserObj.location.uuid;
        await updateLocation({ uuid, locationId, ...validLocationData });
      }

      if (email && email !== curUserObj.email) {
        const emailId = curUserObj?.emails?.uuid;
        await updateEmail({ emailId, email });
      }

      dispatch(getCompleteUserData());
      if (data?.fromBasicInfo) {
        return true;
      }
      return false;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.regist.title'),
        subtitle: i18next.t('errors.regist.subtitle'),
        status: err?.response?.status,
      });
    }
  }
);

export const addDependent = createAsyncThunk(
  'user/addDependent',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      await postDependent({
        ...data,
        sex: 'X',
        relationship_id: getState().app.relationshipTypes.parent.uuid,
        // dob: new Date(data.dob).toISOString().slice(0, 10),
      });
      dispatch(getCompleteUserData());
      return true;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.regist.title'),
        subtitle: i18next.t('errors.regist.subtitle'),
        status: err?.response?.status,
      });
    }
  }
);

export const deleteDependent = createAsyncThunk(
  'user/deleteDependent',
  async ({ uuid }, { getState, dispatch, rejectWithValue }) => {
    try {
      const relationshipId = getState().user?.usersLookup[uuid]?.relationshipId || null;
      await removeDependent(relationshipId);
      await dispatch(getCompleteUserData());
      return true;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response?.status,
      });
    }
  }
);

export const getCompleteUserData = createAsyncThunk(
  'user/getCompleteUserData',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      // const { data: responseUser } = await getUser();
      const { data: resUser = {} } = await getUser();
      const { data: userObj } = resUser;
      const {
        emails,
        phones,
        locations,
        organizations,
        roles,
        firebase_topic: firebaseTopic,
        ...restUserObj
      } = userObj;
      // subscribe to topic
      dispatch(setTopic(firebaseTopic));

      // const phone = phones?.data?.find(({ is_primary: p }) => p) || {};
      const phone = phones?.data ? phones.data[phones.data.length - 1] : {};
      const location = locations?.data[0] || {};

      const user = {
        ...restUserObj,
        organizations: organizations.data.map(({ uuid }, index) => ({
          uuid,
          hasConsent: getState().user.usersLookup
            ? getState().user?.usersLookup[userObj.uuid]?.organizations[index].hasConsent
            : undefined,
          hasShareData: getState().user.usersLookup
            ? getState().user?.usersLookup[userObj.uuid]?.organizations[index].hasShareData
            : undefined,
        })),
        email: emails?.data[0]?.email,
        emails: emails?.data[0],
        phone: {
          ...phone,
          isVerified: phone?.verified_at || false,
        },
        location,
      };

      const { data: resDependents = {} } = await getDependents();
      const { data: dependentsArray = [] } = resDependents;
      const insuranceData = await getFromLocalStorage(INSURANCE_KEY);

      const dependents = dependentsArray.map((i) => {
        i.related.data.location = i.related.data.locations.data[0] || {};
        return i;
      });

      let isOrgAdmin = false;
      roles.data.forEach((item) => {
        if (item.name === 'admin' || item.name === 'orgadmin' || item.name === 'groupadmin') {
          isOrgAdmin = true;
        }
      });

      return {
        user,
        dependents,
        isOrgAdmin,
        insuranceData,
      };
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response?.status,
      });
    }
  }
);
export const fetchObservations = createAsyncThunk(
  'user/getObservations',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { users } = getState().user;
      const { paxlovidIntegration } = getState().app;
      const observations = [];
      const eligiblePaxlovidUsers = [];
      const eligibleSnifflesUsers = [];

      const getObservationPromises = users.map((uuid) => getObservations(uuid));

      const results = await Promise.all(getObservationPromises.map((p) => p.catch((e) => e)));
      const successfulResults = results
        .map((r, i) => ({ userId: users[i], ...r }))
        .filter((r) => !(r instanceof Error));
      successfulResults.forEach(({ userId, data }) => {
        (data?.data || []).forEach((d) => {
          const observation = { ...d, userId };
          observation.date = observation.created_at;
          observation.createdAtTs = iso8601ToDate(observation.created_at).getTime();
          if (observation.medication_requests?.data?.length > 0) {
            observation.showPaxlovidCTA = true;
            eligiblePaxlovidUsers.push(userId);
            observation.medicationRequest = observation.medication_requests?.data[0];
          } else if (
            paxlovidIntegration &&
            d?.data?.questionnaire_data?.result === 1 &&
            Date.now() - observation.createdAtTs <= 5 * 24 * 3600 * 1000 && // Within than 5 days
            !eligiblePaxlovidUsers.includes(userId)
          ) {
            observation.showPaxlovidCTA = true;
            eligiblePaxlovidUsers.push(userId);
          } else if (
            d?.data?.questionnaire_data?.result === 0 &&
            Date.now() - observation.createdAtTs <= 5 * 24 * 3600 * 1000 &&
            !eligibleSnifflesUsers.includes(userId) &&
            d?.data?.symptomsArray.length !== 0
          ) {
            observation.showSnifflesCTA = true;
            eligibleSnifflesUsers.push(userId);
          }
          observations.push(observation);
        });
      });
      return observations;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response?.status,
      });
    }
  }
);

export const getInvitesList = createAsyncThunk(
  'user/getInvitesList',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { users } = getState().user;
      const data = await orgInvations(users[0]);
      return data?.data?.data;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response?.status,
      });
    }
  }
);

export const cleanInvitesList = createAction('user/cleanInvitesList');

export const getOrganizations = createAsyncThunk(
  'user/getOrganizations',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { users, usersLookup } = getState().user;

      const orgDetails = {};
      const getOrgs = users
        .map((uuidMain) => {
          const organizations = usersLookup[uuidMain]?.organizations;
          if (organizations?.length) {
            return organizations.map(({ uuid }) => fetchOrganizations(uuid));
          }
          return undefined;
        })
        .filter((f) => f !== undefined)
        .flat();

      const getOrgsResult = await Promise.all(getOrgs.map((p) => p.catch((e) => e)));
      const successfulResults = getOrgsResult

        .map(({ data: { data } }) => ({ ...data }))

        .filter((r) => !(r instanceof Error));
      successfulResults.forEach(({ uuid, ...restOrg }) => {
        orgDetails[uuid] = { ...restOrg, meta: JSON.parse(restOrg.meta) };
        orgDetails[uuid].image = orgDetails[uuid].meta?.orgMetaData?.logo || '';
        if (!orgDetails[uuid].meta.orgMetaData.translations) {
          orgDetails[uuid].meta.orgMetaData.translations = DEFAULT_USER_NOUNS;
        }
      });
      return orgDetails;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response?.status,
      });
    }
  }
);

export const getConsents = createAsyncThunk(
  'user/getConsents',
  async (_, { getState, rejectWithValue }) => {
    const { users, usersLookup } = getState().user;
    try {
      const promiseConsents = users
        .map((uuid) => {
          const organizations = usersLookup[uuid]?.organizations;
          const restUser = usersLookup[uuid];
          if (organizations?.length) {
            return {
              consents: fetchConsensts(uuid),
              ...restUser,
              organizations,
            };
          }
          return {
            ...restUser,
            organizations,
          };
        })
        .filter((f) => f !== undefined);
      const getConsentsPromise = await Promise.all(
        promiseConsents.map(async ({ consents: con, ...restInfo }) => ({
          consents: con ? await con.catch((e) => e) : null,
          ...restInfo,
        }))
      );
      const successResult = getConsentsPromise.map(({ consents, organizations, ...restInfo }) => {
        let orgs = organizations ? [...organizations] : [];
        if (!(consents instanceof Error) && consents) {
          consents.data.data.forEach(
            ({
              organization: {
                data: { uuid },
              },
              agreements: { org_membership: orgMembership, org_share_data: orgShareData },
            }) => {
              if (uuid) {
                let org = organizations.find(({ uuid: orgId }) => orgId === uuid);
                if (org) {
                  orgs = orgs.filter((f) => f.uuid !== uuid);
                  org = {
                    ...org,
                    hasConsent: Boolean(orgMembership),
                    hasShareData: Boolean(orgShareData),
                  };
                  orgs.push(org);
                }
              }
            }
          );
        }
        return { ...restInfo, organizations: orgs };
      });

      return successResult;
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage || 'Error getting consensts details',
        subtitle: err?.appSubtitle || err.message,
        status: err?.response?.status,
      });
    }
  }
);

export const sendConsents = createAsyncThunk(
  'user/setConsents',
  async (
    { orgId, userId, inviteId, org_membership: orgMembership, org_share_data: orgShareData },
    { rejectWithValue, dispatch }
  ) => {
    const data = {
      organization: orgId,
      signature: userId,
      understand_agreement: false,
      data_being_collected: false,
      sunset_expiry: false,
      revocation_ability: false,
      legal_rights: false,
      org_membership: orgMembership,
      org_share_data: orgShareData,
      org_view_data: false,
      org_test_history: false,
      org_individual_tests: false,
      org_last_test: false,
      org_dependents: false,
      org_dependents_test_history: false,
      org_dependents_individual_tests: false,
      org_dependents_last_test: false,
    };
    try {
      await postConsensts(userId, data);
      const inviteData = {
        data: {
          status: orgMembership ? 'accepted' : 'rejected',
        },
      };
      await setInviteState(userId, inviteId, inviteData);
      // if org_membership is true, that means we joined an organization
      //  if this is true, then get the routines for this org.
      await dispatch(getConsents());
      if (orgMembership) {
        await dispatch(getRoutines());
        // await dispatch(getTasks());
      }
      return true;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status,
      });
    }
  }
);

export const getRoutines = createAsyncThunk(
  'user/getRoutines',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const { users, usersLookup } = getState().user;
      const { routineStatuses: currentRoutines } = getState().user;

      const routines = [];
      const getRoutinePromises = users.map((uuid) => fetchRoutines(uuid));
      const results = await Promise.all(getRoutinePromises);
      const successfulResults = results;
      if (currentRoutines) {
        successfulResults[0]?.data?.data.forEach((item) => {
          const sameRoutine = currentRoutines.find((currItem) => item.uuid === currItem.uuid);
          if (
            sameRoutine &&
            sameRoutine.status !== 'Pending' &&
            sameRoutine.status === item.status
          ) {
            dispatch(getTasks());
          }
        });
      }
      successfulResults.forEach(({ data }, i) => {
        data.data.forEach(({ routine, ...d }) => {
          const position = routines.findIndex(
            (routineItem) => routineItem.routineId === routine?.data?.uuid
          );

          if (position >= 0) {
            const routineUsers = routines[position].users;
            routineUsers.push({ ...usersLookup[users[i]], status: d.status });
          } else {
            routines.push({
              routineId: routine?.data?.uuid,
              name: routine?.data?.name,
              description: routine?.data?.description,
              ...d,
              users: [{ ...usersLookup[users[i]], status: d.status }],
            });
          }
        });
      });
      return routines;
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage || 'Error getting routines',
        subtitle: err?.appSubtitle || err.message,
        status: err?.response?.status,
      });
    }
  }
);

export const changeRoutineStatus = createAsyncThunk(
  'user/changeRoutineStatus',
  async (_, { getState }) => {
    try {
      const routine = getState().user.routineStatuses;
      const newRoutin = routine.map((item) => ({
        ...item,
        status: 'Pending',
      }));
      return newRoutin;
    } catch (err) {
      return false;
    }
  }
);

export const removeTask = createAsyncThunk(
  'user/removeTask',
  async (uuid, { getState, rejectWithValue }) => {
    try {
      const { tasks } = getState().user;
      const { users } = getState().user;
      if (uuid === users[0]) {
        const updatedTasks = tasks.filter(
          (t) => t.slug !== 'covid-19-rapid-antigen-test' && t.slug > new Date()
        );
        return updatedTasks;
      }
      return null;
    } catch (err) {
      return rejectWithValue({
        message: "Can't remove task.",
      });
    }
  }
);

export const getTasks = createAsyncThunk(
  'user/getTasks',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { users } = getState().user;

      const tasks = [];
      const getTaskPromises = users.map((uuid) => fetchTasks(uuid));
      const results = await Promise.all(getTaskPromises);
      const successfulResults = results;
      successfulResults.forEach(({ data }) => {
        data.data.forEach((item) => {
          const position = tasks.findIndex(
            (taskItem) => taskItem?.task?.data[0]?.uuid === item?.task?.data[0]?.uuid
          );
          if (position >= 0) {
            const taskUsers = tasks[position].users;
            taskUsers.push({
              ...item.user.data,
              status: item.status,
              date: new Date(item.meta.next_due_start),
            });
          } else {
            let dueDate = null;
            let slug = null;
            const parsedMeta = item?.meta;
            dueDate = new Date(parsedMeta?.next_due_start);
            slug = parsedMeta?.task_type;

            tasks.push({
              ...item,
              slug,
              dueDate,
              users: [
                {
                  ...item.user.data,
                  status: item.status,
                  date: new Date(item.meta.next_due_start),
                },
              ],
            });
          }
        });
      });
      return tasks;
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage || 'Error getting tasks',
        subtitle: err?.appSubtitle || err.message,
        status: err?.response?.status,
      });
    }
  }
);

export const updateVaccineStatus = createAsyncThunk(
  'user/updateVaccineStatus',
  async ({ uuid, postData }, { rejectWithValue, getState }) => {
    try {
      const orgId =
        getState().user.usersLookup?.[uuid]?.organizations?.length > 0
          ? getState().user.usersLookup?.[uuid]?.organizations[0]?.uuid
          : undefined;
      if (orgId) {
        postData.organization_id = orgId;
      }
      const { data: response } = await postVaccineStatus(uuid, postData);
      return { uuid, data: { uuid: response.data.uuid } };
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status,
      });
    }
  }
);

export const checkVaccineStatus = createAsyncThunk(
  'user/checkVaccineStatus',
  async (uuid, { dispatch, rejectWithValue }) => {
    try {
      const { data: response } = await getVaccineStatus(uuid);
      let immunizationId;
      if (response.data.length > 0) {
        immunizationId = response.data[0].uuid;
      }
      if (response.data[0]?.documents?.length > 0) {
        dispatch(
          downloadVaccineCard({
            uuid,
            media: response.data[0]?.documents[0]?.media[0],
          })
        );
      }
      return {
        uuid,
        data: {
          uuid: immunizationId,
          document: response.data[0]?.documents[0],
          doseInfo: response.data[0]?.immunization_records,
        },
      };
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: err?.response?.status,
      });
    }
  }
);

export const downloadVaccineCard = createAsyncThunk(
  'user/downloadVaccineCard',
  async ({ uuid, media }, { rejectWithValue }) => {
    try {
      const fileName = media.file_name;
      const { url } = media;
      const uri = (FileSystem.cacheDirectory || '').concat(fileName);

      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        await FileSystem.downloadAsync(url, uri);
      }
      return { uuid, uri };
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        skipError: true,
      });
    }
  }
);

export const uploadVaccineCard = createAsyncThunk(
  'user/uploadVaccineCard',
  async ({ uuid, postData }, { getState, dispatch, rejectWithValue }) => {
    try {
      let immunizationId = getState().user.usersLookup?.[uuid].immunization?.uuid;
      if (!immunizationId) {
        const response = await dispatch(
          updateVaccineStatus({
            uuid,
            postData: {
              immunization_status: 'not_shared',
              immunization_type: 'covid_19',
            },
          })
        );

        if (response?.type?.includes('fulfilled')) {
          immunizationId = response.payload.data.uuid;
        }
      }
      postData.append('immunization_status_id', immunizationId);
      const { data: response } = await postVaccineCard(uuid, postData);
      if (response.data) {
        dispatch(downloadVaccineCard({ uuid, media: response.data?.media[0] }));
      }
      return { uuid, document: response.data };
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status,
      });
    }
  }
);

export const removeVaccineCard = createAsyncThunk(
  'user/removeVaccineCard',
  async ({ uuid, immunizationId, documentId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await deleteVaccineCard(immunizationId, documentId);
      dispatch(checkVaccineStatus(uuid));
      return data;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status,
      });
    }
  }
);

export const replaceVaccineCard = createAsyncThunk(
  'user/removeVaccineCard',
  async ({ uuid, immunizationId, documentId, doseInfo }, { dispatch, rejectWithValue }) => {
    try {
      doseInfo.forEach((dose) => {
        deleteDoseInfo(immunizationId, dose.uuid);
      });
      await deleteVaccineCard(immunizationId, documentId);
      dispatch(checkVaccineStatus(uuid));
      return true;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status,
      });
    }
  }
);

export const addDoseInfo = createAsyncThunk(
  'user/addDoseInfo',
  async ({ uuid, data }, { dispatch, rejectWithValue }) => {
    try {
      const { data: response } = await postDoseInfo(uuid, data);
      dispatch(checkVaccineStatus(uuid));
      return response;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status,
      });
    }
  }
);

export const editDose = createAsyncThunk(
  'user/editDose',
  async ({ uuid, data, userId }, { dispatch, rejectWithValue }) => {
    try {
      const { data: responseData } = await updateDoseInfo(uuid, data);
      dispatch(checkVaccineStatus(userId));
      return responseData;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status,
      });
    }
  }
);

export const removeDoseInfo = createAsyncThunk(
  'user/removeDoseInfo',
  async ({ uuid, immunizationId, doseId }, { dispatch, rejectWithValue }) => {
    try {
      const { data: response } = await deleteDoseInfo(immunizationId, doseId);
      dispatch(checkVaccineStatus(uuid));
      return response;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status,
      });
    }
  }
);

export const migrateLocalDataToServer = createAsyncThunk(
  'user/migrateLocalDataToServer',
  async (_, { getState, dispatch }) => {
    try {
      const vaccinationDataRaw = await AsyncStorage.getItem('vaccinationData');
      const vaccinationDataParsed = await JSON.parse(vaccinationDataRaw);
      const uuids = Object.keys(vaccinationDataParsed || {});
      // for (const uuid of uuids) {
      uuids.forEach(async (uuid) => {
        if (getState().user.usersLookup?.[uuid]) {
          const base64Data = vaccinationDataParsed[uuid].base64File;
          let mimeType = '';
          let fileName = '';
          if (base64Data.charAt(0) === 'J') {
            mimeType = 'application/pdf';
            fileName = `${new Date().getTime()}.pdf`;
          } else {
            mimeType = 'image/jpeg';
            fileName = `${new Date().getTime()}.jpg`;
          }
          const uri = FileSystem.cacheDirectory + fileName;
          await FileSystem.writeAsStringAsync(uri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const photo = {
            uri,
            type: mimeType,
            name: fileName,
          };
          const postData = new FormData();
          postData.append('file', photo);
          postData.append('document_type', 'covid_19_vaccine_card');

          const res = await dispatch(
            uploadVaccineCard({
              uuid,
              postData,
            })
          );
          if (res?.type.includes('fulfilled')) {
            delete vaccinationDataParsed[uuid];
          }
        }
      });

      await AsyncStorage.setItem('vaccinationData', JSON.stringify(vaccinationDataParsed));

      const doseInfoRaw = await AsyncStorage.getItem('doseInfo');
      const doseInfoParsed = (await JSON.parse(doseInfoRaw)) || {};
      const doseUuids = Object.keys(doseInfoParsed);
      // for (const uuid of doseUuids) {
      doseUuids.forEach(async (uuid) => {
        if (getState().user.usersLookup?.[uuid]) {
          const doses = doseInfoParsed[uuid];
          const immunizationId = getState().user.usersLookup?.[uuid].immunization?.uuid;
          // for (const dose of doses) {
          doses.forEach(async (dose) => {
            const data = {
              immunization_type: 'covid_19',
              dose_number: dose.doseValue,
              date: dose.dateReceived,
              manufacturer: dose.vaccineType,
              lot_number: dose.lotValue,
              performer: '',
              location: '',
              immunization_status_id: immunizationId,
            };
            const res = await dispatch(
              addDoseInfo({
                uuid,
                data,
              })
            );
            if (res?.type.includes('fulfilled')) {
              delete doseInfoParsed[uuid];
            }
          });
        }
      });
      await AsyncStorage.setItem('doseInfo', JSON.stringify(doseInfoParsed));
      return true;
    } catch (err) {
      return err;
    }
  }
);

export const getUserReportSetting = createAsyncThunk(
  'user/getUserReportSetting',
  async (_, { getState }) => {
    try {
      const { users } = getState().user;
      const res = await getUserAgreements(users[0], ['covid_19_test']);
      const { data } = res;
      if (res) {
        return data;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
);

export const fetchClientAgreement = createAsyncThunk(
  'user/fetchClientAgreement',
  async ({ agreementId }) => {
    try {
      const res = await getClientAgreements(agreementId);
      const { data } = res;
      if (res) {
        return data;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
);

export const setUserAgreementSetting = createAsyncThunk(
  'app/reportSetting',
  async ({ requestData }, { getState, dispatch }) => {
    try {
      const { users } = getState().user;
      const res = await postUserAgreement(users[0], requestData);
      const { data } = res;
      if (res) {
        await dispatch(getCompleteUserData());
        return data;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
);

export const saveInsuranceInformation = createAsyncThunk(
  'user/saveInsuranceInformation',
  async ({ data, saveData }, { rejectWithValue }) => {
    try {
      if (saveData) {
        await saveToLocalStorage(INSURANCE_KEY, data);
      }
      return data;
    } catch (err) {
      return rejectWithValue({
        message: 'Unable to save insurance information',
      });
    }
  }
);

export const startAppointment = createAsyncThunk(
  'user/startAppointment',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await getAppointments(userId);
      const sessionId = response.data.data[0].live_session.data.id;
      const sessionResponse = await joinLiveSession(userId, sessionId);
      return sessionResponse.data.data;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const joinLiveSessionThunk = createAsyncThunk(
  'user/joinLiveSessionThunk',
  async ({ userId, sessionId }, { rejectWithValue }) => {
    try {
      const response = await joinLiveSession(userId, sessionId);
      return response.data.data;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const checkAppointmentStatus = createAsyncThunk(
  'user/checkAppointmentStatus',
  async (_, { getState, dispatch }) => {
    try {
      const { users } = getState().user;
      const responses = await Promise.all(
        users.map((userId) => dispatch(checkUserAppointmentStatus({ userId })))
      );
      return responses.map((res) => res.payload);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
);

export const checkUserAppointmentStatus = createAsyncThunk(
  'user/checkUserAppointmentStatus',
  async ({ userId }) => {
    try {
      const [appointmentRequestResponse, appointmentResponse] = await Promise.all([
        getAppointmentRequests(userId),
        getAppointments(userId, { purpose: null }),
      ]);
      return {
        uuid: userId,
        appointmentRequests: appointmentRequestResponse.data.data,
        appointments: appointmentResponse.data.data,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
);

export const getCarePlans = createAsyncThunk('user/getCarePlans', async ({ userId }) => {
  try {
    const [appointmentResponse, medicationRequestsResponse, liveSessionsResponse] =
      await Promise.all([
        getAppointments(userId, { purpose: null }),
        getMedicationRequests(userId),
        getLiveSessions(userId, { purpose: null }),
      ]);
    return {
      uuid: userId,
      appointments: appointmentResponse?.data?.data,
      medicationRequests: medicationRequestsResponse?.data?.data,
      liveSessions: liveSessionsResponse?.data?.data,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
});

export const getOtherDocuments = createAsyncThunk(
  'user/getVisitDocuments',
  async ({ userId, purpose }, { rejectWithValue }) => {
    try {
      const res = await getUserDocuments(userId, {
        documentType: ['testing', 'imaging'],
        purpose: [purpose],
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const getSelfie = createAsyncThunk('user/getSelfie', async ({ uuid }) => {
  try {
    const { data: resp } = await getUserDocuments(uuid, {
      documentType: ['selfie'],
      purpose: null,
    });
    if (resp.data.length !== 0) {
      const selfie = resp.data[resp.data.length - 1];
      return selfie.media[0].url;
    }
    return null;
  } catch (error) {
    return console.warn(error);
  }
});

export const getUserAppointment = createAsyncThunk(
  'user/getUserAppointment',
  async ({ userId, purpose }, { rejectWithValue }) => {
    try {
      const [appointmentRequestResponse, appointmentResponse] = await Promise.all([
        getAppointmentRequests(userId),
        getAppointments(userId, { purpose }),
      ]);
      return {
        uuid: userId,
        appointmentRequests: appointmentRequestResponse.data.data,
        appointments: appointmentResponse.data.data,
      };
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const getUserLiveSessions = createAsyncThunk(
  'user/getUserLiveSessions',
  async ({ userId, purpose }, { rejectWithValue }) => {
    try {
      const res = await getLiveSessions(userId, { purpose });
      return res.data.data;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const getPastVisitSummary = createAsyncThunk(
  'user/getPastVisitSummary',
  async ({ userId, sessionId }, { rejectWithValue }) => {
    try {
      const res = await getVisitSummary(userId, sessionId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const getUserPrescriptionsList = createAsyncThunk(
  'user/getUserPrescriptionsList',
  async (userId) => {
    try {
      const result = await getUserPrescriptions(userId);
      const data = {};
      result.data.data.forEach((prescription) => {
        const pharmacyId = prescription.pharmacy.data.id;
        if (!data[pharmacyId]) {
          data[pharmacyId] = { pharmacy: prescription.pharmacy.data, prescriptions: [] };
        }
        data[pharmacyId].prescriptions.push(prescription);
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
);

export const getDeliveryJobById = createAsyncThunk(
  `user/getDeliveryJob`,
  async ({ userId, deliveryJobId }, { rejectWithValue }) => {
    try {
      const result = await getDeliveryJob(userId, deliveryJobId);
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

export const fetchActivities = createAsyncThunk(
  `sniffles/fetchActivities`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const { users } = getState().user;
      const { paxlovidIntegration } = getState().app;
      const response = await getActivities(users[0]);
      return { ...response?.data, paxlovidIntegration };
    } catch (error) {
      return rejectWithValue({
        message: error?.appMessage,
        subtitle: 'Unable to fetch data',
        status: error?.response.status,
      });
    }
  }
);

export const fetchEulaStatus = createAsyncThunk(
  `sniffles/fetchActivities`,
  async (_, { rejectWithValue, getState }) => {
    const { users } = getState().user;
  }
);

const errorMessagesByCodes = {
  400024: {
    message: 'Address is not valid', // i18next.t('errors.deliveryRequest.invalidAddress.title'),
    subtitle: 'Please review your information', // i18next.t('errors.deliveryRequest.invalidAddress.subtitle'),
  },
  400025: {
    message: 'Delivery drivers are not available', // i18next.t('errors.deliveryRequest.noDrivers.title'),
    subtitle: 'Please try again later', // i18next.t('errors.deliveryRequest.noDrivers.subtitle'),
  },
  defaultDeliveryRequest: {
    message: 'Unable to schedule delivery', // i18next.t('errors.deliveryRequest.default.title'),
    subtitle: 'Contact us at 888-965-0301 (ext. 5)', // i18next.t('errors.deliveryRequest.default.subtitle'),
  },
};

const getDeliveryRequestErrorMessageByResponse = (response) => {
  if (!response?.data?.errors || response?.data?.errors?.length === 0) {
    return errorMessagesByCodes.defaultDeliveryRequest;
  }

  const responseStatusCode = response.data.errors[0].code;

  const errorMessage =
    responseStatusCode in errorMessagesByCodes
      ? errorMessagesByCodes[responseStatusCode]
      : errorMessagesByCodes.defaultDeliveryRequest;

  return errorMessage;
};

export const createDeliveryJob = createAsyncThunk(
  `user/createDeliveryJob`,
  async (
    { userId, pickUpLocation, dropOffLocation, prescriptions },
    { rejectWithValue, getState }
  ) => {
    try {
      const { usersLookup } = getState().user;
      const {
        first_name: firstName,
        last_name: lastName,
        phone: { number = '' } = {},
      } = usersLookup[userId];

      const requestData = {
        pickup: {
          address_1: pickUpLocation.address_1,
          address_2: pickUpLocation.address_2,
          business_name: pickUpLocation.name,
          city: pickUpLocation.city,
          country_code: pickUpLocation.country_code || 'US',
          first_name: 'Manager',
          last_name: 'Manager',
          phone_number: pickUpLocation.phone_number || '',
          state: pickUpLocation.state,
          zipcode: pickUpLocation.zipcode,
        },
        dropoff: {
          address_1: dropOffLocation.address1,
          address_2: dropOffLocation.address2,
          business_name: null,
          city: dropOffLocation.city,
          country_code: 'US',
          first_name: firstName,
          last_name: lastName,
          phone_number: number,
          state: dropOffLocation.stateId,
          zipcode: dropOffLocation.zipcode,
          instructions: '',
        },
        items: prescriptions,
      };

      const result = await postDeliveryJob(userId, requestData);

      return result.data.data;
    } catch (error) {
      const message = getDeliveryRequestErrorMessageByResponse(error?.response);

      return rejectWithValue(message);
    }
  }
);

export const getUserMedicationRequests = createAsyncThunk(
  'user/getUserMedicationRequests',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await getMedicationRequests(userId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const postUserSelfie = createAsyncThunk(
  'user/postUserSelfie',
  async ({ uuid, selfie }, { rejectWithValue }) => {
    try {
      const selfieFormdata = new FormData();
      selfieFormdata.append('media[0][subtype]', 'selfie');
      selfieFormdata.append('media[0][file]', {
        uri: selfie.uri,
        type: selfie.uri.includes('.pdf') ? 'application/pdf' : 'image/jpeg',
        name: new Date().getTime() + selfie.uri.split('/').pop(),
      });
      selfieFormdata.append('document_type', 'selfie');
      const { data: resp } = await uploadDocumentsAPI(uuid, selfieFormdata);
      return resp.data.media[0].url;
    } catch (error) {
      return rejectWithValue({
        message: 'Unable to upload selfie',
        subtitle: i18next.t('errors.typical.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

// helper function to take a /user response and convert it to state

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clear: () => initialState,
    setUnsavedObservations: (state, { payload }) => {
      const { uuid, data } = payload;
      state.usersLookup[uuid].unsavedObservations = data;
    },
  },
  extraReducers: {
    [clearErrors]: (state) => {
      state.error = null;
      // AsyncStorage.setItem('state', JSON.stringify(state));
      return state;
    },
    'app/register/fulfilled': (state, { payload }) => {
      state.phoneId = payload.phone_id;
      state.phoneNumber = payload.phoneNumber;
    },
    [updatePhone.fulfilled]: (state, { payload }) => {
      state.phoneId = payload;
    },
    [updatePhone.rejected]: (state, { payload }) => {
      if (payload.errors) {
        const errors = Object.entries(payload.errors)[0][1][0];
        state.error = errors;
      } else {
        state.error = payload.message;
      }
      return state;
    },
    // [changePhone.fulfilled]: (state, { payload }) => {
    //   const newNumber = payload.number;
    //   delete payload.user;
    //   state.users[0].phones = [payload];
    //   state.phoneId = payload.uuid;
    //   state.phoneNumber = newNumber;
    //   return state;
    // },
    [getQRToken.fulfilled]: (state, { payload }) => {
      const { uuid, qrToken } = payload;
      const { users } = state;
      const userIndex = users.findIndex((u) => u === uuid);
      state.usersLookup[users[userIndex]].qrToken = qrToken;
      state.error = null;
    },
    [deleteDependent.rejected]: (state, { payload }) => {
      state.error = payload.message;
      return state;
    },
    [getCompleteUserData.pending]: (state) => {
      state.isLoading = true;
      return state;
    },
    [getCompleteUserData.fulfilled]: (state, { payload }) => {
      const { user, dependents, isOrgAdmin, insuranceData } = payload;
      const dependentsObj = (dependents || []).map(({ uuid, related }) => ({
        relationshipId: uuid, // used to delete this user from the parent
        ...related.data,
      }));

      const detailedUsers = [user, ...dependentsObj].map((u) => ({
        ...u,
        location: {
          ...u?.location,
          state: u?.location?.map?.properties?.state || null,
        },
        fullName: `${u.first_name}${u.middle_name ? ' '.concat(u.middle_name) : ''}${
          u.last_name ? ' '.concat(u.last_name) : ''
        }`,
        dob: u.dob,
      }));
      state.users = [user, ...dependentsObj].map((u) => u.uuid);

      // organize the users' in a lookup by uuid object
      const usersLookup = {};
      detailedUsers.forEach((u) => {
        const { uuid } = u;
        usersLookup[uuid] = state.usersLookup ? { ...(state.usersLookup[uuid] || {}), ...u } : u;
      });
      state.usersLookup = usersLookup;
      state.isOrgAdmin = isOrgAdmin;
      state.insuranceData = insuranceData;

      // state.error = null;
      // state.isLoading = false;
      // return state;
    },
    [cleanInvitesList]: (state) => {
      state.invitationList = [];
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.updatedUser = payload;
    },
    [removeTask.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
      return state;
    },
    [fetchObservations.pending]: (state) => {
      state.isLoadingTasks = true;
      return state;
    },
    [fetchObservations.fulfilled]: (state, { payload }) => {
      state.isLoadingTasks = false;
      state.observations = payload
        .filter(
          (item) =>
            item?.type?.data?.slug === 'covid-19-rapid-antigen-test' &&
            item?.data?.questionnaire_data
        )
        .map((item) => ({
          name: item.type.data.name,
          result: item.data.questionnaire_data.result,
          date: item.ended_at,
          id: item.uuid,
          uuid: item.userId,
          userName: state.usersLookup[item.userId]?.fullName,
          testName: item.name,
          formattedStatus: item.formatted_status,
          statusStyle: item.status_style,
          symptoms: item.data.symptomsArray,
          showPaxlovidCTA: item.showPaxlovidCTA,
          showSnifflesCTA: item.showSnifflesCTA,
          paxlovidOrdered: item.paxlovidOrdered,
          medicationRequest: item.medicationRequest,
        }))
        .filter((item) => item.date !== null)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || 0);
      state.error = null;
      return state;
    },
    [fetchObservations.rejected]: (state, { payload }) => {
      state.observations = [];
      state.error = payload.message;
      state.isLoadingTasks = false;
      return state;
    },
    [getOrganizations.pending]: (state) => {
      state.isLoadingOrganizations = true;
      return state;
    },
    [getInvitesList.fulfilled]: (state, { payload }) => {
      state.invitationList = payload;
    },
    [getOrganizations.fulfilled]: (state, { payload }) => {
      // organize the users' organizations in a lookup by uuid object
      state.organizationsLookup = payload;
      state.isLoadingOrganizations = false;
      state.error = null;

      const routinesLookup = {};
      Object.keys(payload).forEach((k) => {
        (payload[k].routines?.data || []).forEach((r) => {
          routinesLookup[r.uuid] = { ...r, orgId: k, image: payload[k]?.image };
        });
      });
      state.routinesLookup = routinesLookup;
      // state.routines = routines;

      return state;
    },
    [changeRoutineStatus.fulfilled]: (state, { payload }) => {
      state.routineStatuses = payload;
    },
    [getOrganizations.rejected]: (state, { payload }) => {
      state.error = payload?.message;
      state.isLoadingOrganizations = false;
      state.organizations = null;
      return state;
    },
    [getConsents.pending]: (state) => {
      state.isLoadingOrganizations = true;
      return state;
    },
    [getConsents.fulfilled]: (state, { payload }) => {
      let numOrgs = 0;
      payload.forEach(({ uuid, organizations }) => {
        if (organizations?.length) {
          organizations.forEach(({ hasConsent }) => {
            numOrgs += hasConsent || 0;
          });
        }
        state.usersLookup[uuid].organizations = organizations;
      });
      state.isAnyUserMemberOfOrg = numOrgs > 0;
      state.isLoadingOrganizations = false;
      state.error = null;
      return state;
    },
    [saveInsuranceInformation.fulfilled]: (state, { payload }) => {
      state.insuranceData = payload;
      return state;
    },
    [getConsents.rejected]: (state, { payload }) => {
      state.error = payload?.message;
      state.isLoadingOrganizations = false;
      return state;
    },
    [getRoutines.pending]: (state) => {
      state.isLoadingRoutines = true;
      return state;
    },
    [getRoutines.fulfilled]: (state, { payload }) => {
      // payload.forEach(({ userId, ...r }) => {
      //   if (state.usersLookup[userId].routineStatuses?.length)
      //     state.usersLookup[userId].routineStatuses.push(r);
      //   else state.usersLookup[userId].routineStatuses = [r];
      // });
      const routineStatuses = payload.map((r) => ({
        ...state.routinesLookup[r.routineId],
        ...r,
      }));
      state.routineStatuses = routineStatuses;

      state.isLoadingRoutines = false;
      state.error = null;
    },
    [getTasks.pending]: (state) => {
      state.isLoadingTasks = true;
      return state;
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      const tasks = payload.map((t) => ({
        uuid: t.task.data.uuid,
        date: t.dueDate,
        slug: t.slug,
        name: t.task.data.name,
        routineId: t.uuid,
        description: t.description,
        users: t.users,
      }));
      // .filter((t) => t.due !== undefined);

      state.tasks = tasks;
      state.isLoadingTasks = false;

      // combine the tasks that have the same task name and status
      // only relevant for multiple orgs or deps that aren't supported yet
      const tasksToDisplay = tasks
        .filter((t) => t.type === 1)
        .reduce((acc, cur) => {
          const newAcc = [...acc];

          const foundIndex = acc.findIndex(
            (t) => cur.due === t.due && cur.status === t.status && cur.type === t.type
          );

          if (foundIndex >= 0) {
            const foundUserIndex = acc[foundIndex].users.findIndex(
              ({ userId }) => userId === cur.userId
            );

            if (foundUserIndex === -1)
              newAcc[foundIndex].users.push({
                userId: cur.userId,
                organizations: [],
              });

            const index =
              foundUserIndex === -1 ? newAcc[foundIndex].users.length - 1 : foundUserIndex;

            newAcc[foundIndex].users[index].organizations.push({
              organizationId: cur.organizationId,
              taskId: cur.uuid,
            });
          } else {
            newAcc.push({
              due: cur.due,
              status: cur.status,
              type: cur.type,
              name: cur.name,
              users: [
                {
                  userId: cur.userId,
                  organizations: [
                    {
                      organizationId: cur.organizationId,
                      taskId: cur.uuid,
                    },
                  ],
                },
              ],
            });
          }
          return newAcc;
        }, [])
        .sort((a, b) => Date.parse(a.due) - Date.parse(b.due) || 0);

      state.tasksToDisplay = tasksToDisplay;
    },
    [refreshState]: (state, { payload }) => {
      state = payload;
      return state;
    },
    [updateVaccineStatus.fulfilled]: (state, { payload }) => {
      const { uuid, data } = payload;
      state.usersLookup[uuid].immunization = data;
      return state;
    },
    [updateVaccineStatus.rejected]: (state, { payload }) => {
      state.error = payload?.message;
      return state;
    },
    [checkVaccineStatus.fulfilled]: (state, { payload }) => {
      const { uuid, data } = payload;
      state.usersLookup[uuid].immunization = data;
      return state;
    },
    [downloadVaccineCard.fulfilled]: (state, { payload }) => {
      const { uuid, uri } = payload;
      state.usersLookup[uuid].immunization.document.media[0].uri = uri;
    },
    [uploadVaccineCard.fulfilled]: (state, { payload }) => {
      const { uuid, document } = payload;
      state.usersLookup[uuid].immunization.document = document;
    },
    [uploadVaccineCard.rejected]: (state, { payload }) => {
      state.error = payload?.message;
      return state;
    },
    [addDoseInfo.rejected]: (state, { payload }) => {
      state.error = payload?.message;
      return state;
    },
    [checkUserAppointmentStatus.fulfilled]: (state, { payload }) => {
      const { uuid, appointmentRequests, appointments } = payload;
      state.usersLookup[uuid].pendingAppointmentRequest = (appointmentRequests || [])
        .filter((e) => e.status === 'submitted')
        .map((e) => ({ ...e, user_id: uuid }));
      state.usersLookup[uuid].pendingAppointment = (appointments || [])
        .filter((e) => ['pending', 'scheduled', 'in_progress'].includes(e.status))
        .map((e) => ({ ...e, user_id: uuid }));
      return state;
    },
    [getCarePlans.fulfilled]: (state, { payload }) => {
      const { appointments, medicationRequests, liveSessions } = payload;
      const showSniffles =
        state.showSniffles ||
        appointments?.filter(
          (r) =>
            r?.live_session?.data?.session_purpose === 'sniffles_consultation' &&
            r?.status === 'scheduled'
        )?.length > 0 ||
        liveSessions?.filter(
          (r) =>
            r?.session_purpose === 'sniffles_consultation' &&
            (r.status === 'ended' || r.status === 'canceled')
        )?.length > 0 ||
        medicationRequests?.filter(({ purpose }) => purpose !== 'paxlovid')?.length > 0;

      const showLongCovids =
        state.showLongCovids ||
        appointments?.filter(
          (r) =>
            r?.live_session?.data?.session_purpose === 'consultation' && r?.status === 'scheduled'
        )?.length > 0 ||
        liveSessions?.filter(
          (r) =>
            r?.session_purpose === 'consultation' &&
            (r.status === 'ended' || r.status === 'canceled')
        )?.length > 0 ||
        medicationRequests?.filter(({ purpose }) => purpose === 'paxlovid')?.length > 0;

      state.showCarePlan = state.showCarePlan || showLongCovids || showSniffles;
      state.showSniffles = showSniffles;
      state.showLongCovids = showLongCovids;
    },
    [fetchActivities.fulfilled]: (state, { payload }) => {
      const getResult = (result) => {
        if (result === 'not_detected') return 0;
        if (result === 'detected') return 1;
        return 2;
      };
      const eligiblePaxlovidUsers = [];
      const eligibleSnifflesUsers = [];
      const activities = payload.data.map((activity) => {
        if (activity.activity_type === 'observation') {
          const observationDate = iso8601ToDate(activity.data?.started_at);
          const observationResult = getResult(activity?.data?.data?.questionnaire_data?.result);
          const medicationRequest =
            activity?.data?.medication_requests && activity?.data?.medication_requests?.length > 0
              ? activity?.data?.medication_requests[activity?.data?.medication_requests.length - 1]
              : null;
          const observation = {
            ...activity,
            id: activity?.data?.id,
            date: activity.data?.started_at,
            medicationRequest: medicationRequest
              ? {
                  id: medicationRequest.legacy_id,
                  status: 'pending',
                }
              : null,
            result: observationResult,
            name: activity.data.observation_type,
            testName: activity.name,
            uuid: activity.user_id,
            symptoms: activity.data.data.symptoms || [],
            showPaxlovidCTA: false,
            showSnifflesCTA: false,
          };
          if (medicationRequest) {
            observation.showPaxlovidCTA = true;
            eligiblePaxlovidUsers.push(activity.user_id);
          } else if (
            payload.paxlovidIntegration &&
            observationResult === 1 &&
            Date.now() - observationDate <= 5 * 24 * 3600 * 1000 && // Within than 5 days
            !eligiblePaxlovidUsers.includes(activity.user_id)
          ) {
            observation.showPaxlovidCTA = true;
            eligiblePaxlovidUsers.push(activity.user_id);
          } else if (
            observationResult === 0 &&
            Date.now() - observationDate <= 5 * 24 * 3600 * 1000 &&
            !eligibleSnifflesUsers.includes(activity.user_id) &&
            activity.data.data.symptoms?.length > 0
          ) {
            observation.showSnifflesCTA = true;
            eligibleSnifflesUsers.push(activity.user_id);
          }
          return observation;
        }
        if (activity.activity_type === 'appointment') {
          const medicationRequest =
            activity?.data?.medication_requests && activity?.data?.medication_requests?.length > 0
              ? activity?.data?.medication_requests[activity?.data?.medication_requests.length - 1]
              : null;
          const appointment = {
            ...activity,
            userId: activity.user_id,
            date: activity.created_at,
            medicationRequest,
          };
          return appointment;
        }
        if (activity.activity_type === 'user_questionnaire') {
          const questionaire = {
            ...activity,
            userId: activity.user_id,
            date: activity.created_at,
          };
          return questionaire;
        }
        return null;
      });
      state.activities = activities.filter((e) => e);
    },
    [postUserSelfie.fulfilled]: (state, { payload }) => {
      state.mainUserSelfie = payload;
    },
    [getSelfie.fulfilled]: (state, { payload }) => {
      state.mainUserSelfie = payload;
    },
    [fetchActivities.rejected]: (state) => {
      state.activities = [];
    },
  },
});

export const { clear, setUnsavedObservations } = slice.actions;
export default slice.reducer;
