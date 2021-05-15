import { Controller, FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import * as FormStyle from '../../common/Styles/form.style';
import ReactQuill from 'react-quill';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
    fetchLayerThreeNetwork,
    createLayerThreeNetwork,
    updateLayerThreeNetwork
} from './layerThreeNetworkSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { scrolIds } from './layerThreeNetworkData';
import { useHistory, useParams } from 'react-router-dom';
import { Netmask } from 'netmask';

function LayerThreeNetworkForm() {
    const methods = useForm();
    const isEdit = window.location.href.includes('edit');
    const dispatch = useDispatch();
    const layerThreeNetwork: any = useSelector(
        (state: any) => state.layerThreeNetwork.layerThreeNetwork
    );

    let { id } = useParams<{ id: string }>();
    let network: any = { general: {} };
    let history = useHistory();

    let prefix = 0;

    useEffect(() => {
        if (id) dispatch(fetchLayerThreeNetwork(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        
        network = {
            netIp: data.netIp,
            prefix: data.prefix,
            general: {
                title: data.generalTitle,
                purpose: data.purpose,
                status: data.status,
                tag: data.tags,
                description: data.generalDescription
            }
        };
        console.log(network);

        if (isEdit) {
            network['id'] = id;
            await dispatch(updateLayerThreeNetwork(network));
        } else {
            await dispatch(createLayerThreeNetwork(network));
        }
        history.push('/layerThreeNetwork');
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    const getPrefixes = () => {
        const prefix = [];
        for (let x = 0; x <= 32; x++) {
            prefix.push(x);
        }

        return prefix;
    };

    const updateAddresses = () => {
        const address = methods.getValues('netIp');
        const prefix = methods.getValues('prefix');

        if (address && prefix) {
            const net = new Netmask(`${address}/${prefix}`);
            methods.setValue('firstAddress', net.first);
            methods.setValue('lastAddress', net.last);
            methods.setValue('netmask', net.mask);
        }
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new network</FormStyle.FormName>
                <FormStyle.LinkName>Test</FormStyle.LinkName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {isEdit ? (
                            layerThreeNetwork.data.general && (
                                <General
                                    general={layerThreeNetwork.data.general}
                                />
                            )
                        ) : (
                            <General />
                        )}

                        <FormStyle.Container id={'Network'}>
                            {((layerThreeNetwork.data &&
                                layerThreeNetwork.status === 'completed') ||
                                !isEdit) && (
                                <FormStyle.Column>
                                    <FormStyle.ComponentName>
                                        Network
                                    </FormStyle.ComponentName>
                                    <FormStyle.Label>Type</FormStyle.Label>
                                    <FormStyle.Label>Net Ip</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('netIp')}
                                        defaultValue={
                                            layerThreeNetwork.data.netIp
                                        }
                                    />
                                    <FormStyle.Label>Netmask</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('netmask')}
                                    />
                                    <FormStyle.Label>
                                        Address range
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('firstAddress')}
                                    />
                                    -
                                    <FormStyle.Input
                                        {...methods.register('lastAddress')}
                                    />

                                    <FormStyle.Label>Prefix</FormStyle.Label>
                                    <FormStyle.Select
                                        onClick={() => {
                                            updateAddresses();
                                        }}
                                        {...methods.register('prefix')}
                                        defaultValue={prefix}>
                                        {getPrefixes().map(
                                            (x: any, index: any) => (
                                                <option key={index} value={x}>
                                                    {x}
                                                </option>
                                            )
                                        )}
                                    </FormStyle.Select>
                                    {/* <FormStyle.Label>
                                        Description
                                    </FormStyle.Label> */}
                                    {/* <Controller
                                        name='description'
                                        control={methods.control}
                                        defaultValue={
                                            layerThreeNetwork.data
                                                .description || '<p></p>'
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
                                    /> */}
                                </FormStyle.Column>
                            )}
                        </FormStyle.Container>

                        <FormStyle.FormSpacingButtons>
                            <FormStyle.TableConfirmationButton
                                primary={'primary'}
                                id={'Save'}
                                type='submit'>
                                Submit
                            </FormStyle.TableConfirmationButton>
                            <FormStyle.TableConfirmationButton primary={''}>
                                Cancel
                            </FormStyle.TableConfirmationButton>
                        </FormStyle.FormSpacingButtons>
                    </form>
                </FormProvider>
                <FormStyle.SpyMenu>
                    <Scrollspy
                        items={scrolIds}
                        currentClassName='is-current'
                        style={{ listStyle: 'none' }}
                        offset={-450}>
                        {scrolIds.map((item, index) => (
                            <FormStyle.SpyLi key={index}>
                                <FormStyle.SpyA href={`#${item}`}>
                                    {item}
                                </FormStyle.SpyA>
                            </FormStyle.SpyLi>
                        ))}
                    </Scrollspy>
                </FormStyle.SpyMenu>
            </FormStyle.FormsContainer>
        </FormStyle.FormContainer>
    );
}

export default LayerThreeNetworkForm;
