/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  clearCurrentProduct,
  decreaseProductQuantity,
  deleteProduct,
  increaseProductQuantity,
} from './actions';

import {
  getProduct,
  getProducts,
  getCustomerAccessToken,
  createCart,
  getCart,
} from '../../endpoints/ecommerce';
import { i18next } from '../../utilis/i18n';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const addToCart = createAsyncThunk(
  'ecommerce/addToCart',
  async ({ product, quantity }, { dispatch, getState }) => {
    let newCart = {};
    try {
      const accessToken = getState().ecommerce.accessToken;
      if (!accessToken) {
        const token = await dispatch(fetchCustomerAccessToken());
        const { payload } = token;
        newCart = await dispatch(makeCart({ payload, quantity, product })); //pass in all products
      }
      return { product, quantity, newCart };
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage || 'Error adding to cart',
        subtitle: err?.appSubtitle || err?.message,
        status: err?.response.status,
      });
    }
  }
);

//checkout thunk first thunk takes product and adds it to the store
export const fetchCustomerAccessToken = createAsyncThunk(
  'ecommerce/fetchCustomerAccessToken',
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const accessToken = await getCustomerAccessToken();
      return accessToken;
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage || 'Error getting token',
        subtitle: err?.appSubtitle || err?.message,
        status: err?.response.status,
      });
    }
  }
);

export const makeCheckout = createAsyncThunk(
  'ecommerce/makeCheckout',
  async (args, { dispatch, getState, rejectWithValue }) => {
    try {
      const checkout = await createCheckout(args);
      return checkout;
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.store.cart.checkout.title'),
        subtitle: i18next.t('errors.store.cart.checkout.subtitle'),
        status: err?.response?.status || undefined,
      });
    }
  }
);

export const makeCart = createAsyncThunk(
  'ecommerce/makeCart',
  async (args, { dispatch, getState, rejectWithValue }) => {
    try {
      const cart = await createCart(args);
      return cart;
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage || 'Error creating cart',
        subtitle: err?.appSubtitle || err?.message,
        status: err?.response.status,
      });
    }
  }
);

