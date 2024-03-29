import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { StyledTableRow, StyledTableHeading } from './style';

const GenericTable = (props) => {
  const {
    id,
    columns,
    data, orderBy, sort, order, select, actions,
  } = props;
  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper} margin={5}>
          <Table>
            <TableHead key={id}>
              {columns.map((column) => (
                <StyledTableHeading
                  key={column.field}
                  align={column.align}
                >
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={order}
                    onClick={() => sort(column.field)}
                  >
                    {column.label ? column.label : column.field}
                  </TableSortLabel>
                </StyledTableHeading>
              ))}
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.field];
                    return (
                      <TableCell key={`${row.id}${column.field}`} onClick={() => select(row.id)} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    {actions.map((action) => (
                      <IconButton
                        onClick={() => (action.handler(row))}
                      >
                        {action.icon}
                      </IconButton>
                    ))}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

GenericTable.defaultProps = {
  orderBy: '',
  order: 'asc',
  page: 0,
  rowsPerPage: 100,
  actions: [],
};

GenericTable.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderBy: PropTypes.string,
  sort: PropTypes.func.isRequired,
  order: PropTypes.string,
  select: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
};

export default GenericTable;
