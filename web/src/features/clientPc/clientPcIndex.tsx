import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, ExportClientPc } from './clientPcSlice';
import { Header, Links } from './clientPcData';
import TableContainer from '../../common/TableContainer';
import { general, clientDevice, powerConsumer} from '../../common/tableExports';

function ClientIndex() {
    const dispatch = useDispatch();
    const clientList = useSelector((state: any) => state.client.clientList);
    const exportList = useSelector((state: any) => state.client.exportList);
    const exportTemplate = [{...general, ...clientDevice, ...powerConsumer}]

    useEffect(() => {
        dispatch(fetchClients());
        dispatch(ExportClientPc());
    }, [dispatch]);

    return (
        <TableContainer
            exportData={exportList.data}
            fetchData={fetchClients}
            tableList={clientList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Clients'}
            buttonName={'client'}
            exportHeader={exportTemplate}
        />
    );
}

export default ClientIndex;
