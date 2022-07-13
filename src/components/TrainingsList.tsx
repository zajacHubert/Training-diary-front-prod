import React, { useEffect, useState } from "react";
import { Spinner } from './Spinner';
import { Trainings } from 'types';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Table, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export const TrainingsList = () => {
    const [trainings, setTrainings] = useState<Trainings | null>(null);

    useEffect(() => {
        (async () => {
            await fetchTrainings();
        })()
    }, [])

    const fetchTrainings = async () => {
        const res = await fetch('http://localhost:3001/training')
        const data = await res.json();
        setTrainings(data);

    }


    const removeTrainingHanlder = async (date: string, title: string) => {
        const res = await fetch(`http://localhost:3001/training/${date}/${title}`, {
            method: 'DELETE'
        })
        const data = await res.json();
        if (data.isSuccess) {
            await fetchTrainings();
        }
    }

    if (trainings === null) {
        return <Spinner />
    }

    if (trainings.length === 0) {
        return (
            <Typography
                variant="h4"
                align='center'
                style={{
                    marginBottom: 10,
                }}

            >Nie zapisałeś jeszcze żadnego treningu</Typography>
        )
    }
    return (

        <>
            <Typography
                variant="h3"
                align='center'
                style={{
                    marginBottom: 10,
                }}

            >Wykonane treningi</Typography>
            <TableContainer component={Paper}>
                <Table sx={{
                    minWidth: 700,
                    "& .MuiTableRow-root:hover": {
                        backgroundColor: "primary.light",
                        "& .MuiTableCell-root": {
                            color: 'white',
                        }
                    },
                    "& .MuiSvgIcon-root:hover": {
                        color: 'white',
                        cursor: 'pointer',
                    }
                }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Numer treningu</StyledTableCell>
                            <StyledTableCell align="left">Nazwa treningu</StyledTableCell>
                            <StyledTableCell align="left">Data treningu</StyledTableCell>
                            <StyledTableCell align="center">Akcje</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainings.map((row, i: number) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">
                                    {i + 1}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.title}</StyledTableCell>
                                <StyledTableCell align="left">{row.date.substr(0, 10)}</StyledTableCell>
                                <StyledTableCell
                                    align="center">
                                    <Link to={`/training/${row.date}/${row.title}`}><IconButton><VisibilityIcon /></IconButton></Link>
                                    <Link to={`/training/edit-form/${row.date}/${row.title}`}><IconButton><EditIcon /></IconButton></Link>
                                    <IconButton onClick={() => removeTrainingHanlder(row.date.substr(0, 10), row.title)}><DeleteIcon /></IconButton></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}