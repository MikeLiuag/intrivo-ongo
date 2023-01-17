import { createAction } from "@reduxjs/toolkit";

export const clear = createAction('USER_CLEAR');
export const login = createAction('USER_LOGIN');
export const clearErrors = createAction('USER_CLEAR_ERRORS');
export const refreshState = createAction('USER_PERSIST_STATE');

