import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRouters } from './routerSlice';
import { routerHeader, routerLinks } from './routerData';
import TableContainer from '../../common/TableContainer';

const RouterIndex = () => {

    const dispatch = useDispatch();
    const routerList = useSelector((state: any) => state.router.routerList);

    useEffect(() => {
        dispatch(fetchRouters());
    }, [dispatch]);

    return (
        <TableContainer
            fetchData={fetchRouters}
            tableList={routerList.data}
            tableHeader={routerHeader}
            tableLinks={routerLinks}
            tableName={'Routers'}
            buttonName={'router'}
        />
    )
}

export default RouterIndex
