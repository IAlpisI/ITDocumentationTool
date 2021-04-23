import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useHistory } from "react-router-dom"
import * as api from "./workerApi"


export const fetchWorkers = createAsyncThunk(
    'worker/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAllWorkers()
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchWorker = createAsyncThunk(
    'worker/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getWorker(id);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteWorker = createAsyncThunk(
    'worker/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteWorker(id)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createWorker = createAsyncThunk(
    'worker/create',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.createWorker(data)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateWorker = createAsyncThunk(
    'worker/update',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.updateWorker(data)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

interface WorkerState {
    data: [],
    status: 'idle' | 'pending' | 'failed' | 'completed',
    error: string
}

const initialState = {
    workerList: {
        data: [],
        status: {},
        error: {}
    },
    singleWorker: {
        data: [],
        status: {},
        error: {}
    }
}

const workerSlice = createSlice({
    name: 'worker',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchWorkers.fulfilled, (state, action) => {
            state.workerList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
            state.singleWorker = {
                data: [],
                status: 'idle',
                error: {}
            }
        })
        builder.addCase(fetchWorkers.pending, (state, _) => {
            state.workerList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchWorkers.rejected, (state, { error }) => {
            state.workerList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchWorker.fulfilled, (state, action) => {
            state.singleWorker = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchWorker.pending, (state, _) => {
            state.singleWorker = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchWorker.rejected, (state, { error }) => {
            state.singleWorker = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deleteWorker.fulfilled, (state, action) => {
            state.singleWorker = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(deleteWorker.pending, (state, _) => {
            state.singleWorker = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deleteWorker.rejected, (state, { error }) => {
            state.singleWorker = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createWorker.fulfilled, (state, action) => {
            state.singleWorker = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createWorker.pending, (state, _) => {
            state.singleWorker = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createWorker.rejected, (state, { error }) => {
            state.singleWorker = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateWorker.fulfilled, (state, action) => {
            state.singleWorker = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updateWorker.pending, (state, _) => {
            state.singleWorker = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateWorker.rejected, (state, { error }) => {
            state.singleWorker = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})


export default workerSlice.reducer