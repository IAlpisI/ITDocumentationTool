import { Controller, useFormContext } from 'react-hook-form';
import * as Module from '../Styles/form.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DesktopProps } from '../Tabs/desktopTab';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

type Props = {
    id: any;
    desktop?: DesktopProps;
};

export const Desktop = (props: Props) => {
    const { id, desktop } = props;

    return (
        <ConnectForm>
            {({ register, control }: any) => {
                return (
                    <Module.Container id={id}>
                        <Module.Column>
                            <Module.ComponentName>Desktop</Module.ComponentName>
                            <Module.Label>Type</Module.Label>
                            <Module.Input
                                {...register('type')}
                                defaultValue={desktop?.type}
                            />
                            <Module.Label>Keyboard layout</Module.Label>
                            <Module.Input
                                {...register('keyboardLayout')}
                                defaultValue={desktop?.keyboardLayout}
                            />
                            <Module.Label>Mouse model</Module.Label>
                            <Module.Input
                                {...register('mouseModel')}
                                defaultValue={desktop?.mouseModel}
                            />

                            <Module.Label>Description</Module.Label>
                            <Controller
                                name='desktopDescription'
                                control={control}
                                defaultValue={desktop?.description}
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
