import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCables } from './cablesSlice';
import { Header, Links } from './cableData';
import TableContainer from '../../common/TableContainer';

function CableIndex() {
    const dispatch = useDispatch();
    const cableList = useSelector((state: any) => state.cable.cableList);

    useEffect(() => {
        dispatch(fetchCables());
    }, [dispatch]);

    return (
        <TableContainer
            fetchData={fetchCables}
            tableList={cableList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Cables'}
            buttonName={'cable'}
            tableExportButtons={false}
        />
    );
}

export default CableIndex;
