import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { TrainingsListView } from "./views/TrainingsListView";
import { AddTrainingView } from './views/AddTrainingView';
import { EditTrainingView } from './views/EditTrainingView';
import { Header } from './components/Header';
import { SingleTrainingView } from './views/SingleTrainingView';
import { NotFoundView } from './views/NotFoundView';

import Container from '@mui/material/Container';


export const App = () => {

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/training/add-form" replace />} />
        <Route path="/training/add-form" element={<AddTrainingView />} />
        <Route path="/training/edit-form/:date/:title" element={<EditTrainingView />} />
        <Route path="/training" element={<TrainingsListView />} />
        <Route path="/training/:date/:title" element={<SingleTrainingView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Container>
  );
}


