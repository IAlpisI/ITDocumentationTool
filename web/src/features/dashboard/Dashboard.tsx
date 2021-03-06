import * as Module from './dashboard.style';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchSearchResult,
    fetchSearchModifiedResult,
    fetchLicenseResult,
    fetchDefectedResult
} from './dashboardSlice';
import { useEffect } from 'react';
import TableContainer from '../../common/TableContainer';
import { recentHeader, recentLinks } from './Data';
import { useHistory } from 'react-router-dom';
import { fetchClients } from '../clientPc/clientPcSlice';
import { fetchLayerThreeNetworks } from '../layerThreeNetwork/layerThreeNetworkSlice';

function Dashboard() {
    const history = useHistory();
    const dispatch = useDispatch();
    const searchList = useSelector(
        (state: any) => state.dashboard.recentAddedList
    );
    const recentModifiedList = useSelector(
        (state: any) => state.dashboard.recentModifiedList
    );

    const layerThreeNetworks = useSelector(
        (state: any) => state.layerThreeNetwork.layerThreeNetworkList
    );
    const clientList = useSelector((state: any) => state.client.clientList);
    const licenseList = useSelector(
        (state: any) => state.dashboard.licenseList
    );
    const defectedList = useSelector(
        (state: any) => state.dashboard.defectedList.data
    );

    const added = { criteria: 'added' };
    const updated = { criteria: 'updated' };

    useEffect(() => {
        dispatch(fetchSearchResult(added));
        dispatch(fetchSearchModifiedResult(updated));
        dispatch(fetchLayerThreeNetworks());
        dispatch(fetchClients());
        dispatch(fetchLicenseResult());
        dispatch(fetchDefectedResult());
    }, [dispatch]);

    const redirect = (page: string) => {
        history.push(page);
    };


    const defectedItems = () =>
        (defectedList?.routerDevices?.length || 0) +
        (defectedList?.serverDevices?.length || 0) +
        (defectedList?.switchDevices?.length || 0) +
        (defectedList?.clienPcs?.length || 0) +
        (defectedList?.printers?.length || 0) +
        (defectedList?.cables?.length || 0);

    console.log(recentModifiedList.data)

    return (
        <Module.Content>
            <Module.Layout>
                <Module.ContentLabel area={'1 / 1 / 2 / 2'}>
                    Dashboard
                </Module.ContentLabel>
                <Module.Container color={'#2c8be8'} area={'2 / 1 / 3 / 2'}>
                    <Module.CardContent>
                        <Module.CardText>Total Networks:</Module.CardText>
                        <Module.CardNumber>
                            {layerThreeNetworks.data.length}
                        </Module.CardNumber>
                        <Module.CardDetails
                            color={'#2776c4'}
                            onClick={() => {
                                redirect('./layerthreenetwork');
                            }}>
                            view details <SearchIcon style={{ fontSize: 12 }} />
                        </Module.CardDetails>
                    </Module.CardContent>
                </Module.Container>
                <Module.Container color={'#009ab0'} area={'2 / 2 / 3 / 3'}>
                    <Module.CardContent>
                        <Module.CardText>Total Clients:</Module.CardText>
                        <Module.CardNumber>
                            {clientList.data.length}
                        </Module.CardNumber>
                        <Module.CardDetails
                            onClick={() => {
                                redirect('./client');
                            }}
                            color={'#017082'}>
                            view details <SearchIcon style={{ fontSize: 12 }} />
                        </Module.CardDetails>
                    </Module.CardContent>
                </Module.Container>
                <Module.Container color={'#ff9c17'} area={'2 / 3 / 3 / 4'}>
                    <Module.CardContent>
                        <Module.CardText>
                            Licenses keys that will expire soon:
                        </Module.CardText>
                        <Module.CardNumber>
                            {licenseList.data.length}
                        </Module.CardNumber>
                        <Module.CardDetails
                            onClick={() => {
                                redirect('./expiredlicense');
                            }}
                            color={'#d38014'}>
                            view details <SearchIcon style={{ fontSize: 12 }} />
                        </Module.CardDetails>
                    </Module.CardContent>
                </Module.Container>
                <Module.Container color={'#ff6b56'} area={'2 / 4 / 3 / 5'}>
                    <Module.CardContent>
                        <Module.CardText>Defected items:</Module.CardText>
                        <Module.CardNumber>{defectedItems()}</Module.CardNumber>
                        <Module.CardDetails
                            onClick={() => {
                                redirect('./defected');
                            }}
                            color={'#d34d3c'}>
                            view details <SearchIcon style={{ fontSize: 12 }} />
                        </Module.CardDetails>
                    </Module.CardContent>
                </Module.Container>
                <Module.TableContainerContent
                    color={'white'}
                    area={'3 / 1 / 4 / 5'}>
                    <Module.TableName>Recently updated items</Module.TableName>
                        <TableContainer
                            // width={'100%'}
                            // removePadding={true}
                            tableList={recentModifiedList.data}
                            tableHeader={recentHeader}
                            tableLinks={recentLinks}
                            tableName={'Recently added items'}
                            tableButtons={false}
                            tableNameActive={false}
                            displayDelete={false}
                            displayEdit={false}
                            displayDetail={false}
                            showCheckBox={false}
                            removeActionColumn={true}
                        />
                </Module.TableContainerContent>
                <Module.TableContainerContent
                    color={'white'}
                    area={'4 / 1 / 5 / 5'}>
                    <Module.TableName>Recently added items</Module.TableName>
                        <TableContainer
                            tableList={searchList.data}
                            tableHeader={recentHeader}
                            tableLinks={recentLinks}
                            tableName={'Recently added items'}
                            tableButtons={false}
                            tableNameActive={false}
                            displayDelete={false}
                            displayEdit={false}
                            displayDetail={false}
                            showCheckBox={false}
                            removeActionColumn={true}
                        />
                </Module.TableContainerContent>
            </Module.Layout>
        </Module.Content>
    );
}

export default Dashboard;
