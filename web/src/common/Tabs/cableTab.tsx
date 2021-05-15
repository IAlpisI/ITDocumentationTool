import * as Module from '../Styles/detail.style'

export type PersonDetail = {
    cableType?: string;
    cableLength?: string;
    cableLengthMeasure?: string;
    color?: string
    description?: string;
};

const CableDetail = (props: PersonDetail) => {
    return (
        <Module.Container>
            <Module.ComponentName>Person</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Cable type:</Module.ObjectName>
                <Module.ObjectData>{props.cableType}</Module.ObjectData>
                <Module.ObjectName>Cable length:</Module.ObjectName>
                <Module.ObjectData>{props.cableLength}</Module.ObjectData>
                <Module.ObjectName>Cable length measure:</Module.ObjectName>
                <Module.ObjectData>{props.cableLengthMeasure}</Module.ObjectData>
                <Module.ObjectName>Color:</Module.ObjectName>
                <Module.ObjectData>{props.color}</Module.ObjectData>
                <Module.ObjectName>Description:</Module.ObjectName>
                <Module.ObjectData>{props.description}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
}

export default CableDetail

