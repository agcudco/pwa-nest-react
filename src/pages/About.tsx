// src/pages/About.tsx
import React from 'react';
import { Card } from 'primereact/card';

const About: React.FC = () => {
  return (
    <Card title="Acerca de">
      <p>Esta aplicación es un ejemplo de un frontend PWA desarrollado con React, TypeScript, Vite y PrimeReact.</p>
      <p>Consume un API REST desarrollado en NestJS para gestionar roles y usuarios.</p>
    </Card>
  );
};

export default About;
