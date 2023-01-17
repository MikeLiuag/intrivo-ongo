import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch, search, reset, error} from './actions'
import { mock } from '../../utilis/mock';
const initialState = {
  addresses: [],
  error: null
}

export const getAddresses = createAsyncThunk(
    'addresses/get',
    async (search = '') => {
        const response = await mock(true, search);
        return response;
    }
)

const slice = createSlice({
    name: 'addresses',
    initialState,
    reducers: (builder) => {
        builder
            .addCase(reset, (state, { payload }) => {
                return initialState
            })
            .addCase(error, (state, { payload }) => {
                state.addresses = [];
                state.error = payload;
            })
    },
    extraReducers: {
        [getAddresses.fulfilled]: (state, { payload }) => {
            state.addresses = payload;
            state.error = null;
        },
        [getAddresses.rejected]: (state, { payload }) => {
            state.addresses = [];
            state.error = payload
        }
    }
})

export default slice.reducer;
