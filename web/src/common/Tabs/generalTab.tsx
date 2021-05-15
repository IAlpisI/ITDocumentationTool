import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Module from '../Styles/detail.style';

export type GeneralProps = {
    title?: string;
    purpose?: string;
    status?: string;
    tag?: Array<string>;
    description?: string;
};

const modules = {
    toolbar: false
};

const GeneralTab = ({
    title,
    purpose,
    status,
    tag,
    description
}: GeneralProps) => {
    return (
        <Module.Container>
            <Module.ComponentName>General</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Title:</Module.ObjectName>
                <Module.ObjectData>{title}</Module.ObjectData>
                <Module.ObjectName>Purpose:</Module.ObjectName>
                <Module.ObjectData>{purpose}</Module.ObjectData>
                <Module.ObjectName>Status:</Module.ObjectName>
                <Module.ObjectData>{status}</Module.ObjectData>
                <Module.ObjectName>Tags:</Module.ObjectName>
                <Module.ObjectData>{tag?.join(', ')}</Module.ObjectData>
                <Module.ObjectName>Description:</Module.ObjectName>
                <Module.ObjectData>
                    <ReactQuill
                        readOnly={true}
                        modules={modules}
                        theme='snow'
                        value={description || ''}
                    />
                </Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default GeneralTab;
