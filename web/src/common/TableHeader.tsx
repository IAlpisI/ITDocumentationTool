import {
    Checkbox,
    createStyles,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Theme,
    withStyles
} from '@material-ui/core';

export default function TableHeader(props: any) {
    const {
        valueToOrderBy,
        orderDirection,
        handlerRequestSort,
        numSelected,
        rowCount,
        onSelectAllClick,
        headerData,
        showPagination=true,
    } = props;

    const createSortHandler = (property: any) => (event: any) => {
        handlerRequestSort(event, property);
    };

    const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
                backgroundColor: '#f1f3fa',
                color: '#6c75a5',
                '&:checked': {
                    color: 'red'
                }
            },
            body: {
                fontSize: 20
            }
        })
    )(TableCell);

    return (
        <TableHead>
            <TableRow>
                <StyledTableCell padding='checkbox'>
                    {showPagination && <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />}
                </StyledTableCell>
                {headerData.map((x: any) => {
                    const { entityColumn, headerName } = x;

                    return entityColumn === 'action' ? (
                        <StyledTableCell
                            align='center'
                            key={entityColumn}
                            sortDirection={
                                valueToOrderBy === entityColumn
                                    ? orderDirection
                                    : false
                            }>
                            <TableSortLabel
                                active={valueToOrderBy === entityColumn}
                                direction={
                                    valueToOrderBy === entityColumn
                                        ? orderDirection
                                        : 'asc'
                                }
                                onClick={createSortHandler(entityColumn)}>
                                {headerName}
                            </TableSortLabel>
                        </StyledTableCell>
                    ) : (
                        <StyledTableCell key={entityColumn}>
                            {headerName}
                        </StyledTableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}
