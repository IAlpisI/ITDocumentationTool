import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrinters, exportAllPrinters } from './printerSlice';
import { Header, Links } from './printerData';
import TableContainer from '../../common/TableContainer';
import {printer, general} from '../../common/tableExports'

function PrinterIndex() {
    const exportTemplate = [{...general, ...printer}]
    const dispatch = useDispatch();
    const printerList = useSelector((state: any) => state.printer.printerList);
    const exportList = useSelector((state: any) => state.printer.exportList);

    useEffect(() => {
        dispatch(fetchPrinters());
        dispatch(exportAllPrinters());
    }, [dispatch]);

    return (
        <TableContainer
            exportData={exportList.data}
            fetchData={fetchPrinters}
            tableList={printerList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Printers'}
            buttonName={'printer'}
            exportHeader={exportTemplate}
        />
    );
}

export default PrinterIndex;
