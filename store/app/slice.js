/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import remoteConfig from '@react-native-firebase/remote-config';
import * as Updates from 'expo-updates';
import installations from '@react-native-firebase/installations';
import { Platform } from 'react-native';
import { i18next } from '../../utilis/i18n';
import {
  checkEmail,
  login,
  refreshToken,
  logout,
  register,
  validate,
  verifyPhone,
  getPromos,
  getReleases,
  getObservationTypes,
  getRelationshipTypes,
  postForgotPasswordCode,
  postResetPassword,
  postObservation,
  verifyEmail,
  getCodeType,
  postProctoringSessions,
  getProctoringSessions,
  putProctoringSessionsJoin,
  putProctoringSessionsEnd,
  putProctoringSessions,
  getCareGuidance,
  getTestsListAPI,
  getBannerAPI,
  getProctorLoaderContentsAPI,
  getProctorFailureContentsAPI,
  deleteAccountAPI,
  getDeleteAccountRequestsAPI,
  getEthnicitiesTypes,
  getRacesTypes,
  postFeedback,
  sendEmailForComingSoonAPI,
  sendZoomEventsAPI,
  postImageRecognition,
} from '../../endpoints/app';
import {
  clear,
  getCompleteUserData,
  getOrganizations,
  getConsents,
  getRoutines,
  getTasks,
  fetchObservations,
  setUnsavedObservations,
  checkVaccineStatus,
  migrateLocalDataToServer,
  removeTask,
  changeRoutineStatus,
  deleteDependent,
  getInvitesList,
} from '../user/slice';
import { clearBulkTesting } from '../bulkTesting/slice';
import { LogEvent } from '../../analytics';
import {
  BANNER_KEY,
  saveToLocalStorage,
  getFromLocalStorage,
  HINT_UPLOAD_TEST,
  deleteFromLocalStorage,
  FEEDBACK_MEDICATION_ID_KEY,
} from '../../utilis/localStorage';
import { getUser } from '../../endpoints/user';
import { getCompletedLongCovidQuiz } from '../modularTestFlow/slice';
import { currentVersion } from '../../utilis/constants';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const networkError = createAction('NO_INTERNET_ERROR');

export const getImageRecognitionResult = createAsyncThunk(
  'app/getImageRecognitionResult',
  async (data, { rejectWithValue }) => {
    try {
      const response = await postImageRecognition(data);
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response?.status || null,
      });
    }
  }
);

export const fetchAppConfigs = createAsyncThunk(
  'app/fetchAppConfigs',
  async (_, { rejectWithValue }) => {
    try {
      const { data: releaseData } = await getReleases();
      if (!releaseData?.data) {
        return { minimumVersion: currentVersion, notes: '' };
      }
      const major = releaseData.data.filter((e) => e.type === Platform.OS)[0]?.major || 0;
      const minor = releaseData.data.filter((e) => e.type === Platform.OS)[0]?.minor || 0;
      const patch = releaseData.data.filter((e) => e.type === Platform.OS)[0]?.patch || 0;
      const notes = releaseData.data.filter((e) => e.type === Platform.OS)[0]?.notes || '';
      return { minimumVersion: `${major}.${minor}.${patch}`, notes };
    } catch (err) {
      console.warn(err);
      // check if this error is due to an invalid token
      // dispatch(logoutUser());
      return rejectWithValue({
        message: err?.appMessage || 'Please Log in again',
        subtitle: err?.appSubtitle || err.message,
        status: err?.response?.status || null,
      });
    }
  }
);

export const fetchTenantConfigs = createAsyncThunk(
  'app/fetchTenantConfigs',
  async (_, { rejectWithValue }) => {
    try {
      const { data: observationTypesData } = await getObservationTypes();
      const observationTypes = {};
      observationTypesData.data.forEach(({ slug, ...e }) => {
        observationTypes[slug] = e;
      });

      const { data: relationshipTypesData } = await getRelationshipTypes();
      const relationshipTypes = {};
      relationshipTypesData.data.forEach(({ slug, ...e }) => {
        relationshipTypes[slug] = e;
      });

      const { data: ethnicitiesTypesData } = await getEthnicitiesTypes();
      const ethnicitiesTypes = [];
      ethnicitiesTypesData.data.forEach((item) => {
        item.label = item.name;
        item.value = item.uuid;
        ethnicitiesTypes.push(item);
      });

      const { data: racesTypesData } = await getRacesTypes();
      const racesTypes = [];
      racesTypesData.data.forEach((item) => {
        item.label = item.name;
        item.value = item.uuid;
        racesTypes.push(item);
      });

      return {
        observationTypes,
        relationshipTypes,
        ethnicitiesTypes,
        racesTypes,
      };
    } catch (err) {
      // check if this error is due to an invalid token
      // dispatch(logoutUser());
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status || null,
      });
    }
  }
);

export const falseBioSetting = createAsyncThunk('app/switchBioFalse', async () => {
  await AsyncStorage.setItem('bioSetting', JSON.stringify(false));
});

export const switchBio = createAsyncThunk('app/switchBioSetting', async (_, { getState }) => {
  await AsyncStorage.setItem('bioSetting', JSON.stringify(!getState().app.bioSetting));

  return { bioSetting: !getState().app.bioSetting };
});

export const fetchImageLinks = createAsyncThunk(
  'app/fetchImageLinks',
  async (data, { rejectWithValue }) => {
    try {
      const { data: links } = await getPromos();
      const linksFiltered = data ? links.filter((l) => l.screens.includes(data)) : links;
      const linkUrls = linksFiltered.map((l) => l.url);
      return linkUrls;
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage || 'Error fetching images',
        subtitle: err?.appSubtitle || err.message,
        status: err?.response?.status || null,
      });
    }
  }
);

// async storage save and get observation data
export const setPersistedObservationData = createAsyncThunk(
  'app/setPersistedObservationData',
  async ({ uuidMainUser, uuid, observation }, { dispatch }) => {
    try {
      if (observation) {
        const prevObservationsRaw = await AsyncStorage.getItem('postObservation');
        const prevObservations = JSON.parse(prevObservationsRaw) || {};
        prevObservations[uuidMainUser] = prevObservations[uuidMainUser]
          ? [...prevObservations[uuidMainUser], { uuid, observation }]
          : [{ uuid, observation }];
        await AsyncStorage.setItem('postObservation', JSON.stringify(prevObservations));
        dispatch(
          setUnsavedObservations({
            uuid: uuidMainUser,
            data: prevObservations[uuidMainUser],
          })
        );
      } else {
        const prevObservationsRaw = await AsyncStorage.getItem('postObservation');
        const prevObservations = JSON.parse(prevObservationsRaw) || {};
        prevObservations[uuidMainUser] = [];
        await AsyncStorage.setItem('postObservation', JSON.stringify(prevObservations));
      }
    } catch (err) {
      console.warn('Error to saving post observation data locally. Here error message: ', err);
    }
  }
);

