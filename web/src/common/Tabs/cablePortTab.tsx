import { useDispatch, useSelector } from 'react-redux';
import * as Module from '../Styles/detail.style';
import { fetchPort } from '../../features/dashboard/dashboardSlice';
import { ObjectLinkName } from '../Styles/detail.style';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

export type GeneralProps = {
    title?: string;
    purpose?: string;
    status?: string;
    tag?: Array<string>;
    description?: string;
};

const CablePortTab = ({ startPortId, endPortId }: any) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let [endPort, setEndPort] = useState<any>(null);
    let [startPort, setStartPort] = useState<any>(null);

    useEffect(() => {
        async function fetch() {
            let temp: any;
            if (endPortId !== null) {
                temp = await dispatch(fetchPort(endPortId));
                setEndPort(temp.payload);
            }
            if (startPortId !== null) {
                temp = await dispatch(fetchPort(startPortId));
                setStartPort(temp.payload);
            }
        }
        fetch();
    }, [dispatch, endPortId]);

    const getPort = (port: string) => {
        let temp:any;
        let tempPort:any;

        switch (port) {
            case 'start':
                if (startPortId === null) return '-';
                temp = getDevice(startPort)
                tempPort = startPort;
                break;
            case 'end':
                if (endPortId === null) return '-';
                temp = getDevice(endPort)
                tempPort = endPort;
                break;
            default:
                return '-';
        }

        console.log(endPort);

        switch (temp) {
            case 'server':
                return (
                    <ObjectLinkName
                        onClick={() => {
                            goToAddress('server', tempPort.serverDeviceId);
                        }}>
                        {'server'}
                    </ObjectLinkName>
                );
            case 'router':
                return (
                    <ObjectLinkName
                        onClick={() => {
                            goToAddress('router',  tempPort.routerDeviceId);
                        }}>
                        {'router'}
                    </ObjectLinkName>
                );
            case 'switch':
                return (
                    <ObjectLinkName
                        onClick={() => {
                            goToAddress('switch',  tempPort.switchDeviceId);
                        }}>
                        {'switch'}
                    </ObjectLinkName>
                );
            default:
                return '-';
        }
    };

    const getDevice = (singlePort: any) => {
        if(singlePort === null) return '-'
        if (singlePort.serverDeviceId !== null) return 'server';
        if (singlePort.routerDeviceId !== null) return 'router';
        if (singlePort.switchDeviceId !== null) return 'switch';
    };

    const goToAddress = (address: string, id: any) => {
        history.push(`/${address}/detail/${id}`);
    };

    return (
        <Module.Container>
            <Module.ComponentName>Ports</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Start port:</Module.ObjectName>
                <Module.ObjectData>{getPort('start')}</Module.ObjectData>
                <Module.ObjectName>End port:</Module.ObjectName>
                <Module.ObjectData>{getPort('end')}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default CablePortTab;
