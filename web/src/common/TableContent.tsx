import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import * as Module from './Styles/form.style';

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
    console.log(rowArray);
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
};

interface ItableLinks {
    editLink: string;
    viewLink: string;
    deleteLink: string;
}

interface IHeaderData {
    entityColumn: string;
    headerName: string;
}

export default function TableContent<DataItem extends object | string>({
    tableData,
    headerData,
    tableLinks
}: Props<DataItem>) {
    const [orderDirection, setOrderDirection] = useState<string>('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState<string>(
        headerData[0].entityColumn
    );
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    return (
        <>
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
                    />
                    <TableBody>
                        {sortedRowInformation(
                            tableData ,
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
                                        onClick={(event) =>
                                            handleClick(event, data.id)
                                        }
                                        key={index}
                                        selected={isItemSelected}>
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-label': labelId
                                                }}
                                            />
                                        </TableCell>
                                        {(Object.keys(tableData[0]) as Array<
                                            keyof DataItem
                                        >).map(
                                            (key, i) =>
                                                key !== 'id' && (
                                                    <TableCell key={i}>
                                                        {data[key]}
                                                    </TableCell>
                                                )
                                        )}
                                        <TableCell>
                                            <Module.ButtonLink
                                                to={`${tableLinks.viewLink}${data['id']}`}>
                                                <VisibilityIcon
                                                    style={{ fontSize: 15 }}
                                                />
                                            </Module.ButtonLink>
                                            <Module.ButtonLink
                                                to={`${tableLinks.editLink}${data['id']}`}>
                                                <EditIcon
                                                    style={{ fontSize: 15 }}
                                                />
                                            </Module.ButtonLink>
                                            <DeleteIcon
                                                style={{ fontSize: 15 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component='div'
                count={tableData.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10]}
            />
        </>
    );
}
