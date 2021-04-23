import { Controller, useFormContext } from 'react-hook-form';
import * as Module from '../Styles/form.style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LicenseKeyProps } from '../Tabs/licenseTab';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

type Props = {
    id?: any;
    LicenseKey?: LicenseKeyProps;
};

export const LicenseKey = (props: Props) => {
    const { id, LicenseKey } = props;

    return (
        <ConnectForm>
            {({ register, control }: any) => {
                return (
                    <Module.Container id={id}>
                        <Module.Column>
                            <Module.ComponentName>License key</Module.ComponentName>
                            <Module.Label>Amount</Module.Label>
                            <Module.Input
                                {...register('amount')}
                                defaultValue={LicenseKey?.amount}
                            />
                            <Module.Label>Key</Module.Label>
                            <Module.Input
                                {...register('key')}
                                defaultValue={LicenseKey?.key}
                            />
                            <Module.Label>Serial</Module.Label>
                            <Module.Input
                                {...register('serial')}
                                defaultValue={LicenseKey?.serial}
                            />
                            <Module.Label>Expire date</Module.Label>
                            <Module.Input
                                {...register('expiredate')}
                                defaultValue={LicenseKey?.expireDate}
                            />
                            <Module.Label>Price per unit</Module.Label>
                            <Module.Input
                                {...register('priceperunit')}
                                defaultValue={LicenseKey?.pricePerUnit}
                            />

                            <Module.Label>Description</Module.Label>
                            <Controller
                                name='licensekeydescription'
                                control={control}
                                defaultValue={LicenseKey?.description}
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
