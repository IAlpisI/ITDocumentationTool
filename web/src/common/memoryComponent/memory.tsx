import { Controller, useFormContext } from 'react-hook-form';
import * as Module from '../Styles/form.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MemoryProps } from '../Tabs/memoryTab';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

type Props = {
    memory?: MemoryProps;
};

export const Memory = (props: Props) => {
    const { memory } = props;

    return (
        <ConnectForm>
            {({ register, control, reset }: any) => {
                // reset(memory)

                return (
                    <Module.Container id={'Memory'}>
                        <Module.Column>
                            <Module.ComponentName>Memory</Module.ComponentName>
                            <Module.Label>Title</Module.Label>
                            <Module.Input
                                {...register('memoryTitle')}
                                defaultValue={memory?.title}
                            />
                            <Module.Label>Manufacturer</Module.Label>
                            <Module.Input
                                {...register('memoryManufacturer')}
                                defaultValue={memory?.manufacturer}
                            />
                            <Module.Label>Type</Module.Label>
                            <Module.Input
                                {...register('memoryType')}
                                defaultValue={memory?.type}
                            />
                            <Module.Label>Capacity</Module.Label>
                            <Module.Input
                                {...register('capacity')}
                                defaultValue={memory?.capacity}
                            />
                            <Module.Label>Capacity type</Module.Label>
                            <Module.Input
                                {...register('capacitytype')}
                                defaultValue={memory?.capacityType}
                            />

                            <Module.Label>Description</Module.Label>
                            <Controller
                                name='memoryDescription'
                                control={control}
                                defaultValue={memory?.description}
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
