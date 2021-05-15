import { FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import * as FormStyle from '../../common/Styles/form.style';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchApplication, createApplication, updateApplication } from './applicationSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { scrollIds } from './applicationData';
import { LicenseKey } from '../../common/licenseKeyComponent/licenseKey';

const ApplicationForm = () => {
    const methods = useForm();
    const [licenzeCount, setLicenzeCount] = useState<number>(1)
    const dispatch = useDispatch();
    const isEdit = window.location.href.includes('edit');
    const software: any = useSelector(
        (state: any) => state.application.singleApplication
    );
    let { id } = useParams<{ id: string }>();
    let history = useHistory();
    let application: any = {
        general: {},
        licenseKey: {}
    };

    useEffect(() => {
        if (id) dispatch(fetchApplication(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {

        application = {
            specification: data.specification,
            manufacturer: data.manufacturer,
            general: {
                id: software.data.generalId,
                title: data.generalTitle,
                purpose: data.purpose,
                status: data.status,
                tag: data.tags,
                description: data.generalDescription
            },
        };
        console.log(application)
        if (isEdit) {
            application['id'] = parseInt(id);
            await dispatch(updateApplication(application));
        } else {
            await dispatch(createApplication(application));
        }
        history.push('/application');
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new software</FormStyle.FormName>
                <FormStyle.LinkName>Test</FormStyle.LinkName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        >
                        {isEdit? (
                            software.data.general && (
                                <General
                                    general={software.data.general}
                                />
                            ) 
                        ) : (
                            <General />
                        )}

                        <FormStyle.Container id={'Specification'}>
                            {((software.data && software.status === 'completed') ||
                                !isEdit) && (
                                <FormStyle.Column>
                                    <FormStyle.ComponentName>
                                        Specification
                                    </FormStyle.ComponentName>
                                    <FormStyle.Label>Full name</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('specification')}
                                        defaultValue={software.data.fullName}
                                    />
                                    <FormStyle.Label>
                                        Manufacturer
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('manufacturer')}
                                        defaultValue={software.data.emailAddress}
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

export default ApplicationForm;
