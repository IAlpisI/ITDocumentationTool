import { Controller, useFormContext } from 'react-hook-form';
import * as Module from '../Styles/form.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CpuProps } from '../Tabs/cpuTab';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

type Props = {
    id: any;
    CPU?: CpuProps;
};

export const CPU = (props: Props) => {
    const { id, CPU } = props;

    return (
        <ConnectForm>
            {({ register, control }: any) => {
                return (
                    <Module.Container id={id}>
                        <Module.Column>
                            <Module.ComponentName>CPU</Module.ComponentName>
                            <Module.Label>Title</Module.Label>
                            <Module.Input
                                {...register('title')}
                                defaultValue={CPU?.title}
                            />
                            <Module.Label>Manufactorer</Module.Label>
                            <Module.Input
                                {...register('cpuManufacturer')}
                                defaultValue={CPU?.manufacturer}
                            />
                            <Module.Label>CPU cores</Module.Label>
                            <Module.Input
                                type='number'
                                {...register('cpuCores')}
                                defaultValue={CPU?.cpuCores}
                            />
                            <Module.Label>Type</Module.Label>
                            <Module.Input
                                {...register('cpuType')}
                                defaultValue={CPU?.type}
                            />
                            <Module.Label>CPU frequency</Module.Label>
                            <Module.Input
                                type='number'
                                {...register('cpuFrequency')}
                                defaultValue={CPU?.cpuFrequency}
                            />
                            <Module.Label>CPU frequency type</Module.Label>
                            <Module.Input
                                {...register('cpuFrequencytype')}
                                defaultValue={CPU?.cpuFrequencyType}
                            />

                            <Module.Label>Description</Module.Label>
                            <Controller
                                name='cpuDescription'
                                control={control}
                                defaultValue={CPU?.description}
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
