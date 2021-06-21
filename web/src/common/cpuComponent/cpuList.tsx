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

const CPUList = (CPUlist: any) => {
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

    const toggleDetailCPU = (id: number) => {
        setDetailCPU({ show: !detailCPU.show, id });
    };

    const setDetailCPUFalse = () => {
        setDetailCPU({ ...detailCPU, show: false });
    };

    const setEditCPUShowToFalse = () => {
        setEditCPU({ ...editCPU, show: false });
    };

    const toggleAddCPU = () => {
        setShowCPU((showCPU) => !showCPU);
        methods.reset();
    };

    const toggleSetCPU = (id: number) => {
        setEditCPU({ show: !editCPU.show, id });
        toggleAddCPU();
    };

    const onSubmit = (data: any) => {
        CPU = {
            title: data.title,
            cpuCores: data.cpuCores,
            manufacturer: data.cpuManufacturer,
            type: data.cpuType,
            cpuFrequency: data.cpuFrequency,
            cpuFrequencyType: data.cpuFrequencyType,
            description: data.cpuDescription,
            serverdeviceid: id
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
        return key !== 'description' && key !== 'serverDeviceId'
         && key !== 'type' && key !== 'cpuFrequencyType' && key !== 'cpuFrequency'
    }

    const getCPU = (id: number) => {
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
                                <CPUForm CPU={getCPU(editCPU.id)} />
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
                                        setEditCPUShowToFalse();
                                        toggleAddCPU();
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
                    <CPUTab {...getCPU(detailCPU.id)} />
                    <Button
                        type='button'
                        onClick={setDetailCPUFalse}
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
                                toggleAddCPU();
                                setEditCPUShowToFalse();
                            }}
                            padding={'5px'}
                            height={'25px'}
                            width={'150px'}
                            background>
                            Add CPU
                        </Button>
                        <TableContainer
                            width={'100%'}
                            tableList={Convert(CPUlist.CPUlist, filter)}
                            tableHeader={Header}
                            tableLinks={Links}
                            tableButtons={false}
                            tableNameActive={false}
                            displayEdit={false}
                            addActivasionFunction={toggleSetCPU}
                            detailsActivasionFunction={toggleDetailCPU}
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

export default CPUList;
