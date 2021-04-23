import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {serverDevice, serverDeviceGetAll} from '../../common/constants'


export const fetchServers = createAsyncThunk(
    'server/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(serverDeviceGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchServer = createAsyncThunk(
    'server/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, serverDevice);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteServer = createAsyncThunk(
    'server/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, serverDevice)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createServer = createAsyncThunk(
    'server/create',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.createData(data, serverDevice)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateServer = createAsyncThunk(
    'server/update',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, serverDevice)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    serverList: {
        data: [],
        status: {},
        error: {}
    },
    singleServer: {
        data: [],
        status: {},
        error: {}
    }
}

const routerSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchServers.fulfilled, (state, action) => {
            state.serverList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchServers.pending, (state, _) => {
            state.serverList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchServers.rejected, (state, { error }) => {
            state.serverList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchServer.fulfilled, (state, action) => {
            state.singleServer = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchServer.pending, (state, _) => {
            state.singleServer = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchServer.rejected, (state, { error }) => {
            state.singleServer = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deleteServer.fulfilled, (state, action) => {
            state.singleServer = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(deleteServer.pending, (state, _) => {
            state.singleServer = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deleteServer.rejected, (state, { error }) => {
            state.singleServer = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createServer.fulfilled, (state, action) => {
            state.singleServer = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createServer.pending, (state, _) => {
            state.singleServer = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createServer.rejected, (state, { error }) => {
            state.singleServer = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateServer.fulfilled, (state, action) => {
            state.singleServer = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updateServer.pending, (state, _) => {
            state.singleServer = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateServer.rejected, (state, { error }) => {
            state.singleServer = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})


export default routerSlice.reducer