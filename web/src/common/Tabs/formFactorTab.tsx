import React from 'react';
import * as Module from '../Styles/detail.style';

export type FormFactorProps = {
    name?: string;
    rackUnit?: string;
    dimensionUnit?: string;
    width?: string;
    height?: string;
    depth?: string;
    weight?: string;
    weightMeasure?: string;
    description?: string;
};

const FormFactorTab = ({
    name,
    rackUnit,
    dimensionUnit,
    width,
    height,
    depth,
    weight,
    weightMeasure,
    description
}: FormFactorProps) => {
    return (
        <Module.Container>
            <Module.ComponentName>Form factor</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Name:</Module.ObjectName>
                <Module.ObjectData>{name}</Module.ObjectData>
                <Module.ObjectName>Rack unit:</Module.ObjectName>
                <Module.ObjectData>{rackUnit}</Module.ObjectData>
                <Module.ObjectName>Dimension unit:</Module.ObjectName>
                <Module.ObjectData>{dimensionUnit}</Module.ObjectData>
                <Module.ObjectName>Width:</Module.ObjectName>
                <Module.ObjectData>{width}</Module.ObjectData>
                <Module.ObjectName>Height:</Module.ObjectName>
                <Module.ObjectData>{height}</Module.ObjectData>
                <Module.ObjectName>Depth:</Module.ObjectName>
                <Module.ObjectData>{depth}</Module.ObjectData>
                <Module.ObjectName>Weight:</Module.ObjectName>
                <Module.ObjectData>{weight}</Module.ObjectData>
                <Module.ObjectName>Weight meassure:</Module.ObjectName>
                <Module.ObjectData>{weightMeasure}</Module.ObjectData>
                <Module.ObjectName>Description:</Module.ObjectName>
                <Module.ObjectData>{description}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default FormFactorTab;
