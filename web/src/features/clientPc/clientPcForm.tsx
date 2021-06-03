import { FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import { Memory } from '../../common/memoryComponent/memory';
import { CPUForm } from '../../common/cpuComponent/cpu';
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
    const isEdit = window.location.href.includes('edit');

    useEffect(() => {
        if (id) dispatch(fetchClient(id));
    }, [dispatch, id]);

    const mainPage = () => {
        history.push('/client');
    }


    const onSubmit = async (data: any) => {
        client = {
            keyboardLayout: data.keyboardLayout,
            display: data.display,
            displayMeasure: data.displayMeasure,
            resolution: data.resolution,
            general: {
                title: data.generalTitle,
                purpose: data.purpose,
                status: data.status,
                tag: data.tags,
                description: data.generalDescription
            },
            memory: {
                title: data.memoryTitle,
                manufacturer: data.memoryManufacturer,
                type: data.memoryType,
                capacity: data.capacity,
                capacitytype: data.capacitytype,
                description: data.memoryDescription
            },
            cpu: {
                title: data.title,
                manufacturer: data.cpuManufacturer,
                cpucores: data.cpuCores,
                type: data.cpuType,
                cpufrequency: data.cpuFrequency,
                cpufrequencytype: data.cpuFrequencytype,
                description: data.cpuDescription
            },
            powerconsumer: {
                title: data.powerConsumerTitle,
                manufacturer: data.powerConsumerManufacturer,
                powermodel: data.powermodel,
                volt: data.volt,
                watt: data.watt,
                ampere: data.ampere,
                description: data.powerConsumerDescription
            },
        };
        if (isEdit) {
            client['id'] = parseInt(id);
            client.general.id = clientPc.data.generalId;
            client.memory.id = clientPc.data.memoryId;
            client.cpu.id = clientPc.data.cpuId;
            client.powerconsumer.id = clientPc.data.powerConsumerId;

            await dispatch(updateClient(client));
        } else {
            await dispatch(createClient(client));
        }
        mainPage()
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new client</FormStyle.FormName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {isEdit ? (
                            clientPc.data.general && (
                                <General general={clientPc.data.general} />
                            )
                        ) : (
                            <General />
                        )}

                        {isEdit ? (
                            clientPc.data.memory && (
                                <Memory memory={clientPc.data.memory} />
                            )
                        ) : (
                            <Memory />
                        )}

                        {isEdit ? (
                            clientPc.data.cpu && (
                                <CPUForm CPU={clientPc.data.cpu} />
                            )
                        ) : (
                            <CPUForm />
                        )}

                        {isEdit ? (
                            clientPc.data.powerConsumer && (
                                <PowerConsumerForm
                                    powerConsumer={clientPc.data.powerConsumer}
                                />
                            )
                        ) : (
                            <PowerConsumerForm />
                        )}

                        <FormStyle.Container id={'Client'}>
                            {((clientPc.data && clientPc.status === 'completed') ||
                                !isEdit) && (
                                <FormStyle.Column>
                                    <FormStyle.ComponentName>
                                        Client
                                    </FormStyle.ComponentName>
                                    <FormStyle.Label>Keyboard layout</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('keyboardLayout')}
                                        defaultValue={clientPc.data.keyboardLayout}
                                    />
                                    <FormStyle.Label>
                                        Display size
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('display')}
                                        defaultValue={clientPc.data.display}
                                    />
                                                      <FormStyle.Label>
                                        Display measure
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('displayMeasure')}
                                        defaultValue={clientPc.data.displayMeasure}
                                    />
                                    <FormStyle.Label>
                                        Resolution
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('resolution')}
                                        defaultValue={clientPc.data.resolution}
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
                            <FormStyle.TableConfirmationButton
                                type='button'
                                primary={''}
                                onClick={mainPage}
                                >
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
