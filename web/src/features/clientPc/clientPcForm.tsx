import { FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import { Memory } from '../../common/memoryComponent/memory';
import { CPU } from '../../common/cpuComponent/cpu';
import { PowerConsumerForm } from '../../common/powerConsumerComponent/PowerConsumer';
import * as FormStyle from '../../common/Styles/form.style';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchClient, createClient, updateClient } from './clientPcSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { scrollIds } from './clientPcData';

const ClientForm = () => {
    const methods = useForm();
    const dispatch = useDispatch();
    const clientPc: any = useSelector(
        (state: any) => state.client.singleClient
    );
    let { id } = useParams<{ id: string }>();
    let history = useHistory();
    let client: any = {
        general: {},
        memory: {},
        cpu: {},
        desktop: {},
        powerconsumer: {}
    };

    useEffect(() => {
        if (id) dispatch(fetchClient(id));
        console.log(clientPc);
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        client = {
            // generalid: clientPc.data.generalId,
            // memoryid: clientPc.data.memoryId,
            // cpuid: clientPc.data.cpuId,
            // powerconsumerid: clientPc.data.powerConsumerId,
            general: {
                id: clientPc.data.generalId,
                title: data.generalTitle,
                purpose: data.purpose,
                status: data.status,
                tag: data.tags,
                description: data.generalDescription
            },
            memory: {
                id: clientPc.data.memoryId,
                title: data.memoryTitle,
                manufacturer: data.memoryManufacturer,
                type: data.memoryType,
                capacity: data.capacity,
                capacitytype: data.capacitytype,
                description: data.memoryDescription
            },
            cpu: {
                id: clientPc.data.cpuId,
                title: data.title,
                manufacturer: data.cpuManufacturer,
                cpucores: data.cpuCores,
                type: data.cpuType,
                cpufrequency: data.cpuFrequency,
                cpufrequencytype: data.cpuFrequencytype,
                description: data.cpuDescription
            },
            powerconsumer: {
                id: clientPc.data.powerConsumerId,
                title: data.title,
                manufacturer: data.powerConsumerManufacturer,
                powermodel: data.powermodel,
                volt: data.volt,
                watt: data.watt,
                ampere: data.ampere,
                description: data.powerConsumerDescription
            }
        };
        console.log(client)
        if (window.location.href.includes('edit')) {
            client['id'] = parseInt(id);
            console.log(client);
            await dispatch(updateClient(client));
        } else {
            await dispatch(createClient(client));
        }
        history.push('/client');
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new client</FormStyle.FormName>
                <FormStyle.LinkName>Test</FormStyle.LinkName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {window.location.href.includes('edit') ? (
                            clientPc.data.general && (
                                <General
                                    id={'General'}
                                    general={clientPc.data.general}
                                />
                            )
                        ) : (
                            <General id={'General'} />
                        )}

                        {window.location.href.includes('edit') ? (
                            clientPc.data.memory && (
                                <Memory
                                    id={'Memory'}
                                    memory={clientPc.data.memory}
                                />
                            )
                        ) : (
                            <Memory id={'Memory'} />
                        )}

                        {window.location.href.includes('edit') ? (
                            clientPc.data.cpu && (
                                <CPU id={'CPU'} CPU={clientPc.data.cpu} />
                            )
                        ) : (
                            <CPU id={'CPU'} />
                        )}

                        {window.location.href.includes('edit') ? (
                            clientPc.data.powerConsumer && (
                                <PowerConsumerForm
                                    id={'PowerConsumer'}
                                    powerConsumer={clientPc.data.powerConsumer}
                                />
                            )
                        ) : (
                            <PowerConsumerForm id={'PowerConsumer'} />
                        )}

                        <FormStyle.FormSpacingButtons>
                            <FormStyle.TableConfirmationButton
                                primary={'primary'}
                                id={'Save'}
                                type='submit'>
                                Submit
                            </FormStyle.TableConfirmationButton>
                            <FormStyle.TableConfirmationButton type='button' primary={''}>
                                Cancel
                            </FormStyle.TableConfirmationButton>
                        </FormStyle.FormSpacingButtons>
                    </form>
                </FormProvider>
                <FormStyle.SpyMenu>
                    <Scrollspy
                        items={scrollIds}
                        currentClassName='is-current'
                        style={{ listStyle: 'none' }}
                        offset={-450}>
                        {scrollIds.map((item, index) => (
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
};

export default ClientForm;
