export interface Propiedad {
  id?: string;
  propietario_id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipoVenta: number;
  domicilio: string;
  cp: string;
  latitud: number;
  longitud: number;
  timestamp: number;
  estado: boolean;
  imagenes: string[];
  keywords: string[];
}