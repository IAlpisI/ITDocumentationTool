import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from './clientPcSlice';
import { workerHeader, workerLinks } from './clientPcData';
import TableContainer from '../../common/TableContainer';

function ClientIndex() {
    const dispatch = useDispatch();
    const clientList = useSelector((state: any) => state.client.clientList);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    return (
        <TableContainer
            tableList={clientList.data}
            tableHeader={workerHeader}
            tableLinks={workerLinks}
            tableName={'Clients'}
            buttonName={'client'}
        />
    );
}

export default ClientIndex;
