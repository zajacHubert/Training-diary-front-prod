import React from "react";
import { AddTrainingForm } from "../components/AddTrainingForm";
import { Paper } from "@mui/material";

export const AddTrainingView = () => {
    return (
        <Paper
            sx={{
                padding: 2,
                margin: 3,
                marginTop: 5,
            }}
        >
            <AddTrainingForm />
        </Paper>
    );
} 