import { useEffect, useState } from 'react';
import { LicenseHeader, LicenseLinks } from './applicationData';
import TableContent from '../../common/TableContent';
import LicenseModal from './licenseModal';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button as Cancelbutton } from '../../common/Styles/common.style';
import {
    fetchLicensesForApplication,
    resetSingleLicense,
    getLicenseForApplication,
    fetchLicense
} from '../application/applicationSlice';
import { DataAcceptWindow } from '../../common/popWindows';
import LicenseKeyTab from '../../common/Tabs/licenseTab';

const Button = styled.button`
    background: ${(props) => props.theme.colors.cyan};
    color: ${(props) => props.theme.colors.white};
    margin: 0 0 20px 0;
    padding: 10px;
`;

const Container = styled.div`
    padding: 50px;
`;

function LicenseKeyIndex() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const licenseList = useSelector(
        (state: any) => state.application.licenseList
    );
    const singleLicense = useSelector(
        (state: any) => state.application.singleLicense
    );

    const [license, setLicense] = useState<number | null>(null);
    const [modalActive, setmodalActive] = useState<boolean>(false);
    const [detailActive, setDetailActive] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchLicensesForApplication(id));
    }, [dispatch, id]);

    async function switchModal() {
        await dispatch(resetSingleLicense());
        setLicense(null);
        setmodalActive((modalActive) => !modalActive);
    }

    const toggleSetLicense = async (id: number) => {
        setLicense(id);
        await dispatch(fetchLicense(id))
        setmodalActive((modalActive) => !modalActive);
    };

    const activeSetDetail = async (id: number) => {
        await dispatch(fetchLicense(id));
        toggleSetDetail();
        
    };

    const toggleSetDetail = () => {
        setDetailActive((detail) => !detail);
    };
    
    console.log(singleLicense.data);

    return (
        <Container>
            {detailActive && singleLicense.status === 'completed' && (
                <DataAcceptWindow>
                    <LicenseKeyTab {...singleLicense.data} />
                    <Cancelbutton
                        background
                        margin='-30px 0 0 -340px'
                        padding='7px'
                        height='30px'
                        onClick={toggleSetDetail}>
                        Cancel
                    </Cancelbutton>
                </DataAcceptWindow>
            )}
            <Button onClick={switchModal}>Add License</Button>
            {modalActive &&
                (license ? (
                    <LicenseModal
                        switchModal={switchModal}
                        applicationId={id}
                        license={license}
                    />
                ) : (
                    <LicenseModal
                        switchModal={switchModal}
                        applicationId={id}
                        license={license}
                    />
                ))}
            {licenseList.status === 'completed' && licenseList.data && (
                <TableContent
                    tableData={licenseList.data}
                    headerData={LicenseHeader}
                    tableLinks={LicenseLinks}
                    fetchOne={fetchLicensesForApplication}
                    addActivasionFunction={toggleSetLicense}
                    displayAdd={true}
                    displayEdit={false}
                    // displayDetail={toggleSetDetail}
                    detailsActivasionFunction={activeSetDetail}
                />
            )}
        </Container>
    );
}

export default LicenseKeyIndex;
