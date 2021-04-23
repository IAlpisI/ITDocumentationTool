import { FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import * as FormStyle from '../../common/Styles/form.style';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PowerConsumerForm } from '../../common/powerConsumerComponent/PowerConsumer';
import { FormFactor } from '../../common/formFactoryComponent/formfactor';
import { fetchSwitch, createSwitch, updateSwitch } from './switchSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { scrolIds } from './switchData';
import { useHistory, useParams } from 'react-router-dom';

function WorkerForm() {
    const methods = useForm();
    const dispatch = useDispatch();
    const switchDevice: any = useSelector(
        (state: any) => state.switch.singleSwitch
    );
    let { id } = useParams<{ id: string }>();
    let switchData: any = { general: {}, formfactor: {}, powerconsumer: {} };
    let history = useHistory();

    useEffect(() => {
        if (id) dispatch(fetchSwitch(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        switchData = {
            fullName: data.fullName,
            emailAddress: data.emailAddress,
            companyNumber: data.companyNumber,
            personalNumber: data.personalNumber,
            description: data.description,
            general: {
                title: data.generalTitle,
                purpose: data.purpose,
                status: data.status,
                tag: data.tags,
                description: data.generalDescription
            },
            formfactor: {
                name: data.name,
                rackunit: data.rackunit,
                width: data.width,
                height: data.height,
                depth: data.depth,
                weight: data.weight,
                weightmeasure: data.weightMeasure,
                description: data.fomrFactorDescription
            },
            powerconsumer: {
                title: data.title,
                manufacturer: data.powerConsumerManufacturer,
                powermodel: data.powermodel,
                volt: data.volt,
                watt: data.watt,
                ampere: data.ampere,
                description: data.powerConsumerDescription
            }
        };
        if (window.location.href.includes('edit')) {
            switchData['id'] = id;
            await dispatch(updateSwitch(switchData));
        } else {
            await dispatch(createSwitch(switchData));
        }
        history.push('/people');
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new switchData</FormStyle.FormName>
                <FormStyle.LinkName>Test</FormStyle.LinkName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {window.location.href.includes('edit') ? (
                            switchDevice.data.general && (
                                <General
                                    id={'General'}
                                    general={switchDevice.data.general}
                                />
                            )
                        ) : (
                            <General id={'General'} />
                        )}

                        {window.location.href.includes('edit') ? (
                            switchData.data.general && (
                                <PowerConsumerForm
                                    id={'PowerConsumer'}
                                    powerConsumer={switchData.data.general}
                                />
                            )
                        ) : (
                            <PowerConsumerForm id={'PowerConsumer'} />
                        )}

                        {window.location.href.includes('edit') ? (
                            switchData.data.general && (
                                <FormFactor
                                    id={'FormFactor'}
                                    formFactor={switchData.data.general}
                                />
                            )
                        ) : (
                            <FormFactor id={'FormFactor'} />
                        )}

                        <FormStyle.Container id={'Person'}>
                            {switchDevice.data &&
                                switchDevice.status === 'completed' && (
                                    <FormStyle.Column>
                                        <FormStyle.ComponentName>
                                            Vlan
                                        </FormStyle.ComponentName>
                                        <FormStyle.Label>
                                            Full name
                                        </FormStyle.Label>
                                        <FormStyle.Input
                                            {...methods.register('vlan')}
                                            defaultValue={
                                                switchDevice.data.vlan
                                            }
                                        />
                                        <FormStyle.Label>Role</FormStyle.Label>
                                        <FormStyle.Input
                                            {...methods.register('role')}
                                            defaultValue={
                                                switchDevice.data.role
                                            }
                                        />
                                        <FormStyle.Label>
                                            Spanning tree
                                        </FormStyle.Label>
                                        <FormStyle.Input
                                            {...methods.register(
                                                'spanningTree'
                                            )}
                                            defaultValue={
                                                switchDevice.data.spanningTree
                                            }
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
                                <FormStyle.SpyA href={`'#'${item}'`}>
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

export default WorkerForm;
