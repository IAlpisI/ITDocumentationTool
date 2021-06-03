import * as Module from '../Styles/detail.style';

export type LicenseKeyProps = {
    amount?: number;
    keyInformation?: string;
    serial?: string;
    expireDate?: Date;
    pricePerUnit?: number;
    description?: string;
};

const LicenseKeyTab = ({
    amount,
    keyInformation,
    serial,
    expireDate,
    pricePerUnit,
    description
}: LicenseKeyProps) => {

    console.log(amount);

    return (
        <Module.Container>
            <Module.ComponentName>License key</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Amount:</Module.ObjectName>
                <Module.ObjectData>{amount}</Module.ObjectData>
                <Module.ObjectName>Key:</Module.ObjectName>
                <Module.ObjectData>{keyInformation}</Module.ObjectData>
                <Module.ObjectName>Serial:</Module.ObjectName>
                <Module.ObjectData>{serial}</Module.ObjectData>
                <Module.ObjectName>Expire date:</Module.ObjectName>
                <Module.ObjectData>{expireDate}</Module.ObjectData>
                <Module.ObjectName>Price per unit:</Module.ObjectName>
                <Module.ObjectData>{pricePerUnit}</Module.ObjectData>
                <Module.ObjectName>Description:</Module.ObjectName>
                <Module.ObjectData>{description}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default LicenseKeyTab;
