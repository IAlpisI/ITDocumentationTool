import { useEffect } from 'react';
import GeneralTab from '../../common/Tabs/generalTab';
import TabPane from '../../common/Tabs/tabPane';
import Tabs from '../../common/Tabs/tabs';
import FormFactor from '../../common/Tabs/formFactorTab';
import { fetchServer } from './serverSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ApplicationTab from '../../common/Tabs/applicationTab';
import MemoryList from '../../common/memoryComponent/memorList';
import PortComponent from '../../common/portComponent/port';
import CPUList from '../../common/cpuComponent/cpuList'
import PowerConsumerList from '../../common/powerConsumerComponent/powerConsumerList';
import HostAddressTab from '../../common/Tabs/hostAddressTab';

const ServerDetails = () => {
    const dispatch = useDispatch();
    const server = useSelector((state: any) => state.server.singleServer);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchServer(id));
    }, [dispatch, id]);

    return (
        <>
            {server.status === 'completed' && server.data && (
                <div className='container'>
                    <Tabs>
                        <TabPane name='General' key='1'>
                            <GeneralTab {...server.data.general} />
                        </TabPane>
                        <TabPane name='Form factor' key='2'>
                            <FormFactor {...server.data.formFactor} />
                        </TabPane>
                        <TabPane name='Application' key='3'>
                            <ApplicationTab device='server' />
                        </TabPane>
                        <TabPane name='Power consumer' key='4'>
                            <PowerConsumerList powerConsumerList={server.data.powerConsumer} />
                        </TabPane>
                        <TabPane name='Host address' key='5'>
                            <HostAddressTab {...server.data.hostAddress} />
                        </TabPane>
                        <TabPane name='Memory' key='6'>
                            <MemoryList memoryList={server.data.memory} />
                        </TabPane>
                        <TabPane name='CPU' key='7'>
                            <CPUList CPUlist={server.data.cpu} />
                        </TabPane>
                        <TabPane name='Ports' key='8'>
                            <PortComponent device='server' />
                        </TabPane>
                    </Tabs>
                </div>
            )}
        </>
    );
};

export default ServerDetails;
