import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServers, ExportAllServers } from './serverSlice';
import { Header, Links } from './serverData';
import TableContainer from '../../common/TableContainer';
import {formFactor, general} from '../../common/tableExports'

function ServerIndex() {
    const exportTemplate = [{...general, ...formFactor}]
    const dispatch = useDispatch();
    const serverList = useSelector((state: any) => state.server.serverList);
    const exportList = useSelector((state: any) => state.server.exportList);

    useEffect(() => {
        dispatch(fetchServers());
        dispatch(ExportAllServers());
    }, [dispatch]);

    return (
        <TableContainer
            exportData={exportList.data}
            tableList={serverList.data}
            fetchData={fetchServers}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Servers'}
            buttonName={'server'}
            exportHeader={exportTemplate}
        />
    );
}

export default ServerIndex;
