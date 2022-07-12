import React from "react";
import { Paper } from "@mui/material";
import { TrainingsList } from "../components/TrainingsList";

export const TrainingsListView = () => {
    return (
        <Paper
            sx={{
                padding: 4,
                margin: 3,
            }}
        >
            <TrainingsList />
        </Paper>
    )
}