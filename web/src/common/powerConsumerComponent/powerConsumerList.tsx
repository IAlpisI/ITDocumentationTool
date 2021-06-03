import * as Module from '../Styles/tabList.style';
import { Button } from '../Styles/common.style';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PowerConsumerForm } from './PowerConsumer';
import {
    createPowerConsumerForServer,
    updatePowerConsumerForServer,
    fetchServer
} from '../../features/serverDevice/serverSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DataAcceptWindow } from '../popWindows';
import * as FormStyle from '../Styles/form.style';
import TableContainer from '../TableContainer';
import { Header, Links } from './powerConsumerData';
import { Convert } from '../helpers/filterKeys';
import PowerConsumerTab from '../Tabs/powerConsumerTab';

const PowerConsumerList = (powerConsumerList: any) => {
    const methods = useForm();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    let powerConsumer: any;

    const [showPowerConsumer, setShowPowerConsumer] = useState<boolean>(false);
    const [editPowerConsumer, setEditPowerConsumer] = useState<{
        show: boolean;
        id: number;
    }>({ show: false, id: 0 });

    const [detailPowerConsumer, setDetailPowerConsumer] = useState<{
        show: boolean;
        id: number;
    }>({ show: false, id: 0 });

    const toggleDetailPowerConsumer = (id: number) => {
        setDetailPowerConsumer({ show: !detailPowerConsumer.show, id });
    };

    const setDetailPowerConsumerFalse = () => {
        setDetailPowerConsumer({ ...detailPowerConsumer, show: false });
    };

    const setEditPowerConsumerShowToFalse = () => {
        setEditPowerConsumer({ ...editPowerConsumer, show: false });
    };

    const toggleAddPowerConsumer = () => {
        setShowPowerConsumer((showPowerConsumer) => !showPowerConsumer);
        methods.reset();
    };

    const toggleSetPowerConsumer = (id: number) => {
        setEditPowerConsumer({ show: !editPowerConsumer.show, id });
        toggleAddPowerConsumer();
    };

    const onSubmit = (data: any) => {
        powerConsumer = {
            title: data.powerConsumerTitle,
            manufacturer: data.powerConsumerManufacturer,
            powermodel: data.powermodel,
            volt: data.volt,
            watt: data.watt,
            ampere: data.ampere,
            serverDeviceId: id,
            description: data.powerConsumerDescription
        };

        console.log(powerConsumer);

        if (editPowerConsumer.show) {
            powerConsumer['id'] = editPowerConsumer.id;
            dispatch(updatePowerConsumerForServer(powerConsumer));
        } else {
            dispatch(createPowerConsumerForServer(powerConsumer));
        }
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    function filter([key, _]: any) {
        return (
            key !== 'description' &&
            key !== 'serverDeviceId' &&
            key !== 'powerModel'
        );
    }

    const getMemory = (id: number) => {
        if (powerConsumerList.powerConsumerList) {
            const value = powerConsumerList.powerConsumerList.find(
                (x: any) => x.id === id
            );
            return value;
        }
        return [];
    };

    return (
        <>
            {showPowerConsumer && (
                <DataAcceptWindow>
                    <FormProvider {...methods}>
                        <form
                            onKeyDown={(e) => checkKeyDown(e)}
                            autoComplete='off'
                            onSubmit={methods.handleSubmit(onSubmit)}>
                            {editPowerConsumer.show ? (
                                <PowerConsumerForm
                                    powerConsumer={getMemory(
                                        editPowerConsumer.id
                                    )}
                                />
                            ) : (
                                <PowerConsumerForm />
                            )}

                            <FormStyle.FormSpacingButtons>
                                <FormStyle.TableConfirmationButton
                                    primary={'primary'}
                                    id={'Save'}
                                    type='submit'>
                                    Submit
                                </FormStyle.TableConfirmationButton>
                                <FormStyle.TableConfirmationButton
                                    type='button'
                                    onClick={() => {
                                        setEditPowerConsumerShowToFalse();
                                        toggleAddPowerConsumer();
                                    }}
                                    primary={''}>
                                    Cancel
                                </FormStyle.TableConfirmationButton>
                            </FormStyle.FormSpacingButtons>
                        </form>
                    </FormProvider>
                </DataAcceptWindow>
            )}
            {detailPowerConsumer.show && (
                <DataAcceptWindow>
                    <PowerConsumerTab {...getMemory(detailPowerConsumer.id)} />
                    <Button
                        type='button'
                        onClick={setDetailPowerConsumerFalse}
                        margin='-30px 0 0 -330px'
                        width='70px'
                        height='35px'
                        background>
                        Close
                    </Button>
                </DataAcceptWindow>
            )}
            <Module.Container>
                <Module.ContentLayout>
                    <Module.TableFlow>
                        <Button
                            onClick={() => {
                                toggleAddPowerConsumer();
                                setEditPowerConsumerShowToFalse();
                            }}
                            padding={'5px'}
                            height={'25px'}
                            width={'150px'}
                            background>
                            Add power
                        </Button>
                        <TableContainer
                            width={'100%'}
                            tableList={Convert(
                                powerConsumerList.powerConsumerList,
                                filter
                            )}
                            tableHeader={Header}
                            tableLinks={Links}
                            tableButtons={false}
                            tableNameActive={false}
                            displayEdit={false}
                            addActivasionFunction={toggleSetPowerConsumer}
                            detailsActivasionFunction={
                                toggleDetailPowerConsumer
                            }
                            displayAdd
                            fetchOne={fetchServer}
                            removePadding
                        />
                    </Module.TableFlow>
                </Module.ContentLayout>
            </Module.Container>
        </>
    );
};

export default PowerConsumerList;
