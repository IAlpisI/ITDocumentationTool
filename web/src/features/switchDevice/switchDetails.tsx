import { useEffect } from 'react';
import GeneralTab from '../../common/Tabs/generalTab';
import TabPane from '../../common/Tabs/tabPane';
import Tabs from '../../common/Tabs/tabs';
import FormFactor from '../../common/Tabs/formFactorTab';
import SwitchTab from '../../common/Tabs/switchTab';
import PowerConsumer from '../../common/Tabs/powerConsumerTab';
import { fetchSwitch } from './switchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PortComponent from '../../common/portComponent/port';

const SwitchDetails = () => {
    const dispatch = useDispatch();
    const switchDevice = useSelector((state: any) => state.switch.singleSwitch);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchSwitch(id));
    }, [dispatch, id]);

    return (
        <>
            {switchDevice.status === 'completed' && switchDevice.data && (
                <div className='container'>
                    <Tabs>
                        <TabPane name='General' key='1'>
                            <GeneralTab {...switchDevice.data.general} />
                        </TabPane>
                        <TabPane name='Switch' key='1'>
                            <SwitchTab {...switchDevice.data} />
                        </TabPane>
                        <TabPane name='Power consumer' key='2'>
                            <PowerConsumer
                                {...switchDevice.data.powerconsumer}
                            />
                        </TabPane>
                        <TabPane name='Form factor' key='2'>
                            <FormFactor {...switchDevice.data.formfactor} />
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

export default SwitchDetails;
