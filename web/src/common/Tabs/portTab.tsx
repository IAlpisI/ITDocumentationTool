import * as Module from '../Styles/detail.style';
import {useHistory} from 'react-router-dom'

export type PortProps = {
    title?: string;
    type?: string;
    model?: string;
    plug?: string;
    speed?: string;
    speedMeassure?: string;
    cable?: string;
    cableAddress?: string;
};

const PortTab = ({
    title,
    type,
    model,
    plug,
    speed,
    speedMeassure,
    cable,
    cableAddress
}: PortProps) => {

    const history = useHistory();


    return (
        <Module.Container>
            <Module.ComponentName>Port</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Title:</Module.ObjectName>
                <Module.ObjectData>{title}</Module.ObjectData>
                <Module.ObjectName>Type:</Module.ObjectName>
                <Module.ObjectData>{type}</Module.ObjectData>
                <Module.ObjectName>Model:</Module.ObjectName>
                <Module.ObjectData>{model}</Module.ObjectData>
                <Module.ObjectName>Plug:</Module.ObjectName>
                <Module.ObjectData>{plug}</Module.ObjectData>
                <Module.ObjectName>Speed:</Module.ObjectName>
                <Module.ObjectData>{speed}</Module.ObjectData>
                <Module.ObjectName>Speed meassure:</Module.ObjectName>
                <Module.ObjectData>{speedMeassure}</Module.ObjectData>
                <Module.ObjectName>Cable:</Module.ObjectName>
                <Module.ObjectLinkName
                    onClick={
                        () => {
                            cableAddress !== '' && history.push(`/cable/detail/${cableAddress}`);
                        }
                    }
                >{cable}</Module.ObjectLinkName>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default PortTab;
