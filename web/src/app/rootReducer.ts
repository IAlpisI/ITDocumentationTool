import { combineReducers } from "redux";
import applicationSlice from "../features/application/applicationSlice";
import clientPcSlice from "../features/clientPc/clientPcSlice";
import layerThreeNetworkSlice from "../features/layerThreeNetwork/layerThreeNetworkSlice";
import stateSlice from "../features/mapView/stateSlice";
import routerSlice from "../features/routerDevice/routerSlice"
import serverSlice from "../features/serverDevice/serverSlice";
import userSlice from "../features/user/userSlice";
import workerSlice from "../features/workers/workerSlice";

const reducer = combineReducers({
    worker: workerSlice,
    canvas: stateSlice,
    server: serverSlice,
    user: userSlice,
    client: clientPcSlice,
    layerThreeNetwork: layerThreeNetworkSlice,
    router: routerSlice,
    application: applicationSlice
})

export default reducer