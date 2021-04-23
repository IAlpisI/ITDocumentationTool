import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {application, applicationGetAll} from "../../common/constants"

export const fetchApplications = createAsyncThunk(
    'application/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(applicationGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchApplication = createAsyncThunk(
    'application/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, application);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteApplication = createAsyncThunk(
    'application/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, application)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createApplication = createAsyncThunk(
    'application/create',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.createData(data, application)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateApplication = createAsyncThunk(
    'application/update',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, application)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    applicationList: {
        data: [],
        status: {},
        error: {}
    },
    singleApplication: {
        data: [],
        status: {},
        error: {}
    }
}

const applicationSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchApplications.fulfilled, (state, action) => {
            state.applicationList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchApplications.pending, (state, _) => {
            state.applicationList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchApplications.rejected, (state, { error }) => {
            state.applicationList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchApplication.fulfilled, (state, action) => {
            state.singleApplication = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchApplication.pending, (state, _) => {
            state.singleApplication = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchApplication.rejected, (state, { error }) => {
            state.singleApplication = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deleteApplication.fulfilled, (state, action) => {
            state.singleApplication = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(deleteApplication.pending, (state, _) => {
            state.singleApplication = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deleteApplication.rejected, (state, { error }) => {
            state.singleApplication = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createApplication.fulfilled, (state, action) => {
            state.singleApplication = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createApplication.pending, (state, _) => {
            state.singleApplication = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createApplication.rejected, (state, { error }) => {
            state.singleApplication = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateApplication.fulfilled, (state, action) => {
            state.singleApplication = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updateApplication.pending, (state, _) => {
            state.singleApplication = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateApplication.rejected, (state, { error }) => {
            state.singleApplication = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})


export default applicationSlice.reducer