import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Module from '../Styles/detail.style';

export type FormFactorProps = {
    name?: string;
    rackUnit?: string;
    dimesnsionUnit?: string;
    width?: string;
    height?: string;
    depth?: string;
    weight?: string;
    weightMeasure?: string;
    description?: string;
};

const modules = {
    toolbar: false
};

const FormFactorTab = ({
    name,
    dimesnsionUnit,
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
                {/* <Module.ObjectName>Name:</Module.ObjectName>
                <Module.ObjectData>{name}</Module.ObjectData> */}
                <Module.ObjectName>Width:</Module.ObjectName>
                <Module.ObjectData>{`${width} ${dimesnsionUnit}`}</Module.ObjectData>
                <Module.ObjectName>Height:</Module.ObjectName>
                <Module.ObjectData>{`${height} ${dimesnsionUnit}`}</Module.ObjectData>
                <Module.ObjectName>Depth:</Module.ObjectName>
                <Module.ObjectData>{`${depth} ${dimesnsionUnit}`}</Module.ObjectData>
                <Module.ObjectName>Weight:</Module.ObjectName>
                <Module.ObjectData>{`${weight} ${weightMeasure}`}</Module.ObjectData>
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

export default FormFactorTab;
