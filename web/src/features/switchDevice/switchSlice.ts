import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {switchDevice, switchDeviceGetAll, switchDeviceExport} from '../../common/constants'

export const ExportSwitch = createAsyncThunk(
    'switch/exportall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(switchDeviceExport)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

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

export const fetchSwitchPorts = createAsyncThunk(
    'switch/devicePorts',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, switchDevice);
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
    },
    switchPorts: {
        data: [],
        status: {},
        error: {}
    },
    exportList: {
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
            state.singleSwitch = {
                status: 'idle',
                data: [],
                error: {},
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
        builder.addCase(fetchSwitchPorts.fulfilled, (state, action) => {
            state.switchPorts = {
                status: 'completed',
                data: action.payload.devicePorts,
                error: {}
            }
        })
        builder.addCase(fetchSwitchPorts.pending, (state, _) => {
            state.switchPorts = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchSwitchPorts.rejected, (state, { error }) => {
            state.switchPorts = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(ExportSwitch.fulfilled, (state, action) => {
            state.exportList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(ExportSwitch.pending, (state, _) => {
            state.exportList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(ExportSwitch.rejected, (state, { error }) => {
            state.exportList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})


export default switchSlice.reducer