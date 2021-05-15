import { useEffect } from 'react';
import GeneralTab from '../../common/Tabs/generalTab';
import TabPane from '../../common/Tabs/tabPane';
import Tabs from '../../common/Tabs/tabs';
import PrinterTab from '../../common/Tabs/printerTab';
import { fetchPrinter } from './printerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HostAddressTab from '../../common/Tabs/hostAddressTab';

const PrinterDetails = () => {
    const dispatch = useDispatch();
    const printer = useSelector((state: any) => state.printer.singlePrinter);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(fetchPrinter(id));
    }, [dispatch, id]);

    return (
        <div className='container'>
            <Tabs>
                <TabPane name='General' key='1'>
                    {printer.status === 'completed' && (
                        <GeneralTab {...printer.data.general} />
                    )}
                </TabPane>
                <TabPane name='Host address' key='3'>
                    {printer.status === 'completed' && (
                        <HostAddressTab {...printer.data.hostaddress} />
                    )}
                </TabPane>
                <TabPane name='Printer' key='2'>
                    {printer.status === 'completed' && (
                        <PrinterTab {...printer.data} />
                    )}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default PrinterDetails;
