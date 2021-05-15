import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    applicationForDevice,
    licenseGet,
    fetchApplication,
    updateApplication,
    updateLicenseKey,
    fetchApplications,
    fetchLicense,
    fetchLicenses
} from '../../features/application/applicationSlice';
import { Button } from '../Styles/common.style';
import {
    Header,
    Links,
    HeaderForLicense,
    HeaderForApp,
    HeaderForLicenseAdd
} from '../../features/application/applicationData';
import TableContainer from '../TableContainer';
import { useParams } from 'react-router-dom';
import { DataAcceptWindow } from '../popWindows';
import ListOfItems from '../listOfItems';
import { Convert } from '../helpers/filterKeys';
import * as FormStyle from '../Styles/form.style';
import * as TabStyle from '../Styles/tabs.style'



const ApplicationTab = () => {
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
    const singleApplication = useSelector(
        (state: any) => state.application.singleApplication.data
    );

    const [showLicense, setShowLicense] = useState<{
        show: boolean;
        id: number;
    }>({ show: false, id: 0 });

    const [showApp, setShowApp] = useState<boolean>(false);
    const [createLicense, setCreateLicense] = useState<boolean>(false);

    const getAppForDevice = {
        deviceName: 'server',
        deviceId: id
    };

    const getLicenseForDevice = {
        deviceId: id,
        deviceName: 'server',
        applicationId: 1
    };

    useEffect(() => {
        dispatch(applicationForDevice(getAppForDevice));
        dispatch(fetchApplications());
    }, [dispatch]);

    const toggleLicense = (id: number) => {
        setShowLicense({ show: true, id });
        getLicenseForDevice.applicationId = id;
        dispatch(licenseGet(getLicenseForDevice));
    };

    function ignoreAppKeys([key, _]: any) {
        return key !== 'generalId';
    }

    const toggleShowApp = () => {
        setShowApp((showApp) => !showApp);
    };

    const toggleCreteLicense = () => {
        dispatch(fetchLicenses())
        setCreateLicense((createLicense) => !createLicense);
    };

    const addApplication = async (appId: number) => {
        toggleShowApp();
        const temp: any = await dispatch(fetchApplication(appId));
        let app = Object.assign({}, temp.payload);
        app.serverDeviceId = parseInt(id);
        console.log(app);
        await dispatch(updateApplication(app));
        await dispatch(applicationForDevice(getAppForDevice));
    };

    const removeApplication = async (appId: number) => {
        const temp: any = await dispatch(fetchApplication(appId));
        let app = Object.assign({}, temp.payload);
        app.serverDeviceId = null;
        await dispatch(updateApplication(app));
        await dispatch(fetchApplications());
        await dispatch(applicationForDevice(getAppForDevice));
    };

    const addLicense = async (licenseId: number) => {
        // toggleCreteLicense()
        const temp: any = await dispatch(fetchLicense(licenseId));
        let app = Object.assign({}, temp.payload);
        app.serverDeviceId = parseInt(id);
        console.log(app);
        await dispatch(updateLicenseKey(app));
        await dispatch(licenseGet(getLicenseForDevice));
    };

    const removeLicense = async (licenseId: number) => {
        console.log(licenseId);
        const temp: any = await dispatch(fetchLicense(licenseId));
        let licenseTemp = Object.assign({}, temp.payload);
        licenseTemp.serverDeviceId = null;
        console.log(licenseTemp);
        await dispatch(updateLicenseKey(licenseTemp));
        await dispatch(licenseGet(getLicenseForDevice));
    };

    function filter(x: any) {
        return x.serverDeviceId !== parseInt(id);
    }

    // function filter(x:any) {
    //     return x.
    // }

    function filterApplicationKeys([key, _]: any) {
        return (
            key !== 'general' &&
            key !== 'serverDeviceId' &&
            key !== 'licenseKey'
        );
    }

    function filterLicense([key, _]: any) {
        return (
            key !== 'amount' &&
            key !== 'expireDate' &&
            key !== 'pricePerUnit' &&
            key !== 'description' &&
            key !== 'applicationId' &&
            key !== 'serverDeviceId' &&
            key !== 'application'
        );
    }

    console.log(applicationForDeviceList.data);

    return (
        <>
            {showApp && applicationList.data && (
                <DataAcceptWindow>
                    <ListOfItems
                        items={Convert(applicationList.data, ignoreAppKeys)}
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
                        items={Convert(licenseList.data, ignoreAppKeys)}
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
            <TabStyle.Container>
                <TabStyle.ContentLayout width={'60%'}>
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
                            tableList={Convert(
                                applicationForDeviceList.data,
                                filterApplicationKeys
                            )}
                            tableHeader={Header}
                            tableLinks={Links}
                            tableButtons={false}
                            tableNameActive={false}
                            addActivasionFunction={toggleLicense}
                            removePadding
                            displayAdd
                            displayDelete={false}
                            displayEdit={false}
                            displayRemove={true}
                            removeActivasionFunction={removeApplication}
                        />
                    </TabStyle.TableFlow>
                </TabStyle.ContentLayout>
                <TabStyle.ContentLayout width={'40%'}>
                    {showLicense && (
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
                                tableList={Convert(
                                    licenseList.data,
                                    filterLicense
                                )}
                                removeActivasionFunction={removeLicense}
                                displayRemove={true}
                                displayDelete={false}
                                displayEdit={false}
                                tableHeader={HeaderForLicense}
                                tableLinks={Links}
                                tableButtons={false}
                                tableNameActive={false}
                                removePadding
                            />
                        </TabStyle.TableFlow>
                    )}
                </TabStyle.ContentLayout>
            </TabStyle.Container>
        </>
    );
};

export default ApplicationTab;
