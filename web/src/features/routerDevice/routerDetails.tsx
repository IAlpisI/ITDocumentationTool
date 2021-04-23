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
    const worker = useSelector((state: any) => state.worker.workerList);
    const {id} = useParams<{id:string}>();

    useEffect(() => {
        dispatch(fetchRouter(id));
    }, [dispatch, id]);

    return (
        <div className='container'>
            <Tabs>
                <TabPane name='General' key='1'>
                    {worker.status === 'completed' && (
                        <GeneralTab {...worker.data.general} />
                    )}
                </TabPane>
                <TabPane name='Forma factor' key='2'>
                    {worker.status === 'completed' && (
                        <PowerConsumerTab {...worker.data.powerconsumer} />
                    )}
                </TabPane>
                <TabPane name='Forma factor' key='2'>
                    {worker.status === 'completed' && (
                        <RouterTab {...worker.data} />
                    )}
                </TabPane>
                <TabPane name='Power consumer' key='2'>
                    {worker.status === 'completed' && (
                        <FormFactorTab {...worker.data.formfactor} />
                    )}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default RouterDetails;
