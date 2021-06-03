import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './userSlice';
import { Header, Links } from './userData';
import TableContainer from '../../common/TableContainer';

function UserIndex() {
    const dispatch = useDispatch();
    const userList = useSelector((state: any) => state.user.userList);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    console.log(userList.data);

    return (
        <>
            {userList.status === 'completed' && userList.data.length !== 0 && (
                <TableContainer
                    tableExportButtons={false}
                    displayDetail={false}
                    fetchData={fetchUsers}
                    tableList={userList.data}
                    tableHeader={Header}
                    tableLinks={Links}
                    tableName={'Users'}
                    buttonName={'user'}
                />
            )}
        </>
    );
}

export default UserIndex;
