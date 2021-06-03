import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    applicationForDevice,
    fetchApplications,
    clientApplciationModifier,
    clientLicenseModifier,
    serverApplciationModifier,
    serverLicenseModifier,
    fetchLicensesForApplication,
    fetchDeviceLicensesForApplication
} from '../../features/application/applicationSlice';
import { Button } from '../Styles/common.style';
import {
    Header,
    Links,
    LicenseHeader,
    HeaderForApp,
    HeaderForLicenseAdd
} from '../../features/application/applicationData';
import TableContainer from '../TableContainer';
import { useParams } from 'react-router-dom';
import { DataAcceptWindow } from '../popWindows';
import ListOfItems from '../listOfItems';
import * as FormStyle from '../Styles/form.style';
import * as TabStyle from '../Styles/tabs.style';


const ApplicationTab = ({device}:any) => {
    let { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const applicationList = useSelector(
        (state: any) => state.application.applicationList
    );
    const licenseList = useSelector(
        (state: any) => state.application.licenseList
    );
    const applicationForDeviceList = useSelector(
        (state: any) => state.application.applicationForDeviceList
    );
    const licenseForDevice = useSelector(
        (state: any) => state.application.licenseForDevice
    );

    const [showLicense, setShowLicense] = useState<{
        show: boolean;
        id: number;
    }>({ show: false, id: 0 });

    const [showApp, setShowApp] = useState<boolean>(false);
    const [createLicense, setCreateLicense] = useState<boolean>(false);

    const getAppForDevice = {
        deviceName: device,
        deviceId: id
    };

    const licenseForApplication = {
        deviceId: id,
        deviceName: device,
        applicationId: 1
    };

    const softwareDevice = {
        softwareId:0,
        deviceId:id,
        remove:false
    }

    useEffect(() => {
        dispatch(applicationForDevice(getAppForDevice))
        dispatch(fetchApplications());
    }, [dispatch]);

    const toggleLicense = (id: number) => {
        setShowLicense({ show: true, id });
        licenseForApplication.applicationId = id;
        dispatch(fetchDeviceLicensesForApplication(licenseForApplication));
    };


    const toggleShowApp = () => {
        setShowApp((showApp) => !showApp);
    };

    const toggleCreteLicense = () => {
        setCreateLicense((createLicense) => !createLicense);
        dispatch(fetchLicensesForApplication(showLicense.id));
    };

    const addApplication = async (softwareId: number) => {
        toggleShowApp();

        softwareDevice.softwareId = softwareId;
        softwareDevice.remove = false;

        switch(device){
            case "server":
                await dispatch(serverApplciationModifier(softwareDevice));
                break;
            case "client":
                await dispatch(clientApplciationModifier(softwareDevice));
                break;
        }
        await dispatch(applicationForDevice(getAppForDevice))
    };

    const removeApplication = async (softwareId: number) => {
        softwareDevice.softwareId = softwareId;
        softwareDevice.remove = true;

        switch(device){
            case "server":
                await dispatch(serverApplciationModifier(softwareDevice));
                break;
            case "client":
                await dispatch(clientApplciationModifier(softwareDevice));
                break;
        }
        await dispatch(applicationForDevice(getAppForDevice))
    };

    const addLicense = async (softwareId: number) => {
        toggleCreteLicense();

        softwareDevice.softwareId = softwareId;
        softwareDevice.remove = false;

        switch(device){
            case "server":
                await dispatch(serverLicenseModifier(softwareDevice));
                break;
            case "client":
                await dispatch(clientLicenseModifier(softwareDevice));
                break;
        }
        licenseForApplication.applicationId = showLicense.id;
        await dispatch(fetchDeviceLicensesForApplication(licenseForApplication));
    };

    const removeLicense = async (softwareId: number) => {
        softwareDevice.softwareId = softwareId;
        softwareDevice.remove = true;

        switch(device){
            case "server":
                await dispatch(serverLicenseModifier(softwareDevice));
                break;
            case "client":
                await dispatch(clientLicenseModifier(softwareDevice));
                break;
        }
        licenseForApplication.applicationId = showLicense.id;
        await dispatch(fetchDeviceLicensesForApplication(licenseForApplication));
    };

    function filter(x: any) {
        return !applicationForDeviceList.data.some((device:any) => device.id === x.id)
    }

    return (
        <>
            {showApp && applicationList.data && (
                <DataAcceptWindow>
                    <ListOfItems
                        items={applicationList.data}
                        activasionFunction={addApplication}
                        headers={HeaderForApp}
                        filterFunction={filter}
                    />
                    <TabStyle.PositionButton>
                        <FormStyle.TableConfirmationButton
                            onClick={toggleShowApp}
                            primary={'primary'}
                            id={'Save'}
                            type='submit'>
                            Close
                        </FormStyle.TableConfirmationButton>
                    </TabStyle.PositionButton>
                </DataAcceptWindow>
            )}
            {createLicense && (
                <DataAcceptWindow>
                    <ListOfItems
                        items={licenseList.data}
                        activasionFunction={addLicense}
                        headers={HeaderForLicenseAdd}
                        filterFunction={filter}
                    />
                    <TabStyle.PositionButton>
                        <FormStyle.TableConfirmationButton
                            onClick={toggleCreteLicense}
                            primary={'primary'}
                            id={'Save'}
                            type='submit'>
                            Close
                        </FormStyle.TableConfirmationButton>
                    </TabStyle.PositionButton>
                </DataAcceptWindow>
            )}
            <TabStyle.Container
                width={'100%'}
            >
                <TabStyle.ContentLayout width={'60%'}>
                <TabStyle.ContentName>Applications</TabStyle.ContentName>
                    <TabStyle.TableFlow>
                        <Button
                            onClick={toggleShowApp}
                            padding={'5px'}
                            height={'25px'}
                            width={'150px'}
                            background>
                            Add application
                        </Button>
                        <TableContainer
                            width={'100%'}
                            tableList={applicationForDeviceList.data}
                            tableHeader={Header}
                            tableLinks={Links}
                            tableButtons={false}
                            tableNameActive={false}
                            // displayDetail={false}
                            addActivasionFunction={toggleLicense}
                            removePadding
                            displayAdd
                            displayDelete={false}
                            displayEdit={false}
                            displayRemove={true}
                            removeActivasionFunction={removeApplication}
                            showCheckBox={false}
                        />
                    </TabStyle.TableFlow>
                </TabStyle.ContentLayout>
                <TabStyle.ContentLayout width={'40%'}>
                 <TabStyle.ContentName>Licenses</TabStyle.ContentName>
                    {showLicense.show && (
                        <TabStyle.TableFlow>
                            <Button
                                onClick={toggleCreteLicense}
                                padding={'5px'}
                                height={'25px'}
                                width={'150px'}
                                background>
                                Add license
                            </Button>
                            <TableContainer
                                width={'100%'}
                                tableList={licenseForDevice.data}
                                showPagination={false}
                                removeActivasionFunction={removeLicense}
                                displayRemove={true}
                                displayDelete={false}
                                displayEdit={false}
                                tableHeader={LicenseHeader}
                                tableLinks={Links}
                                tableButtons={false}
                                tableNameActive={false}
                                removePadding
                                showCheckBox={false}
                                displayDetail={false}
                            />
                        </TabStyle.TableFlow>
                    )}
                </TabStyle.ContentLayout>
            </TabStyle.Container>
        </>
    );
};

export default ApplicationTab;
