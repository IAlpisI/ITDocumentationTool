import * as Module from '../Styles/detail.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type PersonDetail = {
    cableType?: string;
    cableLength?: string;
    cableLengthMeasure?: string;
    color?: string
    description?: string;
};

const modules = {
    toolbar: false
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
                <Module.ObjectData>
                    <ReactQuill
                        readOnly={true}
                        modules={modules}
                        theme='snow'
                        value={props.description || ''}
                    />
                </Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
}

export default CableDetail

