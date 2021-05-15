import { combineReducers } from "redux";
import applicationSlice from "../features/application/applicationSlice";
import cablesSlice from "../features/cables/cablesSlice";
import clientPcSlice from "../features/clientPc/clientPcSlice";
import dashboardSlice from "../features/dashboard/dashboardSlice";
import layerThreeNetworkSlice from "../features/layerThreeNetwork/layerThreeNetworkSlice";
import stateSlice from "../features/mapView/stateSlice";
import printerSlice from "../features/printer/printerSlice";
import routerSlice from "../features/routerDevice/routerSlice"
import serverSlice from "../features/serverDevice/serverSlice";
import switchSlice from "../features/switchDevice/switchSlice";
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
    application: applicationSlice,
    dashboard: dashboardSlice,
    cable: cablesSlice,
    switch: switchSlice,
    printer: printerSlice
})

export default reducer