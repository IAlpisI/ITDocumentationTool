import { useRef, useState } from 'react';
import * as Table from './Styles/table.style';
import TableContent from './TableContent';
import { parse } from 'papaparse';
import { CSVLink } from 'react-csv';
import { TableImportData } from './tableExportData';
import TableImported from '../common/tableImported';
import { useDispatch } from 'react-redux';
import { createWorker } from '../features/workers/workerSlice';
import { createServer } from '../features/serverDevice/serverSlice';
import { createPrinter } from '../features/printer/printerSlice';
import { createRouter } from '../features/routerDevice/routerSlice';
import { createSwitch } from '../features/switchDevice/switchSlice';
import { createClient } from '../features/clientPc/clientPcSlice';
import styled from 'styled-components';

type Props = {
    tableLinks: any;
    tableList: any;
    tableHeader: any;
    tableName?: string;
    buttonName?: string;
    tableButtons?: boolean;
    fetchData?: any;
    fetchOne?: any;
    tableNameActive?: boolean;
    showPagination?: boolean;
    exportHeader?: any;
    displayEdit?: boolean;
    detailsActivasionFunction?: any;
    addActivasionFunction?: any;
    displayAdd?: boolean;
    displayDelete?: boolean;
    removePadding?: boolean;
    displayRemove?: boolean;
    removeActivasionFunction?: any;
    displayDetail?: any;
    exportData?: any;
    tableExportButtons?: boolean;
    numberOfPages?: number;
    showCheckBox?: boolean;
    width?: string;
    removeActionColumn?: boolean;
};

const ErrorMessage = styled.div`
    color: red;
    margin: 15px 15px 0 0;
`;

