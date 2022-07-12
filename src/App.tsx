import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Container from '@mui/material/Container';

import { AddTrainingView } from './views/AddTrainingView';
import { Header } from './components/Header';


export const App = () => {

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/training/add-form" replace />} />
        <Route path="/training/add-form" element={<AddTrainingView />} />
      </Routes>
    </Container>
  );
}


