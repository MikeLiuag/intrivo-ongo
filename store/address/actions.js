import { createAction } from "@reduxjs/toolkit";

const createAddressActions = (name) => createAction(`ADDRESS_${name}`);
export const search = createAddressActions('SEARCH');
export const fetch = createAddressActions('FETCH');
export const reset = createAddressActions('RESET');
export const error = createAddressActions('ERROR');
