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
    const routerDevice: any = useSelector(
        (state: any) => state.router.singleRouter
    );
    let { id } = useParams<{ id: string }>();
    let router: any = { general: {}, formfactor: {}, powerconsumer: {} };
    let history = useHistory();

    const isEdit = window.location.href.includes('edit');

    const mainPage = () => {
        history.push('/router');
    };

    useEffect(() => {
        if (id) dispatch(fetchRouter(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        router = {
            routingprotocol: data.routingProtocol,
            gatewayaddress: data.gatewayAddress,

            general: {
                title: data.generalTitle,
                purpose: data.purpose,
                status: data.status,
                tag: data.tags,
                description: data.generalDescription
            },
            formfactor: {
                name: data.name,
                dimesnsionunit: data.dimensionUnit,
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
            },
            // hostaddress: {
            //     address: data.address,
            //     networkId: data.network,
            //     description: data.hostAddressDescription
            // }
        };
        if (isEdit) {
            router['id'] = id;
            router.general.id = routerDevice.data.generalId;
            router.formfactor.id = routerDevice.data.formFactorId;
            router.powerconsumer.id = routerDevice.data.powerConsumerId;
            // router.hostaddress.id = routerDevice.data.hostAddress.id;

            console.log(routerDevice)
            console.log(router)
            await dispatch(updateRouter(router));
        } else {
            await dispatch(createRouter(router));
        }

        mainPage();
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new router</FormStyle.FormName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {isEdit ? (
                            routerDevice.data.general && (
                                <General general={routerDevice.data.general} />
                            )
                        ) : (
                            <General />
                        )}

                        {isEdit ? (
                            routerDevice.data.general && (
                                <PowerConsumerForm
                                    powerConsumer={routerDevice.data.general}
                                />
                            )
                        ) : (
                            <PowerConsumerForm />
                        )}

                        {isEdit ? (
                            routerDevice.data.general && (
                                <FormFactor
                                    formFactor={routerDevice.data.general}
                                />
                            )
                        ) : (
                            <FormFactor />
                        )}

                        {/* {isEdit ? (
                            routerDevice.data.hostAddress && (
                                <HostAddress
                                    props={routerDevice.data.hostAddress}
                                />
                            )
                        ) : (
                            <HostAddress />
                        )} */}

                        <FormStyle.Container id={'Router'}>
                            {((routerDevice.data && routerDevice.status === 'completed') ||
                                !isEdit) && (
                                    <FormStyle.Column>
                                        <FormStyle.ComponentName>
                                            Router
                                        </FormStyle.ComponentName>
                                        <FormStyle.Label>
                                            Routing protocol
                                        </FormStyle.Label>
                                        <FormStyle.Input
                                            {...methods.register('routingProtocol')}
                                            defaultValue={
                                                routerDevice.data.routingProtocol
                                            }
                                        />
                                        <FormStyle.Label>
                                            Gateway address
                                        </FormStyle.Label>
                                        <FormStyle.Input
                                            {...methods.register('gatewayAddress')}
                                            defaultValue={
                                                routerDevice.data.gatewayAddress
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
                            <FormStyle.TableConfirmationButton
                                onClick={mainPage}
                                primary={''}>
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

export default RouterForm;
