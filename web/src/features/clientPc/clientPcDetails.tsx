import { useEffect } from 'react';
import GeneralTab from '../../common/Tabs/generalTab';
import TabPane from '../../common/Tabs/tabPane';
import Tabs from '../../common/Tabs/tabs';
import MemoryTab from '../../common/Tabs/memoryTab';
import CPUTab from '../../common/Tabs/cpuTab';
import PowerConsumer from '../../common/Tabs/powerConsumerTab';
import { fetchClient } from './clientPcSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ApplicationTab from '../../common/Tabs/applicationTab';
import HostAddressTAb from '../../common/Tabs/hostAddressTab'

const ClientDetails = () => {
    const dispatch = useDispatch();
    const client = useSelector((state: any) => state.client.singleClient);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchClient(id));
    }, [dispatch, id]);

    return (
        <div className='container'>
            <Tabs>
                <TabPane name='General' key='1'>
                    {client.status === 'completed' && (
                        <GeneralTab {...client.data.general} />
                    )}
                </TabPane>
                <TabPane name='Memory' key='2'>
                    {client.status === 'completed' && (
                        <MemoryTab {...client.data.memory} />
                    )}
                </TabPane>
                <TabPane name='CPU' key='3'>
                    {client.status === 'completed' && (
                        <CPUTab {...client.data.cpu} />
                    )}
                </TabPane>
                <TabPane name='Power consumer' key='4'>
                    {client.status === 'completed' && (
                        <PowerConsumer {...client.data.powerConsumer} />
                    )}
                </TabPane>
                <TabPane name='Host address' key='4'>
                    {client.status === 'completed' && (
                        <HostAddressTAb {...client.data.hostAddress} />
                    )}
                </TabPane>
                <TabPane name='Application' key='5'>
                    {client.status === 'completed' && (
                        <ApplicationTab {...client.data.application} />
                    )}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ClientDetails;
