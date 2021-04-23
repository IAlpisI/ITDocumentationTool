import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServers } from './serverSlice';
import { Header, Links } from './serverData';
import TableContainer from '../../common/TableContainer';

function ServerIndex() {
    const dispatch = useDispatch();
    const serverList = useSelector((state: any) => state.server.serverList);

    useEffect(() => {
        dispatch(fetchServers());
    }, [dispatch]);

    return (
        <TableContainer
            tableList={serverList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Servers'}
            buttonName={'server'}
        />
    );
}

export default ServerIndex;
