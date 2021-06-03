import { useEffect } from 'react';
import GeneralTab from '../../common/Tabs/generalTab';
import TabPane from '../../common/Tabs/tabPane';
import Tabs from '../../common/Tabs/tabs';
import PowerConsumerTab from '../../common/Tabs/powerConsumerTab';
import FormFactorTab from '../../common/Tabs/formFactorTab';
import RouterTab from '../../common/Tabs/routerTab';
import { fetchRouter } from './routerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NetworkList from '../../common/hostAddress/networkList';
import PortComponent from '../../common/portComponent/port';

const RouterDetails = () => {
    const dispatch = useDispatch();
    const router = useSelector((state: any) => state.router.singleRouter);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchRouter(id));
    }, [dispatch]);

    return (
        <>
            {router.status === 'completed' && router.data && (
                <div className='container'>
                    <Tabs>
                        <TabPane name='General' key='1'>
                            <GeneralTab {...router.data.general} />
                        </TabPane>
                        <TabPane name='Router' key='2'>
                            <RouterTab {...router.data} />
                        </TabPane>
                        <TabPane name='Power consumer' key='3'>
                            <PowerConsumerTab {...router.data.powerConsumer} />
                        </TabPane>
                        <TabPane name='Networks' key='4'>
                            <NetworkList
                                networkList={router.data.layerThreeNetworks}
                            />
                        </TabPane>
                        <TabPane name='Form factor' key='5'>
                            <FormFactorTab {...router.data.formFactor} />
                        </TabPane>
                        <TabPane name='Ports' key='8'>
                            <PortComponent device='router' />
                        </TabPane>
                    </Tabs>
                </div>
            )}{' '}
        </>
    );
};

export default RouterDetails;
