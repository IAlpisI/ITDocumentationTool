import { Controller, FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import * as FormStyle from '../../common/Styles/form.style';
import ReactQuill from 'react-quill';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWorker, createWorker, updateWorker } from './workerSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { scrolIds } from './workerData';
import { useHistory, useParams } from 'react-router-dom';

function WorkerForm() {
    const methods = useForm();
    const dispatch = useDispatch();
    const worker: any = useSelector((state: any) => state.worker.singleWorker);
    let { id } = useParams<{ id: string }>();
    let person: any = { general: {} };
    let history = useHistory();

    useEffect(() => {
        if (id) dispatch(fetchWorker(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        person = {
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
            }
        };
        if (window.location.href.includes('edit')) {
            person['id'] = id;
            person.general.id = worker.data.generalId;
            await dispatch(updateWorker(person));
        } else {
            await dispatch(createWorker(person));
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
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {window.location.href.includes('edit') ? (
                            worker.data.general && (
                                <General general={worker.data.general} />
                            )
                        ) : (
                            <General />
                        )}

                        <FormStyle.Container id={'Person'}>
                            {((worker.data && worker.status === 'completed') ||
                                !window.location.href.includes('edit')) && (
                                <FormStyle.Column>
                                    <FormStyle.ComponentName>
                                        Person
                                    </FormStyle.ComponentName>
                                    <FormStyle.Label>Full name</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('fullName')}
                                        defaultValue={worker.data.fullName}
                                    />
                                    <FormStyle.Label>
                                        Email address
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('emailAddress')}
                                        defaultValue={worker.data.emailAddress}
                                    />
                                    <FormStyle.Label>
                                        Company number
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('companyNumber')}
                                        defaultValue={worker.data.companyNumber}
                                    />
                                    <FormStyle.Label>
                                        Personal number
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('personalNumber')}
                                        defaultValue={
                                            worker.data.personalNumber
                                        }
                                    />
                                    <FormStyle.Label>
                                        Description
                                    </FormStyle.Label>
                                    <Controller
                                        name='description'
                                        control={methods.control}
                                        defaultValue={
                                            worker.data.description || '<p></p>'
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
                            <FormStyle.TableConfirmationButton 
                                onClick={() => {
                                    history.push('/people')
                                }}
                            type={'button'} primary={''}>
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

export default WorkerForm;
