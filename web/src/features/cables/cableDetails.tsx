import { useEffect } from 'react';
import GeneralTab from '../../common/Tabs/generalTab';
import TabPane from '../../common/Tabs/tabPane';
import Tabs from '../../common/Tabs/tabs';
import CableTab from '../../common/Tabs/cableTab';
import { fetchCable } from './cablesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CablePortTab from '../../common/Tabs/cablePortTab'

const CableDetails = () => {
    const dispatch = useDispatch();
    const singleCable = useSelector((state: any) => state.cable.singleCable);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchCable(id));
    }, [dispatch, id]);

    return (
        <>
            {singleCable.status === 'completed' && singleCable.data && (
                <div className='container'>
                    <Tabs>
                        <TabPane name='General' key='1'>
                            {singleCable.status === 'completed' && (
                                <GeneralTab {...singleCable.data.general} />
                            )}
                        </TabPane>
                        <TabPane name='Cable' key='2'>
                            {singleCable.status === 'completed' && (
                                <CableTab {...singleCable.data} />
                            )}
                        </TabPane>
                        <TabPane name='Ports' key='2'>
                            {singleCable.status === 'completed' && (
                                <CablePortTab {...singleCable.data} />
                            )}
                        </TabPane>
                    </Tabs>
                </div>
            )}
        </>
    );
};

export default CableDetails;
