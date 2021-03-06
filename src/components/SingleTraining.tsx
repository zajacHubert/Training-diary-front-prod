import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Trainings } from 'types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from "@mui/material";


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


export const SingleTraining = () => {
    const { date, title } = useParams();
    console.log(date)
    const [singleTraining, setSingleTraining] = useState<Trainings | null>(null);


    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/training/${date}/${title}`)
            const data = await res.json();
            setSingleTraining(data)
            console.log(data)

        })()
    }, [])

    if (singleTraining === null) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Typography
                variant="h3"
                align='center'
                style={{
                    marginBottom: 10,
                }}

            >{title} {date}</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Liczba ??wicze??</StyledTableCell>
                            <StyledTableCell align="left">Nazwa ??wiczenia</StyledTableCell>
                            <StyledTableCell align="left">Liczba powt??rze?? w seriach</StyledTableCell>
                            <StyledTableCell align="center">Ci????ary [kg]</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {singleTraining.map((row, i) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {i + 1}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.exerciseName}</StyledTableCell>
                                <StyledTableCell align="left">{row.reps}</StyledTableCell>
                                <StyledTableCell
                                    align="center">{row.weights}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}