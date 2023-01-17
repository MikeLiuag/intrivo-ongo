import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import answers from './answers/slice';
import address from './address/slice';
import user from './user/slice';
import appReducer from './app/slice';
import events from './events/slice';
import bulkTesting from './bulkTesting/slice';
import ecommerce from './ecommerce/slice';
import modularTestFlow from './modularTestFlow/slice';
import paxlovid from './paxlovid/slice';
import sniffles from './sniffles/slice';
import longCovid from './longCovid/slice';
import medicationFlow from './medicationFlow/slice';

const reducer = combineReducers({
  answers,
  address,
  user,
  app: appReducer,
  events,
  bulkTesting,
  ecommerce,
  modularTestFlow,
  paxlovid,
  sniffles,
  longCovid,
  medicationFlow,
});

export default configureStore({
  reducer,
  middleware: [thunk],
});
