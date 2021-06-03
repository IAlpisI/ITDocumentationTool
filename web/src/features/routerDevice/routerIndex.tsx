import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRouters, ExportRouter } from './routerSlice';
import { routerHeader, routerLinks } from './routerData';
import TableContainer from '../../common/TableContainer';
import { general, routerDevice, formFactor, powerConsumer} from '../../common/tableExports';

const RouterIndex = () => {
    const exportTemplate = [{...general, ...routerDevice, ...formFactor, ...powerConsumer}]
    const dispatch = useDispatch();
    const routerList = useSelector((state: any) => state.router.routerList);
    const exportList = useSelector((state: any) => state.router.exportList);

    useEffect(() => {
        dispatch(fetchRouters());
        dispatch(ExportRouter());
    }, [dispatch]);

    return (
        <TableContainer
            exportHeader={exportTemplate}
            exportData={exportList.data}
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
