import Tree from 'react-d3-tree';
import 'react-tree-graph/dist/style.css';
import * as Module from './network.style';
import {
    SvgComputer,
    SvgRouter,
    SvgInternet,
    SvgPrinter,
    SvgServer,
    SvgSwitch
} from './svgs';
import { useEffect, useState } from 'react';
import { useCenteredContainer } from '../../common/helpers/centerContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRouters } from '../routerDevice/routerSlice';
import { fetchSwitches } from '../switchDevice/switchSlice';
import { fetchLayerThreeNetworks } from '../layerThreeNetwork/layerThreeNetworkSlice';
import { fetchAllHostAddresses } from '../dashboard/dashboardSlice';
import { fetchClients } from '../clientPc/clientPcSlice';
import { fetchPrinters } from '../printer/printerSlice';
import { fetchServers } from '../serverDevice/serverSlice';
import { useHistory } from 'react-router-dom';

const NetworkIndex = () => {
    const [device, setDevice] = useState<{
        id: any;
        title: any;
        ipaddress: any;
        prefix: any;
        link: any;
    }>({
        id: '',
        title: '',
        ipaddress: '',
        prefix: '',
        link: ''
    });

    let history = useHistory();
    const [translate, containerRef] = useCenteredContainer();
    const dispatch = useDispatch();
    const nodeSize = { x: 200, y: 200 };

    const routerList = useSelector((state: any) => state.router.routerList);
    const switchList = useSelector((state: any) => state.switch.switchList);
    const layerThreeNetwork = useSelector(
        (state: any) => state.layerThreeNetwork.layerThreeNetworkList
    );
    const hostAddressList = useSelector(
        (state: any) => state.dashboard.allHostAddressList.data
    );
    const clientList = useSelector(
        (state: any) => state.client.clientList.data
    );
    const printerList = useSelector(
        (state: any) => state.printer.printerList.data
    );
    const serverList = useSelector(
        (state: any) => state.server.serverList.data
    );
    const updateDevice = (
        id: any,
        title: any,
        ipaddress: any,
        link: any,
        prefix: any
    ) => {
        setDevice({
            id,
            title,
            ipaddress,
            prefix,
            link
        });
    };

    let networkChart: any = { name: 'internet', children: [] };

    useEffect(() => {
        dispatch(fetchLayerThreeNetworks());
        dispatch(fetchSwitches());
        dispatch(fetchRouters());
        dispatch(fetchAllHostAddresses());
        dispatch(fetchClients());
        dispatch(fetchPrinters());
        dispatch(fetchServers());
    }, [dispatch]);

    const GenerateTree = () => {
        let routerSet = new Set();
        let routers: any = [];
        let init: any = [];
        let switches: any = [];

        layerThreeNetwork.data.forEach((x: any, index: number) => {
            routerSet.add(x.routerDeviceId);
        });

        const routerIterator = routerSet.values();

        for (const entry of routerIterator) {
            routerList.data.forEach((router: any) => {
                if (router.id === entry) {
                    routers.push(router.id);
                    init.push({
                        name: 'Router',
                        link: '/router/detail',
                        id: entry,
                        children: []
                    });
                }
            });
        }
        networkChart.children = init;

        routers.forEach((router: any) => {
            layerThreeNetwork.data.forEach((network: any) => {
                if (router === network.routerDeviceId) {
                    hostAddressList.forEach((host: any) => {
                        if (
                            host.networkId === network.id &&
                            host.switchDeviceId !== null
                        ) {
                            switches.push({
                                name: 'Switch',
                                routerId: router,
                                link: '/switch/detail',
                                id: `${host.switchDeviceId}`,
                                networkId: network.id,
                                prefix: network.prefix,
                                ipaddress: host.address,
                                children: []
                            });
                        }
                    });
                }
            });
        });

        switches.forEach((switchDevice: any) => {
            hostAddressList.forEach((host: any) => {
                if (
                    host.clientPcId !== null &&
                    host.networkId === switchDevice.networkId
                ) {
                    let prefix = layerThreeNetwork.data.find(
                        (x: any) => x.id === host.networkId
                    ).prefix;
                    switchDevice.children.push({
                        name: 'Pc',
                        id: host.clientPcId,
                        ipaddress: host.address,
                        prefix,
                        link: '/client/detail'
                    });
                }
                if (
                    host.serverDeviceId !== null &&
                    host.networkId === switchDevice.networkId
                ) {
                    let prefix = layerThreeNetwork.data.find(
                        (x: any) => x.id === host.networkId
                    ).prefix;
                    switchDevice.children.push({
                        name: 'Server',
                        id: host.serverDeviceId,
                        ipaddress: host.address,
                        prefix,
                        link: '/server/detail'
                    });
                }
                if (
                    host.printerId !== null &&
                    host.networkId === switchDevice.networkId
                ) {
                    let prefix = layerThreeNetwork.data.find(
                        (x: any) => x.id === host.networkId
                    ).prefix;
                    switchDevice.children.push({
                        name: 'Printer',
                        id: host.printerId,
                        ipaddress: host.address,
                        prefix,
                        link: '/printer/detail'
                    });
                }
            });
        });

        networkChart.children.forEach((router: any) => {
            if (router.name === 'Router') {
                switches.forEach((switchDevice: any) => {
                    if (switchDevice.routerId === router.id) {
                        console.log(router);
                        router.children.push(switchDevice);
                    }
                });
            }
        });

        return true;
    };

    const SvgSelector = (device: string) => {
        switch (device) {
            case 'Switch':
                return <SvgSwitch />;
            case 'Router':
                return <SvgRouter />;
            case 'Pc':
                return <SvgComputer />;
            case 'Server':
                return <SvgServer />;
            case 'Printer':
                return <SvgPrinter />;
            case 'Internet':
                return <SvgInternet />;
            default:
                return <SvgInternet />;
        }
    };

    const renderRectSvgNode = ({ nodeDatum, toggleNode }: any) => (
        <g
            onClick={() => {
                updateDevice(
                    nodeDatum?.id,
                    nodeDatum?.name,
                    nodeDatum?.ipaddress,
                    nodeDatum?.link,
                    nodeDatum?.prefix
                );
            }}>
            <rect width='20' height='20' fill='none' stroke='none' x='-100' />

            <foreignObject y='60' x='-80' width='150' height='200'>
                <Module.LabelContainer>
                    <Module.Label>{nodeDatum?.name}</Module.Label>
                    {nodeDatum?.ipaddress && (
                        <Module.Label>{nodeDatum?.ipaddress}</Module.Label>
                    )}
                </Module.LabelContainer>
            </foreignObject>
            {SvgSelector(nodeDatum?.name)}
        </g>
    );

    return (
        <>
            <Module.DiagramName>Network diagram</Module.DiagramName>
            <Module.DiagramContainer>
                <Module.NetworkDiagram>
                    <Module.Container ref={containerRef}>
                        {GenerateTree() && (
                            <Tree
                                translate={translate}
                                data={networkChart}
                                nodeSize={nodeSize}
                                orientation='vertical'
                                collapsible={false}
                                renderCustomNodeElement={renderRectSvgNode}
                            />
                        )}
                    </Module.Container>
                </Module.NetworkDiagram>
                <Module.NetworkInformationConatainer>
                    <Module.DisplayInfo>
                        <Module.DisplayInfoName>
                            Node information
                        </Module.DisplayInfoName>
                        <Module.DisplayInforLabel>
                            Title:
                        </Module.DisplayInforLabel>
                        <Module.DisplayInfoValue>
                            {device.title && device.title}
                        </Module.DisplayInfoValue>
                        <Module.DisplayInforLabel>
                            IP address:
                        </Module.DisplayInforLabel>
                        <Module.DisplayInfoValue>
                            {device.ipaddress && device.ipaddress}
                        </Module.DisplayInfoValue>
                        <Module.DisplayInforLabel>
                            Prefix:
                        </Module.DisplayInforLabel>
                        <Module.DisplayInfoValue>
                            {device.prefix && device.prefix}
                        </Module.DisplayInfoValue>

                        {device.link && (
                            <Module.Button
                                onClick={() => {
                                    history.push(`${device.link}/${device.id}`);
                                }}>
                                View device
                            </Module.Button>
                        )}
                        <Module.DisplayInfoValue></Module.DisplayInfoValue>
                    </Module.DisplayInfo>
                </Module.NetworkInformationConatainer>
            </Module.DiagramContainer>
        </>
    );
};

export default NetworkIndex;
