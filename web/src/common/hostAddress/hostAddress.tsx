import { Controller, useFormContext } from 'react-hook-form';
import * as Module from '../Styles/form.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GeneralProps } from '../Tabs/generalTab';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

type Props = {
    id: any;
    general?: GeneralProps;
};

export const HostAddress = (props: any) => {
    const { id, general } = props;

    return (
        <ConnectForm>
            {({ register, control, setValue }: any) => {
                return (
                    <Module.Container id={'HostAddress'}>
                        <Module.Column>
                            <Module.ComponentName>Host Address</Module.ComponentName>
                            <Module.Label>Address</Module.Label>
                            <Module.Input
                                {...register('generalTitle')}
                                defaultValue={general?.title}
                            />

                            <Module.Label>Description</Module.Label>
                            <Controller
                                name='hostAddressDescription'
                                control={control}
                                defaultValue={general?.description || '<p></p>'}
                                render={({
                                    field: { onChange, value }
                                }: any) => (
                                    <ReactQuill
                                        theme='snow'
                                        value={value || ''}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Module.Column>
                    </Module.Container>
                );
            }}
        </ConnectForm>
    );
};