export const removePersistedObservationData = createAsyncThunk(
  'app/removePersistedObservationData',
  async ({ uuid, index }, { dispatch }) => {
    try {
      const prevObservationsRaw = await AsyncStorage.getItem('postObservation');
      const prevObservations = JSON.parse(prevObservationsRaw) || {};
      if (prevObservations[uuid]) {
        prevObservations[uuid].splice(index, 1);
      }
      await AsyncStorage.setItem('postObservation', JSON.stringify(prevObservations));
      dispatch(setUnsavedObservations({ uuid, data: [...prevObservations[uuid]] }));
    } catch (err) {
      console.warn('Error to saving post observation data locally. Here error message: ', err);
    }
  }
);

export const getPersistedData = createAsyncThunk(
  'app/getPersistedData',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const bioSetting = (await getFromLocalStorage('bioSetting')) || null;
      let bioToken = null;

      try {
        bioToken = await getFromLocalStorage('token', true);
      } catch {
        // do nothing
      }

      const authToken =
        // (await SecureStore.getItemAsync('token')) ||
        getState().app.isLogged || false;
      const savedEmail = (await AsyncStorage.getItem('email')) || null;

      if (authToken) {
        // the following should be in a loop, but there is an issue in handling
        //  async calls in a loop synchronously
        let res = null;

        res = await dispatch(fetchTenantConfigs());
        if ('error' in res) {
          if (res?.payload?.subtitle?.includes('401'))
            throw new Error(`Error fetching configuration`);
          else throw new Error(`${res?.payload?.message}: ${res?.payload?.subtitle}`);
        }

        res = await dispatch(getCompleteUserData());
        if ('error' in res) {
          rejectWithValue({
            message: i18next.t('errors.typical.title'),
            subtitle: i18next.t('errors.typical.subtitle'),
          });
        }
        const uuidMainUser = res?.payload?.user?.uuid;
        if ('error' in res) {
          if (res?.payload?.subtitle?.includes('401'))
            throw new Error(`Your session has timed out`);
          else throw new Error(`${res?.payload?.message}: ${res?.payload?.subtitle}`);
        }
        const email = res?.payload?.user?.email || null;
        if (email) dispatch(setPersistedData({ savedEmail: email }));

        res = await dispatch(getOrganizations());
        if ('error' in res) {
          rejectWithValue({
            message: i18next.t('errors.typical.title'),
            subtitle: i18next.t('errors.typical.subtitle'),
          });
        }
        res = await dispatch(getInvitesList());
        if ('error' in res) {
          throw new Error(`${res.payload.message}: ${res.payload.subtitle}`);
        }
        res = await dispatch(getConsents());

        if ('error' in res) {
          throw new Error(`${res.payload.message}: ${res.payload.subtitle}`);
        }

        res = await dispatch(getRoutines());
        if ('error' in res) {
          throw new Error(`${res.payload.message}: ${res.payload.subtitle}`);
        }

        res = await dispatch(fetchObservations());
        if ('error' in res) {
          rejectWithValue({
            message: i18next.t('errors.typical.title'),
            subtitle: i18next.t('errors.typical.subtitle'),
          });
        }
        if ('error' in res) {
          rejectWithValue({
            message: i18next.t('errors.typical.title'),
            subtitle: i18next.t('errors.typical.subtitle'),
          });
        }
        res = await dispatch(getTasks());
        if ('error' in res) {
          throw new Error(`${res.payload.message}: ${res.payload.subtitle}`);
        }
        dispatch(getBanner());
        getState().user.users.forEach((user) => {
          dispatch(checkVaccineStatus(user));
        });

        // get hint for upload test
        res = await getFromLocalStorage(HINT_UPLOAD_TEST);
        if (!res && res !== undefined) {
          dispatch(setShowHintUploadTestToFalse());
        }

        // get medication id for feedback
        res = await getFromLocalStorage(FEEDBACK_MEDICATION_ID_KEY);

        // local storage vaccine card and dose info to backend server
        dispatch(migrateLocalDataToServer());

        try {
          const observationResultRaw = await AsyncStorage.getItem('postObservation');
          if (observationResultRaw) {
            const observationResults = JSON.parse(observationResultRaw) || {};
            dispatch(
              setUnsavedObservations({
                uuid: uuidMainUser,
                data: observationResults[uuidMainUser] || [],
              })
            );
            // setPersistedObservationData(); // clear the local storage
            // observationResults.forEach((o) => dispatch(createObservation(o)));
          }
        } catch (err) {
          console.warn(
            'Error in getting observationResult from async storage. Here error message: ',
            err
          );
        }

        dispatch(getDeleteAccountRequests(uuidMainUser));
      }

      const hasExternalFilePermissions = await AsyncStorage.getItem('hasExternalFilePermissions');

      const hasAudioPermissions = await AsyncStorage.getItem('hasAudioPermissions');

      const reportSettingOption = (await AsyncStorage.getItem('reportSetting')) || null;

      return {
        savedEmail,
        authToken,
        bioToken,
        bioSetting: JSON.parse(bioSetting),
        hasExternalFilePermissions,
        hasAudioPermissions,
        reportSetting: reportSettingOption ? JSON.parse(reportSettingOption) : reportSettingOption,
      };
    } catch (err) {
      console.warn(err, 'Here persist data error');
      // check if this error is due to an invalid token
      // dispatch(logoutUser());
      return rejectWithValue({
        message: err?.appMessage || 'Please Log in again',
        subtitle: err?.appSubtitle || err.message,
        status: err?.response?.status || null,
      });
    }
  }
);

export const getBanner = createAsyncThunk(
  'app/getBanner',
  async (_, { getState, rejectWithValue }) => {
    try {
      const uuid = getState().user.users[0];
      const resp = await getBannerAPI(uuid);
      const closedBannerIds = await getFromLocalStorage(BANNER_KEY);
      const banners = [];
      if (closedBannerIds) {
        resp.data.data.forEach((item) => {
          if (!closedBannerIds.includes(item.id)) {
            banners.push(item);
          }
        });
        if (banners.length === resp.data.data.length) {
          await saveToLocalStorage(BANNER_KEY, null);
        }
        return banners;
      }
      return resp.data.data;
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage,
        subtitle: err?.appSubtitle,
        status: err?.response?.status,
      });
    }
  }
);

