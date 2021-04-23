import { FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import { PowerConsumerForm } from '../../common/powerConsumerComponent/PowerConsumer';
import { FormFactor } from '../../common/formFactoryComponent/formfactor';
import * as FormStyle from '../../common/Styles/form.style';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchRouter, createRouter, updateRouter } from './routerSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { scrolIds } from './routerData';
import { useHistory, useParams } from 'react-router-dom';

function RouterForm() {
    const methods = useForm();
    const dispatch = useDispatch();
    const routerList: any = useSelector(
        (state: any) => state.router.singleWorker
    );
    let { id } = useParams<{ id: string }>();
    let router: any = { general: {}, formfactor: {}, powerconsumer: {} };
    let history = useHistory();

    useEffect(() => {
        if (id) dispatch(fetchRouter(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        router = {
            routingprotocol: data.routingprotocol,
            gatewayaddress: data.gatewayaddress,
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
            router['id'] = id;
            await dispatch(updateRouter(router));
        } else {
            await dispatch(createRouter(router));
        }
        history.push('/router');
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new person</FormStyle.FormName>
                <FormStyle.LinkName>Test</FormStyle.LinkName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {window.location.href.includes('edit') ? (
                            routerList.data.general && (
                                <General
                                    id={'General'}
                                    general={routerList.data.general}
                                />
                            )
                        ) : (
                            <General id={'General'} />
                        )}

                        {window.location.href.includes('edit') ? (
                            routerList.data.general && (
                                <PowerConsumerForm
                                    id={'PowerConsumer'}
                                    powerConsumer={routerList.data.general}
                                />
                            )
                        ) : (
                            <PowerConsumerForm id={'PowerConsumer'} />
                        )}

                        {window.location.href.includes('edit') ? (
                            routerList.data.general && (
                                <FormFactor
                                    id={'FormFactor'}
                                    formFactor={routerList.data.general}
                                />
                            )
                        ) : (
                            <FormFactor id={'FormFactor'} />
                        )}

                        <FormStyle.Container id={'Person'}>
                            {routerList.data &&
                                routerList.status === 'completed' && (
                                    <FormStyle.Column>
                                        <FormStyle.ComponentName>
                                            Person
                                        </FormStyle.ComponentName>
                                        <FormStyle.Label>
                                            Full name
                                        </FormStyle.Label>
                                        <FormStyle.Input
                                            {...methods.register('fullName')}
                                            defaultValue={
                                                routerList.data.fullName
                                            }
                                        />
                                        <FormStyle.Label>
                                            Email address
                                        </FormStyle.Label>
                                        <FormStyle.Input
                                            {...methods.register(
                                                'emailAddress'
                                            )}
                                            defaultValue={
                                                routerList.data.emailAddress
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

export default RouterForm;
