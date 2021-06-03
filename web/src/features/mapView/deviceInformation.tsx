import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../app/store';
import { fetchClient } from '../clientPc/clientPcSlice';
import * as Module from '../networkDiagram/network.style';
import { useHistory } from 'react-router-dom';
import { Button } from '../../common/Styles/common.style';
import { fetchPrinter } from '../printer/printerSlice';
import { fetchRouter } from '../routerDevice/routerSlice';
import { fetchServer } from '../serverDevice/serverSlice';
import { fetchSwitch } from '../switchDevice/switchSlice';

export const DeviceInformation = (props: any) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const selectedShape = useSelector(
        (state: any) => state.canvas.selectedShape
    );

    const clientDevice: any = useSelector(
        (state: any) => state.client.singleClient
    );
    const printer: any = useSelector(
        (state: any) => state.printer.singlePrinter
    );
    const routerDevice: any = useSelector(
        (state: any) => state.router.singleRouter
    );
    const serverDevice: any = useSelector(
        (state: any) => state.server.singleServer
    );
    const switchDevice = useSelector((state: any) => state.switch.singleSwitch);

    const getSelector = useCallback(
        () => store.getState().canvas.selectedShape,
        []
    );

    getSelector();

    useEffect(() => {
        getDevice();
    }, [selectedShape]);

    console.log(selectedShape);

    const getDevice = async () => {
        if (selectedShape.type === 'computer') {
            await dispatch(fetchClient(selectedShape.deviceId));
        }
        if (selectedShape.type === 'printer') {
            await dispatch(fetchPrinter(selectedShape.deviceId));
        }
        if (selectedShape.type === 'router') {
            await dispatch(fetchRouter(selectedShape.deviceId));
        }
        if (selectedShape.type === 'server') {
            await dispatch(fetchServer(selectedShape.deviceId));
        }
        if (selectedShape.type === 'switch') {
            await dispatch(fetchSwitch(selectedShape.deviceId));
        }
    };

    console.log(selectedShape);

    return (
        <>
            <Module.NetworkInformationConatainer>
                <Module.DisplayInfo>
                    <Module.DisplayInfoName>
                        Device information
                    </Module.DisplayInfoName>
                    <Module.DisplayInforLabel>Title:</Module.DisplayInforLabel>
                    <Module.DisplayInfoValue>
                        {clientDevice.status === 'completed' &&
                            selectedShape.type === 'computer' &&
                            clientDevice.data.general.title}

                        {printer.status === 'completed' &&
                            selectedShape.type === 'printer' &&
                            printer.data.general.title}

                        {routerDevice.status === 'completed' &&
                            selectedShape.type === 'router' &&
                            routerDevice.data.general.title}

                        {serverDevice.status === 'completed' &&
                            selectedShape.type === 'server' &&
                            serverDevice.data.general.title}

                        {switchDevice.status === 'completed' &&
                            selectedShape.type === 'switch' &&
                            switchDevice.data.general.title}
                    </Module.DisplayInfoValue>
                    <Module.DisplayInforLabel>Status:</Module.DisplayInforLabel>
                    <Module.DisplayInfoValue>
                        {clientDevice.status === 'completed' &&
                            selectedShape.type === 'computer' &&
                            clientDevice.data.general.status}

                        {printer.status === 'completed' &&
                            selectedShape.type === 'printer' &&
                            printer.data.general.status}

                        {routerDevice.status === 'completed' &&
                            selectedShape.type === 'router' &&
                            routerDevice.data.general.status}

                        {serverDevice.status === 'completed' &&
                            selectedShape.type === 'server' &&
                            serverDevice.data.general.status}

                        {switchDevice.status === 'completed' &&
                            selectedShape.type === 'switch' &&
                            switchDevice.data.general.status}
                    </Module.DisplayInfoValue>
                    <Module.DisplayInforLabel>
                        Purpose:
                    </Module.DisplayInforLabel>
                    <Module.DisplayInfoValue>
                        {clientDevice.status === 'completed' &&
                            selectedShape.type === 'computer' &&
                            clientDevice.data.general.purpose}

                        {printer.status === 'completed' &&
                            selectedShape.type === 'printer' &&
                            printer.data.general.purpose}

                        {routerDevice.status === 'completed' &&
                            selectedShape.type === 'router' &&
                            routerDevice.data.general.purpose}

                        {serverDevice.status === 'completed' &&
                            selectedShape.type === 'server' &&
                            serverDevice.data.general.purpose}

                        {switchDevice.status === 'completed' &&
                            selectedShape.type === 'switch' &&
                            switchDevice.data.general.purpose}
                    </Module.DisplayInfoValue>

                    {clientDevice.status === 'completed' &&
                        selectedShape.type === 'computer' && (
                            <Module.Button
                                onClick={() => {
                                    history.push(
                                        `/client/detail/${clientDevice.data.id}`
                                    );
                                }}>
                                View device
                            </Module.Button>
                        )}

                    {printer.status === 'completed' &&
                        selectedShape.type === 'printer' && (
                            <Module.Button
                                onClick={() => {
                                    history.push(
                                        `/printer/detail/${printer.data.id}`
                                    );
                                }}>
                                View device
                            </Module.Button>
                        )}

                    {routerDevice.status === 'completed' &&
                        selectedShape.type === 'router' && (
                            <Module.Button
                                onClick={() => {
                                    history.push(
                                        `/router/detail/${routerDevice.data.id}`
                                    );
                                }}>
                                View device
                            </Module.Button>
                        )}

                    {serverDevice.status === 'completed' &&
                        selectedShape.type === 'server' && (
                            <Module.Button
                                onClick={() => {
                                    history.push(
                                        `/server/detail/${serverDevice.data.id}`
                                    );
                                }}>
                                View device
                            </Module.Button>
                        )}

                    {switchDevice.status === 'completed' &&
                        selectedShape.type === 'switch' && (
                            <Module.Button
                                onClick={() => {
                                    history.push(
                                        `/switch/detail/${switchDevice.data.id}`
                                    );
                                }}>
                                View device
                            </Module.Button>
                        )}

                    <Button
                        height='30px'
                        width='70px'
                        fontSize='12px'
                        background
                        type='button'
                        onClick={props.backToGallery}>
                        Back
                    </Button>
                </Module.DisplayInfo>
            </Module.NetworkInformationConatainer>
        </>
    );
};
