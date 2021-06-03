import { useEffect, useState } from 'react';
import TableContainer from '../TableContainer';
import { Header, Links } from './postData';
import { DataAcceptWindow } from '../popWindows';
import { FormProvider, useForm } from 'react-hook-form';
import * as FormStyle from '../Styles/form.style';
import { Button } from '../Styles/common.style';
import { PortForm } from './portForm';
import * as TabStyle from '../Styles/tabs.style';
import { useParams } from 'react-router-dom';
import { Convert } from '../helpers/filterKeys';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServerPorts } from '../../features/serverDevice/serverSlice';
import {
    createPort,
    updatePort
} from '../../features/dashboard/dashboardSlice';
import {
    updateCable,
    fetchCable,
    fetchCablesWithFullInformation
} from '../../features/cables/cablesSlice';
import { fetchRouterPorts } from '../../features/routerDevice/routerSlice';
import { fetchSwitchPorts } from '../../features/switchDevice/switchSlice';
import PortTab, { PortProps } from '../../common/Tabs/portTab';

const PortComponent = ({ device }: any) => {
    const dispatch = useDispatch();
    const ports = useSelector((state: any) => state.server.serverPorts.data);
    const switchPorts = useSelector(
        (state: any) => state.switch.singleSwitch.data.switchPorts
    );
    const routerPorts = useSelector(
        (state: any) => state.router.singleRouter.data.routerPorts
    );
    const cableList = useSelector((state: any) => state.cable.cablePorts);

    const methods = useForm();
    const { id } = useParams<{ id: string }>();

    const [showPortForm, setshowPortForm] = useState<boolean>(false);
    const [displayDetail, setDisplayDetail] = useState<boolean>(false);
    const [PortDetails, setPortDetails] = useState<PortProps>({
        title: '',
        type: '',
        model: '',
        plug: '',
        speed: '',
        speedMeassure: '',
        cable: '',
        cableAddress: ''
    });
    const [editPort, setEditPort] = useState<{ show: boolean; id: number }>({
        show: false,
        id: 0
    });

    useEffect(() => {
        refreshPorts();
        dispatch(fetchCablesWithFullInformation());
    }, [dispatch]);

    const notEmpty = () => {
        switch (device) {
            case 'server':
                for (let i in ports) return true;
                return false;
            case 'router':
                for (let i in routerPorts) return true;
                return false;
            case 'switch':
                for (let i in switchPorts) return true;
                return false;
        }
    };

    const getData = (type: string) => {
        if (!notEmpty()) return [];

        switch (device) {
            case 'server':
                if (type === 'output') {
                    return ports.filter((x: any) => x.plug === 'output');
                }
                if (type === 'input')
                    return ports.filter((x: any) => x.plug === 'input');
                break;
            case 'switch':
                if (type === 'output')
                    return switchPorts.filter((x: any) => x.plug === 'output');
                if (type === 'input')
                    return switchPorts.filter((x: any) => x.plug === 'input');
                break;
            case 'router':
                if (type === 'output')
                    return routerPorts.filter((x: any) => x.plug === 'output');
                if (type === 'input')
                    return routerPorts.filter((x: any) => x.plug === 'input');
                break;
            default:
                break;
        }
    };

    const setDetailPortToFalse = () => {
        setEditPort({ ...editPort, show: false });
    };

    const toggleSetPort = (id: number) => {
        setEditPort({ show: !editPort.show, id });
        toggleShowForm();
    };

    const toggleShowForm = () => {
        setshowPortForm((showPortForm) => !showPortForm);
        methods.reset();
    };

    const onSubmit = async (data: any) => {
        const temp: any = await dispatch(fetchCable(data.cable));
        let deviceName: string = '';

        switch (device) {
            case 'server':
                deviceName = 'serverDeviceId';
                break;
            case 'router':
                deviceName = 'routerDeviceId';
                break;
            case 'switch':
                deviceName = 'switchDeviceId';
                break;
            default:
                break;
        }

        if (!editPort.show) {
            data[deviceName] = id;
            await dispatch(createPort(data));
        } else {
            data['id'] = editPort.id;
            data[deviceName] = id;

            await dispatch(updatePort(data));

            const cable: any = { ...temp.payload };

            switch (data.plug) {
                case 'input':
                    cable.startPortId = editPort.id;
                    break;
                case 'output':
                    cable.endPortId = editPort.id;
                    break;
            }
            await dispatch(updateCable(cable));
        }

        refreshPorts();

        await dispatch(fetchCablesWithFullInformation());
        setEditPort({ ...editPort, show: false });
        toggleShowForm();
    };

    const refreshPorts = async () => {
        switch (device) {
            case 'server':
                await dispatch(fetchServerPorts(id));
                break;
            case 'router':
                await dispatch(fetchRouterPorts(id));
                break;
            case 'switch':
                await dispatch(fetchSwitchPorts(id));
                break;
            default:
                break;
        }
    };

    const fetchData = () => {
        switch (device) {
            case 'server':
                return dispatch(fetchServerPorts(id));
            case 'router':
                return dispatch(fetchRouterPorts(id));
            case 'switch':
                return dispatch(fetchSwitchPorts(id));
        }
    }

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    const getPort = (id: number) => {
        switch (device) {
            case 'server':
                if (ports) {
                    const value = ports.find((x: any) => x.id === id);
                    return value;
                }
                break;
            case 'router':
                if (routerPorts) {
                    const value = routerPorts.find((x: any) => x.id === id);
                    return value;
                }
                break;
            case 'switch':
                if (switchPorts) {
                    const value = switchPorts.find((x: any) => x.id === id);
                    return value;
                }
                break;
        }

        return [];
    };

    function filter([key, _]: any) {
        return (
            key !== 'plug' &&
            key !== 'speed' &&
            key !== 'speedMeassure' &&
            key !== 'description' &&
            key !== 'serverDeviceId' &&
            key !== 'routerDeviceId' &&
            key !== 'switchDeviceId'
        );
    }

    const toggleDetailView = () => {
        setDisplayDetail((displayDetail) => !displayDetail);
    };

    const removeActivasionFunction = async (portId: number) => {
        const currentPort = getPort(portId);
        let type = currentPort.plug;

        switch (type) {
            case 'output':
                cableList.data.forEach(async (x: any) => {
                    if (x.endPortId === currentPort.id) {
                        let cable = { ...x };
                        cable.endPortId = null;
                        await dispatch(updateCable(cable));
                        return;
                    }
                });
                break;
            case 'input':
                cableList.data.forEach(async (x: any) => {
                    if (x.startPortId === currentPort.id) {
                        let cable = { ...x };
                        cable.startPortId = null;
                        await dispatch(updateCable(cable));
                        return;
                    }
                });
                break;
        }

        await refreshPorts();

        await dispatch(fetchCablesWithFullInformation());
    };

    const detailActivasionFunction = async (id: number) => {
        toggleDetailView();
        const currentPort = getPort(id);
        let type = currentPort.plug;
        let cableId: any;
        let cableTitle: any;

        switch (type) {
            case 'output':
                cableList.data.forEach((x: any) => {
                    if (x.endPortId === currentPort.id) {
                        cableId = x.id;
                        cableTitle = x.general.title;
                        return;
                    }
                });
                break;
            case 'input':
                cableList.data.forEach((x: any) => {
                    if (x.startPortId === currentPort.id) {
                        cableId = x.id;
                        cableTitle = x.general.title;
                        return;
                    }
                });
                break;
        }
        setPortDetails((PortDetails) => ({
            ...PortDetails,
            ...currentPort,
            cable: cableTitle,
            cableAddress: cableId
        }));
    };

    return (
        <>
            {displayDetail && (
                <DataAcceptWindow>
                    <PortTab {...PortDetails} />
                    <Button
                        type='button'
                        onClick={toggleDetailView}
                        margin='-30px 0 0 -330px'
                        width='70px'
                        height='35px'
                        background>
                        Close
                    </Button>
                </DataAcceptWindow>
            )}
            {showPortForm && (
                <DataAcceptWindow>
                    <FormProvider {...methods}>
                        <form
                            autoComplete='off'
                            onKeyDown={(e) => checkKeyDown(e)}
                            onSubmit={methods.handleSubmit(onSubmit)}>
                            {editPort.show ? (
                                <PortForm props={getPort(editPort.id)} />
                            ) : (
                                <PortForm />
                            )}

                            <FormStyle.FormSpacingButtons>
                                <FormStyle.TableConfirmationButton
                                    primary={'primary'}
                                    type='submit'>
                                    Submit
                                </FormStyle.TableConfirmationButton>
                                <FormStyle.TableConfirmationButton
                                    onClick={() => {
                                        toggleShowForm();
                                        setDetailPortToFalse();
                                    }}
                                    primary={''}>
                                    Cancel
                                </FormStyle.TableConfirmationButton>
                            </FormStyle.FormSpacingButtons>
                        </form>
                    </FormProvider>
                </DataAcceptWindow>
            )}
            <Button
                height={'25px'}
                width={'100px'}
                margin={'20px 0 0 30px'}
                background
                onClick={toggleShowForm}>
                Add port
            </Button>
            <TabStyle.Container>
                <TabStyle.ContentLayout width={'50%'}>
                    <TabStyle.ContentName>Input</TabStyle.ContentName>
                    <TabStyle.TableFlow>
                        <TableContainer
                            width={'100%'}
                            tableLinks={Links}
                            tableHeader={Header}
                            tableButtons={false}
                            tableNameActive={false}
                            tableList={Convert(getData('input'), filter)}
                            addActivasionFunction={toggleSetPort}
                            displayEdit={false}
                            displayAdd={true}
                            displayRemove={true}
                            removePadding
                            showCheckBox={true}
                            removeActivasionFunction={removeActivasionFunction}
                            detailsActivasionFunction={detailActivasionFunction}
                            fetchData={fetchData}
                        />
                    </TabStyle.TableFlow>
                </TabStyle.ContentLayout>
                <TabStyle.ContentLayout width={'50%'}>
                    <TabStyle.ContentName>Output</TabStyle.ContentName>
                    <TabStyle.TableFlow>
                        <TableContainer
                            width={'100%'}
                            tableNameActive={false}
                            tableButtons={false}
                            tableLinks={Links}
                            tableHeader={Header}
                            showCheckBox={true}
                            displayEdit={false}
                            addActivasionFunction={toggleSetPort}
                            displayAdd={true}
                            displayRemove={true}
                            removePadding
                            removeActivasionFunction={removeActivasionFunction}
                            detailsActivasionFunction={detailActivasionFunction}
                            tableList={Convert(getData('output'), filter)}
                            fetchData={fetchData}
                        />
                    </TabStyle.TableFlow>
                </TabStyle.ContentLayout>
            </TabStyle.Container>
        </>
    );
};

export default PortComponent;