export const closeBanner = createAsyncThunk('app/closeBanner', async (uuid, { getState }) => {
  try {
    const { banners } = getState().app;
    const closedBannerIds = await getFromLocalStorage(BANNER_KEY);
    let updatedClosed = [];
    if (closedBannerIds) {
      updatedClosed = [...closedBannerIds, uuid];
    } else {
      updatedClosed.push(uuid);
    }
    await saveToLocalStorage(BANNER_KEY, updatedClosed);
    return banners.filter((item) => item.id !== uuid);
  } catch (err) {
    console.warn('Close banner error message: ', err);
    return null;
  }
});

export const sendLocalObservation = createAsyncThunk(
  'app/sendLocalObservation',
  async ({ uuid, observation, index }, { dispatch }) => {
    try {
      await dispatch(removePersistedObservationData({ uuid, index }));
      await dispatch(
        createObservation({
          uuid: observation.uuid,
          observation: observation.observation,
        })
      );
      return true;
    } catch (err) {
      console.warn(
        'Error in getting observationResult from async storage. Here error message: ',
        err
      );
      return null;
    }
  }
);

export const setPersistedData = createAsyncThunk(
  'app/setPersistedData',
  async ({ authToken, savedEmail }) => {
    if (authToken !== undefined) {
      if (!authToken) {
        await deleteFromLocalStorage('token', true);
        await deleteFromLocalStorage('bioSetting');
      } else await saveToLocalStorage('token', authToken, true);
    }
    if (savedEmail !== undefined) {
      if (!savedEmail) await AsyncStorage.removeItem('email');
      else await AsyncStorage.setItem('email', savedEmail);
    }
    return { authToken, savedEmail };
  }
);

export const setTokenByBio = createAsyncThunk('app/setTokeByBio', async () => {
  const accessToken = await getFromLocalStorage('token', true);
  await saveToLocalStorage('bioSetting', JSON.stringify(true));
  return { accessToken };
});

export const loginWithBio = createAsyncThunk(
  'app/loginBio',
  async (_, { rejectWithValue, dispatch }) => {
    // const token = await SecureStore.getItemAsync('token');
    // return { token };
    try {
      const { data: responseData = {} } = await refreshToken({});
      const { data: response } = responseData;
      const { access_token: accessToken } = response;
      await dispatch(setPersistedData({ authToken: accessToken }));

      return true;
    } catch (err) {
      return rejectWithValue({
        message: 'Error logging in',
        subtitle: 'Please enter your username and password',
        status: err?.response?.status,
      });
    }
  }
);

export const clearPhoneId = createAsyncThunk('app/clearPhoneId', async () => ({
  phoneId: undefined,
}));
export const loginUser = createAsyncThunk(
  'app/login',
  async ({ email, password, route, recaptchaToken }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { data: responseData = {} } = await login({
        email,
        password,
        route,
        recaptcha_token: recaptchaToken,
      });
      const { data: response, meta = {} } = responseData;
      const { access_token: accessToken, user: phoneId } = response;
      const otpRoute = meta?.available_two_fa_routes || [];

      if (accessToken) {
        await dispatch(
          setPersistedData({
            authToken: accessToken,
          })
        );
        return { accessToken, phoneId, otpRoute };
      }
      return { phoneId, otpRoute }; // user contains the phoneId that we send back
    } catch (err) {
      console.warn(err);
      // check to see if this route was called from the loginscreen (phoneId will be null) or
      //  if it was called to re-send the code (phoneId != null)
      const { phoneId } = getState().app;
      let localErrorMessage;
      if (phoneId) {
        localErrorMessage = 'Error re-sending code';
      } else if (err.response.status === 403) {
        localErrorMessage = i18next.t('errors.login');
      } else {
        localErrorMessage = i18next.t('errors.typical.title');
      }
      return rejectWithValue({
        message: err?.appMessage || localErrorMessage,
        subtitle: i18next.t('errors.typical.subtitle'),
      });
    }
  }
);

export const loginWithToken = createAsyncThunk(
  'app/loginWithToken',
  async ({ authToken }, { dispatch, rejectWithValue }) => {
    try {
      if (authToken) {
        const { data: responseData = {} } = await refreshToken({});
        const { data: response } = responseData;
        const { access_token: accessToken } = response;
        await dispatch(setPersistedData({ authToken: accessToken }));

        return true;
      }
      return rejectWithValue({ message: 'Error saving token' });
    } catch (err) {
      if (err.response?.status === 403) {
        return rejectWithValue({
          message: i18next.t('errors.token.title'),
          subtitle: i18next.t('errors.token.subtitle'),
        });
      }
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
      });
    }
  }
);
export const verify = createAsyncThunk(
  'app/2fa',
  async ({ verification_code: code }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { data: responseData } = await validate({
        user: getState().app.phoneId,
        verification_code: code,
        //        device_name: 'test simulator',
      });
      const token = responseData?.data?.access_token || null;

      await dispatch(
        setPersistedData({
          authToken: token,
        })
      );
      return true;
    } catch (err) {
      console.warn(err);
      const message =
        err?.response?.status === 422
          ? {
              message: i18next.t('errors.verify.title'),
              subtitle: i18next.t('errors.verify.subtitle'),
              status: err?.response?.status || null,
            }
          : {
              message: i18next.t('errors.typical.title'),
              subtitle: i18next.t('errors.typical.subtitleResend'),
              status: err?.response?.status || null,
            };
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk('app/logout', async (_, { dispatch }) => {
  try {
    await logout();
  } catch (err) {
    console.warn('logout error', err.toString());
  }

  dispatch(clear());
  dispatch(clearBulkTesting());
  await dispatch(setPersistedData({ authToken: null }));
  return true;
});

export const validateEmail = createAsyncThunk(
  'app/checkEmail',
  async ({ email }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(clearGlobalErrors());
      await checkEmail({ email });
      return true;
    } catch (err) {
      if (err.response?.status === 409)
        return rejectWithValue({
          message: i18next.t('errors.email.title'),
          subtitle: i18next.t('errors.email.subtitle'),
        });
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response?.status || null,
      });
    }
  }
);

export const validateForgotEmail = createAsyncThunk(
  'app/checkEmail',
  async ({ email }, { rejectWithValue }) => {
    try {
      await checkEmail({ email });
      return rejectWithValue({
        message: 'Account not found',
        subtitle: 'Please update email or return to login screen and sign up',
      });
    } catch (err) {
      if (err?.appMessage) {
        return rejectWithValue({
          message: err?.appMessage || 'Account not found',
          subtitle: err?.appSubtitle || 'Please update email or return to login screen and sign up',
          status: err?.response?.status || null,
        });
      }
      if (err.response?.status === 409) {
        return true;
      }
      return false;
    }
  }
);

