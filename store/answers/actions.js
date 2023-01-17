import { createAction } from "@reduxjs/toolkit";

const createAnswers = (name) => createAction(`ANSWERS_${name}`)
export const setAnswers = createAnswers('SET')
export const setResult = createAnswers('SET_RESULT')
export const setUsersResult = createAnswers('SET_USERS_RESULT')
export const setAge = createAnswers('SET_AGE')
export const resetAnswers = createAnswers('RESET')

export const setTimeLeft = createAction('SET_TIME_LEFT')
export const setTimeAlert = createAction('SET_TIME_ALERT')
export const setResultScreen = createAction('SET_RESULT_SCREEN')
export const setRedLineScreen = createAction('SET_REDLINE_SCREEN')