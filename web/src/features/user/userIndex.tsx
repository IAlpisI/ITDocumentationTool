import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './userSlice';
import { Header, Links } from './userData';
import TableContainer from '../../common/TableContainer';

function WorkerIndex() {
    const dispatch = useDispatch();
    const userList = useSelector((state: any) => state.user.userList);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <TableContainer
            fetchData={fetchUsers}
            tableList={userList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Users'}
            buttonName={'user'}
        />
    );
}

export default WorkerIndex;
