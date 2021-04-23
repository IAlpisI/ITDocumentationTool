import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
// import fetchAll from "../../common/api"

interface CounterState {
    value: number
}

const initialState = { value: 0 } as CounterState

const usersInitialState = {
    userList: {
      status: 'idle',
      data: {},
      error: {}
    }    
 };

 export const fetchUsers = createAsyncThunk(
    'dcandidates/fetchbyuserid',
    () => axios.get(url)
        .then(response => response.data)
        .catch(error => error),
    
)

const dcandidateSlice = createSlice({
    name: 'dcandidate',
    initialState: usersInitialState,
    reducers: {
        // create(state) {
        //     state.value++
        // },
        // update(state) {
        //     state.value--
        // },
        // fetchall(state) {
        //     state.value--
        // },
        // remove(state, action: PayloadAction<number>) {
        //     state.value += action.payload
        // },
        // failed(state){
        //     state.value++
        // }
    },
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action) => {
            console.log(action.payload)
            state.userList = {
                status: 'completed',
                data: action.payload,
                error:{}
            }
        },
        [fetchUsers.rejected.type]: (state, action) => {
            console.log(action.payload)
            state.userList = {
            status: 'idle',
            data: {},
            error: action.payload,
          };
        },
    }
})

const url = 'http://localhost:58968/api/dcandidate'

// export const { create, update, fetchall, remove, failed } = dcandidateSlice.actions
export default dcandidateSlice.reducer

