import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TableContainer from '../../common/TableContainer';
import { fetchDefectedResult } from './dashboardSlice';
import { Header, Links } from '../serverDevice/serverData';
import { routerHeader, routerLinks } from '../routerDevice/routerData';
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
    Header as CableHeader,
    Links as CableLinks
} from '../cables/cableData';

export const Container = styled.div`
    margin: 50px 50px 0 50px;
    background: ${(props) =>  props.theme.colors.white};
    height: 100%;
    width: 1500px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

export const ContainerName = styled.div`
    color: ${(props) => props.theme.colors.grey3};
    font-size: 25px;
    margin-bottom: 50px;
`;

export const WrapTables = styled.div`
    margin-bottom: 30px;
`;

const DefectedItems = () => {
    const dispatch = useDispatch();
    const defectedList = useSelector(
        (state: any) => state.dashboard.defectedList
    );

    useEffect(() => {
        dispatch(fetchDefectedResult());
    }, [dispatch]);

    console.log(defectedList);

    return (
        <Container>
            <ContainerName>Defected items</ContainerName>

            {defectedList.data.serverDevices &&
                defectedList.data.serverDevices.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={defectedList.data.serverDevices}
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

            {defectedList.data.routerDevices &&
                defectedList.data.routerDevices.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={defectedList.data.routerDevices}
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

            {defectedList.data.switchDevices &&
                defectedList.data.switchDevices.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={defectedList.data.switchDevices}
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

            {defectedList.data.clienPcs &&
                defectedList.data.clienPcs.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={defectedList.data.clienPcs}
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

            {defectedList.data.printers &&
                defectedList.data.printers.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={defectedList.data.printers}
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

            {defectedList.data.cables &&
                defectedList.data.cables.length !== 0 && (
                    <WrapTables>
                        <TableContainer
                            tableList={defectedList.data.cables}
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
        </Container>
    );
};

export default DefectedItems;
