import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLayerThreeNetwork } from './layerThreeNetworkSlice';
import { IpHeader, Links } from './layerThreeNetworkData';
import TableContainer from '../../common/TableContainer';
import { Netmask } from 'netmask';
import { useParams } from 'react-router-dom';
import { fetchPrinters } from '../../features/printer/printerSlice';
import { fetchClients } from '../../features/clientPc/clientPcSlice';
import { fetchRouters } from '../../features/routerDevice/routerSlice';
import { fetchServers } from '../../features/serverDevice/serverSlice';
import { fetchSwitches } from '../../features/switchDevice/switchSlice';
import * as Module from './network.style';
import { DataAcceptWindow } from '../../common/popWindows';
import { useForm } from 'react-hook-form';
import {
    fetchHostAddresses,
    updateHostAddresses,
    createHostAddresses
} from '../../features/dashboard/dashboardSlice';

const LayerThreeNetworkDetail = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors }
    } = useForm();
    let ipAddresses: any = [];

    const { id } = useParams<{ id: string }>();
    const [menu, setMenu] = useState<boolean>(false);
    const [items, setItems] = useState<{
        printer: boolean;
        client: boolean;
        serverDevice: boolean;
        routerDevice: boolean;
        switchDevice: boolean;
    }>({
        printer: false,
        client: false,
        serverDevice: false,
        routerDevice: false,
        switchDevice: false
    });
    const [selected, setSelected] = useState<{
        device: string;
        title: string;
        id: number;
    }>({
        device: '',
        id: 0,
        title: ''
    });

    const layerThreeNetwork = useSelector(
        (state: any) => state.layerThreeNetwork.layerThreeNetwork
    );
    const printerList = useSelector((state: any) => state.printer.printerList);
    const clientList = useSelector((state: any) => state.client.clientList);
    const routerList = useSelector((state: any) => state.router.routerList);
    const serverList = useSelector((state: any) => state.server.serverList);
    const switchList = useSelector((state: any) => state.switch.switchList);
    const hostAddressList = useSelector(
        (state: any) => state.dashboard.hostAddressList
    );

    useEffect(() => {
        dispatch(fetchLayerThreeNetwork(id));
        dispatch(fetchPrinters());
        dispatch(fetchClients());
        dispatch(fetchServers());
        dispatch(fetchRouters());
        dispatch(fetchSwitches());
        dispatch(fetchHostAddresses(id));
    }, [dispatch, id]);

    const generateAddresses = () => {
        hostAddressList.data.forEach((x: any) => {
            ipAddresses.push({
                id: x.id,
                ip: x.address,
                test: getDeviceName(x)
            });
        });
    };

    const toggleMenu = () => {
        setMenu((menu) => !menu);
    };

    const getDeviceName = (x: any) => {
        if (x.clientPcId !== null) return 'client';
        if (x.printerId !== null) return 'printer';
        if (x.routerDeviceId !== null) return 'router';
        if (x.serverDeviceId !== null) return 'server';
        if (x.switchDeviceId !== null) return 'switch';

        return '-';
    };

    const onSubmit = async (data: any) => {
        console.log(data.ip);
        const address = `${layerThreeNetwork.data.netIp}/${layerThreeNetwork.data.prefix}`;
        const net = new Netmask(address);
        const networkId = id;
        let selector:any = {}
        let isPresent = false

        if (!net.contains(data.ip)) {
            setError('ip', {
                type: 'manual',
                message: 'Address is out of range'
            });
            return;
        }

        if (addressIsTaken(data.ip)) {
            setError('ip', {
                type: 'manual',
                message: 'Address is taken'
            });
            return;
        }

        let host = hostAddressList.data.find((x: any) => x.address === data.ip);

        let updatedHost = {          
            address: data.ip,
            networkId: networkId
        };

        switch (selected.device) {
            case 'printer':
                selector = {...updatedHost, printerId: selected.id}
                break;
            case 'client':
                selector = {...updatedHost, clientPcId: selected.id}
                break;
            case 'server':
                selector = {...updatedHost, serverDeviceId: selected.id}
                break;
            case 'router':
                selector = {...updatedHost, routerDeviceId: selected.id}
                break;
            case 'switch':
                selector = {...updatedHost, switchDeviceId: selected.id}
                break;
            default:
                break;
        }

        if (host === undefined) {
            await dispatch(createHostAddresses(selector));
        } else {
            selector.id = host.id
            await dispatch(updateHostAddresses(selector));
        }

        await dispatch(fetchHostAddresses(id));
        clearSelectedItems();
        clearSetItems();
        reset();
    };

    const addressIsTaken = (address: string) => {
        let isTaken = false;

        hostAddressList.data.forEach((x: any) => {
            if (address === x.address && getDeviceName(x) !== '-') {
                isTaken = true;
                return false;
            }
        });

        return isTaken;
    };

    const setSelectedObject = (device: string, id: number, title: string) => {
        setSelected({ device, id, title });
    };

    const clearSetItems = () => {
        setItems({
            printer: false,
            client: false,
            serverDevice: false,
            switchDevice: false,
            routerDevice: false
        });
    };

    const clearSelectedItems = () => {
        setSelected({
            device: '',
            id: 0,
            title: ''
        });
    };

    const toggleItems = (item: string) => {
        clearSetItems();

        switch (item) {
            case 'printer':
                setItems({ ...items, printer: !items.printer });
                break;
            case 'client':
                setItems({ ...items, client: !items.client });
                break;
            case 'server':
                setItems({ ...items, serverDevice: !items.serverDevice });
                break;
            case 'router':
                setItems({ ...items, routerDevice: !items.routerDevice });
                break;
            case 'switch':
                setItems({ ...items, switchDevice: !items.switchDevice });
                break;
            default:
                break;
        }
    };

    const detahcFromList = async (hostId: number) => {
        let host = hostAddressList.data.find((x: any) => x.id === hostId);
        if (host.id === undefined) return;

        const updatedHost = {
            id: host.id,
            address: host.address,
            networkId: id
        };

        switch (getDeviceName(host)) {
            case 'printer':
                await dispatch(
                    updateHostAddresses({ ...updatedHost, printerId: null })
                );
                break;
            case 'client':
                await dispatch(
                    updateHostAddresses({ ...updatedHost, clientPcId: null })
                );
                break;
            case 'server':
                await dispatch(
                    updateHostAddresses({
                        ...updatedHost,
                        serverDeviceId: null
                    })
                );
                break;
            case 'router':
                await dispatch(
                    updateHostAddresses({
                        ...updatedHost,
                        routerDeviceId: null
                    })
                );
                break;
            case 'switch':
                await dispatch(
                    updateHostAddresses({
                        ...updatedHost,
                        switchDeviceId: null
                    })
                );
                break;
            default:
                break;
        }
        await dispatch(fetchHostAddresses(id));
    };

    const getNetInformation = (parameter: String) => {
        const address = `${layerThreeNetwork.data.netIp}/${layerThreeNetwork.data.prefix}`;
        const net = new Netmask(address);

        switch (parameter) {
            case 'size':
                return net.size;
            case 'address':
                return net.base;
            case 'first':
                return net.first;
            case 'last':
                return net.last;
            case 'mask':
                return net.mask;
        }
    };

    return (
        layerThreeNetwork.data &&
        layerThreeNetwork.status === 'completed' && (
            <>
                {menu && (
                    <DataAcceptWindow>
                        <Module.Container>
                            <Module.Wrapper
                                onClick={() => {
                                    toggleItems('printer');
                                }}>
                                Printers
                            </Module.Wrapper>
                            {items.printer &&
                                printerList.data.map(
                                    (x: any, index: number) => (
                                        <Module.Item
                                            key={index}
                                            onClick={() => {
                                                toggleMenu();
                                                setSelectedObject(
                                                    'printer',
                                                    x.id,
                                                    x.title
                                                );
                                            }}>
                                            {x.title}
                                        </Module.Item>
                                    )
                                )}
                            <Module.Wrapper
                                onClick={() => {
                                    toggleItems('client');
                                }}>
                                Clients
                            </Module.Wrapper>
                            {items.client &&
                                clientList.data.map((x: any, index: number) => (
                                    <Module.Item
                                        key={index}
                                        onClick={() => {
                                            toggleMenu();
                                            setSelectedObject(
                                                'client',
                                                x.id,
                                                x.title
                                            );
                                        }}>
                                        {x.title}
                                    </Module.Item>
                                ))}
                            <Module.Wrapper
                                onClick={() => {
                                    toggleItems('router');
                                }}>
                                Routers
                            </Module.Wrapper>
                            {items.routerDevice &&
                                routerList.data.map((x: any, index: number) => (
                                    <Module.Item
                                        key={index}
                                        onClick={() => {
                                            toggleMenu();
                                            setSelectedObject(
                                                'router',
                                                x.id,
                                                x.title
                                            );
                                        }}>
                                        {x.title}
                                    </Module.Item>
                                ))}
                            <Module.Wrapper
                                onClick={() => {
                                    toggleItems('server');
                                }}>
                                Servers
                            </Module.Wrapper>
                            {items.serverDevice &&
                                serverList.data.map((x: any, index: number) => (
                                    <Module.Item
                                        key={index}
                                        onClick={() => {
                                            toggleMenu();
                                            setSelectedObject(
                                                'server',
                                                x.id,
                                                x.title
                                            );
                                        }}>
                                        {x.title}
                                    </Module.Item>
                                ))}
                            <Module.Wrapper
                                onClick={() => {
                                    toggleItems('switch');
                                }}>
                                Switches
                            </Module.Wrapper>
                            {items.switchDevice &&
                                switchList.data.map((x: any, index: number) => (
                                    <Module.Item
                                        key={index}
                                        onClick={() => {
                                            toggleMenu();
                                            setSelectedObject(
                                                'switch',
                                                x.id,
                                                x.title
                                            );
                                        }}>
                                        {x.title}
                                    </Module.Item>
                                ))}
                        </Module.Container>
                        <Module.CloseButton onClick={toggleMenu}>
                            Close
                        </Module.CloseButton>
                    </DataAcceptWindow>
                )}
                <Module.TableName>Ip list</Module.TableName>
                <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Module.IpAddressContainer>
                        <Module.IpAddressLabel>IP</Module.IpAddressLabel>
                        <Module.IpAddressInput
                            {...register('ip', { required: 'required' })}
                        />
                        {errors.ip && (
                            <Module.ErrorMessage role='alert'>
                                {errors.ip.message}
                            </Module.ErrorMessage>
                        )}
                        <Module.IpAddressLabel>Device</Module.IpAddressLabel>
                        <Module.IpAddressInput
                            {...register('device')}
                            disabled
                            value={`${selected.device} - ${selected.title}`}></Module.IpAddressInput>
                        {errors.device && (
                            <Module.ErrorMessage role='alert'>
                                {errors.device.message}
                            </Module.ErrorMessage>
                        )}
                        <Module.IpAddressSearchButton
                            type='button'
                            onClick={toggleMenu}>
                            Search
                        </Module.IpAddressSearchButton>
                        <Module.IpAddressSearchButton type='submit'>
                            Add
                        </Module.IpAddressSearchButton>
                    </Module.IpAddressContainer>
                </form>
                <Module.RowContainer>
                    {generateAddresses()}

                    {ipAddresses && (
                        <TableContainer
                            tableList={ipAddresses}
                            tableHeader={IpHeader}
                            tableLinks={Links}
                            tableButtons={false}
                            tableNameActive={false}
                            showPagination={false}
                            numberOfPages={256}
                            displayDelete={false}
                            displayEdit={false}
                            displayDetail={false}
                            displayRemove={true}
                            removeActivasionFunction={detahcFromList}
                        />
                    )}
                    <Module.NetworkInformation>
                        <Module.NetworkInformationName>
                            Network information
                        </Module.NetworkInformationName>
                        <Module.NetwokrInformationField>
                            {hostAddressList.status === 'completed' &&
                                `${getNetInformation('size') ||
                                    0 - layerThreeNetwork.data.length
                                } addresses free`}
                        </Module.NetwokrInformationField>
                        <Module.NetwokrInformationField>
                            Net Address: {getNetInformation('address')}
                        </Module.NetwokrInformationField>
                        <Module.NetwokrInformationField>
                            {`Netmask: ${getNetInformation('mask')}(/${
                                layerThreeNetwork.data.prefix
                            })`}
                        </Module.NetwokrInformationField>
                        <Module.NetwokrInformationField>
                            {`Address range: ${getNetInformation(
                                'first'
                            )} - ${getNetInformation('last')}`}
                        </Module.NetwokrInformationField>
                    </Module.NetworkInformation>
                </Module.RowContainer>
            </>
        )
    );
};

export default LayerThreeNetworkDetail;
