import React from 'react';
import * as Module from '../Styles/detail.style';

export type PowerConsumer = {
    title?: string;
    manufactorer?: string;
    powerModel?: string;
    volt?: string;
    watt?: string;
    ampere?: string;
    description?: string;
};

const PowerConsumerTab = ({
    title,
    manufactorer,
    powerModel,
    volt,
    watt,
    ampere,
    description,
}: PowerConsumer) => {
    return (
        <Module.Container>
            <Module.ComponentName>Power consumer</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Title:</Module.ObjectName>
                <Module.ObjectData>{title}</Module.ObjectData>
                <Module.ObjectName>Manufacturer:</Module.ObjectName>
                <Module.ObjectData>{manufactorer}</Module.ObjectData>
                <Module.ObjectName>Power model:</Module.ObjectName>
                <Module.ObjectData>{powerModel}</Module.ObjectData>
                <Module.ObjectName>Volt:</Module.ObjectName>
                <Module.ObjectData>{volt}</Module.ObjectData>
                <Module.ObjectName>Watt:</Module.ObjectName>
                <Module.ObjectData>{watt}</Module.ObjectData>
                <Module.ObjectName>Ampere:</Module.ObjectName>
                <Module.ObjectData>{ampere}</Module.ObjectData>
                <Module.ObjectName>Description:</Module.ObjectName>
                <Module.ObjectData>{description}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default PowerConsumerTab;
