import { Controller, useFormContext } from 'react-hook-form';
import * as Module from '../Styles/form.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormFactorProps } from '../Tabs/formFactorTab';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

type Props = {
    formFactor?: FormFactorProps;
};

export const FormFactor = (props: Props) => {
    const { formFactor } = props;

    return (
        <ConnectForm>
            {({ register, control }: any) => {
                return (
                    <Module.Container id={'FormFactor'}>
                        <Module.Column>
                            <Module.ComponentName>Form factor</Module.ComponentName>
                            <Module.Label>Name</Module.Label>
                            <Module.Input
                                {...register('name')}
                                defaultValue={formFactor?.name}
                            />
                            <Module.Label>Rack unit</Module.Label>
                            <Module.Input
                                {...register('rackunit')}
                                defaultValue={formFactor?.dimensionUnit || 0}
                            />
                            <Module.Label>Width</Module.Label>
                            <Module.Input
                                {...register('width')}
                                defaultValue={formFactor?.width || 0}
                            />
                            <Module.Label>Height</Module.Label>
                            <Module.Input
                                {...register('height')}
                                defaultValue={formFactor?.height || 0}
                            />
                            <Module.Label>Depth</Module.Label>
                            <Module.Input
                                {...register('depth')}
                                defaultValue={formFactor?.depth || 0}
                            />
                            <Module.Label>Weight</Module.Label>
                            <Module.Input
                                {...register('weight')}
                                defaultValue={formFactor?.weight || 0}
                            />
                            <Module.Label>Weight measure</Module.Label>
                            <Module.Input
                                {...register('weightMeasure')}
                                defaultValue={formFactor?.weightMeasure || 0}
                            />

                            <Module.Label>Description</Module.Label>
                            <Controller
                                name='formDactorDescription'
                                control={control}
                                defaultValue={formFactor?.description}
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
