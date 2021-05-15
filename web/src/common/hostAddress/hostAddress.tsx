import { Controller, useForm, useFormContext } from 'react-hook-form';
import * as Module from '../Styles/form.style';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import { fetchLayerThreeNetworks } from '../../features/layerThreeNetwork/layerThreeNetworkSlice';
import { Netmask } from 'netmask';
import MaskedInput from 'react-text-mask';

export const ConnectForm = ({ children }: any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

export const HostAddress = ({props}: any) => {
    const dispatch = useDispatch();
    const { register, getValues } = useForm();
    const [error, setError] = useState<string>('');
    const valueRef = useRef(null)

    const layerThreeNetworks = useSelector(
        (state: any) => state.layerThreeNetwork.layerThreeNetworkList
    );

    useEffect(() => {
        dispatch(fetchLayerThreeNetworks());
    }, [dispatch]);

    const ipControl = {
        guide: false,
        placeholderChar: '\u2000',
        mask: (value: string | any[]) => Array(value.length).fill(/[\d.]/),
        pipe: (value: string) => {
            if (value === '.' || value.endsWith('..')) return false;

            const parts = value.split('.');

            if (
                parts.length > 4 ||
                parts.some(
                    (part: string | number) =>
                        part === '00' || part < 0 || part > 255
                )
            ) {
                return false;
            }

            return value;
        }
    };

    const temp = (address: string) => {

        console.log(address);
        // let block = new Netmask();
        // console.log("test")
    };

    return (
        <ConnectForm>
            {({ register, control, getValues }: any) => {
                return (
                    <Module.Container id={'HostAddress'}>
                        <Module.Column>
                            <Module.ComponentName>
                                Host Address
                            </Module.ComponentName>
                            <Module.Label>Address</Module.Label>
                            <Controller
                                
                                control={control}
                                name='address'
                                defaultValue={props?.address || '255.255.255.255'}
                                render={({
                                    field: { onChange, value }
                                }: any) => (
                                    <Module.IpInput
                                        name='address'
                                        ref={valueRef}
                                        mask={[
                                            /[1-2]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '.',
                                            /[1-2]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '.',
                                            /[1-2]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '.',
                                            /[1-2]/,
                                            /[0-9]/,
                                            /[0-9]/
                                        ]}
                                        pipe={(value) => {
                                            const subips = value.split('.');
                                            const invalidSubips = subips.filter(
                                                (ip: any) => {
                                                    ip = parseInt(ip);
                                                    return ip < 0 || ip > 255;
                                                }
                                            );
                                            return invalidSubips.length > 0
                                                ? false
                                                : value;
                                        }}
                                        placeholderChar={'\u2000'}
                                        keepCharPositions={true}
                                        showMask
                                        value={value || ''}
                                        onChange={(e:any) => {
                                            onChange(e);
                                            temp(e.target.value);
                                         }}
                                   />
                                )}
                            />
                            <Module.ErrorMessage>{error}</Module.ErrorMessage>

                            <Module.Label>Network</Module.Label>
                            <Module.Select {...register('network')} defaultValue={props?.networkId}>
                                {layerThreeNetworks.data.map(
                                    (x: any, index: number) => (
                                        <option
                                            key={index}
                                            value={x.id}>
                                            {`${x.title} - ${x.netIp}`}
                                        </option>
                                    )
                                )}
                            </Module.Select>

                            <Module.Label>Description</Module.Label>
                            <Controller
                                name='hostAddressDescription'
                                control={control}
                                defaultValue={
                                    props?.description || '<p></p>'
                                }
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
