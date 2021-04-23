import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {routerDevice, routerDeviceGetAll} from '../../common/constants'


export const fetchRouters = createAsyncThunk(
    'router/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(routerDeviceGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchRouter = createAsyncThunk(
    'router/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, routerDevice);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteRouter = createAsyncThunk(
    'router/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, routerDevice)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createRouter = createAsyncThunk(
    'router/create',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.createData(data, routerDevice)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateRouter = createAsyncThunk(
    'router/update',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, routerDevice)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    routerList: {
        data: [],
        status: {},
        error: {}
    },
    singleRouter: {
        data: [],
        status: {},
        error: {}
    }
}

const routerSlice = createSlice({
    name: 'router',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchRouters.fulfilled, (state, action) => {
            state.routerList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchRouters.pending, (state, _) => {
            state.routerList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchRouters.rejected, (state, { error }) => {
            state.routerList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchRouter.fulfilled, (state, action) => {
            state.singleRouter = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchRouter.pending, (state, _) => {
            state.singleRouter = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchRouter.rejected, (state, { error }) => {
            state.singleRouter = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deleteRouter.fulfilled, (state, action) => {
            state.singleRouter = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(deleteRouter.pending, (state, _) => {
            state.singleRouter = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deleteRouter.rejected, (state, { error }) => {
            state.singleRouter = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createRouter.fulfilled, (state, action) => {
            state.singleRouter = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createRouter.pending, (state, _) => {
            state.singleRouter = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createRouter.rejected, (state, { error }) => {
            state.singleRouter = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateRouter.fulfilled, (state, action) => {
            state.singleRouter = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updateRouter.pending, (state, _) => {
            state.singleRouter = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateRouter.rejected, (state, { error }) => {
            state.singleRouter = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})


export default routerSlice.reducer