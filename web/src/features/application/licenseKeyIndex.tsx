import { useState } from 'react';
import { LicenseHeader, Links } from './applicationData';
import TableContent from '../../common/TableContent';
import LicenseModal from './licenseModal';

function LicenseKeyIndex(data: any) {
    const LicenseKeys: any[] = [];
    const value: any = [...Array(Object.keys(data).length)];

    const [modalActive, setmodalActive] = useState<boolean>(true)

    const convert = (assing: any) => {
        value.map((_: any, x: any) => assing.push(data[x]));

        return assing;
    };

    function switchModal() {
        setmodalActive(modalActive => !modalActive)
    }

    return (
        <>
        <button onClick={switchModal}>Add License</button>
         {modalActive && <LicenseModal switchModal={switchModal} />} 
            <TableContent
                tableData={convert(LicenseKeys)}
                headerData={LicenseHeader}
                tableLinks={Links}
            />
        </>
    );
}

export default LicenseKeyIndex;
