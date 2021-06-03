import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import * as Module from './Styles/form.style';
import Tooltip from '@material-ui/core/Tooltip';
import * as api from './api';
import styled from 'styled-components';
import { Button } from './Styles/common.style';
import { FormButtons, FormName, Form } from '../features/mapView/mapGallery';
import { DataAcceptWindow } from './popWindows';
import AddIcon from '@material-ui/icons/Add';
import { useParams } from 'react-router-dom';
import RemoveIcon from '@material-ui/icons/Remove';

import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TablePagination,
    TableContainer,
    Checkbox
} from '@material-ui/core';
import TableHeader from './TableHeader';
import { useDispatch } from 'react-redux';

const IconWrapper = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    z-index: -999;
    cursor: pointer;
    display: inline-block;

    &:hover {
        background: ${(props) => props.theme.colors.grey1};
    }
`;

function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: any, orderBy: any) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

const sortedRowInformation = (rowArray: any, comparator: any) => {
    const stabilizeRowArray = rowArray.map((el: any, index: any) => [
        el,
        index
    ]);
    stabilizeRowArray.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizeRowArray.map((el: any) => el[0]);
};

type Props<DataItem> = {
    tableData: DataItem[];
    headerData: IHeaderData[];
    tableLinks: ItableLinks;
    fetchData?: any;
    showPagination?: boolean;
    displayEdit?: boolean;
    addActivasionFunction?: any;
    displayAdd?: boolean;
    fetchOne?: any;
    displayDelete?: boolean;
    detailsActivasionFunction?: any;
    removeActivasionFunction?: any;
    displayRemove?: any;
    displayDetail?: any;
    numberOfPages?: number;
    showCheckBox?: boolean;
    removeActionColumn?: boolean;
};

interface ItableLinks {
    editLink: string;
    viewLink: string;
    index: string;
    deleteLink: string;
}

interface IHeaderData {
    entityColumn: string;
    headerName: string;
}

export default function TableContent<DataItem extends object | string>({
    tableData,
    headerData,
    tableLinks,
    fetchData,
    showPagination = true,
    displayEdit = true,
    displayAdd = false,
    addActivasionFunction = undefined,
    detailsActivasionFunction = undefined,
    removeActivasionFunction = undefined,
    displayRemove = false,
    displayDelete = true,
    displayDetail = true,
    fetchOne,
    numberOfPages = 5,
    showCheckBox = true,
    removeActionColumn = false
}: Props<DataItem>) {
    const [popwindow, setPopWindow] = useState<boolean>(false);
    const [orderDirection, setOrderDirection] = useState<string>('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState<string>(
        headerData[0].entityColumn
    );
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(numberOfPages);
    const dispatch = useDispatch();
    let { id } = useParams<{ id: string }>();

    const handlerRequestSort = (event: any, property: any) => {
        const isAscending =
            valueToOrderBy === property && orderDirection === 'asc';
        setOrderDirection(isAscending ? 'desc' : 'asc');
        setValueToOrderBy(property);
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const isSelected = (firstName: string) =>
        selected.indexOf(firstName) !== -1;

    const handleClick = (
        event: React.MouseEvent<unknown>,
        firstName: string
    ) => {
        const selectedIndex = selected.indexOf(firstName);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, firstName);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelecteds = tableData.map((n: any) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const deleteSelected = async () => {
        selected.map(async (item) => {
            try {
                await api.deleteData(item, tableLinks.deleteLink);
                if (fetchData !== undefined) await dispatch(fetchData());
                if (fetchOne !== undefined) await dispatch(fetchOne(id));
            } catch (err) {
                console.log(err);
            }
        });

        tootglePopWindow();
        clearSelectedItems();
    };

    const clearSelectedItems = () => {
        setSelected((selected) => (selected = []));
    };

    const tootglePopWindow = () => {
        setPopWindow((popwindow) => !popwindow);
    };

    const activateDetail = (id: number) => {
        detailsActivasionFunction(id);
    };

    return (
        <>
            {popwindow && (
                <DataAcceptWindow>
                    <Form>
                        <FormName>Are you sure you want to delete?</FormName>
                        <FormButtons>
                            <Button
                                height='30px'
                                width='70px'
                                padding='0 10px'
                                background
                                margin='80px 0 0 0'
                                type='button'
                                onClick={deleteSelected}>
                                Delete
                            </Button>
                            <Button
                                height='30px'
                                width='70px'
                                padding='0 10px'
                                margin='80px 20px 0 0'
                                type='button'
                                onClick={() => {
                                    tootglePopWindow();
                                    clearSelectedItems();
                                }}>
                                Cancel
                            </Button>
                        </FormButtons>{' '}
                    </Form>
                </DataAcceptWindow>
            )}
            <TableContainer>
                <Table>
                    <TableHeader
                        valueToOrderBy={valueToOrderBy}
                        orderDirection={orderDirection}
                        handlerRequestSort={handlerRequestSort}
                        numSelected={selected.length}
                        rowCount={tableData.length}
                        onSelectAllClick={handleSelectAllClick}
                        headerData={headerData}
                        showPagination={showCheckBox}
                    />
                    <TableBody>
                        {sortedRowInformation(
                            tableData,
                            getComparator(orderDirection, valueToOrderBy)
                        )
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((data: any, index: number) => {
                                const isItemSelected = isSelected(data.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        key={index}
                                        selected={isItemSelected}>
                                        <TableCell padding='checkbox'>
                                            {showCheckBox && localStorage.getItem('role') !== 'User' && (
                                                <Checkbox
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            data.id
                                                        )
                                                    }
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-label': labelId
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                        {(
                                            Object.keys(tableData[0]) as Array<
                                                keyof DataItem
                                            >
                                        ).map(
                                            (key, i) =>
                                                key !== 'id' && (
                                                    <TableCell key={i}>
                                                        {data[key]}
                                                    </TableCell>
                                                )
                                        )}
                                        {!removeActionColumn && <TableCell align='center'>
                                            {displayDetail && (
                                                <IconWrapper>
                                                    {detailsActivasionFunction ===
                                                    undefined ? (
                                                        <Module.ButtonLink
                                                            to={`${tableLinks.viewLink}${data['id']}`}>
                                                            <Tooltip title='details'>
                                                                <VisibilityIcon
                                                                    color='disabled'
                                                                    style={{
                                                                        fontSize: 15
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </Module.ButtonLink>
                                                    ) : (
                                                        <Tooltip
                                                            onClick={() => {
                                                                activateDetail(
                                                                    data['id']
                                                                );
                                                            }}
                                                            title='details'>
                                                            <VisibilityIcon
                                                                color='disabled'
                                                                style={{
                                                                    fontSize: 15
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    )}
                                                </IconWrapper>
                                            )}
                                            {displayEdit &&
                                                localStorage.getItem('role') !==
                                                    'User' && (
                                                    <IconWrapper>
                                                        <Module.ButtonLink
                                                            to={`${tableLinks.editLink}${data['id']}`}>
                                                            <Tooltip title='edit'>
                                                                <EditIcon
                                                                    color='disabled'
                                                                    style={{
                                                                        fontSize: 15
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </Module.ButtonLink>
                                                    </IconWrapper>
                                                )}

                                            {displayAdd && (
                                                <IconWrapper
                                                    onClick={() => {
                                                        addActivasionFunction(
                                                            data.id
                                                        );
                                                    }}>
                                                    <Tooltip title='expand'>
                                                        <AddIcon
                                                            color='disabled'
                                                            style={{
                                                                fontSize: 15
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </IconWrapper>
                                            )}
                                            {displayRemove && (
                                                <IconWrapper
                                                    onClick={() => {
                                                        if (
                                                            removeActivasionFunction !==
                                                            undefined
                                                        )
                                                            removeActivasionFunction(
                                                                data.id
                                                            );
                                                    }}>
                                                    <Tooltip title='remove'>
                                                        <RemoveIcon
                                                            color='disabled'
                                                            style={{
                                                                fontSize: 15
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </IconWrapper>
                                            )}
                                            {displayDelete &&
                                                (localStorage.getItem(
                                                    'role'
                                                ) === 'Admin' ||
                                                    localStorage.getItem(
                                                        'role'
                                                    ) === 'Manager') && (
                                                    <IconWrapper
                                                        onClick={() => {
                                                            tootglePopWindow();
                                                        }}>
                                                        <Tooltip title='delete'>
                                                            <DeleteIcon
                                                                color='disabled'
                                                                style={{
                                                                    fontSize: 15
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </IconWrapper>
                                                )}
                                        </TableCell>}
                                    </TableRow> 
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {showPagination && (
                <TablePagination
                    component='div'
                    count={tableData.length}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 15, 20]}
                />
            )}
        </>
    );
}
