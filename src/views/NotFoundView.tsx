import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";


export const NotFoundView = () => {
    return (
        <Paper
            sx={{
                padding: 4,
                margin: 3,
            }}
        >
            <Typography
                variant="h2"
                align='center'
                style={{
                    marginBottom: 20,
                }}
            >
                Nie znaleziono strony
            </Typography>
            <Box textAlign='center'>
                <NavLink to='/training/add-form' style={{ textDecoration: 'inherit' }}>
                    <Button
                        variant="contained"
                        size='large'
                        color="error"
                    >
                        Wróć do strony startowej
                    </Button>
                </NavLink>
            </Box>

        </Paper>
    )
}