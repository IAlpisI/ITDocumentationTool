import * as Module from '../Styles/detail.style'

export type PrinterDetail = {
    type?: string;
    colored?: boolean;
    duplex?: boolean;
    emulation?: string
    paperformat?: string;
};

const PrinterTab = (props: PrinterDetail) => {
    return (
        <Module.Container>
            <Module.ComponentName>Printer</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Type:</Module.ObjectName>
                <Module.ObjectData>{props.type}</Module.ObjectData>
                <Module.ObjectName>Colored:</Module.ObjectName>
                <Module.ObjectData>{props.colored}</Module.ObjectData>
                <Module.ObjectName>Duplex:</Module.ObjectName>
                <Module.ObjectData>{props.duplex}</Module.ObjectData>
                <Module.ObjectName>Emulation:</Module.ObjectName>
                <Module.ObjectData>{props.emulation}</Module.ObjectData>
                <Module.ObjectName>Paper format:</Module.ObjectName>
                <Module.ObjectData>{props.paperformat}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
}

export default PrinterTab

