import { useState } from 'react';
import { LicenseHeader, Links } from './applicationData';
import TableContent from '../../common/TableContent';
import LicenseModal from './licenseModal';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    background: ${(props) => props.theme.colors.violet1};
    color: ${props=> props.theme.colors.white};
    padding: 5px;
    margin: 10px;
`

function LicenseKeyIndex(data: any) {
    const LicenseKeys: any[] = [];
    const value: any = [...Array(Object.keys(data).length)];
    const {id} = useParams<{id: string}>();

    const [modalActive, setmodalActive] = useState<boolean>(false);

    const convert = (assing: any) => {
        value.map((_: any, x: any) =>
            assing.push(
                Object.fromEntries(
                    Object.entries(data[x]).filter(
                        ([key, _]) =>
                            key !== 'applicationId' && key !== 'description'
                    )
                )
            )
        );

        return assing;
    };

    function switchModal() {
        setmodalActive((modalActive) => !modalActive);
    }

    return (
        <>
            <Button onClick={switchModal}>Add License</Button>
            {modalActive && <LicenseModal switchModal={switchModal} id={id} />}
            <TableContent
                tableData={convert(LicenseKeys)}
                headerData={LicenseHeader}
                tableLinks={Links}
            />
        </>
    );
}

export default LicenseKeyIndex;
