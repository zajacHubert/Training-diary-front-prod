import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import { Navigate, useParams } from "react-router-dom";
import { SimpleExerciseToAddToTraining } from "types";
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from "@mui/material";


type T = keyof SimpleExerciseToAddToTraining;

export const EditTrainingForm = () => {
    const { date, title } = useParams();
    const [trainingName, setTrainingName] = useState(title);
    const [trainingDate, setTrainingDate] = useState(date);
    const [inputFields, setInputFields] = useState<SimpleExerciseToAddToTraining[]>([]);
    const [redirect, setRedirect] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/training/${date}/${title}`)
            const data = await res.json();

            setInputFields(data)
        })()
    }, [])

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
                await fetch(`http://localhost:3001/training/${item.date}/${item.title}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item)
                })
            })
        )

        setRedirect(true);
    }
    if (inputFields === null) {
        return <p>Loading...</p>
    }
    return (
        <>
            {redirect && <Navigate to="/training" replace />}

            <form onSubmit={formSubmitHandler}>
                <div className="title-date">
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
                {
                    inputFields.map((el, index) => (
                        <div key={index}>
                            <TextField
                                name='exerciseName'
                                label='Nazwa ćwiczenia'
                                value={inputFields[index].exerciseName}
                                variant='filled'
                                onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeInputHanlder(index, event)}
                                style={{ margin: '1rem' }}
                            />
                            <TextField
                                name='reps'
                                label='Powtórzenia w seriach'
                                value={inputFields[index].reps}
                                variant='filled'
                                onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeInputHanlder(index, event)}
                                style={{ margin: '1rem' }}
                            />
                            <TextField
                                name='weights'
                                label='Ciężary'
                                value={inputFields[index].weights}
                                variant='filled'
                                onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeInputHanlder(index, event)}
                                style={{ margin: '1rem' }}
                            />
                        </div>
                    ))
                }
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    endIcon={<SendIcon />}
                    style={{ margin: '1rem' }}
                >
                    Edytuj
                </Button>
            </form>

        </>
    )
}