import * as Module from '../Styles/detail.style';

export type GeneralProps = {
    address?: string;
    description?: string;
};

const HostAddressTab = ({
    address,
    description
}: GeneralProps) => {
    return (
        <Module.Container>
            <Module.ComponentName>Host address</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Address:</Module.ObjectName>
                <Module.ObjectData>{address}</Module.ObjectData>
                <Module.ObjectName>Description:</Module.ObjectName>
                <Module.ObjectData>{description}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default HostAddressTab;
