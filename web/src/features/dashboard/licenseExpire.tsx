import { ContainerName, WrapTables } from './defectedItems';
import TableContainer from '../../common/TableContainer';
import { fetchLicenseResult } from './dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { fetchLicense } from '../application/applicationSlice';

export const Container = styled.div`
    margin: 50px 50px 0 50px;
    height: 100%;
    width: 1400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const LicenseExpire = () => {
    const Header = [
        {
            entityColumn: 'key',
            headerName: 'Key'
        },
        {
            entityColumn: 'serial',
            headerName: 'Serial'
        },
        {
            entityColumn: 'action',
            headerName: 'Action'
        }
    ];

    const Links = {
        editLink: 'server/edit/',
        viewLink: 'license/detail/',
        formLink: 'server/form',
        index: 'server'
    };

    const dispatch = useDispatch();
    const history = useHistory();
    const licenseList = useSelector(
        (state: any) => state.dashboard.licenseList
    );

    const goToLicense = async (id: number) => {
        const license: any = await dispatch(fetchLicense(id));
        console.log(license);
        if (license.payload.data) {
            history.push(`/application/detail/${license.payload.data.applicationId}`);
        }
    };

    useEffect(() => {
        dispatch(fetchLicenseResult());
    }, [dispatch]);

    // console.log(licenseList);

    return (
        <Container>
            <ContainerName></ContainerName>

            {licenseList.data && (
                <WrapTables>
                    <TableContainer
                        // removePadding={true}
                        tableList={licenseList.data}
                        tableHeader={Header}
                        tableLinks={Links}
                        tableName={'Licenses that will expire soon'}
                        tableButtons={false}
                        displayDelete={false}
                        displayEdit={false}
                        showCheckBox={false}
                        detailsActivasionFunction={goToLicense}
                    />
                </WrapTables>
            )}
        </Container>
    );
};

export default LicenseExpire;