const TableContainer = ({
    tableLinks,
    tableList,
    tableHeader,
    tableName,
    buttonName,
    fetchData,
    tableButtons = true,
    showPagination = true,
    tableNameActive = true,
    exportHeader = [],
    addActivasionFunction,
    displayAdd,
    displayEdit,
    detailsActivasionFunction,
    displayDelete,
    fetchOne,
    removePadding = false,
    displayRemove,
    removeActivasionFunction,
    displayDetail,
    exportData = [],
    tableExportButtons = true,
    numberOfPages,
    showCheckBox,
    width,
    removeActionColumn
}: Props) => {
    const dispatch = useDispatch();
    const inputFile = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<FileList | null>(null);
    const [error, setError] = useState<boolean>(false);

    return (
        <Table.Container padding={removePadding ? '0px' : ''} width={width}>
            {tableNameActive && (
                <Table.InfoRow>
                    <Table.TableName>{tableName}</Table.TableName>
                </Table.InfoRow>
            )}
            <Table.TableContainer>
                {tableButtons && (
                    <Table.TableButtonsRow>
                        {localStorage.getItem('role') !== 'User' && (
                            <Table.TableLinkButton
                                to={tableLinks.formLink}
                                primary={'primary'}>
                                Add {buttonName}
                            </Table.TableLinkButton>
                        )}
                        {tableExportButtons && (
                            <Table.TableSpacingButtons>
                                {error && (
                                    <ErrorMessage>
                                        File format is inocrect
                                    </ErrorMessage>
                                )}
                                <Table.TableButton primary={''}>
                                    <CSVLink
                                        className='areset'
                                        filename={`${tableName}Data.csv`}
                                        data={exportData}>
                                        Export
                                    </CSVLink>
                                </Table.TableButton>

                                {localStorage.getItem('role') !== 'User' && (
                                    <Table.TableButton
                                        primary={''}
                                        onClick={() => {
                                            if (inputFile.current !== null) {
                                                inputFile.current.click();
                                            }
                                        }}>
                                        Import
                                        <input
                                            onChange={(e) => {
                                                setFile(e.target.files);
                                            }}
                                            type='file'
                                            accept='.csv'
                                            ref={inputFile}
                                            style={{ display: 'none' }}
                                        />
                                        {file &&
                                            Array.from(file).forEach(
                                                async (f) => {
                                                    const text = await f.text();
                                                    const result = parse(text, {
                                                        header: true
                                                    });
                                                    result.data.pop();
                                                    console.log(result.data);
                                                    if (
                                                        TableImportData(
                                                            result.data,
                                                            buttonName
                                                        )
                                                    ) {
                                                        setFile(
                                                            (file) =>
                                                                (file = null)
                                                        );
                                                        let temp =
                                                            TableImported(
                                                                buttonName,
                                                                result.data
                                                            );

                                                        switch (buttonName) {
                                                            case 'person':
                                                                temp.forEach(
                                                                    async (
                                                                        element: any
                                                                    ) => {
                                                                        await dispatch(
                                                                            createWorker(
                                                                                element
                                                                            )
                                                                        );
                                                                        await dispatch(
                                                                            fetchData()
                                                                        );
                                                                    }
                                                                );
                                                                break;
                                                            case 'server':
                                                                temp.forEach(
                                                                    async (
                                                                        element: any
                                                                    ) => {
                                                                        await dispatch(
                                                                            createServer(
                                                                                element
                                                                            )
                                                                        );
                                                                        await dispatch(
                                                                            fetchData()
                                                                        );
                                                                    }
                                                                );
                                                                break;
                                                            case 'printer':
                                                                temp.forEach(
                                                                    async (
                                                                        element: any
                                                                    ) => {
                                                                        await dispatch(
                                                                            createPrinter(
                                                                                element
                                                                            )
                                                                        );
                                                                        await dispatch(
                                                                            fetchData()
                                                                        );
                                                                    }
                                                                );
                                                                break;
                                                            case 'router':
                                                                temp.forEach(
                                                                    async (
                                                                        element: any
                                                                    ) => {
                                                                        await dispatch(
                                                                            createSwitch(
                                                                                element
                                                                            )
                                                                        );
                                                                        await dispatch(
                                                                            fetchData()
                                                                        );
                                                                    }
                                                                );
                                                                break;
                                                            case 'switch':
                                                                temp.forEach(
                                                                    async (
                                                                        element: any
                                                                    ) => {
                                                                        await dispatch(
                                                                            createRouter(
                                                                                element
                                                                            )
                                                                        );
                                                                        await dispatch(
                                                                            fetchData()
                                                                        );
                                                                    }
                                                                );
                                                                break;
                                                            case 'client':
                                                                temp.forEach(
                                                                    async (
                                                                        element: any
                                                                    ) => {
                                                                        await dispatch(
                                                                            createClient(
                                                                                element
                                                                            )
                                                                        );
                                                                        await dispatch(
                                                                            fetchData()
                                                                        );
                                                                    }
                                                                );
                                                                break;
                                                        }
                                                    } else {
                                                        setFile(
                                                            (file) =>
                                                                (file = null)
                                                        );
                                                        setError(
                                                            (error) => !error
                                                        );
                                                        setTimeout(function () {
                                                            setError(
                                                                (error) =>
                                                                    !error
                                                            );
                                                        }, 3000);
                                                    }
                                                }
                                            )}
                                    </Table.TableButton>
                                )}
                                <Table.TableButton primary={''}>
                                    <CSVLink
                                        className='areset'
                                        filename={`${tableName}Template.csv`}
                                        data={exportHeader}>
                                        Template
                                    </CSVLink>
                                </Table.TableButton>
                            </Table.TableSpacingButtons>
                        )}
                    </Table.TableButtonsRow>
                )}

                <TableContent
                    fetchData={fetchData}
                    tableData={tableList}
                    headerData={tableHeader}
                    tableLinks={tableLinks}
                    showPagination={showPagination}
                    addActivasionFunction={addActivasionFunction}
                    displayAdd={displayAdd}
                    displayEdit={displayEdit}
                    detailsActivasionFunction={detailsActivasionFunction}
                    displayDelete={displayDelete}
                    fetchOne={fetchOne}
                    displayRemove={displayRemove}
                    removeActivasionFunction={removeActivasionFunction}
                    displayDetail={displayDetail}
                    numberOfPages={numberOfPages}
                    showCheckBox={showCheckBox}
                    removeActionColumn={removeActionColumn}
                />
            </Table.TableContainer>
        </Table.Container>
    );
};

export default TableContainer;
