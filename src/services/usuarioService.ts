// src/services/usuarioService.ts
import { Usuario } from '../types/types';
import { fetchAPI } from './api';

export const usuarioService = {
  findAll: async (): Promise<Usuario[]> => {
    return await fetchAPI('/usuario');
  },
  findOne: async (id: number): Promise<Usuario> => {
    return await fetchAPI(`/usuario/${id}`);
  },
  create: async (data: Partial<Usuario>): Promise<Usuario> => {
    const { nombre, email, password } = data;
    return await fetchAPI('/usuario', {
      method: 'POST',
      body: JSON.stringify({ nombre, email, password }),
    });
  },
  update: async (id: number, changes: Partial<Usuario>): Promise<Usuario> => {
    const { nombre, email, password } = changes;
    return await fetchAPI(`/usuario/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        nombre,
        email,
        ...(password && password.trim() !== '' ? { password } : {}),
      }),
    });
  },
  remove: async (id: number): Promise<void> => {
    return await fetchAPI(`/usuario/${id}`, {
      method: 'DELETE',
    });
  },
  assignRole: async (userId: number, roleId: number): Promise<Usuario> => {
    return await fetchAPI(`/usuario/${userId}/roles/${roleId}`, {
      method: 'POST',
    });
  },
  removeRole: async (userId: number, roleId: number): Promise<Usuario> => {
    return await fetchAPI(`/usuario/${userId}/roles/${roleId}`, {
      method: 'DELETE',
    });
  },
};
