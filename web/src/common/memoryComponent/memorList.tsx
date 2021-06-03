import * as Module from '../Styles/tabList.style';
import { Button } from '../Styles/common.style';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Memory } from '../memoryComponent/memory';
import {
    createMemoryForServer,
    updateMemoryForServer,
    fetchServer
} from '../../features/serverDevice/serverSlice';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { DataAcceptWindow } from '../popWindows';
import * as FormStyle from '../Styles/form.style';
import TableContainer from '../TableContainer';
import { Header, Links } from './memoryData';
import { Convert } from '../helpers/filterKeys';
import MemoryTab from '../Tabs/memoryTab';

const MemoryList = (memoryList: any) => {
    const methods = useForm();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    let memory: any;

    const [showMemory, setShowMemory] = useState<boolean>(false);
    const [editMemory, setEditMemory] = useState<{ show: boolean; id: number }>(
        { show: false, id: 0 }
    );

    const [detailMemory, setDetailMemory] = useState<{
        show: boolean;
        id: number;
    }>({ show: false, id: 0 });

    const toggleDetailMemory = (id: number) => {
        setDetailMemory({ show: !detailMemory.show, id });
    };

    const setDetailMemoryFalse = () => {
        setDetailMemory({ ...detailMemory, show: false });
    };

    const setEditMomoryShowToFalse = () => {
        setEditMemory({ ...editMemory, show: false });
    };

    const toggleAddMemory = () => {
        setShowMemory((showMemory) => !showMemory);
        methods.reset();
    };

    const toggleSetMemory = (id: number) => {
        setEditMemory({ show: !editMemory.show, id });
        toggleAddMemory();
    };

    const onSubmit = (data: any) => {
        memory = {
            title: data.memoryTitle,
            manufacturer: data.memoryManufacturer,
            type: data.memoryType,
            capacity: data.capacity,
            capacitytype: data.capacitytype,
            serverDeviceId: id,
            description: data.memoryDescription
        };

        if (editMemory.show) {
            memory['id'] = editMemory.id;
            dispatch(updateMemoryForServer(memory));
        } else {
            dispatch(createMemoryForServer(memory));
        }
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    function filter([key, _]: any) {
        return key !== 'description' && key !== 'serverDeviceId';
    }

    const getMemory = (id: number) => {
        if (memoryList.memoryList) {
            const value = memoryList.memoryList.find((x: any) => x.id === id);
            return value;
        }
        return [];
    };

    return (
        <>
            {showMemory && (
                <DataAcceptWindow>
                    <FormProvider {...methods}>
                        <form
                            onKeyDown={(e) => checkKeyDown(e)}
                            autoComplete='off'
                            onSubmit={methods.handleSubmit(onSubmit)}>
                            {editMemory.show ? (
                                <Memory memory={getMemory(editMemory.id)} />
                            ) : (
                                <Memory />
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
            {detailMemory.show && (
                <DataAcceptWindow>
                    <MemoryTab {...getMemory(detailMemory.id)} />
                    <Button
                        type='button'
                        onClick={setDetailMemoryFalse}
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
                                toggleAddMemory();
                                setEditMomoryShowToFalse();
                            }}
                            padding={'5px'}
                            height={'25px'}
                            width={'150px'}
                            background>
                            Add memory
                        </Button>
                        <TableContainer
                            width={'100%'}
                            tableList={Convert(memoryList.memoryList, filter)}
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
