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
import { HostAddress } from '../../common/hostAddress/hostAddress';

function SwitchForm() {
    const methods = useForm();
    const dispatch = useDispatch();
    const switchDevice = useSelector((state: any) => state.switch.singleSwitch);
    let { id } = useParams<{ id: string }>();
    let switchData: any = { general: {}, formfactor: {}, powerconsumer: {} };
    let history = useHistory();
    const isEdit = window.location.href.includes('edit');

    const mainPage = () => {
        history.push('/switch');
    };

    useEffect(() => {
        let temp;
        if (id) temp = dispatch(fetchSwitch(id));
        console.log(temp);
    }, [dispatch, id]);

    console.log(switchDevice);

    const onSubmit = async (data: any) => {
        switchData = {
            vlan: data.vlan,
            role: data.role,
            spanningtree: data.spanningtree,
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
        };
        if (isEdit) {
            switchData['id'] = id;
            switchData.general.id = switchDevice.data.generalId;
            switchData.formfactor.id = switchDevice.data.formFactorId;
            switchData.powerconsumer.id = switchDevice.data.powerConsumerId;

            await dispatch(updateSwitch(switchData));
        } else {
            await dispatch(createSwitch(switchData));
        }

        mainPage();
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new switch</FormStyle.FormName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {isEdit ? (
                            switchDevice.data.general && (
                                <General general={switchDevice.data?.general} />
                            )
                        ) : (
                            <General />
                        )}

                        {isEdit ? (
                            switchDevice.data.powerConsumer && (
                                <PowerConsumerForm
                                    powerConsumer={
                                        switchDevice.data.powerConsumer
                                    }
                                />
                            )
                        ) : (
                            <PowerConsumerForm />
                        )}

                        {isEdit ? (
                            switchDevice.data.formFactor && (
                                <FormFactor
                                    formFactor={switchDevice.data.formFactor}
                                />
                            )
                        ) : (
                            <FormFactor />
                        )}
{/* 
                        {isEdit ? (
                            switchDevice.data.hostAddress && (
                                <HostAddress
                                    props={switchDevice.data.hostAddress}
                                />
                            )
                        ) : (
                            <HostAddress />
                        )} */}

                        <FormStyle.Container id={'Switch'}>
                            {((switchDevice.data &&
                                switchDevice.status === 'completed') ||
                                !window.location.href.includes('edit')) && (
                                <FormStyle.Column>
                                    <FormStyle.ComponentName>
                                        Switch
                                    </FormStyle.ComponentName>
                                    <FormStyle.Label>Vlan</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('vlan')}
                                        defaultValue={switchDevice.data.vlan}
                                    />
                                    <FormStyle.Label>Role</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('role')}
                                        defaultValue={switchDevice.data.role}
                                    />
                                    <FormStyle.Label>
                                        Spanning tree
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('spanningTree')}
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

export default SwitchForm;
