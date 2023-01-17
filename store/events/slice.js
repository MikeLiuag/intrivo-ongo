/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  getEventsApi,
  createEventApi,
  getEventDetailsApi,
  getEventMembersApi,
  deleteEventApi,
  removeMemberApi,
  getEventDetailsByCodeApi,
  joinEventApi,
  getPaymentIntentsApi,
  getDiscountCodeApi,
  getDefaultPromoCode,
  getPromoCodeDetails,
  getPromoCodeUrl,
  getPromoCodeWithParams,
} from '../../endpoints/events';
import {
  DISCOUNT_URLS_KEY,
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utilis/localStorage';
import { i18next } from '../../utilis/i18n';

export const getEvents = createAsyncThunk('events/getEvents', async (_, { rejectWithValue }) => {
  try {
    const { data: response } = await getEventsApi();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: i18next.t('errors.load.title'),
      subtitle: i18next.t('errors.load.subtitle'),
      status: error?.response.status,
    });
  }
});

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (
    { promoCode: promoCodeFromUser, productId = 'on_go_one_test_kit', ...payload },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data: response } = await createEventApi(payload);

      // get default promo code if we user didn't provide
      let promoCode = promoCodeFromUser;
      if (!promoCode) {
        const { data: promoCodeDefaultArray } = await getDefaultPromoCode();
        promoCode = promoCodeDefaultArray?.data?.[0]?.code || null;
      }

      // get discount detail from promo code
      const { data: resPromoCodeDetails } = await getPromoCodeDetails({
        promoCode,
        productId,
      });
      const promoCodeDetails = resPromoCodeDetails?.data || {};
      const detailsTransformed = {
        promoCode,
        defaultPrice: promoCodeDetails.unit_price ? promoCodeDetails.unit_price / 100 : null,
        discountPercentage: promoCodeDetails.discount ? promoCodeDetails.discount * -100 : null,
      };

      dispatch(getEvents({}));
      return { ...response.data, ...detailsTransformed };
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.notSaved.title'),
        subtitle: i18next.t('errors.notSaved.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const getEventDetails = createAsyncThunk(
  'events/getEventDetails',
  async (eventId, { rejectWithValue }) => {
    try {
      const { data: response } = await getEventDetailsApi(eventId);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const getEventPromoCodeUrl = createAsyncThunk(
  'events/getPromoCodeUrl',
  async (promoCode, { rejectWithValue }) => {
    try {
      const { data } = await getPromoCodeUrl(promoCode);
      return data.data;
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const getEventPromoCodeWithParams = createAsyncThunk(
  'events/getPromoCodeUrl',
  async ({ promoCode, productId, vendor }, { rejectWithValue }) => {
    try {
      const { data } = await getPromoCodeWithParams({ promoCode, productId, vendor });
      return data.data;
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const getEventMembers = createAsyncThunk(
  'events/getEventMembers',
  async (eventId, { rejectWithValue }) => {
    try {
      const { data: response } = await getEventMembersApi(eventId);
      return { eventId, members: response.data };
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async ({ eventId }, { dispatch, rejectWithValue }) => {
    try {
      const { data: response } = await deleteEventApi(eventId);
      dispatch(getEvents({}));
      return response;
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.notSaved.title'),
        subtitle: i18next.t('errors.notSaved.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const removeMember = createAsyncThunk(
  'events/removeMember',
  async ({ eventId, memberId }, { dispatch, rejectWithValue }) => {
    try {
      const data = await removeMemberApi(eventId, memberId);
      if (data) {
        dispatch(getEvents({}));
      }
      return true;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: i18next.t('errors.notSaved.title'),
        subtitle: i18next.t('errors.notSaved.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const getEventDetailsByCode = createAsyncThunk(
  'events/getEventDetailsByCode',
  async (eventCode, { rejectWithValue }) => {
    try {
      const { data: response } = await getEventDetailsByCodeApi(eventCode);
      if (response.data.length === 0) {
        return rejectWithValue({
          message: 'Incorect invite code',
          subtitle: 'Please use another code',
        });
      }
      return response.data[0];
    } catch (error) {
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const joinEvent = createAsyncThunk(
  'events/joinEvent',
  async (eventId, { dispatch, rejectWithValue }) => {
    try {
      const data = await joinEventApi(eventId);
      if (data) {
        const discountUrls = (await getFromLocalStorage(DISCOUNT_URLS_KEY)) || {};
        if (!discountUrls[eventId]) {
          discountUrls[eventId] = data.data.data.checkout_url;
        }
        dispatch(getEvents({}));
        await saveToLocalStorage(DISCOUNT_URLS_KEY, discountUrls);
      }
      return true;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: i18next.t('errors.join.title'),
        subtitle: i18next.t('errors.join.subtitle'),
        status: error?.response.status,
      });
    }
  }
);

export const getPriceForTest = createAsyncThunk(
  'events/getPriceForTest',
  async (
    { count = 1, offerType = 'fully_covered', productId = 'on_go_one_test_kit', promoCode },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const resp = await getPaymentIntentsApi({
        data: {
          count,
          offer_type: offerType,
          entitled_product_id: productId,
          promo_code: promoCode,
        },
      });
      return {
        ...resp.data.data,
      };
    } catch (err) {
      console.log(err);
      return rejectWithValue({
        message: i18next.t('errors.load.title'),
        subtitle: i18next.t('errors.load.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const discountCode = createAsyncThunk(
  'events/discountCode',
  async ({ eventId, data }, { rejectWithValue }) => {
    try {
      const resp = await getDiscountCodeApi({
        eventId,
        data,
      });
      return resp;
    } catch (err) {
      console.log(err, 'Here discount code');
      return rejectWithValue({
        message: err?.appMessage,
        subtitle: 'Unable to get discount code',
        status: err?.response.status,
      });
    }
  }
);

export const hideToast = createAction('HIDE_TOAST');

const initialState = {
  events: [],
  currentEvent: null,
  members: {},
  globalError: null,
  showToast: false,
  payments: {
    amount: null,
    client_secret: null,
    id: null,
  },
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearGlobalErrors(state) {
      state.globalError = null;
    },
    setPushToken(state, { payload }) {
      state.pushToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.fulfilled, (state, { payload }) => {
        state.events = payload;
        return state;
      })
      .addCase(createEvent.fulfilled, (state, { payload }) => state)
      .addCase(getEventDetails.fulfilled, (state, { payload }) => state)
      .addCase(getEventMembers.fulfilled, (state, { payload }) => {
        state.members[payload.eventId] = payload.members;
        return state;
      })
      .addCase(deleteEvent.fulfilled, (state, { payload }) => state)
      .addCase(removeMember.fulfilled, (state, { payload }) => {
        state.showToast = payload;
        return state;
      })
      .addCase(getEventDetailsByCode.fulfilled, (state, { payload }) => {
        state.currentEvent = payload;
        return state;
      })
      .addCase(joinEvent.fulfilled, (state, { payload }) => state)
      .addCase(getPriceForTest.fulfilled, (state, { payload }) => {
        state.payments = payload;
        return state;
      })
      .addCase(discountCode.fulfilled, (state, { payload }) => state)
      .addCase(hideToast, (state) => {
        state.showToast = false;
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

export const { clearGlobalErrors } = eventsSlice.actions;
export default eventsSlice.reducer;
