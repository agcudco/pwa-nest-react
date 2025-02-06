// src/components/Navbar.tsx
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: 'Roles',
      icon: 'pi pi-id-card',
      command: () => navigate('/roles')
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      command: () => navigate('/usuarios')
    },
    {
      label: 'Acerca de',
      icon: 'pi pi-info-circle',
      command: () => navigate('/about')
    }
  ];

  return <Menubar model={items} />;
};

export default Navbar;
