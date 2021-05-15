import * as Module from '../Styles/detail.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type GeneralProps = {
    address?: string;
    description?: string;
};

const modules = {
    toolbar: false
};

const HostAddressTab = ({ address, description }: GeneralProps) => {
    return (
        <Module.Container>
            <Module.ComponentName>Host address</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Address:</Module.ObjectName>
                <Module.ObjectData>{address}</Module.ObjectData>
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

export default HostAddressTab;
