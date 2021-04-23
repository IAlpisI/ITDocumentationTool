import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkers } from './workerSlice';
import { Header, Links } from './workerData';
import TableContainer from '../../common/TableContainer';

function WorkerIndex() {
    const dispatch = useDispatch();
    const workerList = useSelector((state: any) => state.worker.workerList);

    useEffect(() => {
        dispatch(fetchWorkers());
    }, [dispatch]);

    return (
        <TableContainer
            tableList={workerList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'people'}
        />
    );
}

export default WorkerIndex;
