import { Controller, useFormContext } from 'react-hook-form';
import * as Module from '../Styles/form.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PowerConsumer } from '../Tabs/powerConsumerTab';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

type Props = {
    id: any;
    powerConsumer?: PowerConsumer;
};

export const PowerConsumerForm = (props: Props) => {
    const { id, powerConsumer } = props;

    return (
        <ConnectForm>
            {({ register, control }: any) => {
                return (
                    <Module.Container id={id}>
                        <Module.Column>
                            <Module.ComponentName>Power consumer</Module.ComponentName>
                            <Module.Label>Title</Module.Label>
                            <Module.Input
                                {...register('powerConsumerTitle')}
                                defaultValue={powerConsumer?.title}
                            />
                            <Module.Label>Manufacturer</Module.Label>
                            <Module.Input
                                {...register('powerConsumerManufacturer')}
                                defaultValue={powerConsumer?.manufactorer}
                            />
                            <Module.Label>Power model</Module.Label>
                            <Module.Input
                                {...register('powermodel')}
                                defaultValue={powerConsumer?.powerModel}
                            />
                            <Module.Label>Volt</Module.Label>
                            <Module.Input
                                type='number'
                                step={0.1}
                                {...register('volt')}
                                defaultValue={powerConsumer?.volt}
                            />
                            <Module.Label>Watt</Module.Label>
                            <Module.Input
                                type='number'
                                step={0.1}
                                {...register('watt')}
                                defaultValue={powerConsumer?.watt}
                            />
                            <Module.Label>Ampere</Module.Label>
                            <Module.Input
                                type='number'
                                step={0.1}
                                {...register('ampere')}
                                defaultValue={powerConsumer?.ampere}
                            />

                            <Module.Label>Description</Module.Label>
                            <Controller
                                name='powerConsumerDescription'
                                control={control}
                                defaultValue={powerConsumer?.description}
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
