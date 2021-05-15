import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import { searchRecent, searchDefected, hostAddressUpdate, hostAddressCreate, portCreate, portDelete, portGetOne, portUpdate, hostAddressGetAll } from "../../common/constants"


export const fetchSearchResult = createAsyncThunk(
    'search/fetchall',
    async (criteria:any, { rejectWithValue }) => {
        try {
            return await api.getOnCriteria(criteria, searchRecent)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchSearchModifiedResult = createAsyncThunk(
    'searchModified/fetchall',
    async (criteria:any, { rejectWithValue }) => {
        try {
            return await api.getOnCriteria(criteria, searchRecent)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchDefectedResult = createAsyncThunk(
    'searchDefecetd/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(searchDefected)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchPort = createAsyncThunk(
    'port/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, portGetOne);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deletePort = createAsyncThunk(
    'port/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, portDelete)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createPort = createAsyncThunk(
    'port/create',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, portCreate)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updatePort = createAsyncThunk(
    'port/update',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, portUpdate)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchHostAddresses = createAsyncThunk(
    'search/fetchhostaddresses',
    async (id:any, { rejectWithValue }) => {
        try {
            return await api.getData(id, hostAddressGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateHostAddresses = createAsyncThunk(
    'search/updatehost',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, hostAddressUpdate)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createHostAddresses = createAsyncThunk(
    'search/createhost',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.createData(data, hostAddressCreate)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)


const initialState = {
    recentAddedList: {
        data: [],
        status: {},
        error: {}
    },
    defectedList: {
        data: [],
        status: {},
        error: {}
    },
    recentModifiedList: {
        data: [],
        status: {},
        error: {}
    },
    singlePort: {
        data: [],
        status: {},
        error: {}
    },
    hostAddressList: {
        data: [],
        status: {},
        error: {}
    }
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSearchResult.fulfilled, (state, action) => {
            state.recentAddedList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchSearchResult.pending, (state, _) => {
            state.recentAddedList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchSearchResult.rejected, (state, { error }) => {
            state.recentAddedList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchSearchModifiedResult.fulfilled, (state, action) => {
            state.recentModifiedList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchSearchModifiedResult.pending, (state, _) => {
            state.recentModifiedList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchSearchModifiedResult.rejected, (state, { error }) => {
            state.recentModifiedList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchPort.fulfilled, (state, action) => {
            state.singlePort = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchPort.pending, (state, _) => {
            state.singlePort = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchPort.rejected, (state, { error }) => {
            state.singlePort = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deletePort.fulfilled, (state, action) => {
        })
        builder.addCase(deletePort.pending, (state, _) => {
        })
        builder.addCase(deletePort.rejected, (state, { error }) => {
        })
        builder.addCase(createPort.fulfilled, (state, action) => {
        })
        builder.addCase(createPort.pending, (state, _) => {
        })
        builder.addCase(createPort.rejected, (state, { error }) => {
        })
        builder.addCase(updatePort.fulfilled, (state, action) => {
        })
        builder.addCase(updatePort.pending, (state, _) => {
        })
        builder.addCase(updatePort.rejected, (state, { error }) => {
        })
        builder.addCase(fetchHostAddresses.fulfilled, (state, action) => {
            state.hostAddressList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchHostAddresses.pending, (state, _) => {
            state.hostAddressList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchHostAddresses.rejected, (state, { error }) => {
            state.hostAddressList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateHostAddresses.fulfilled, (state, action) => {
        })
        builder.addCase(updateHostAddresses.pending, (state, _) => {
        })
        builder.addCase(updateHostAddresses.rejected, (state, { error }) => {
        })
        builder.addCase(createHostAddresses.fulfilled, (state, action) => {
        })
        builder.addCase(createHostAddresses.pending, (state, _) => {
        })
        builder.addCase(createHostAddresses.rejected, (state, { error }) => {
        })
        builder.addCase(fetchDefectedResult.fulfilled, (state, action) => {
            state.defectedList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchDefectedResult.pending, (state, _) => {
            state.defectedList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchDefectedResult.rejected, (state, { error }) => {
            state.defectedList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})

export default dashboardSlice.reducer