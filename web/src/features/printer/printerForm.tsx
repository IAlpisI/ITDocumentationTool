import { FormProvider, useForm } from 'react-hook-form';
import { General } from '../../common/generalComponent/general';
import * as FormStyle from '../../common/Styles/form.style';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPrinter, createPrinter, updatePrinter } from './printerSlice';
import React from 'react';
import { scrolIds } from './printerData';
import { useHistory, useParams } from 'react-router-dom';
import { HostAddress } from '../../common/hostAddress/hostAddress';

function PrinterForm() {
    const methods = useForm();
    const dispatch = useDispatch();
    const printer: any = useSelector(
        (state: any) => state.printer.singlePrinter
    );
    let { id } = useParams<{ id: string }>();
    let printerData: any = { general: {} };
    let history = useHistory();

    const isEdit = window.location.href.includes('edit');

    const mainPage = () => {
        history.push('/printer');
    };

    useEffect(() => {
        if (id) dispatch(fetchPrinter(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        printerData = {
            type: data.type,
            colored: data.colored,
            duplex: data.duplex,
            emulation: data.emulation,
            paperformat: data.paperformat,
            general: {
                title: data.generalTitle,
                purpose: data.purpose,
                status: data.status,
                tag: data.tags,
                description: data.generalDescription
            },
            hostaddress: {
                address: data.address,
                networkId: data.network,
                description: data.hostAddressDescription
            }
        };
        if (isEdit) {
            printerData['id'] = id;
            printerData.general.id = printer.data.generalId;
            printerData.hostaddress.id = printer.data.hostAddress.id;

            await dispatch(updatePrinter(printerData));
        } else {
            console.log(printerData)
            await dispatch(createPrinter(printerData));
        }
        mainPage();
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new printer</FormStyle.FormName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        {isEdit ? (
                            printer.data.general && (
                                <General general={printer.data.general} />
                            )
                        ) : (
                            <General />
                        )}

                        {isEdit ? (
                            printer.data.hostAddress && (
                                <HostAddress props={printer.data.hostAddress} />
                            )
                        ) : (
                            <HostAddress />
                        )}

                        <FormStyle.Container id={'Printer'}>
                            {((printer.data &&
                                printer.status === 'completed') ||
                                !isEdit) && (
                                <FormStyle.Column>
                                    <FormStyle.ComponentName>
                                        Printer
                                    </FormStyle.ComponentName>
                                    <FormStyle.Label>Type</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('type')}
                                        defaultValue={printer.data.type}
                                    />
                                    <FormStyle.Label>Colored</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('colored')}
                                        defaultValue={
                                            printer.data.colored || false
                                        }
                                    />
                                    <FormStyle.Label>Duplex</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('duplex')}
                                        defaultValue={
                                            printer.data.duplex || false
                                        }
                                    />
                                    <FormStyle.Label>Emulation</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('emulation')}
                                        defaultValue={printer.data.emulation}
                                    />
                                    <FormStyle.Label>
                                        Paper format
                                    </FormStyle.Label>
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

export default PrinterForm;
