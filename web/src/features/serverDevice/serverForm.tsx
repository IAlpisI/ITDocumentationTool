import { FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import { FormFactor } from '../../common/formFactoryComponent/formfactor';
import * as FormStyle from '../../common/Styles/form.style';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchServer, createServer, updateServer } from './serverSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { scrolIds } from './serverData';
import { useHistory, useParams } from 'react-router-dom';
import { HostAddress } from '../../common/hostAddress/hostAddress';

function ServerForm() {
    const methods = useForm();
    const dispatch = useDispatch();
    const serverDevice: any = useSelector(
        (state: any) => state.server.singleServer
    );
    let { id } = useParams<{ id: string }>();
    let server: any = { general: {}, formfactor: {} };
    let history = useHistory();

    const isEdit = window.location.href.includes('edit');

    const mainPage = () => {
        history.push('/server');
    };

    useEffect(() => {
        if (id) dispatch(fetchServer(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        server = {
            general: {
                title: data.generalTitle,
                purpose: data.purpose,
                status: data.status,
                tag: data.tags,
                description: data.generalDescription
            },
            formfactor: {
                name: data.name,
                dimesnsionUnit: data.dimensionUnit,
                width: data.width,
                height: data.height,
                depth: data.depth,
                weight: data.weight,
                weightmeasure: data.weightMeasure,
                description: data.fomrFactorDescription
            },
            // hostaddress: {
            //     address: data.address,
            //     networkId: data.network,
            //     description: data.hostAddressDescription
            // }
        };
        if (isEdit) {
            server['id'] = id;
            // server.hostaddress = serverDevice.data.hostAddress?.id;
            await dispatch(updateServer(server));
        } else {
            console.log(server);
            await dispatch(createServer(server));
        }

        mainPage();
    };

    console.log(serverDevice)

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new server</FormStyle.FormName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {isEdit ? (
                            serverDevice.data.general && (
                                <General general={serverDevice.data.general} />
                            )
                        ) : (
                            <General />
                        )}

                        {isEdit ? (
                            serverDevice.data.formFactor && (
                                <FormFactor
                                    formFactor={serverDevice.data.formFactor}
                                />
                            )
                        ) : (
                            <FormFactor />
                        )}
{/* 
                        {isEdit ? (
                            serverDevice.data.hostAddress && (
                                <HostAddress
                                    props={serverDevice.data.hostAddress}
                                />
                            )
                        ) : (
                            <HostAddress />
                        )} */}

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

export default ServerForm;
