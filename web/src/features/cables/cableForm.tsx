import { Controller, FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import * as FormStyle from '../../common/Styles/form.style';
import ReactQuill from 'react-quill';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCable, createCable, updateCable } from './cablesSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { scrolIds } from './cableData';
import { useHistory, useParams } from 'react-router-dom';

function CableForm() {
    const methods = useForm();
    const dispatch = useDispatch();
    const singleCable: any = useSelector((state: any) => state.cable.singleCable);
    let { id } = useParams<{ id: string }>();
    let cable: any = { general: {} };
    let history = useHistory();

    useEffect(() => {
        if (id) dispatch(fetchCable(id));
    }, [dispatch, id]);

    const isEdit = window.location.href.includes('edit')

    const mainPage = () => {
        history.push('/cable');
    }

    const onSubmit = async (data: any) => {
        cable = {
            cableType: data.cableType,
            cableLength: data.cableLength,
            cableMeasure: data.cableMeasure,
            color: data.color,
            description: data.description,
            general: {
                title: data.generalTitle,
                purpose: data.purpose,
                status: data.status,
                tag: data.tags,
                description: data.generalDescription
            }
        };
        if (isEdit) {
            cable['id'] = id;
            cable.general.id = singleCable.data.generalId;
            await dispatch(updateCable(cable));
        } else {
            await dispatch(createCable(cable));
        }
        
        mainPage()
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new cable</FormStyle.FormName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {isEdit ? (
                            singleCable.data.general && (
                                <General
                                    general={singleCable.data.general}
                                />
                            )
                        ) : (
                            <General  />
                        )}

                        <FormStyle.Container id={'Cable'}>
                            {((singleCable.data && singleCable.status === 'completed') ||
                                !isEdit) && (
                                <FormStyle.Column>
                                    <FormStyle.ComponentName>
                                        Cable
                                    </FormStyle.ComponentName>
                                    <FormStyle.Label>Cable type</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('cableType')}
                                        defaultValue={singleCable.data.cableType}
                                    />
                                    <FormStyle.Label>
                                        Cable length
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('cableLength')}
                                        defaultValue={singleCable.data.cableLength}
                                    />
                                    <FormStyle.Label>
                                        Cable length measure
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('cableLengthMeasure')}
                                        defaultValue={singleCable.data.cableLengthMeasure}
                                    />
                                    <FormStyle.Label>
                                        Color
                                    </FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('color')}
                                        defaultValue={
                                            singleCable.data.color
                                        }
                                    />
                                    <FormStyle.Label>
                                        Description
                                    </FormStyle.Label>
                                    <Controller
                                        name='description'
                                        control={methods.control}
                                        defaultValue={
                                            singleCable.data.description || '<p></p>'
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

export default CableForm;
