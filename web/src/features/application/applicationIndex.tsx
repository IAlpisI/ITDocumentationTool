import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplications } from './applicationSlice';
import { Header, Links } from './applicationData';
import TableContainer from '../../common/TableContainer';

function ApplicationIndex() {
    const dispatch = useDispatch();
    const applicationList = useSelector((state: any) => state.application.applicationList);

    useEffect(() => {
        dispatch(fetchApplications());
    }, [dispatch]);

    return (
        <TableContainer
            tableList={applicationList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Applications'}
            buttonName={'application'}
        />
    );
}

export default ApplicationIndex;
