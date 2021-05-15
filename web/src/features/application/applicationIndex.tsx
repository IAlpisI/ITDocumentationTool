import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplications } from './applicationSlice';
import { Header, Links } from './applicationData';
import TableContainer from '../../common/TableContainer';
import {Convert} from '../../common/helpers/filterKeys'

function ApplicationIndex() {
    const dispatch = useDispatch();
    const applicationList = useSelector((state: any) => state.application.applicationList);

    useEffect(() => {
        dispatch(fetchApplications());
    }, [dispatch]);

    function filterKeys([key, _]:any) {
        return key !== 'serverDeviceId';
    }

    return (
        <TableContainer
            fetchData={fetchApplications}
            tableList={ Convert(applicationList.data, filterKeys)}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Applications'}
            buttonName={'application'}
        />
    );
}

export default ApplicationIndex;
