import * as Module from '../Styles/detail.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type PersonDetail = {
    fullName?: string;
    emailAddress?: string;
    companyNumber?: string;
    personalNumber?: string
    description?: string;
};

const modules = {
    toolbar: false
};

const WorkerDetail = (props: PersonDetail) => {
    return (
        <Module.Container>
            <Module.ComponentName>Person</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Full name:</Module.ObjectName>
                <Module.ObjectData>{props.fullName}</Module.ObjectData>
                <Module.ObjectName>Email address:</Module.ObjectName>
                <Module.ObjectData>{props.emailAddress}</Module.ObjectData>
                <Module.ObjectName>Company number:</Module.ObjectName>
                <Module.ObjectData>{props.companyNumber}</Module.ObjectData>
                <Module.ObjectName>Personla number:</Module.ObjectName>
                <Module.ObjectData>{props.personalNumber}</Module.ObjectData>
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

export default WorkerDetail

