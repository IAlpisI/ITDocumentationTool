import React from 'react';
import * as Module from '../Styles/detail.style';

export type DesktopProps = {
    type?: string;
    keyboardLayout?: string;
    mouseModel?: string;
    description?: string;
};

const GeneralTab = ({
    type,
    keyboardLayout,
    mouseModel,
    description,
}: DesktopProps) => {
    return (
        <Module.Container>
            <Module.ComponentName>CPU</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Type:</Module.ObjectName>
                <Module.ObjectData>{type}</Module.ObjectData>
                <Module.ObjectName>Keyboard layout:</Module.ObjectName>
                <Module.ObjectData>{keyboardLayout}</Module.ObjectData>
                <Module.ObjectName>Mouse model:</Module.ObjectName>
                <Module.ObjectData>{mouseModel}</Module.ObjectData>
                <Module.ObjectName>Description:</Module.ObjectName>
                <Module.ObjectData>{description}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default GeneralTab;
