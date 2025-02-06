// src/pages/Usuarios.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { usuarioService } from '../services/usuarioService';
import { Usuario } from '../types/types';

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Partial<Usuario>>({});
  const toast = useRef<Toast>(null);

  const loadUsuarios = async () => {
    try {
      const data = await usuarioService.findAll();
      setUsuarios(data);
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar los usuarios',
        life: 3000,
      });
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const openNew = () => {
    setEditingUsuario({});
    setDisplayDialog(true);
  };

  const hideDialog = () => {
    setDisplayDialog(false);
  };

  const saveUsuario = async () => {
    try {
      if (editingUsuario.id) {
        await usuarioService.update(editingUsuario.id, editingUsuario);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario actualizado correctamente',
          life: 3000,
        });
      } else {
        await usuarioService.create(editingUsuario);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario creado correctamente',
          life: 3000,
        });
      }
      setDisplayDialog(false);
      loadUsuarios();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al guardar el usuario',
        life: 3000,
      });
    }
  };

  const deleteUsuario = async (usuario: Usuario) => {
    try {
      if (usuario.id) {
        await usuarioService.remove(usuario.id);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario eliminado correctamente',
          life: 3000,
        });
        loadUsuarios();
      }
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al eliminar el usuario',
        life: 3000,
      });
    }
  };

  const assignRole = async (usuarioId: number, roleId: number) => {
    try {
      await usuarioService.assignRole(usuarioId, roleId);
      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Rol asignado correctamente',
        life: 3000,
      });
      loadUsuarios();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al asignar el rol',
        life: 3000,
      });
    }
  };

  const removeRole = async (usuarioId: number, roleId: number) => {
    try {
      await usuarioService.removeRole(usuarioId, roleId);
      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Rol removido correctamente',
        life: 3000,
      });
      loadUsuarios();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al remover el rol',
        life: 3000,
      });
    }
  };

  const dialogFooter = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveUsuario} />
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <h2>Gestión de Usuarios</h2>
      <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={openNew} className="p-mb-3" />
      <DataTable value={usuarios} responsiveLayout="scroll">
        <Column field="id" header="ID" sortable />
        <Column field="nombre" header="Nombre" sortable />
        <Column field="email" header="Email" sortable />
        <Column
          header="Roles"
          body={(data: Usuario) =>
            data.roles && data.roles.length > 0 ? data.roles.map((r) => r.nombre).join(', ') : 'Sin Roles'
          }
        />
        <Column
          header="Acciones"
          body={(rowData: Usuario) => (
            <>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-mr-2"
                onClick={() => {
                  setEditingUsuario(rowData);
                  setDisplayDialog(true);
                }}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-warning p-mr-2"
                onClick={() => deleteUsuario(rowData)}
              />
              <Button
                label="Asignar Rol"
                icon="pi pi-check-circle"
                className="p-button-rounded p-button-info p-mr-2"
                onClick={() => assignRole(rowData.id!, 2)}
              />
              <Button
                label="Remover Rol"
                icon="pi pi-times-circle"
                className="p-button-rounded p-button-help"
                onClick={() => removeRole(rowData.id!, 2)}
              />
            </>
          )}
        />
      </DataTable>

      <Dialog visible={displayDialog} header={editingUsuario.id ? 'Editar Usuario' : 'Nuevo Usuario'} footer={dialogFooter} onHide={hideDialog}>
        <div className="p-field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={editingUsuario.nombre || ''}
            onChange={(e) => setEditingUsuario({ ...editingUsuario, nombre: e.target.value })}
            required
            autoFocus
          />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            value={editingUsuario.email || ''}
            onChange={(e) => setEditingUsuario({ ...editingUsuario, email: e.target.value })}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <InputText
            id="password"
            type="password"
            value={editingUsuario.password || ''}
            onChange={(e) => setEditingUsuario({ ...editingUsuario, password: e.target.value })}
            // Requerido al crear; si se edita, se considera opcional (se actualiza solo si se ingresa)
            required={!editingUsuario.id}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default Usuarios;
