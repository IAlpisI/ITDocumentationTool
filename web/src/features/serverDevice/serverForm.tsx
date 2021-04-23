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

function ServerForm() {
    const methods = useForm();
    const dispatch = useDispatch();
    const serverDevice: any = useSelector(
        (state: any) => state.server.singleServer
    );
    let { id } = useParams<{ id: string }>();
    let server: any = { general: {}, formfactor: {} };
    let history = useHistory();

    useEffect(() => {
        if (id) dispatch(fetchServer(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        server = {
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
            }
        };
        if (window.location.href.includes('edit')) {
            server['id'] = id;
            await dispatch(updateServer(server));
        } else {
            await dispatch(createServer(server));
        }
        history.push('/people');
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
                            serverDevice.data.general && (
                                <General
                                    id={'General'}
                                    general={serverDevice.data.general}
                                />
                            )
                        ) : (
                            <General id={'General'} />
                        )}

                        {window.location.href.includes('edit') ? (
                            serverDevice.data.formfactor && (
                                <FormFactor
                                    id={'FormFactor'}
                                    formFactor={serverDevice.data.formfactor}
                                />
                            )
                        ) : (
                            <FormFactor id={'FormFactor'} />
                        )}

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

export default ServerForm;
