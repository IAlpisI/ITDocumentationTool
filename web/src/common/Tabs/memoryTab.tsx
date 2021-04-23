import React from 'react';
import * as Module from '../Styles/detail.style';

export type MemoryProps = {
    title?: string;
    manufacturer?: string;
    type?: string;
    capacity?: string;
    capacityType?: string;
    description?: string;
};

const GeneralTab = ({
    title,
    manufacturer,
    type,
    capacity,
    capacityType,
    description,
}: MemoryProps) => {
    return (
        <Module.Container>
            <Module.ComponentName>Memory</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Title:</Module.ObjectName>
                <Module.ObjectData>{title}</Module.ObjectData>
                <Module.ObjectName>Manufactorer:</Module.ObjectName>
                <Module.ObjectData>{manufacturer}</Module.ObjectData>
                <Module.ObjectName>Type:</Module.ObjectName>
                <Module.ObjectData>{type}</Module.ObjectData>
                <Module.ObjectName>Capacity:</Module.ObjectName>
                <Module.ObjectData>{capacity}</Module.ObjectData>
                <Module.ObjectName>Capacity type:</Module.ObjectName>
                <Module.ObjectData>{capacityType}</Module.ObjectData>
                <Module.ObjectName>Description:</Module.ObjectName>
                <Module.ObjectData>{description}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default GeneralTab;
