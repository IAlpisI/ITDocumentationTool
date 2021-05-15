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

const RouterDetails = () => {
    const dispatch = useDispatch();
    const router = useSelector((state: any) => state.router.singleRouter);
    const {id} = useParams<{id:string}>();

    useEffect(() => {
        dispatch(fetchRouter(id));
    }, [dispatch, id]);

    return (
        <div className='container'>
            <Tabs>
                <TabPane name='General' key='1'>
                    {router.status === 'completed' && (
                        <GeneralTab {...router.data.general} />
                    )}
                </TabPane>
                <TabPane name='Router' key='2'>
                    {router.status === 'completed' && (
                        <RouterTab {...router.data} />
                    )}
                </TabPane>
                <TabPane name='Forma factor' key='3'>
                    {router.status === 'completed' && (
                        <PowerConsumerTab {...router.data.powerconsumer} />
                    )}
                </TabPane>
                <TabPane name='Forma factor' key='4'>
                    {router.status === 'completed' && (
                        <RouterTab {...router.data} />
                    )}
                </TabPane>
                <TabPane name='Power consumer' key='5'>
                    {router.status === 'completed' && (
                        <FormFactorTab {...router.data.formfactor} />
                    )}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default RouterDetails;
