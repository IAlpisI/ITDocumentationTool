import { useFormContext } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import * as FormStyle from '../Styles/form.style';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

export const PortForm = (props: any) => {
    const port = props;

    console.log(port)

    return (
        <ConnectForm>
            {({ register }: any) => {
                return (
                    <FormStyle.Container>
                        <FormStyle.Column>
                            <FormStyle.ComponentName>
                                Port
                            </FormStyle.ComponentName>
                            <FormStyle.Label>Title</FormStyle.Label>
                            <FormStyle.Input
                                {...register('title')}
                                defaultValue={port?.props?.title}
                            />
                            <FormStyle.Label>Type</FormStyle.Label>
                            <FormStyle.Input
                                {...register('type')}
                                defaultValue={port?.props?.type}
                            />
                            <FormStyle.Label>Model</FormStyle.Label>
                            <FormStyle.Input
                                {...register('model')}
                                defaultValue={port?.props?.model}
                            />
                            <FormStyle.Label>Plug</FormStyle.Label>
                            <FormStyle.Select
                                {...register('plug')}
                                defaultValue={port?.props?.plug}>
                                <option value='output'>Output</option>
                                <option value='input'>Input</option>
                            </FormStyle.Select>
                            <FormStyle.Label>Speed</FormStyle.Label>
                            <FormStyle.Input
                                {...register('speed')}
                                defaultValue={port?.props?.speed}
                            />
                            <FormStyle.Label>Speed measure</FormStyle.Label>
                            <FormStyle.Input
                                {...register('speedMeasure')}
                                defaultValue={port?.props?.speedMeassure}
                            />
                        </FormStyle.Column>
                    </FormStyle.Container>
                );
            }}
        </ConnectForm>
    );
};
