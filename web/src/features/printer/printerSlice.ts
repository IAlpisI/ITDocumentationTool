import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {printer, printerGetAll, exportPrinter} from '../../common/constants'

export const exportAllPrinters = createAsyncThunk(
    'printer/exportall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(exportPrinter)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchPrinters = createAsyncThunk(
    'printer/fetchall',
    async (_, { rejectWithValue }) => {
        try {
            return await api.getAll(printerGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchPrinter = createAsyncThunk(
    'printer/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, printer);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const deletePrinter = createAsyncThunk(
    'printer/delete',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.deleteData(id, printer)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createPrinter = createAsyncThunk(
    'printer/create',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.createData(data, printer)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updatePrinter = createAsyncThunk(
    'printer/update',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, printer)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    printerList: {
        data: [],
        status: {},
        error: {}
    },
    singlePrinter: {
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

const routerSlice = createSlice({
    name: 'printer',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPrinters.fulfilled, (state, action) => {
            state.printerList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
            state.singlePrinter = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchPrinters.pending, (state, _) => {
            state.printerList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchPrinters.rejected, (state, { error }) => {
            state.printerList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchPrinter.fulfilled, (state, action) => {
            state.singlePrinter = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(fetchPrinter.pending, (state, _) => {
            state.singlePrinter = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchPrinter.rejected, (state, { error }) => {
            state.singlePrinter = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(deletePrinter.fulfilled, (state, action) => {
            state.singlePrinter = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(deletePrinter.pending, (state, _) => {
            state.singlePrinter = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(deletePrinter.rejected, (state, { error }) => {
            state.singlePrinter = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(createPrinter.fulfilled, (state, action) => {
            state.singlePrinter = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(createPrinter.pending, (state, _) => {
            state.singlePrinter = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createPrinter.rejected, (state, { error }) => {
            state.singlePrinter = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updatePrinter.fulfilled, (state, action) => {
            state.singlePrinter = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(updatePrinter.pending, (state, _) => {
            state.singlePrinter = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updatePrinter.rejected, (state, { error }) => {
            state.singlePrinter = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(exportAllPrinters.fulfilled, (state, action) => {
            state.exportList = {
                status: 'completed',
                data: action.payload,
                error: {}
            }
        })
        builder.addCase(exportAllPrinters.pending, (state, _) => {
            state.exportList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(exportAllPrinters.rejected, (state, { error }) => {
            state.exportList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})


export default routerSlice.reducer