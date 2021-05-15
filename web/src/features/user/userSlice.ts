import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as api from '../../common/api'
import {userGetAll, user} from '../../common/constants'
axios.defaults.withCredentials = true;

const instance = axios.create({
    baseURL: 'http://localhost:58968/api/',
});

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ username, password }:any, { rejectWithValue }) => {
        try {
            const response = await instance.post("login", {
                username: username,
                password: password
            });

            return response;

        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

export const fetchUsers = createAsyncThunk(
    'user/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(userGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, user);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, user)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createUser = createAsyncThunk(
    'user/create',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, user)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/update',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, user)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    currentUser: {
        data: {} as any,
        status: '',
        error: {}
    },
    userList: {
        data: [],
        status: {},
        error: {}
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearState: (state) => {
            state.currentUser.status = '';
            state.currentUser.error = '';
        },
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
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.userList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchUsers.pending, (state, _) => {
            state.userList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchUsers.rejected, (state, { error }) => {
            state.userList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.currentUser = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchUser.pending, (state, _) => {
            state.currentUser = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchUser.rejected, (state, { error }) => {
            state.currentUser = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.userList = {
                status: 'completed',
                data: [],
                error: {}
            }
        })
        builder.addCase(deleteUser.pending, (state, _) => {
            state.userList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deleteUser.rejected, (state, { error }) => {
            state.userList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.userList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createUser.pending, (state, _) => {
            state.userList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createUser.rejected, (state, { error }) => {
            state.userList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.userList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updateUser.pending, (state, _) => {
            state.userList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateUser.rejected, (state, { error }) => {
            state.userList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})

export const userSelector = (state: any) => state.user.currentUser;
export default userSlice.reducer;
export const {clearState} = userSlice.actions