export const registration = createAsyncThunk(
  'app/register',
  async ({ email, password, phone, recaptchaToken }, { rejectWithValue }) => {
    try {
      const { data: response } = await register({
        email,
        password,
        phone,
        route: 'phone',
        device_name: 'test simulator',
        recaptcha_token: recaptchaToken,
      });
      const { data: userData, meta } = response || {};
      const { phones } = userData || {};
      const phoneObj = phones.data.find((p) => p.is_primary) || {};
      const { uuid: phoneId, number: phoneNumber } = phoneObj;
      const emailId = response.data.emails.data[0].uuid;
      const { available_two_fa_routes: otpRoute } = meta;
      if (!phoneId)
        return rejectWithValue({
          message: 'Registratione error',
          subtitle: 'Please try again',
        });
      // if (responseData.token) {
      //   dispatch(
      //     setPersistedData({
      //       authToken: responseData.token,
      //       savedEmail: data.email,
      //     })
      //   );
      LogEvent('SignUp');
      return { phoneId, phoneNumber, emailId, email, otpRoute };
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.regist.title'),
        // subtitle: err?.appSubtitle || err.message,
        subtitle: i18next.t('errors.regist.subtitle'),
        status: err?.response?.status || null,
      });
    }
  }
);

export const verifyUserPhone = createAsyncThunk(
  'app/verifyUserPhone',
  async ({ phoneId, otpCode, editPhone, canSkip }, { getState, dispatch, rejectWithValue }) => {
    try {
      const phoneIdFromUserObj =
        getState().user?.users[0] &&
        getState().user?.usersLookup[getState().user?.users[0]]?.phone?.uuid;
      const { data: responseData } = await verifyPhone({
        phoneId: phoneId || phoneIdFromUserObj,
        otpCode,
      });
      const { access_token: accessToken } = responseData;
      await dispatch(setPersistedData({ authToken: accessToken }));
      // await dispatch(getCompleteUserData());
      // return { accessToken };
      return !editPhone && !canSkip ? { accessToken } : { isVerified: true };
    } catch (err) {
      const message =
        err?.response?.status === 403
          ? {
              message: i18next.t('errors.verify.title'),
              subtitle: i18next.t('errors.verify.subtitle'),
              status: err?.response.status,
            }
          : {
              message: i18next.t('errors.typical.title'),
              subtitle: i18next.t('errors.typical.subtitleResend'),
              status: err?.response?.status || null,
            };

      return rejectWithValue(message);
    }
  }
);

export const verifyUserEmail = createAsyncThunk(
  'app/verifyUserEmail',
  async ({ emailId, otpCode, editEmail }, { getState, dispatch, rejectWithValue }) => {
    try {
      const emailIdFromUserObj =
        getState().user?.users[0] && getState().user?.usersLookup[getState().user?.users[0]]?.email;
      const { data: response } = await verifyEmail({
        emailId: emailId || emailIdFromUserObj,
        otpCode,
      });
      const { access_token: accessToken } = response;
      await dispatch(setPersistedData({ authToken: accessToken }));
      return !editEmail ? { accessToken } : { isVerified: true };
    } catch (err) {
      const message =
        err?.response?.status === 403
          ? {
              message: i18next.t('errors.verify.title'),
              subtitle: i18next.t('errors.verify.subtitle'),
              status: err?.response.status,
            }
          : {
              message: i18next.t('errors.typical.title'),
              subtitle: i18next.t('errors.typical.subtitleResend'),
              status: err?.response?.status || null,
            };
      return rejectWithValue(message);
    }
  }
);

export const requestForgotPasswordCode = createAsyncThunk(
  'app/requestForgotPasswordCode',
  async ({ email, route, recaptchaToken }, { rejectWithValue }) => {
    try {
      const response = await postForgotPasswordCode({
        email,
        route,
        recaptcha_token: recaptchaToken,
      });
      const { data } = response;
      const { meta } = data;
      const { available_two_fa_routes: otpRoute } = meta;
      return otpRoute;
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.status === 403
          ? {
              message: i18next.t('errors.verify.title'),
              subtitle: i18next.t('errors.verify.subtitle'),
              status: err?.response.status,
            }
          : {
              message: i18next.t('errors.typical.title'),
              subtitle: i18next.t('errors.typical.subtitle'),
              status: err?.response?.status || null,
            };
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'app/resetPassword',
  async ({ email, code, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data: responseData } = await postResetPassword({
        email,
        code,
        password,
      });
      const { access_token: accessToken } = responseData;
      await dispatch(setPersistedData({ authToken: accessToken }));

      return { accessToken };
    } catch (err) {
      console.warn(err);
      const message =
        err?.response?.status === 403
          ? {
              message: i18next.t('errors.verify.title'),
              subtitle: i18next.t('errors.verify.subtitle'),
              status: err?.response.status,
            }
          : {
              message: i18next.t('errors.typical.title'),
              subtitle: i18next.t('errors.typical.subtitle'),
              status: err?.response?.status || null,
            };
      return rejectWithValue(message);
    }
  }
);

export const createObservation = createAsyncThunk(
  'app/createObservation',
  async ({ uuid, observation }, { dispatch, getState, rejectWithValue }) => {
    const { data, ...restObservation } = observation;
    try {
      const res = await postObservation(uuid, {
        ...restObservation,
        data: JSON.stringify(data),
      });
      dispatch(removeTask(uuid));
      dispatch(fetchObservations());
      dispatch(changeRoutineStatus());
      setTimeout(() => {
        dispatch(getRoutines());
      }, 11000);
      return res.data.data;
    } catch (err) {
      const uuidMainUser = getState().user.users[0];
      await dispatch(setPersistedObservationData({ uuidMainUser, uuid, observation }));
      rejectWithValue({
        message: err?.appMessage || 'Error creating observation',
        subtitle: err?.appSubtitle || err.message,
        status: err?.response?.status,
      });
      return false;
    }
  }
);

export const checkCodeType = createAsyncThunk(
  'app/checkCodeType',
  async (code, { rejectWithValue }) => {
    try {
      const { data } = await getCodeType(code);
      return data.data;
    } catch (err) {
      const message =
        err?.response?.status === 404
          ? {
              message: i18next.t('errors.joinCode.title'),
              subtitle: i18next.t('errors.joinCode.subtitle'),
              status: err?.response.status,
            }
          : {
              message: i18next.t('errors.typical.title'),
              subtitle: i18next.t('errors.typical.subtitle'),
              status: err?.response?.status || null,
            };
      return rejectWithValue(message);
    }
  }
);

export const proctorRequested = createAsyncThunk(
  'app/proctorRequested',
  async ({ uuid }, { rejectWithValue, signal }) => {
    try {
      const { data: resPost } = await postProctoringSessions(uuid);
      const proctoringSessionId = resPost?.data?.uuid;
      if (!proctoringSessionId) throw new Error('Error requesting proctor');

      let numRetries = 18;
      do {
        // eslint-disable-next-line no-await-in-loop
        const { data: resGet } = await getProctoringSessions(proctoringSessionId);
        const proctorStatus = resGet?.data?.provider_status;
        if (proctorStatus === 'in_progress') {
          // eslint-disable-next-line no-await-in-loop
          const { data: resJoin } = await putProctoringSessionsJoin(proctoringSessionId);
          const meetingRoomData = (
            resJoin?.data?.live_session_users?.find(
              ({ role: sessionRole }) => sessionRole === 'user'
            ) || {}
          )?.meta?.room;
          return {
            proctoringSessionId,
            appId: meetingRoomData.app_id,
            channel: meetingRoomData.channel,
            token: meetingRoomData.token,
            uid: meetingRoomData.user_id,
          };
        }
        numRetries -= 1;
        // eslint-disable-next-line no-await-in-loop
        await sleep(5000);
      } while (numRetries > 0 && !signal.aborted);
      // if while loop exists, reject with an error
      return rejectWithValue({ skipError: true });
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitleWithMail'),
        status: err?.response?.status || null,
        // err?.appSubtitle || err?.response?.data?.message || err.message,
      });
    }
  }
);

