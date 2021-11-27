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
import EditIcon from '@mui/icons-material/Edit';

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
                        {bp ? <TableCell variant="head"><b>收缩压</b></TableCell> : null}
                        {bp ? <TableCell variant="head"><b>舒张压</b></TableCell> : null}
                        {bs ? <TableCell variant="head"><b>血糖</b></TableCell> : null}
                        <TableCell align="center" variant="head"><b>编辑/删除</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records
                        .sort((r2, r1) => new Date(r1.timestamp).getTime() - new Date(r2.timestamp).getTime())
                        .map((row, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell size="small">{row.timestamp}</TableCell>
                                {bp ? <TableCell size="small">{row.bpHigh}</TableCell> : null}
                                {bp ? <TableCell size="small">{row.bpLow}</TableCell> : null}
                                {bs ? <TableCell size="small">{row.bs}</TableCell> : null}
                                <TableCell align="center">
                                    <IconButton onClick={() => { props.editRecord(index) }}><EditIcon color="primary" /></IconButton>
                                    <IconButton onClick={() => { props.deleteRecord(index) }}><DeleteIcon color="warning" /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}