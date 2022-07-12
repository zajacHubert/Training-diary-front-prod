import React, { useState, FormEvent, ChangeEvent } from "react";
import { SimpleExerciseToAddToTraining } from 'types';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from "@mui/material";
import { ExerciseInputs } from "./ExerciseInputs";


type T = keyof SimpleExerciseToAddToTraining;

export const AddTrainingForm = () => {
    const [trainingName, setTrainingName] = useState<string>('');
    const [trainingDate, setTrainingDate] = useState(`${new Date().toISOString().slice(0, 10)}`)
    const [inputFields, setInputFields] = useState<SimpleExerciseToAddToTraining[]>([
        {
            exerciseName: '',
            reps: '',
            weights: '',
        },
    ]);

    const changeInputHanlder = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const values = [...inputFields];
        values[index][event.target.name as T] = event.target.value;
        setInputFields(values);

    }

    const formSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const newArr = inputFields.map(el => (
            { ...el, title: trainingName, date: trainingDate }
        ))
        console.log(newArr);

        Promise.all(
            newArr.map(async item => {
                await fetch(`http://localhost:3001/training`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item)
                })
            })
        )

        setInputFields([
            {
                exerciseName: '',
                reps: '',
                weights: '',
            },
        ]);
        setTrainingDate(`${new Date().toISOString().slice(0, 10)}`);
        setTrainingName('');
    }

    const addFieldHandler = () => {
        setInputFields([...inputFields, {
            exerciseName: '',
            reps: '',
            weights: '',
        }])
    }

    const removeFieldHandler = (index: number) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    return (
        <>
            <Typography
                variant="h2"
                align='center'
                style={{
                    marginBottom: 10,
                }}
            >
                Dodaj trening do dziennika
            </Typography>
            <form onSubmit={formSubmitHandler}>
                <div>
                    <TextField
                        name='training'
                        label='Nazwa treningu'
                        value={trainingName}
                        variant='outlined'
                        onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTrainingName(event.target.value)}
                        style={{ margin: '1rem' }}
                    />
                    <TextField
                        name='training date'
                        label='Data treningu'
                        type='date'
                        value={trainingDate}
                        variant='outlined'
                        onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTrainingDate(event.target.value)}
                        style={{ margin: '1rem' }}
                    />
                </div>
                <ExerciseInputs
                    inputFields={inputFields}
                    changeInputHanlder={changeInputHanlder}
                    addFieldHandler={addFieldHandler}
                    removeFieldHandler={removeFieldHandler}
                />

                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    endIcon={<SendIcon />}
                    style={{ margin: '1rem' }}
                >
                    Zapisz
                </Button>
            </form>
        </>
    )
} 