export const fetchCart = createAsyncThunk(
  'ecommerce/fetchCart',
  async (cartId, { dispatch, getState, rejectWithValue }) => {
    try {
      const cart = await getCart(cartId);
      if (cart.errors) {
        return rejectWithValue({
          message: i18next.t('errors.store.cart.products.title'),
          subtitle: i18next.t('errors.store.cart.products.subtitle'),
          status: undefined,
        });
      } else {
        return cart;
      }
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.store.cart.products.title'),
        subtitle: i18next.t('errors.store.cart.products.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const fetchProductList = createAsyncThunk(
  'ecommerce/fetchProductList',
  async (_, { rejectWithValue }) => {
    try {
      const response = [
        {
          id: 11,
          title: 'On/Go One COVID-19 Self-Test',
          subTitle:
            'Slim, single, grab-and-go COVID-19 self-test with a 98.2% accuracy, all in just 15 minutes. ',
          price: '9.00',
          numberOfTest: 1,
          image: [
            'https://assets.intrivo.com/test_options/on_go_1ct%403x.png',
            'https://assets.intrivo.com/test_options/on_go_1ct%403x.png',
          ],
          description: `Introducing On/Go One, the single, simple, grab-and-goCOVID-19 antigen self-test. Whether you’re going to work, working out, or working it on the dance floor, you gotta have One. \n\nOn/Go One delivers 98%* accurate test results in just 15 minutes. Plus, it’s covered by most insurance plans, making it as easy on your wallet as it is to use. If you’re looking for a test designed to get you back to living, this is the One. ‍\n\nOn/Go One is your all in One test-to-treat COVID-19 solution -- you’ve got to have One. \n\nThe On/Go One COVID-19 Antigen Home Test is authorized by FDA under an Emergency Use Authorization (EUA).`,
          features: [
            {
              title: 'Key features',
              content:
                'Quick and Easy to Use: The On/Go One COVID-19 Antigen Self-Test by Intrivo uses a shallow nasal swab for maximum comfort, with collection you can perform for yourself or another at home or any place where you can find a flat surface. Indicated for children as young as 2 years old when administered by an adult, and for all people 14 and older to self-perform.',
            },
            {
              title: 'Shipping details',
              content:
                'Standard shipping included. Expedited shipping available in cart. This item is non-returnable, but if the item arrives damaged or defective, you may request a refund or replacement.',
            },
            {
              title: 'Insurance reimbursement',
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
            {
              title: 'Return policy',
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
          ],
        },
        {
          id: 12,
          title: 'On/Go One COVID-19 Self-Test',
          subTitle:
            'COVID-19 self-test with two tests per box, offering results in just 10 minutes. ',
          price: '24.00',
          numberOfTest: 1,
          image: [
            'https://assets.intrivo.com/test_options/on_go_1ct%403x.png',
            'https://assets.intrivo.com/test_options/on_go_1ct%403x.png',
          ],
          description: `Introducing On/Go One, the single, simple, grab-and-goCOVID-19 antigen self-test. Whether you’re going to work, working out, or working it on the dance floor, you gotta have One. \n\nOn/Go One delivers 98%* accurate test results in just 15 minutes. Plus, it’s covered by most insurance plans, making it as easy on your wallet as it is to use. If you’re looking for a test designed to get you back to living, this is the One. ‍\n\nOn/Go One is your all in One test-to-treat COVID-19 solution -- you’ve got to have One. \n\nThe On/Go One COVID-19 Antigen Home Test is authorized by FDA under an Emergency Use Authorization (EUA).`,
          features: [
            {
              title: 'Key features',
              content:
                'Quick and Easy to Use: The On/Go One COVID-19 Antigen Self-Test by Intrivo uses a shallow nasal swab for maximum comfort, with collection you can perform for yourself or another at home or any place where you can find a flat surface. Indicated for children as young as 2 years old when administered by an adult, and for all people 14 and older to self-perform.',
            },
            {
              title: 'Shipping details',
              content:
                'Standard shipping included. Expedited shipping available in cart. This item is non-returnable, but if the item arrives damaged or defective, you may request a refund or replacement.',
            },
            {
              title: 'Insurance reimbursement',
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
            {
              title: 'Return policy',
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
          ],
        },
      ];
      if (response.length > 0) {
        return response;
      } else {
        return rejectWithValue({
          message: i18next.t('errors.store.browseList.title'),
          subtitle: i18next.t('errors.store.browseList.subtitle'),
          status: undefined,
        });
      }
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.store.browseList.title'),
        subtitle: i18next.t('errors.store.browseList.subtitle'),
        status: undefined,
      });
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'ecommerce/fetchProduct',
  async (productId, { dispatch, getState, rejectWithValue }) => {
    try {
      const currentProduct = await getProduct(productId);
      if (currentProduct.id) {
        return currentProduct;
      } else {
        return rejectWithValue({
          message: i18next.t('errors.store.productInfo.title'),
          subtitle: i18next.t('errors.store.productInfo.subtitle'),
          status: undefined,
        });
      }
    } catch (err) {
      return rejectWithValue({
        message: i18next.t('errors.store.productInfo.title'),
        subtitle: i18next.t('errors.store.productInfo.subtitle'),
        status: err?.response.status,
      });
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'ecommerce/fetchProducts',
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const currentProducts = await getProducts();
      return currentProducts;
    } catch (err) {
      return rejectWithValue({
        message: err?.appMessage || 'Error getting products',
        subtitle: err?.appSubtitle || err?.message,
        status: err?.response.status,
      });
    }
  }
);

const initialState = {
  cart: [],
  newCart: [],
  currentProduct: {},
  currentProducts: [],
  productList: [],
  accessToken: null,
  productList: [],
  checkout: {},
};

export const ecommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.cart.push(payload);
      })
      .addCase(makeCheckout.fulfilled, (state, { payload }) => {
        state.checkout = payload;
      })
      .addCase(fetchProductList.fulfilled, (state, { payload }) => {
        state.productList = payload;
      })
      .addCase(fetchCustomerAccessToken.fulfilled, (state, { payload }) => {
        state.accessToken = payload;
      })
      .addCase(fetchCart.fulfilled, (state, { payload }) => {
        state.newCart.push(payload);
      })
      .addCase(fetchProduct.fulfilled, (state, { payload }) => {
        state.currentProduct = payload;
      })
      .addCase(clearCurrentProduct, (state) => {
        state.cart = [];
      })
      .addCase(increaseProductQuantity, (state, { payload }) => {
        state.cart[payload.index].quantity = payload.quantity;
      })
      .addCase(decreaseProductQuantity, (state, { payload }) => {
        state.cart[payload.index].quantity = payload.quantity;
      })
      .addCase(deleteProduct, (state, { payload }) => {
        state.cart.splice(payload, 1);
      });
  },
});

export default ecommerceSlice.reducer;
