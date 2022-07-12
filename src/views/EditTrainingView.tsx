import React from "react";
import { EditTrainingForm } from '../components/EditTrainingForm';
import { Paper } from "@mui/material";


export const EditTrainingView = () => {
    return (
        <Paper
            sx={{
                padding: 4,
                margin: 3,
            }}
        >
            <EditTrainingForm />
        </Paper>
    )
}