import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {clientPc, clientPcGetAll, clientPcExport} from "../../common/constants"

export const ExportClientPc = createAsyncThunk(
    'client/exportall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(clientPcExport)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchClients = createAsyncThunk(
    'client/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(clientPcGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchClient = createAsyncThunk(
    'client/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, clientPc);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteClient = createAsyncThunk(
    'client/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, clientPc)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createClient = createAsyncThunk(
    'client/create',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.createData(data, clientPc)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateClient = createAsyncThunk(
    'client/update',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, clientPc)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    clientList: {
        data: [],
        status: {},
        error: {}
    },
    singleClient: {
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

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchClients.fulfilled, (state, action) => {
            state.clientList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
            state.singleClient = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchClients.pending, (state, _) => {
            state.clientList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchClients.rejected, (state, { error }) => {
            state.clientList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchClient.fulfilled, (state, action) => {
            state.singleClient = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchClient.pending, (state, _) => {
            state.singleClient = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchClient.rejected, (state, { error }) => {
            state.singleClient = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deleteClient.fulfilled, (state, action) => {
            state.singleClient = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(deleteClient.pending, (state, _) => {
            state.singleClient = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deleteClient.rejected, (state, { error }) => {
            state.singleClient = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createClient.fulfilled, (state, action) => {
            state.singleClient = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createClient.pending, (state, _) => {
            state.singleClient = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createClient.rejected, (state, { error }) => {
            state.singleClient = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateClient.fulfilled, (state, action) => {
            state.singleClient = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updateClient.pending, (state, _) => {
            state.singleClient = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateClient.rejected, (state, { error }) => {
            state.singleClient = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(ExportClientPc.fulfilled, (state, action) => {
            state.exportList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(ExportClientPc.pending, (state, _) => {
            state.exportList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(ExportClientPc.rejected, (state, { error }) => {
            state.exportList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})


export default clientSlice.reducer