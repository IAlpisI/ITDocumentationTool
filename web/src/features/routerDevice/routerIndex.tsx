import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRouters } from './routerSlice';
import { routerHeader, routerLinks } from './routerData';
import TableContainer from '../../common/TableContainer';

const RouterIndex = () => {

    const dispatch = useDispatch();
    const workerList = useSelector((state: any) => state.worker.workerList);

    useEffect(() => {
        dispatch(fetchRouters());
    }, [dispatch]);

    return (
        <TableContainer
            tableList={workerList.data}
            tableHeader={routerHeader}
            tableLinks={routerLinks}
            tableName={'Routers'}
        />
    )
}

export default RouterIndex
