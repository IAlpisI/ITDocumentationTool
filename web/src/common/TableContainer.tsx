import React, { useRef, useState } from 'react';
import * as Table from './Styles/table.style'
import TableContent from './TableContent'
import { parse } from 'papaparse';
import { CSVLink } from 'react-csv';


const headers = [
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Email', key: 'email' }
];

const data = [
    { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
    { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
    { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' }
];

type Props = {
    tableLinks: any
    tableList: any
    tableHeader: any
    tableName?: string
    buttonName?: string
}

const TableContainer = ({tableLinks, tableList, tableHeader, tableName, buttonName }:Props) => {

    const inputFile = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<FileList | null>(null);

    return (
        <Table.Container>
            <Table.InfoRow>
                <Table.TableName>{tableName}</Table.TableName>
                {/* <Table.LinkName>Test</Table.LinkName> */}
            </Table.InfoRow>
            <Table.TableContainer>
                <Table.TableButtonsRow>
                    <Table.TableLinkButton
                        to={tableLinks.formLink}
                        primary={'primary'}>
                        Add {buttonName}
                    </Table.TableLinkButton>
                    <Table.TableSpacingButtons>
                        <Table.TableButton primary={''}>
                            <CSVLink
                                className='areset'
                                data={data}
                                headers={headers}>
                                Export
                            </CSVLink>
                        </Table.TableButton>

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
                                    // .filter(
                                    //     (f) => f.type === 'text/csv'
                                    // )
                                    // if(file) Array.from(file).forEach(async (f) => {
                                    //     const text = await f.text();
                                    //     const result = parse(text);
                                    //     console.log(result)
                                    // })
                                }}
                                id='id'
                                type='file'
                                accept='.csv'
                                ref={inputFile}
                                style={{ display: 'none' }}
                            />
                            {file &&
                                Array.from(file).forEach(async (f) => {
                                    const text = await f.text();
                                    const result = parse(text);
                                    console.log(result);
                                })}
                        </Table.TableButton>
                        <Table.TableButton primary={''}>
                            Template
                        </Table.TableButton>
                    </Table.TableSpacingButtons>
                </Table.TableButtonsRow>
                <TableContent
                    tableData={tableList}
                    headerData={tableHeader}
                    tableLinks={tableLinks}
                />
            </Table.TableContainer>
        </Table.Container>
    );
};

export default TableContainer;
