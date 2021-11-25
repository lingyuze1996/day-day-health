import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function RecordTable(props) {
    const records = props.records
    const bs = props.bsSelected
    const bp = props.bpSelected

    return (
        <TableContainer style={{ marginBottom: "20px" }} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell variant="head"><b>日期</b></TableCell>
                        {bp ? <TableCell variant="head"><b>收缩压</b></TableCell> : ""}
                        {bp ? <TableCell variant="head"><b>舒张压</b></TableCell> : ""}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records.map((row, index) => (
                        <TableRow
                            key={index}
                        >
                            <TableCell size="small">{row.timestamp}</TableCell>
                            <TableCell size="small">{row.bloodPressureHigh}</TableCell>
                            <TableCell size="small">{row.bloodPressureLow}</TableCell>
                            <TableCell align="center"><IconButton onClick={() => { props.deleteElement(index) }}><DeleteIcon color="warning" /></IconButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}