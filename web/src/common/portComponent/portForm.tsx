import { useFormContext } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import * as FormStyle from '../Styles/form.style';
import {
    fetchCablesWithFullInformation
} from '../../features/cables/cablesSlice';
import { useEffect, useState } from 'react';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

export const PortForm = (props: any) => {
    const dispatch = useDispatch();
    const cableList = useSelector((state: any) => state.cable.cablePorts);
    const [plugValue, setPlugValue] = useState<string>(
        props?.props?.plug || ''
    );

    const port = props;

    useEffect(() => {
        dispatch(fetchCablesWithFullInformation());
    }, []);

    return (
        <ConnectForm>
            {({ register, getValues }: any) => {
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
                                defaultValue={port?.props?.plug}
                                onClick={() => {
                                    setPlugValue(
                                        (plugValue) =>
                                            (plugValue = getValues('plug'))
                                    );
                                }}>
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
                            <FormStyle.Label>Cable</FormStyle.Label>
                            {cableList.data && (
                                <FormStyle.Select
                                    {...register('cable')}
                                    >
                                    {cableList.data.map(
                                        (x: any, index: number) => {
                                            switch (plugValue) {
                                                case 'input':
                                                    if (
                                                        x.startPortId === null
                                                    ) {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={`${x.id}`}>
                                                                {
                                                                    x.general
                                                                        .title
                                                                }
                                                            </option>
                                                        );
                                                    }
                                                    break;
                                                case 'output':
                                                    if (x.endPortId === null) {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={`${x.id}`}>
                                                                {
                                                                    x.general
                                                                        .title
                                                                }
                                                            </option>
                                                        );
                                                    }
                                                    break;
                                            }
                                        }
                                    )}
                                </FormStyle.Select>
                            )}
                        </FormStyle.Column>
                    </FormStyle.Container>
                );
            }}
        </ConnectForm>
    );
};
