import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {switchDevice, switchDeviceGetAll} from '../../common/constants'


export const fetchSwitches = createAsyncThunk(
    'switch/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(switchDeviceGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchSwitch = createAsyncThunk(
    'switch/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, switchDevice);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteSwitch = createAsyncThunk(
    'switch/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, switchDevice)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createSwitch = createAsyncThunk(
    'switch/create',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.createData(data, switchDevice)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateSwitch = createAsyncThunk(
    'switch/update',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, switchDevice)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    switchList: {
        data: [],
        status: {},
        error: {}
    },
    singleSwitch: {
        data: [],
        status: {},
        error: {}
    }
}

const switchSlice = createSlice({
    name: 'switch',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSwitches.fulfilled, (state, action) => {
            state.switchList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchSwitches.pending, (state, _) => {
            state.switchList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchSwitches.rejected, (state, { error }) => {
            state.switchList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchSwitch.fulfilled, (state, action) => {
            state.singleSwitch = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchSwitch.pending, (state, _) => {
            state.singleSwitch = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchSwitch.rejected, (state, { error }) => {
            state.singleSwitch = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deleteSwitch.fulfilled, (state, action) => {
            state.singleSwitch = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(deleteSwitch.pending, (state, _) => {
            state.singleSwitch = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deleteSwitch.rejected, (state, { error }) => {
            state.singleSwitch = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createSwitch.fulfilled, (state, action) => {
            state.singleSwitch = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createSwitch.pending, (state, _) => {
            state.singleSwitch = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createSwitch.rejected, (state, { error }) => {
            state.singleSwitch = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateSwitch.fulfilled, (state, action) => {
            state.singleSwitch = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updateSwitch.pending, (state, _) => {
            state.singleSwitch = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateSwitch.rejected, (state, { error }) => {
            state.singleSwitch = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})


export default switchSlice.reducer