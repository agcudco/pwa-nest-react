// src/pages/Roles.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { rolService } from '../services/rolService';
import { Rol } from '../types/types';

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [editingRol, setEditingRol] = useState<Partial<Rol>>({});
  const [rolToDelete, setRolToDelete] = useState<Rol | null>(null);
  const toast = useRef<Toast>(null);

  const loadRoles = async () => {
    try {
      const data = await rolService.findAll();
      setRoles(data);
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los roles', life: 3000 });
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const openNew = () => {
    setEditingRol({});
    setDisplayDialog(true);
  };

  const hideDialog = () => {
    setDisplayDialog(false);
  };

  const hideDeleteDialog = () => {
    setDisplayDeleteDialog(false);
    setRolToDelete(null);
  };

  const confirmDeleteRol = (rol: Rol) => {
    setRolToDelete(rol);
    setDisplayDeleteDialog(true);
  };

  const deleteRol = async () => {
    if (!rolToDelete) return;
    try {
      await rolService.remove(rolToDelete.id);
      toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Rol eliminado correctamente', life: 3000 });
      setDisplayDeleteDialog(false);
      loadRoles();
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el rol', life: 3000 });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Gestión de Roles</h2>
      <Button label="Nuevo Rol" icon="pi pi-plus" onClick={openNew} className="p-mb-3" />
      <DataTable value={roles} responsiveLayout="scroll">
        <Column field="id" header="ID" sortable />
        <Column field="nombre" header="Nombre" sortable />
        <Column field="descripcion" header="Descripción" sortable />
        <Column
          header="Acciones"
          body={(rowData: Rol) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => {
                setEditingRol(rowData);
                setDisplayDialog(true);
              }} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteRol(rowData)} />
            </>
          )}
        />
      </DataTable>

      <Dialog visible={displayDialog} header={editingRol.id ? 'Editar Rol' : 'Nuevo Rol'} onHide={hideDialog}>
        <div className="p-field">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" value={editingRol.nombre || ''} onChange={(e) => setEditingRol({ ...editingRol, nombre: e.target.value })} required autoFocus />
        </div>
        <div className="p-field">
          <label htmlFor="descripcion">Descripción</label>
          <InputText id="descripcion" value={editingRol.descripcion || ''} onChange={(e) => setEditingRol({ ...editingRol, descripcion: e.target.value })} />
        </div>
        <div className="p-dialog-footer">
          <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={hideDialog} />
        </div>
      </Dialog>

      <Dialog visible={displayDeleteDialog} header="Confirmación" onHide={hideDeleteDialog}>
        <p>¿Estás seguro de que deseas eliminar este rol?</p>
        <div className="p-dialog-footer">
          <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
          <Button label="Sí" icon="pi pi-check" className="p-button-danger" onClick={deleteRol} />
        </div>
      </Dialog>
    </div>
  );
};

export default Roles;
