import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Table.css';

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
    createData('21 March 2022', 10000, 200000),
    createData('21 March 2022', 10000, 200000),
    createData('21 March 2022', 10000, 200000),
    createData('21 March 2022', 10000, 200000),
    createData('21 March 2022', 10000, 200000),
];

export default function BasicTable(props) {
    return (
        <TableContainer className="table-responsive-sm">
            <Table aria-label="simple table" className={props.sold ? "table table-striped" : "table table-hover"}>
                <TableHead>
                    <TableRow>
                        <TableCell className="table-header">Date/Qty</TableCell>
                        <TableCell className="table-header" align="right">Price</TableCell>
                        <TableCell className="table-header" align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell className="table-body" component="th" scope="row">{row.name}</TableCell>
                            <TableCell className="table-body" align="right">{row.calories}</TableCell>
                            <TableCell className="table-body" align="right">{row.fat}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow className="text-bold border-bottom-0">
                        <TableCell className="table-total" align="left"><b>Total</b></TableCell>
                        <TableCell className="table-total" align="right"></TableCell>
                        <TableCell className="table-total" align="right"><b>Rs. 000000</b></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}