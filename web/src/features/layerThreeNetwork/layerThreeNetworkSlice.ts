import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {layerThreeNetwork, layerThreeNetworkGetAll} from "../../common/constants"

export const fetchLayerThreeNetworks = createAsyncThunk(
    'layerThreeNetwork/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(layerThreeNetworkGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchLayerThreeNetwork = createAsyncThunk(
    'layerThreeNetwork/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, layerThreeNetwork);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deleteLayerThreeNetwork = createAsyncThunk(
    'layerThreeNetwork/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, layerThreeNetwork)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createLayerThreeNetwork = createAsyncThunk(
    'layerThreeNetwork/create',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.createData(data, layerThreeNetwork)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateLayerThreeNetwork = createAsyncThunk(
    'layerThreeNetwork/update',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, layerThreeNetwork)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    layerThreeNetworkList: {
        data: [],
        status: {},
        error: {}
    },
    layerThreeNetwork: {
        data: [],
        status: {},
        error: {}
    }
}

const layerThreeNetworkSlice = createSlice({
    name: 'layerThreeNetwork',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLayerThreeNetworks.fulfilled, (state, action) => {
            state.layerThreeNetworkList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
            state.layerThreeNetwork = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchLayerThreeNetworks.pending, (state, _) => {
            state.layerThreeNetworkList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchLayerThreeNetworks.rejected, (state, { error }) => {
            state.layerThreeNetworkList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchLayerThreeNetwork.fulfilled, (state, action) => {
            state.layerThreeNetwork = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchLayerThreeNetwork.pending, (state, _) => {
            state.layerThreeNetwork = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchLayerThreeNetwork.rejected, (state, { error }) => {
            state.layerThreeNetwork = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deleteLayerThreeNetwork.fulfilled, (state, action) => {
            state.layerThreeNetwork = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(deleteLayerThreeNetwork.pending, (state, _) => {
            state.layerThreeNetwork = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deleteLayerThreeNetwork.rejected, (state, { error }) => {
            state.layerThreeNetwork = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createLayerThreeNetwork.fulfilled, (state, action) => {
            state.layerThreeNetwork = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createLayerThreeNetwork.pending, (state, _) => {
            state.layerThreeNetwork = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createLayerThreeNetwork.rejected, (state, { error }) => {
            state.layerThreeNetwork = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateLayerThreeNetwork.fulfilled, (state, action) => {
            state.layerThreeNetwork = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updateLayerThreeNetwork.pending, (state, _) => {
            state.layerThreeNetwork = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateLayerThreeNetwork.rejected, (state, { error }) => {
            state.layerThreeNetwork = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})


export default layerThreeNetworkSlice.reducer