import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface IUser {
    email: string;
    password: string;
}

const instance = axios.create({
    baseURL: 'http://localhost:58968/api/',
});

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ email, password }:any, { rejectWithValue }) => {
        try {
            const response = await instance.post("login", {
                email: "test2@a.com",
                password: "test2"
            });

            console.log(response.data)

            return response;

        } catch (e) {
            return rejectWithValue(e.response.data)
            // console.log('Error', e.response.data);
            // thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const initialState = {
    currentUser: {
        data: {} as any,
        status: '',
        error: {}
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // clearState: (state) => {
        //     state.status = '';
        //     state.error = '';

        //     return state;
        // },
    },
    extraReducers: builder => {
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.currentUser= {
                status: 'completed',
                data: payload?.data ,
                error: ''
            }
            localStorage.setItem("name", payload.data.name)
            localStorage.setItem("role", payload.data.role)
        })
        builder.addCase(loginUser.rejected, (state, {error}) => {
            state.currentUser = {
                status: 'failed',
                data: {},
                error: error
            }
        })
        builder.addCase(loginUser.pending, (state, _) => {
            state.currentUser = {
                status: 'idle',
                data:{},
                error: {}
            }
        })
    }
})

// export const { clearState } = userSlice.actions
export const userSelector = (state: any) => state.user.currentUser;
export default userSlice.reducer;