import React, { ChangeEvent } from "react";
import { SimpleExerciseToAddToTraining } from "types";
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import { IconButton, TextField } from "@mui/material";

interface Props {
    inputFields: SimpleExerciseToAddToTraining[];
    changeInputHanlder: (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    removeFieldHandler: (index: number) => void;
    addFieldHandler: () => void;
}

export const ExerciseInputs = ({ inputFields, changeInputHanlder, removeFieldHandler, addFieldHandler }: Props) => {
    return (
        <>
            {
                inputFields.map((inputField, index: number) => (
                    <div key={index}>
                        <TextField
                            name='exerciseName'
                            label='Nazwa ćwiczenia'
                            value={inputField.exerciseName}
                            variant='filled'
                            onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeInputHanlder(index, event)}
                            style={{ margin: '1rem' }}
                        />
                        <TextField
                            name='reps'
                            label='Powtórzenia w seriach'
                            value={inputField.reps}
                            variant='filled'
                            onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeInputHanlder(index, event)}
                            style={{ margin: '1rem' }}
                        />
                        <TextField
                            name='weights'
                            label='Ciężary'
                            value={inputField.weights}
                            variant='filled'
                            onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeInputHanlder(index, event)}
                            style={{ margin: '1rem' }}
                        />

                        <IconButton onClick={() => addFieldHandler()}>
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={() => removeFieldHandler(index)}>
                            <HorizontalRuleIcon />
                        </IconButton>
                    </div>
                ))
            }
        </>
    )
}