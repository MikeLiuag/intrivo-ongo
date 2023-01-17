import { createSlice } from '@reduxjs/toolkit'
import { setAge, setAnswers, setResult, setTimeLeft, setUsersResult, setTimeAlert, setCounter, setResultScreen, setRedLineScreen, resetAnswers } from './actions'

const initialState = {
  answer: {},
  result: 2,
  usersResult: null,
  timeLeft: 0,
  timeAlert: false,
  resultScreen: false,
  redLineScreen: false
}
const slice = createSlice({
  name: 'answers',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setAnswers, (state, { payload }) => {
        state.answers = payload
      })
      .addCase(setResult, (state, { payload }) => {
        state.result = payload
      })
      .addCase(setUsersResult, (state, { payload }) => {
        state.usersResult = payload
      })
      .addCase(setAge, (state, { payload }) => {
        state.answer.Age = payload
      })
      .addCase(setTimeLeft, (state, { payload }) => {
        state.timeLeft = payload
      })
      .addCase(setTimeAlert, (state, { payload }) => {
        state.timeAlert = payload
      })
      .addCase(setResultScreen, (state, { payload }) => {
        state.resultScreen = payload
      })
      .addCase(setRedLineScreen, (state, { payload }) => {
        state.redLineScreen = payload
      })
      .addCase(resetAnswers, (state, { payload }) => {
        return initialState
      })
  }
})

export default slice.reducer;