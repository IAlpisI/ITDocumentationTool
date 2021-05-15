import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrinters } from './printerSlice';
import { Header, Links } from './printerData';
import TableContainer from '../../common/TableContainer';

function PrinterIndex() {
    const dispatch = useDispatch();
    const printerList = useSelector((state: any) => state.printer.printerList);

    useEffect(() => {
        dispatch(fetchPrinters());
    }, [dispatch]);

    return (
        <TableContainer
            fetchData={fetchPrinters}
            tableList={printerList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Printers'}
            buttonName={'printer'}
        />
    );
}

export default PrinterIndex;
