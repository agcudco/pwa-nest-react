// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Roles from './pages/Roles';
import Usuarios from './pages/Usuarios';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-m-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