export const setHasExternalFilePermissions = createAsyncThunk(
  'app/setHasExternalFilePermissions',
  async () => {
    try {
      await AsyncStorage.setItem('hasExternalFilePermissions', 'true');
    } catch (err) {
      console.warn(err);
    }
    return true;
  }
);

export const setHasAudioFilePermissions = createAsyncThunk(
  'app/setHasAudioPermissions',
  async () => {
    try {
      await AsyncStorage.setItem('hasAudioPermissions', 'true');
    } catch (err) {
      console.warn(err);
    }
    return true;
  }
);

export const proctorSessionCompleted = createAsyncThunk(
  'app/proctorSessionCompleted',
  async (_, { getState }) => {
    try {
      const { proctoringSessionId } = getState().app.proctorSession;
      if (proctoringSessionId) await putProctoringSessionsEnd(proctoringSessionId);
    } catch (err) {
      console.warn(err);
    }
    return true;
  }
);

export const proctorUpdateStep = createAsyncThunk('app/proctorUpdateStep', async ({ id, step }) => {
  try {
    await putProctoringSessions(id, { data: { step } });
  } catch (err) {
    console.warn(err);
  }
  return true;
});

export const fetchCareList = createAsyncThunk(
  'app/fetchCareList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const uuid = getState().user.users[0];
      const { data: careListObj } = await getCareGuidance(uuid);
      return careListObj;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const getTestsList = createAsyncThunk(
  'app/getTestsList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { users } = getState().user;
      const testsList = await getTestsListAPI(users[0]);
      return testsList.data.data;
    } catch (err) {
      console.warn(err);
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const getProctorLoaderContents = createAsyncThunk(
  'app/getProctorLoaderContents',
  async (translation, { getState }) => {
    try {
      const { users } = getState().user;
      const { data: response } = await getProctorLoaderContentsAPI(users[0]);
      return response.data;
    } catch (err) {
      return {
        title: translation('careSolutions.loader.findingGuide.title'),
        description: translation('careSolutions.loader.findingGuide.description'),
        questions: [
          translation('careSolutions.loader.findingGuide.questions.0'),
          translation('careSolutions.loader.findingGuide.questions.1'),
          translation('careSolutions.loader.findingGuide.questions.2'),
          translation('careSolutions.loader.findingGuide.questions.3'),
          translation('careSolutions.loader.findingGuide.questions.4'),
          translation('careSolutions.loader.findingGuide.questions.5'),
        ],
      };
    }
  }
);

export const getProctorFailureContents = createAsyncThunk(
  'app/getProctorFailureContents',
  async (translation, { getState }) => {
    try {
      const { users } = getState().user;
      const { data: response } = await getProctorFailureContentsAPI(users[0]);
      return response.data;
    } catch (err) {
      return {
        title: translation('careSolutions.loader.findingFailure.title'),
        description: translation('careSolutions.loader.findingFailure.description'),
      };
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'app/deleteAccount',
  async ({ uuid, email }, { rejectWithValue, dispatch, getState }) => {
    let isMainUser = false;
    try {
      isMainUser = uuid === getState().user.users[0];
      const data = {
        data: {
          confirmation_required: false,
          confirmation_email: email,
          reason: 'security concern',
        },
      };
      await deleteAccountAPI(uuid, data);
      if (!isMainUser) {
        await dispatch(deleteDependent({ uuid }));
      } else {
        await dispatch(getDeleteAccountRequests(uuid));
      }
      return isMainUser;
    } catch (err) {
      const errStatusCode = err.toString().slice(err.toString().length - 3, err.toString().length);
      if (errStatusCode === '403') {
        return rejectWithValue({
          message: 'Request to delete in progress',
          subtitle: 'May take up to 6 weeks to complete',
          status: errStatusCode,
          isMainUser,
        });
      }
      return rejectWithValue({
        message: err?.appMessage || i18next.t('errors.typical.title'),
        subtitle: err?.appSubtitle || "Can't delete account",
        status: err?.response.status,
        isMainUser,
      });
    }
  }
);

export const getDeleteAccountRequests = createAsyncThunk(
  'app/getDeleteAccountRequests',
  async (uuid, { rejectWithValue }) => {
    try {
      const { data: response } = await getDeleteAccountRequestsAPI(uuid);
      return response.data.length > 0 ? response.data[0].created_at : null;
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage || i18next.t('errors.typical.title'),
        subtitle: err?.appSubtitle || "Can't get delete requests",
        status: err?.response.status,
      });
    }
  }
);

export const setPushNotification = createAction('app/setPushNotification');
export const cleanPushNotification = createAction('app/cleanPushNotification');

export const setDeepLink = createAction('app/setDeepLink');
export const setZoomSession = createAction('app/setZoomSession');

const setCarePopup = createAction('app/setCarePopup');
const setVitaminPopup = createAction('app/setVitaminPopup');
const setHomeCare = createAction('app/setHomeCare');
const setQuiz = createAction('app/setQuiz');
const setECommerce = createAction('app/setECommerce');
const setCustomRate = createAction('app/setCustomRate');
const setReportingPopup = createAction('app/setReportingPopup');
const setRecaptchaIntegration = createAction('app/setRecaptchaIntegration');
const setPaxlovidIntegration = createAction('app/setPaxlovidIntegration');
const setPaxlovidDelivery = createAction('app/setPaxlovidDelivery');
const setPaxlovidTerms = createAction('app/setPaxlovidTerms');
const setLongCovid = createAction('app/setLongCovid');
const setAptPhoneNumber = createAction('app/setAptPhoneNumber');
const setTelehealth = createAction('app/setTelehealth');
const setSnifflesNegativeResultTile = createAction('app/setSnifflesNegativeResultTile');
const setFirebaseRemoteConfig = createAction('app/setFirebaseRemoteConfig');
const setPaxLovidNewIntroScreen = createAction('app/paxlovid_new_intro_screen');
// export const setInAppModal = createAction('app/setInAppModal');
// export const setAppModalVisible = createAction('app/setAppModalVisible');

export const setInAppModal = createAsyncThunk('app/setInAppModal', (payload, { dispatch }) => {
  dispatch(setAppModalVisible(payload));
  return payload;
});

export const setShowHintUploadTestToFalse = createAsyncThunk(
  'app/setShowHitUploadTest',
  async () => {
    try {
      await saveToLocalStorage(HINT_UPLOAD_TEST, false);
    } catch (err) {
      console.warn(err, 'Can not save show hint');
    }
  }
);

export const fetchRemoteConfigsAndGetPersistedData = createAsyncThunk(
  'app/fetchRemoteConfigsAndGetPersistedData',
  async (_, { dispatch, rejectWithValue }) => {
    const processRemoteConfig = () => {
      const vitaminValue = remoteConfig().getValue('vitamind_quiz_learnmore');
      const value = remoteConfig().getValue('care_type');
      const homeValue = remoteConfig().getValue('home_type');
      const eCommerceValue = remoteConfig().getValue('ecommerce_native');
      const customRate = remoteConfig().getValue('rate_custom_home');
      const longCovid = remoteConfig().getValue('longcovid_assessment');
      const telehealth = remoteConfig().getValue('longcovid_telehealth');
      if (value.asString() === 'continue') dispatch(setCarePopup());
      if (vitaminValue.asString() === 'learnmore') dispatch(setVitaminPopup());
      if (vitaminValue.asString() === 'quiz') dispatch(setQuiz());
      if (homeValue.asString() === 'care') dispatch(setHomeCare());
      if (eCommerceValue.asString() === 'native') dispatch(setECommerce());
      if (customRate.asBoolean()) dispatch(setCustomRate());
      if (longCovid.asBoolean()) dispatch(setLongCovid());
      if (telehealth.asBoolean()) dispatch(setTelehealth());

      const reportingValue = remoteConfig().getValue('reporting_popup');
      if (reportingValue.asBoolean()) {
        dispatch(setReportingPopup());
      }

      const recaptchaIntegration = remoteConfig().getValue('recaptcha_integration');
      if (recaptchaIntegration.asBoolean()) {
        dispatch(setRecaptchaIntegration());
      }

      const paxlovidTreatment = remoteConfig().getValue('paxlovid_treatment');
      if (paxlovidTreatment.asBoolean()) {
        dispatch(setPaxlovidIntegration());
      }

      const paxlovidDelivery = remoteConfig().getValue('paxlovid_delivery');
      if (paxlovidDelivery.asBoolean()) {
        dispatch(setPaxlovidDelivery());
      }
      const paxOpenTerms = remoteConfig().getValue('pax_open_terms');
      dispatch(setPaxlovidTerms(paxOpenTerms.asString()));

      const aptPhoneNumber = remoteConfig().getValue('appointment_support_phone');
      dispatch(setAptPhoneNumber(aptPhoneNumber.asString()));

      const sniffleResultTile = remoteConfig().getValue('sniffles_negative_result_tile');
      if (sniffleResultTile.asBoolean()) {
        dispatch(setSnifflesNegativeResultTile());
      }
      const deliverySupportPhone = remoteConfig().getValue('delivery_support_phone');
      dispatch(
        setFirebaseRemoteConfig({
          key: 'deliverySupportPhone',
          value: deliverySupportPhone.asString(),
        })
      );
      const snifflesPOCTermsConsent = remoteConfig().getValue('poc_terms');
      dispatch(
        setFirebaseRemoteConfig({
          key: 'snifflesPOCTermsConsent',
          value: snifflesPOCTermsConsent.asString(),
        })
      );
      const snifflesAssessmentOptionB = remoteConfig().getValue('sniffles_assessment_option_b');
      dispatch(
        setFirebaseRemoteConfig({
          key: 'snifflesAssessmentOptionB',
          value: snifflesAssessmentOptionB.asBoolean(),
        })
      );

      const paxlovidIntroScreen = remoteConfig().getValue('paxlovid_new_intro_screen');
      if (paxlovidIntroScreen.asBoolean()) {
        dispatch(setPaxLovidNewIntroScreen());
      }
    };

    try {
      await remoteConfig()
        .setDefaults({
          care_type: '',
          vitamin_type: '',
          home_type: '',
        })
        .then(() => remoteConfig().fetch(0))
        .then(() => remoteConfig().activate())
        .then(() => processRemoteConfig())
        .then(() => dispatch(getPersistedData()));
      const id = await installations().getToken();
      return id;
    } catch (err) {
      return console.warn(err);
    }
  }
);

export const setTopic = createAction('app/setTopic');

export const fetchAppUpdate = createAsyncThunk('app/fetchAppUpdate', async (_, { getState }) => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Updates.reloadAsync();
    } else {
      return Updates.updateId;
    }
    return getState().app.minimumVersion;
  } catch (err) {
    return getState().app.minimumVersion;
  }
});

