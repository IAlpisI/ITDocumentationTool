import * as Module from '../Styles/tabList.style';
import { Button } from '../Styles/common.style';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { CPUForm } from './cpu';
import {
    createCPUForServer,
    updateCPUForServer,
    fetchServer
} from '../../features/serverDevice/serverSlice';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { DataAcceptWindow } from '../popWindows';
import * as FormStyle from '../Styles/form.style';
import TableContainer from '../TableContainer';
import { Header, Links } from './cpuData';
import { Convert } from '../helpers/filterKeys';
import CPUTab from '../Tabs/cpuTab';

const MemoryList = (CPUlist: any) => {
    const methods = useForm();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    let CPU: any;

    const [showCPU, setShowCPU] = useState<boolean>(false);
    const [editCPU, setEditCPU] = useState<{ show: boolean; id: number }>(
        { show: false, id: 0 }
    );

    const [detailCPU, setDetailCPU] = useState<{
        show: boolean;
        id: number;
    }>({ show: false, id: 0 });

    const toggleDetailMemory = (id: number) => {
        setDetailCPU({ show: !detailCPU.show, id });
    };

    const setDetailMemoryFalse = () => {
        setDetailCPU({ ...detailCPU, show: false });
    };

    const setEditMomoryShowToFalse = () => {
        setEditCPU({ ...editCPU, show: false });
    };

    const toggleAddMemory = () => {
        setShowCPU((showCPU) => !showCPU);
        methods.reset();
    };

    const toggleSetMemory = (id: number) => {
        setEditCPU({ show: !editCPU.show, id });
        toggleAddMemory();
    };

    const onSubmit = (data: any) => {
        CPU = {
            title: data.cppuTitle,
            cpuCores: data.cpuManufacturer,
            manufacturer: data.cpuManufacture,
            type: data.cpuType,
            cpuFrequency: data.cpuFrequency,
            cpuFrequencyType: data.cpuFrequencytype,
            description: data.cpuDescription,
        };

        if (editCPU.show) {
            CPU['id'] = editCPU.id;
            dispatch(updateCPUForServer(CPU));
        } else {
            dispatch(createCPUForServer(CPU));
        }
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    function filter([key, _]: any) {
        return key !== 'description' && key !== 'serverDeviceId';
    }

    const getMemory = (id: number) => {
        if (CPUlist.CPUlist) {
            const value = CPUlist.CPUlist.find((x: any) => x.id === id);
            return value;
        }
        return [];
    };

    return (
        <>
            {showCPU && (
                <DataAcceptWindow>
                    <FormProvider {...methods}>
                        <form
                            onKeyDown={(e) => checkKeyDown(e)}
                            autoComplete='off'
                            onSubmit={methods.handleSubmit(onSubmit)}>
                            {editCPU.show ? (
                                <CPUForm CPU={getMemory(editCPU.id)} />
                            ) : (
                                <CPUForm />
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
                                        setEditMomoryShowToFalse();
                                        toggleAddMemory();
                                    }}
                                    primary={''}>
                                    Cancel
                                </FormStyle.TableConfirmationButton>
                            </FormStyle.FormSpacingButtons>
                        </form>
                    </FormProvider>
                </DataAcceptWindow>
            )}
            {detailCPU.show && (
                <DataAcceptWindow>
                    <CPUTab {...getMemory(detailCPU.id)} />
                    <FormStyle.TableConfirmationButton
                        type='button'
                        onClick={setDetailMemoryFalse}
                        primary={''}>
                        Close
                    </FormStyle.TableConfirmationButton>
                </DataAcceptWindow>
            )}
            <Module.Container>
                <Module.ContentLayout>
                    <Module.TableFlow>
                        <Button
                            onClick={() => {
                                toggleAddMemory();
                                setEditMomoryShowToFalse();
                            }}
                            padding={'5px'}
                            height={'25px'}
                            width={'150px'}
                            background>
                            Add CPU
                        </Button>
                        <TableContainer
                            tableList={Convert(CPUlist.CPUlist, filter)}
                            tableHeader={Header}
                            tableLinks={Links}
                            tableButtons={false}
                            tableNameActive={false}
                            displayEdit={false}
                            addActivasionFunction={toggleSetMemory}
                            detailsActivasionFunction={toggleDetailMemory}
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

export default MemoryList;
