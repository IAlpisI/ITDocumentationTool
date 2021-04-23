import * as Module from '../Styles/detail.style';

export type RouterProps = {
    routingProtocol?: string;
    defaultGateaway?: string;
};

const RouterTab = ({
    defaultGateaway,
    routingProtocol
}:RouterProps) => {
    return (
        <Module.Container>
            <Module.ComponentName>Router</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Routing protocol:</Module.ObjectName>
                <Module.ObjectData>{routingProtocol}</Module.ObjectData>
                <Module.ObjectName>Default gateaway:</Module.ObjectName>
                <Module.ObjectData>{defaultGateaway}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    )
}

export default RouterTab
