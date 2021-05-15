import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {cable, cableGetAll} from "../../common/constants"


export const fetchCables = createAsyncThunk(
    'cable/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(cableGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchCable = createAsyncThunk(
    'cable/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, cable);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteCable = createAsyncThunk(
    'cable/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, cable)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createCable = createAsyncThunk(
    'cable/create',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, cable)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateCable = createAsyncThunk(
    'cable/update',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, cable)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    cableList: {
        data: [],
        status: {},
        error: {}
    },
    singleCable: {
        data: [],
        status: {},
        error: {}
    }
}

const cableSlice = createSlice({
    name: 'cable',
    initialState,
    reducers: {
        filterKey(state, id) {
            state.cableList.data.filter((x:any) => x.id !== id)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCables.fulfilled, (state, action) => {
            state.cableList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
            state.singleCable = {
                data: [],
                status: 'idle',
                error: {}
            }
        })
        builder.addCase(fetchCables.pending, (state, _) => {
            state.cableList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchCables.rejected, (state, { error }) => {
            state.cableList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchCable.fulfilled, (state, action) => {
            state.singleCable = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchCable.pending, (state, _) => {
            state.singleCable = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchCable.rejected, (state, { error }) => {
            state.singleCable = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deleteCable.fulfilled, (state, action) => {
            state.singleCable = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(deleteCable.pending, (state, _) => {
            state.singleCable = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deleteCable.rejected, (state, { error }) => {
            state.singleCable = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createCable.fulfilled, (state, action) => {
            state.singleCable = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createCable.pending, (state, _) => {
            state.singleCable = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createCable.rejected, (state, { error }) => {
            state.singleCable = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateCable.fulfilled, (state, action) => {
            state.singleCable = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updateCable.pending, (state, _) => {
            state.singleCable = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateCable.rejected, (state, { error }) => {
            state.singleCable = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})

export const {filterKey} = cableSlice.actions
export default cableSlice.reducer