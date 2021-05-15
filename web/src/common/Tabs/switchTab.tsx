import * as Module from '../Styles/detail.style';
import 'react-quill/dist/quill.snow.css';

export type GeneralProps = {
    vlan?: string;
    role?: string;
    spanningTree?: string;
};

const SwitchTab = ({ vlan, role, spanningTree }: GeneralProps) => {
    return (
        <Module.Container>
            <Module.ComponentName>Switch</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Vlan:</Module.ObjectName>
                <Module.ObjectData>{vlan}</Module.ObjectData>
                <Module.ObjectName>Role:</Module.ObjectName>
                <Module.ObjectData>{role}</Module.ObjectData>
                <Module.ObjectName>Spanning tree:</Module.ObjectName>
                <Module.ObjectData>{spanningTree}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default SwitchTab;