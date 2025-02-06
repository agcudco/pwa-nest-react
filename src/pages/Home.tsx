// src/pages/Home.tsx
import React from 'react';
import { Card } from 'primereact/card';

const Home: React.FC = () => {
  return (
    <Card title="Bienvenido a Mi App">
      <p>Esta aplicación es un ejemplo de cómo consumir un API de NestJS para gestionar roles y usuarios.</p>
    </Card>
  );
};

export default Home;
