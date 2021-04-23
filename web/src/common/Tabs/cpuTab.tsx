import * as Module from '../Styles/detail.style';

export type CpuProps = {
    title?: string;
    cpuCores?: number;
    manufacturer?: string;
    type?: string;
    cpuFrequency?: string;
    cpuFrequencyType?: string;
    description?: string;
};

const CPUTab = ({
    title,
    cpuCores,
    manufacturer,
    type,
    cpuFrequency,
    cpuFrequencyType,
    description
}: CpuProps) => {
    return (
        <Module.Container>
            <Module.ComponentName>CPU</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Title:</Module.ObjectName>
                <Module.ObjectData>{title}</Module.ObjectData>
                <Module.ObjectName>CPU cores:</Module.ObjectName>
                <Module.ObjectData>{cpuCores}</Module.ObjectData>
                <Module.ObjectName>Manufacturer:</Module.ObjectName>
                <Module.ObjectData>{manufacturer}</Module.ObjectData>
                <Module.ObjectName>Type:</Module.ObjectName>
                <Module.ObjectData>{type}</Module.ObjectData>
                <Module.ObjectName>CPU frequency:</Module.ObjectName>
                <Module.ObjectData>{cpuFrequency}</Module.ObjectData>
                <Module.ObjectName>CPU frequency Type:</Module.ObjectName>
                <Module.ObjectData>{cpuFrequencyType}</Module.ObjectData>
                <Module.ObjectName>Description:</Module.ObjectName>
                <Module.ObjectData>{description}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default CPUTab;
