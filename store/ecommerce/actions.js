import { createAction } from '@reduxjs/toolkit';

const createEcommerceActions = (name) => createAction(`ECOMMERSE_${name}`);
export const clearCurrentProduct = createEcommerceActions('CLEARCART');
export const increaseProductQuantity = createEcommerceActions('INCREASE_QUANTITY');
export const decreaseProductQuantity = createEcommerceActions('DECREASE_QUANTITY');
export const deleteProduct = createEcommerceActions('DELETE_PRODUCT');
