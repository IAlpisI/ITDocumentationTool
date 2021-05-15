import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkers, ExportWorkers } from './workerSlice';
import { Header, Links } from './workerData';
import TableContainer from '../../common/TableContainer';
import {person, general} from '../../common/tableExports'

function WorkerIndex() {
    const exportTemplate = [{...general, ...person}]
    const dispatch = useDispatch();
    const workerList = useSelector((state: any) => state.worker.workerList);
    const exportList = useSelector((state: any) => state.worker.exportList);

    useEffect(() => {
        dispatch(ExportWorkers());
        dispatch(fetchWorkers());
        
    }, [dispatch]);

    return ( 
        <TableContainer
            exportData={exportList.data}
            fetchData={fetchWorkers}
            tableList={workerList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'People'}
            buttonName={'person'}
            exportHeader={exportTemplate}
        />
    );
}

export default WorkerIndex;
