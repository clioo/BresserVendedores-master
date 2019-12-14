export interface Usuario {
    id?: string;
    nombre: string;
    apellido: string;
    foto: string;
    correo: string;
    contraseña: string;
    telefono: string;
    tipo: number;
    agente_id?: string;
    favoritos?: string[];
  }