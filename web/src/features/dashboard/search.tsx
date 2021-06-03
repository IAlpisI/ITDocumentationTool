import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TableContainer from '../../common/TableContainer';
import { fetchSearchTagResult, searchWords } from './dashboardSlice';
import { Header, Links } from '../serverDevice/serverData';
import { useParams } from 'react-router-dom';
import { routerHeader, routerLinks } from '../routerDevice/routerData';
import store from '../../app/store'
import {
    Header as SwitchHeader,
    Links as SwitchLinks
} from '../switchDevice/switchData';
import {
    Header as ClientHeader,
    Links as ClientLinks
} from '../clientPc/clientPcData';
import {
    Header as Printerheader,
    Links as PrinterLinks
} from '../printer/printerData';
import {
    Header as WorkerHeader,
    Links as WorkerLinks
} from '../workers/workerData';
import {
    Header as CableHeader,
    Links as CableLinks
} from '../cables/cableData';
import { useEffect } from 'react';

const Container = styled.div`
    margin: 50px 50px 0 50px;
    background: ${(props) => props.theme.colors.white};
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const ContainerName = styled.div`
    color: ${(props) => props.theme.colors.grey4};
    font-size: 25px;
    margin-bottom: 50px;
`;

const WrapTables = styled.div`
    margin-bottom: 30px;
`;

const Search = () => {
    const dispatch = useDispatch();
    const searchTag = useSelector((state: any) => state.dashboard.searchTag);

    useEffect(() => {
        const value = store.getState().dashboard.search;
        if(value !== '') dispatch(fetchSearchTagResult({ search:  value}));
    }, [store.getState().dashboard.search]);

    console.log(store.getState().dashboard.search);

    return (
        <Container>
            <ContainerName>Results</ContainerName>

            {searchTag.data.serverDevices &&
                searchTag.data.serverDevices.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={searchTag.data.serverDevices}
                            tableHeader={Header}
                            tableLinks={Links}
                            tableName={'Servers'}
                            tableButtons={false}
                            displayDelete={false}
                            displayEdit={false}
                            showCheckBox={false}
                        />
                    </WrapTables>
                )}

            {searchTag.data.routerDevices &&
                searchTag.data.routerDevices.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={searchTag.data.routerDevices}
                            tableHeader={routerHeader}
                            tableLinks={routerLinks}
                            tableName={'Routers'}
                            tableButtons={false}
                            displayDelete={false}
                            displayEdit={false}
                            showCheckBox={false}
                        />
                    </WrapTables>
                )}

            {searchTag.data.switchDevices &&
                searchTag.data.routerDevices.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={searchTag.data.switchDevices}
                            tableHeader={SwitchHeader}
                            tableLinks={SwitchLinks}
                            tableName={'Switches'}
                            tableButtons={false}
                            displayDelete={false}
                            displayEdit={false}
                            showCheckBox={false}
                        />
                    </WrapTables>
                )}

            {searchTag.data.clienPcs &&
                searchTag.data.routerDevices.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={searchTag.data.clienPcs}
                            tableHeader={ClientHeader}
                            tableLinks={ClientLinks}
                            tableName={'Clinets'}
                            tableButtons={false}
                            displayDelete={false}
                            displayEdit={false}
                            showCheckBox={false}
                        />
                    </WrapTables>
                )}

            {searchTag.data.printers && searchTag.data.printers.length !== 0 && (
                <WrapTables>
                    <TableContainer
                        tableList={searchTag.data.printers}
                        tableHeader={Printerheader}
                        tableLinks={PrinterLinks}
                        tableName={'Printers'}
                        tableButtons={false}
                        displayDelete={false}
                        displayEdit={false}
                        showCheckBox={false}
                    />
                </WrapTables>
            )}

            {searchTag.data.cables && searchTag.data.cables.length !== 0 && (
                <WrapTables>
                    <TableContainer
                        tableList={searchTag.data.cables}
                        tableHeader={CableHeader}
                        tableLinks={CableLinks}
                        tableName={'Cables'}
                        tableButtons={false}
                        displayDelete={false}
                        displayEdit={false}
                        showCheckBox={false}
                    />
                </WrapTables>
            )}

            {searchTag.data.people && searchTag.data.people.length !== 0 && (
                <WrapTables>
                    <TableContainer
                        tableList={searchTag.data.people}
                        tableHeader={WorkerHeader}
                        tableLinks={WorkerLinks}
                        tableName={'People'}
                        tableButtons={false}
                        displayDelete={false}
                        displayEdit={false}
                        showCheckBox={false}
                    />
                </WrapTables>
            )}
        </Container>
    );
};

export default Search;
