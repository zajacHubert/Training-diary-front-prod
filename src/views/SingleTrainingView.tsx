import React from "react";
import { SingleTraining } from "../components/SingleTraining";
import { Paper } from "@mui/material";


export const SingleTrainingView = () => {
    return (
        <Paper
            sx={{
                padding: 4,
                margin: 3,
            }}
        >
            <SingleTraining />
        </Paper>
    )
}