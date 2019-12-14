export interface Propiedad {
  id?: string;
  nombre: string;
  propietario_id: string;
  precio: number;
  tipoVenta: number;
  domicilio: string;
  cp: string;
  latitud: number;
  longitud: number;
  timestamp: number;
  estado: boolean;
  imagenes: string[];
}