export const checkTokenExpiration = createAsyncThunk('app/checkTokenExpiration', async () => {
  try {
    const accessToken = await getFromLocalStorage('token', true);
    if (accessToken) {
      const user = await getUser();
      if (user) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
});

export const ratingFeedback = createAsyncThunk(
  'app/ratingFeedback',
  async (data, { rejectWithValue }) => {
    try {
      await postFeedback(data);
      return true;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.typical.title'),
        subtitle: i18next.t('errors.typical.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const sendEmailForComingSoon = createAsyncThunk(
  'app/sendEmailForComingSoon',
  async (email, { getState }) => {
    try {
      const uuid = getState().user.users[0];
      const data = {
        data: [
          {
            payload: {
              user_email: email.toLowerCase(),
              user_id: uuid,
              user_questionnaire_id: '1231-4124-51314-r5151', // test value
            },
            event_name: 'coming_soon_page',
            event_category: 'long_covid_assessment',
          },
        ],
      };
      await sendEmailForComingSoonAPI(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }
);

export const sendZoomEvents = createAsyncThunk(
  'app/sendZoomEvents',
  async ({ event, appointmentId }) => {
    try {
      const data = {
        data: [
          {
            event_name: event,
            event_category: 'meeting',
            subject_id: appointmentId,
            subject_type: 'appointment',
            ts: new Date(),
          },
        ],
      };
      await sendZoomEventsAPI(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchPastResults = createAsyncThunk(
  'app/fetchPastResults',
  async (_, { dispatch }) => {
    await dispatch(fetchObservations());
  }
);

const initialState = {
  wildCardImageLinks: [],
  bioToken: null,
  isLogged: false,
  isAuthed: null,
  savedEmail: null,
  isEmailVerified: null,
  phoneId: null,
  error: null,
  globalError: null,
  bioSetting: null,
  minimumVersion: null,
  notes: '',
  shopLink: 'https://shop.letsongo.com/pages/covid',
  vaccineImages: [],
  hasExternalFilePermissions: false,
  hasAudioPermissions: false,
  showReviewScreen: false,
  careList: {},
  testsList: [],
  pending: false,
  banners: [],
  proctorLoaderContents: null,
  pushNotification: null,
  deepLink: { to: null, toParams: null },
  deleteRequestedDate: null,
  carePopup: false,
  vitaminPopup: false,
  careHome: false,
  quiz: false,
  eCommerce: false,
  customRate: false,
  topic: null,
  showHintUploadTest: true,
  paxlovidIntegration: false,
  paxlovidDelivery: false,
  sniffleNegativeResultTile: false,
  longCovid: false,
  isAppModalVisible: false,
  isFeedbackModalVisible: false,
  feedbackModalData: false,
  telehealth: false,
  appModalData: {},
  isLoadingPastResults: false,
  isReviewScreenShown: {
    main: false,
    carePlan: false,
    assessmentFlow: false,
  },
  zoomSession: null,
  firebase: {},
  notifications: {
    newNotificationsCount: 0,
    notificationsList: [],
  },
  feedbackMedicationId: null,
  appBannerModalData: null,
  appBannerModalVisible: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearGlobalErrors(state) {
      state.globalError = null;
    },
    setGlobalErrors(state, { payload }) {
      if (payload.message) {
        state.globalError = {
          message: payload?.message || undefined,
          subtitle: payload?.subtitle || undefined,
        };
      }
    },
    setPushToken(state, { payload }) {
      state.pushToken = payload;
    },
    setShowReviewScreen(state, { payload }) {
      state.showReviewScreen = payload;
    },
    setIsReviewScreenShown(state, { payload }) {
      state.isReviewScreenShown = payload;
    },
    setNagativeTestComplete(state, { payload }) {
      state.isNagativeTestComplete = payload;
    },
    setAppModalVisible(state, { payload }) {
      state.isAppModalVisible = payload;
    },
    setAppModalData(state, { payload }) {
      state.appModaldata = payload;
    },
    setAppBannerModalData(state, { payload }) {
      state.appBannerModalData = payload;
    },
    setFeedbackModalVisible(state, { payload }) {
      state.isFeedbackModalVisible = payload;
    },
    setFeedbackModalData(state, { payload }) {
      state.feedbackModalData = payload;
    },
    setShowTooltip(state, { payload }) {
      state.showTooltip = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(falseBioSetting.fulfilled, (state) => {
        state.bioSetting = false;
      })
      .addCase(switchBio.fulfilled, (state) => {
        state.bioSetting = !state.bioSetting;
      })
      .addCase(fetchImageLinks.fulfilled, (state, action) => {
        const linkUrls = action.payload;
        state.wildCardImageLinks = linkUrls;
      })
      .addCase(setPersistedData.fulfilled, (state, { payload }) => {
        const { authToken } = payload;
        if (authToken !== undefined) state.isAuthed = authToken;
        // if (savedEmail) state.savedEmail = savedEmail;
      })
      .addCase(getPersistedData.fulfilled, (state, { payload }) => {
        state.savedEmail = payload.savedEmail;
        state.isAuthed = !!payload.authToken;
        state.bioToken = !!payload.bioToken;
        state.bioSetting = payload.bioSetting;
        state.hasExternalFilePermissions = !!payload.hasExternalFilePermissions;
        state.hasAudioPermissions = !!payload.hasAudioPermissions;
        state.reportSetting = payload.reportSetting;
        // state.isAuthed = state.isAuthed === false ? false : !!payload.authToken;
      })
      .addCase(getPersistedData.rejected, (state) => {
        state.isAuthed = false;
      })
      .addCase(clearPhoneId.fulfilled, (state, { payload }) => {
        const { phoneId } = payload;
        state.phoneId = phoneId;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { phoneId, accessToken, otpRoute } = payload;
        state.phoneId = phoneId;
        state.otpRoute = otpRoute;
        if (accessToken) {
          state.isLogged = true;
          state.isAuthed = null; // setting to null forces app to go through startup process
          state.didRegister = false;
        }
      })
      .addCase(setShowHintUploadTestToFalse.fulfilled, (state) => {
        state.showHintUploadTest = false;
      })
      .addCase(verifyUserPhone.fulfilled, (state, { payload }) => {
        const { accessToken } = payload;
        if (accessToken) {
          state.isLogged = true;
          state.phoneId = null;
          state.isAuthed = null; // setting to null forces app to go through startup process
        }
      })
      .addCase(verifyUserEmail.fulfilled, (state, { payload }) => {
        const { accessToken } = payload;
        if (accessToken) {
          state.isLogged = true;
          state.emailId = null;
          state.isAuthed = null; // setting to null forces app to go through startup process
        }
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        const { accessToken } = payload;
        if (accessToken) {
          state.isLogged = true;
          state.phoneId = null;
          state.isAuthed = null;
        }
      })
      .addCase(getBanner.fulfilled, (state, { payload }) => {
        state.banners = payload;
      })
      .addCase(closeBanner.fulfilled, (state) => {
        state.banners = [];
      })
      .addCase(loginWithBio.fulfilled, (state) => {
        state.isLogged = true;
        state.isAuthed = null;
        state.didRegister = false;
        // state.bioToken = !!payload.token;
      })
      .addCase(setTokenByBio.fulfilled, (state, { payload }) => {
        state.bioToken = !!payload.accessToken;
        state.bioSetting = true;
      })
      .addCase(verify.fulfilled, (state) => {
        state.isLogged = true;
        state.phoneId = null;
        state.isAuthed = null; // setting to null forces app to go through startup process
      })
      .addCase(loginWithToken.fulfilled, (state) => {
        state.isLogged = true;
        state.isAuthed = null; // setting to null forces app to go through startup process
      })
      .addCase(logoutUser.fulfilled, (state) => {
        const initial = { ...initialState };
        initial.updateVersion = state.updateVersion;
        initial.eCommerce = state.eCommerce;
        initial.topic = state.topic;
        state = initial;
        return state;
      })
      .addCase(validateEmail.fulfilled, (state) => {
        state.isEmailVerified = true;
      })
      .addCase(getTestsList.fulfilled, (state, { payload }) => {
        if (payload) {
          state.testsList = payload;
        }
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        const {
          phoneId = null,
          phoneNumber = null,
          email = null,
          emailId = null,
          otpRoute = null,
        } = payload;
        state.phoneId = phoneId;
        state.phoneNumber = phoneNumber;
        state.emailId = emailId;
        state.email = email;
        state.isAuthed = true;
        state.isLogged = true;
        state.didRegister = true;
        state.otpRoute = otpRoute;
      })
      .addCase('user/getAll/fulfilled', (state, { payload }) => {
        state.isAuthed = !!payload?.uuid;
      })
      .addCase(fetchAppConfigs.fulfilled, (state, { payload }) => {
        const {
          minimumVersion = null,
          notes = '',
          // relationshipTypes = {},
          // observationTypes = {},
        } = payload;
        state.minimumVersion = minimumVersion;
        state.notes = notes;
        // state.relationshipTypes = relationshipTypes;
        // state.observationTypes = observationTypes;
      })
      .addCase(fetchTenantConfigs.fulfilled, (state, { payload }) => {
        const {
          relationshipTypes = {},
          observationTypes = {},
          ethnicitiesTypes = [],
          racesTypes = [],
        } = payload;
        state.relationshipTypes = relationshipTypes;
        state.observationTypes = observationTypes;
        state.ethnicitiesTypes = ethnicitiesTypes;
        state.racesTypes = racesTypes;
      })
      .addCase(setHasExternalFilePermissions.fulfilled, (state) => {
        state.hasExternalFilePermissions = true;
      })
      .addCase(setHasAudioFilePermissions.fulfilled, (state) => {
        state.hasAudioPermissions = true;
      })
      .addCase(networkError, (state) => {
        state.globalError = {
          message: 'No internet detected.',
          subtitle: 'Please check your connection',
        };
      })
      .addCase(setTopic, (state, { payload }) => {
        state.topic = payload;
      })
      .addCase(proctorRequested.fulfilled, (state, { payload }) => {
        state.proctorSession = payload;
      })
      .addCase(proctorSessionCompleted.fulfilled, (state) => {
        state.proctorSession = null;
      })
      .addCase(fetchCareList.fulfilled, (state, { payload }) => {
        state.careList = payload;
        state.careListReady = true;
      })
      .addCase(fetchCareList.pending, (state) => {
        state.careListReady = false;
      })
      .addCase(getProctorLoaderContents.fulfilled, (state, { payload }) => {
        state.proctorLoaderContents = payload;
      })
      .addCase(deleteAccount.rejected, (state, { payload }) => {
        if (payload.isMainUser && payload.status === '403') {
          state.deleteRequestedDate = new Date();
        }
      })
      .addCase(getDeleteAccountRequests.fulfilled, (state, { payload }) => {
        if (payload) {
          state.deleteRequestedDate = payload;
        }
      })
      .addCase(fetchAppUpdate.fulfilled, (state, { payload }) => {
        state.updateVersion = payload;
      })
      .addCase(fetchRemoteConfigsAndGetPersistedData.fulfilled, (state, { payload }) => {
        if (payload) state.instanceId = payload;
      })
      .addCase('app/setPushNotification', (state, { payload }) => {
        state.pushNotification = payload;
      })
      .addCase('app/cleanPushNotification', (state) => {
        state.pushNotification = null;
      })
      .addCase('app/setDeepLink', (state, { payload }) => {
        state.deepLink = payload;
      })
      .addCase('app/setZoomSession', (state, { payload }) => {
        state.zoomSession = payload;
      })
      .addCase('app/setCarePopup', (state) => {
        state.carePopup = true;
      })
      .addCase('app/setCustomRate', (state) => {
        state.customRate = true;
      })
      .addCase('app/setTelehealth', (state) => {
        state.telehealth = true;
      })
      .addCase('app/setVitaminPopup', (state) => {
        state.vitaminPopup = true;
      })
      .addCase('app/setHomeCare', (state) => {
        state.careHome = true;
      })
      .addCase(setQuiz, (state) => {
        state.quiz = true;
      })
      .addCase(setECommerce, (state) => {
        state.eCommerce = true;
      })
      .addCase(setReportingPopup, (state) => {
        state.reportingPopup = true;
      })
      .addCase(setRecaptchaIntegration, (state) => {
        state.recaptchaIntegration = true;
      })
      .addCase(setPaxlovidIntegration, (state) => {
        state.paxlovidIntegration = true;
      })
      .addCase(setSnifflesNegativeResultTile, (state) => {
        state.sniffleNegativeResultTile = true;
      })
      .addCase(setPaxlovidDelivery, (state) => {
        state.paxlovidDelivery = true;
      })
      .addCase(setPaxlovidTerms, (state, { payload }) => {
        state.paxlovidTerms = payload;
      })
      .addCase(setLongCovid, (state) => {
        state.longCovid = true;
      })
      .addCase(setPaxLovidNewIntroScreen, (state) => {
        state.paxlovidNewIntroScreen = true;
      })
      .addCase('app/setAptPhoneNumber', (state, { payload }) => {
        state.aptPhoneNumber = payload;
      })
      .addCase(setFirebaseRemoteConfig, (state, { payload }) => {
        state.firebase[payload.key] = payload.value;
      })
      .addCase(setInAppModal.fulfilled, (state, { payload }) => {
        state.inAppModal = payload;
      })
      .addCase(fetchPastResults.pending, (state) => {
        state.isLoadingPastResults = true;
      })
      .addCase(fetchPastResults.fulfilled, (state) => {
        state.isLoadingPastResults = false;
      })
      .addCase(fetchPastResults.rejected, (state) => {
        state.isLoadingPastResults = false;
      })
      .addMatcher(
        (action) => action.type.endsWith('pending'),
        (state) => {
          state.pending = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('fulfilled'),
        (state) => {
          state.pending = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('rejected'),
        (state, { payload = {}, meta = {} }) => {
          state.pending = false;
          if (payload?.status === 401) {
            state.isAuthed = false;
            state.globalError = {
              message: 'Your session has expired',
              subtitle: 'Please sign back in',
            };
          } else if (!payload.skipError && !meta.aborted) {
            state.globalError = {
              message: payload?.message || undefined,
              subtitle:
                payload?.message === 'No internet detected.'
                  ? 'Please check your connection'
                  : payload?.subtitle || undefined,
            };
          }
        }
      );
    // .addMatcher(
    //   (action) => action.type.endsWith('fulfilled'),
    //   (state) => {
    //     state.globalError = null;
    //   }
    // );
  },
});

export const {
  clearGlobalErrors,
  setGlobalErrors,
  setPushToken,
  setShowReviewScreen,
  setIsReviewScreenShown,
  setNagativeTestComplete,
  setAppModalData,
  setAppModalVisible,
  setFeedbackModalData,
  setFeedbackModalVisible,
  setShowTooltip,
  setAppBannerModalVisible,
  setAppBannerModalData,
} = appSlice.actions;
export default appSlice.reducer;
