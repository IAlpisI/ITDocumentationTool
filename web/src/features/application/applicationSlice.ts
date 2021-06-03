import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../common/api"
import {
    application,
    applicationGetAll,
    licenseKey,
    licenseKeyGetAll,
    serverApp,
    serverLicense,
    clientApp,
    clientLicense,
    applicationGetApp,
    applicationGetLicense,
    getApplicense
} from "../../common/constants"

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
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, application)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateApplication = createAsyncThunk(
    'application/update',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, application)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const createLicenseKey = createAsyncThunk(
    'licenseKey/create',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, licenseKey)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchLicense = createAsyncThunk(
    'licenseKey/getone',
    async (id: any, { rejectWithValue }) => {
        try {
            return await api.getData(id, licenseKey);
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const applicationForDevice = createAsyncThunk(
    'applicationForDevice/get',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, applicationGetApp)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)



//License
export const fetchLicensesForApplication = createAsyncThunk(
    'license/fetchall',
    async (data:any, { rejectWithValue }) => {
        try {
            return await api.getData(data, licenseKeyGetAll)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const getLicenseForApplication = createAsyncThunk(
    'licenseKey/get',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.getData(data, applicationGetLicense)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateLicenseKey = createAsyncThunk(
    'licenseKey/update',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.updateData(data, licenseKey)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

//Operations with devices

export const serverApplciationModifier = createAsyncThunk(
    'application/serverapp',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, serverApp)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const serverLicenseModifier = createAsyncThunk(
    'application/serverlicense',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, serverLicense)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const clientApplciationModifier = createAsyncThunk(
    'application/clientapp',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, clientApp)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const clientLicenseModifier = createAsyncThunk(
    'application/clientlicense',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, clientLicense)
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

//Get licenses for application
export const fetchDeviceLicensesForApplication = createAsyncThunk(
    'application/getapplicense',
    async (data: any, { rejectWithValue }) => {
        try {
            return await api.createData(data, getApplicense)
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
    applicationForDeviceList: {
        data: [],
        status: {},
        error: {}
    },
    singleApplication: {
        data: [],
        status: {},
        error: {}
    },
    licenseList: {
        data: [],
        status: {},
        error: {}
    },
    singleLicense : {
        data: [],
        status: {},
        error: {}
    },
    licenseForDevice : {
        data: [],
        status: {},
        error: {}
    }
}

const applicationSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        resetSingleLicense(state){
            state.singleLicense = {
                status: 'idle',
                data: [],
                error: {},
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchApplications.fulfilled, (state, action) => {
            state.applicationList = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
            state.singleApplication = {
                status: 'idle',
                data: [],
                error: {},
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
                data: action.payload.data,
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
                data: action.payload.data,
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
                data: action.payload.data,
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
        builder.addCase(createLicenseKey.fulfilled, (state, action) => {
            state.singleApplication = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(createLicenseKey.pending, (state, _) => {
            state.singleApplication = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(createLicenseKey.rejected, (state, { error }) => {
            state.singleApplication = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(updateLicenseKey.fulfilled, (state, action) => {
            state.singleLicense = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(updateLicenseKey.pending, (state, _) => {
            state.singleLicense = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(updateLicenseKey.rejected, (state, { error }) => {
            state.singleLicense = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(getLicenseForApplication.fulfilled, (state, action) => {
            state.licenseForDevice = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(getLicenseForApplication.pending, (state, _) => {
            state.licenseForDevice = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(getLicenseForApplication.rejected, (state, { error }) => {
            state.licenseForDevice = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(applicationForDevice.fulfilled, (state, action) => {
            state.applicationForDeviceList = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(applicationForDevice.pending, (state, _) => {
            state.applicationForDeviceList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(applicationForDevice.rejected, (state, { error }) => {
            state.applicationForDeviceList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchLicense.fulfilled, (state, action) => {
            state.singleLicense = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(fetchLicense.pending, (state, _) => {
            state.singleLicense = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchLicense.rejected, (state, { error }) => {
            state.singleLicense = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchLicensesForApplication.fulfilled, (state, action) => {
            state.licenseList = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(fetchLicensesForApplication.pending, (state, _) => {
            state.licenseList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchLicensesForApplication.rejected, (state, { error }) => {
            state.licenseList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(serverLicenseModifier.fulfilled, (state, action) => {
            state.licenseForDevice = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(serverLicenseModifier.pending, (state, _) => {
            state.licenseForDevice = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(serverLicenseModifier.rejected, (state, { error }) => {
            state.licenseForDevice = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(serverApplciationModifier.fulfilled, (state, action) => {
            state.applicationForDeviceList = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(serverApplciationModifier.pending, (state, _) => {
            state.applicationForDeviceList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(serverApplciationModifier.rejected, (state, { error }) => {
            state.applicationForDeviceList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(clientApplciationModifier.fulfilled, (state, action) => {
            state.applicationForDeviceList = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(clientApplciationModifier.pending, (state, _) => {
            state.applicationForDeviceList = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(clientApplciationModifier.rejected, (state, { error }) => {
            state.applicationForDeviceList = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(clientLicenseModifier.fulfilled, (state, action) => {
            state.licenseForDevice = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(clientLicenseModifier.pending, (state, _) => {
            state.licenseForDevice = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(clientLicenseModifier.rejected, (state, { error }) => {
            state.licenseForDevice = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
        builder.addCase(fetchDeviceLicensesForApplication.fulfilled, (state, action) => {
            state.licenseForDevice = {
                status: 'completed',
                data: action.payload.data,
                error: {}
            }
        })
        builder.addCase(fetchDeviceLicensesForApplication.pending, (state, _) => {
            state.licenseForDevice = {
                status: 'idle',
                data: [],
                error: {},
            }
        })
        builder.addCase(fetchDeviceLicensesForApplication.rejected, (state, { error }) => {
            state.licenseForDevice = {
                status: 'failed',
                data: [],
                error: error,
            }
        })
    }
})

export const {resetSingleLicense} = applicationSlice.actions
export default applicationSlice.reducer