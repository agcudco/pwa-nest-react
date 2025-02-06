// src/types.ts
export interface Rol {
  id?: number;
  nombre: string;
  descripcion?: string;
  creadoEn?: string;
  actualizadoEn?: string;
  usuarios?: any[];
}

export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  // La propiedad password solo se usará en la creación/actualización
  password?: string;
  roles?: Rol[];
}
