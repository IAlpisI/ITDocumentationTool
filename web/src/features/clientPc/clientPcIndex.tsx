import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from './clientPcSlice';
import { Header, Links } from './clientPcData';
import TableContainer from '../../common/TableContainer';

function ClientIndex() {
    const dispatch = useDispatch();
    const clientList = useSelector((state: any) => state.client.clientList);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    return (
        <TableContainer
            fetchData={fetchClients}
            tableList={clientList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Clients'}
            buttonName={'client'}
        />
    );
}

export default ClientIndex;
