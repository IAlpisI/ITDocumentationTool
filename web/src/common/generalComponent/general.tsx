import { Controller, useFormContext } from 'react-hook-form';
import * as Module from '../Styles/form.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Tags from './tags'
import { GeneralProps } from '../Tabs/generalTab';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

type Props = {
    general?: GeneralProps;
};

export const General = (props: Props) => {
    const { general } = props;

    return (
        <ConnectForm>
            {({ register, control, setValue, formState: { errors } }: any) => {
                return (
                    <Module.Container id={'General'}>
                        <Module.Column>
                            <Module.ComponentName>General</Module.ComponentName>
                            <Module.Label>Title</Module.Label>
                            <Module.Input
                                {...register('generalTitle', {
                                    required: 'This is required',
                                })
                                    
                                }
                                defaultValue={general?.title}
                            />
                            {errors.generalTitle && <Module.ErrorMessage role="alert">{errors.generalTitle.message}</Module.ErrorMessage>}
                            <Module.Label>Purpose</Module.Label>
                            <Module.Input
                                {...register('purpose')}
                                defaultValue={general?.purpose}
                            />
                            <Module.Label>Status</Module.Label>
                            <Module.Select {...register('status')}
                                defaultValue={general?.status}
                            >
                                <Module.FormOptions value="Pending">Pending</Module.FormOptions>
                                <Module.FormOptions value="NonOperational">Non operational</Module.FormOptions>
                                <Module.FormOptions value="Production">Production</Module.FormOptions>
                                <Module.FormOptions value="Deploying">Deploying</Module.FormOptions>
                                <Module.FormOptions value="Defect">Defect</Module.FormOptions>
                                <Module.FormOptions value="Operational">Operational</Module.FormOptions>
                                <Module.FormOptions value="Ordered">Ordered</Module.FormOptions>
                            </Module.Select>
                            <Module.Label>Tags</Module.Label>

                            <Tags setValue={setValue} tag={general?.tag} />

                            <Module.Label>Description</Module.Label>
                            <Controller
                                name='generalDescription'
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
