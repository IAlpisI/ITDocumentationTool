import { Controller, FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import * as FormStyle from '../../common/Styles/form.style';
import ReactQuill from 'react-quill';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLayerThreeNetwork, createLayerThreeNetwork, updateLayerThreeNetwork } from './layerThreeNetworkSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { scrolIds } from './layerThreeNetworkData';
import { useHistory, useParams } from 'react-router-dom';

function LayerThreeNetworkForm() {
    const methods = useForm();
    const isEdit = window.location.href.includes('edit');
    const dispatch = useDispatch();
    const layerThreeNetwork: any = useSelector((state: any) => state.layerThreeNetwork.layerThreeNetwork);

    let { id } = useParams<{ id: string }>();
    let person: any = { general: {} };
    let history = useHistory();

    useEffect(() => {
        if (id) dispatch(fetchLayerThreeNetwork(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        person = {
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
        if (isEdit) {
            person['id'] = id;
            await dispatch(updateLayerThreeNetwork(person));
        } else {
            await dispatch(createLayerThreeNetwork(person));
        }
        history.push('/people');
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
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
                                    id={'General'}
                                    general={layerThreeNetwork.data.general}
                                />
                            )
                        ) : (
                            <General id={'General'} />
                        )}

                        <FormStyle.Container id={'Network'}>
                            {((layerThreeNetwork.data && layerThreeNetwork.status === 'completed') ||
                                !isEdit) && (
                                <FormStyle.Column>
                                    <FormStyle.ComponentName>
                                        Network
                                    </FormStyle.ComponentName>
                                    <FormStyle.Label>Net Ip</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('netIp')}
                                        defaultValue={layerThreeNetwork.data.fullName}
                                    />
                                    <FormStyle.Label>
                                        Prefix
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('prefix')}
                                        defaultValue={layerThreeNetwork.data.emailAddress}
                                    />
                                    <FormStyle.Label>
                                        Description
                                    </FormStyle.Label>
                                    <Controller
                                        name='description'
                                        control={methods.control}
                                        defaultValue={
                                            layerThreeNetwork.data.description || '<p></p>'
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
