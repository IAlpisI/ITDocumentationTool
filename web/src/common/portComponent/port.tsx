import { useState } from 'react';
import TableContainer from '../TableContainer';
import { Header, Links } from './postData';
import { DataAcceptWindow } from '../popWindows';
import { FormProvider, useForm } from 'react-hook-form';
import * as FormStyle from '../Styles/form.style';
import { Button } from '../Styles/common.style';
import { PortForm } from './portForm';
import * as TabStyle from '../Styles/tabs.style';
import { useParams } from 'react-router-dom';
import { Convert } from '../helpers/filterKeys';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServer } from '../../features/serverDevice/serverSlice';
import {
    createPort,
    updatePort,
    fetchPort,
    deletePort
} from '../../features/dashboard/dashboardSlice';

const PortComponent = ({ device }: any) => {
    const dispatch = useDispatch();
    const ports = useSelector((state: any) => state.server.singleServer.data.devicePorts);

    const methods = useForm();
    const { id } = useParams<{ id: string }>();

    const [showPortForm, setshowPortForm] = useState<boolean>(false);
    const [editPort, setEditPort] = useState<{ show: boolean; id: number }>({
        show: false,
        id: 0
    });

    const notEmpty = () => {
        for (let i in ports) return true;
        return false;
    };

    const getData = (type: string) => {
        if (!notEmpty()) return [];

        switch (device) {
            case 'server':
                if (type === 'output')
                    return ports.filter((x: any) => x.plug === 'output');
                if (type === 'input')
                    return ports.filter((x: any) => x.plug === 'input');
                break;
            default:
                break;
        }
    };

    const setDetailPortToFalse = () => {
        setEditPort({ ...editPort, show: false });
    };

    const toggleSetPort = (id: number) => {
        setEditPort({ show: !editPort.show, id });
        toggleShowForm();
    };

    const toggleShowForm = () => {
        setshowPortForm((showPortForm) => !showPortForm);
        methods.reset();
    };

    const onSubmit = async (data: any) => {
        switch (device) {
            case 'server':
                if (!editPort.show) {
                    data.serverDeviceId = id;
                    await dispatch(createPort(data));
                }else {
                    data['id'] = editPort.id
                    data['serverDeviceId'] = id
                    console.log(data)
                    await dispatch(updatePort(data))
                }

                break;
            default:
                break;
        }

        await dispatch(fetchServer(id));
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    const getPort = (id: number) => {
        console.log(id);
        console.log(ports);
        if (ports) {
            const value = ports.find((x: any) => x.id === id);
            return value;
        }
        return [];
    };

    function filter([key, _]: any) {
        return (
            key !== 'plug' &&
            key !== 'speed' &&
            key !== 'speedMeassure' &&
            key !== 'description' &&
            key !== 'serverDeviceId'
        );
    }

    return (
        <>
            {showPortForm && (
                <DataAcceptWindow>
                    <FormProvider {...methods}>
                        <form
                            autoComplete='off'
                            onKeyDown={(e) => checkKeyDown(e)}
                            onSubmit={methods.handleSubmit(onSubmit)}>
                            {editPort.show ? (
                                <PortForm props={getPort(editPort.id)} />
                            ) : (
                                <PortForm />
                            )}

                            <FormStyle.FormSpacingButtons>
                                <FormStyle.TableConfirmationButton
                                    // onClick={toggleShowForm}
                                    primary={'primary'}
                                    type='submit'>
                                    Submit
                                </FormStyle.TableConfirmationButton>
                                <FormStyle.TableConfirmationButton
                                    onClick={() => {
                                        toggleShowForm();
                                        setDetailPortToFalse();
                                    }}
                                    primary={''}>
                                    Cancel
                                </FormStyle.TableConfirmationButton>
                            </FormStyle.FormSpacingButtons>
                        </form>
                    </FormProvider>
                </DataAcceptWindow>
            )}
            <Button
                height={'25px'}
                width={'100px'}
                margin={'20px 0 0 30px'}
                background
                onClick={toggleShowForm}>
                Add port
            </Button>
            <TabStyle.Container>
                <TabStyle.ContentLayout width={'50%'}>
                    <TabStyle.ContentName>Input</TabStyle.ContentName>
                    <TabStyle.TableFlow>
                        <TableContainer
                            tableLinks={Links}
                            tableHeader={Header}
                            tableButtons={false}
                            tableNameActive={false}
                            tableList={Convert(getData('output'), filter)}
                            addActivasionFunction={toggleSetPort}
                            displayDetail={false}
                            displayEdit={false}
                            displayAdd={true}
                            removePadding
                        />
                    </TabStyle.TableFlow>
                </TabStyle.ContentLayout>
                <TabStyle.ContentLayout width={'50%'}>
                    <TabStyle.ContentName>Output</TabStyle.ContentName>
                    <TabStyle.TableFlow>
                        <TableContainer
                            tableNameActive={false}
                            tableButtons={false}
                            tableLinks={Links}
                            tableHeader={Header}
                            removePadding
                            tableList={Convert(getData('input'), filter)}
                        />
                    </TabStyle.TableFlow>
                </TabStyle.ContentLayout>
            </TabStyle.Container>
        </>
    );
};

export default PortComponent;
