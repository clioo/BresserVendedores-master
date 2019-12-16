import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { DbService } from "../db.service";
import { Propiedad } from '../interfaces/propiedad';
import { UserServiceService } from '../user-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})

export class PropiedadesComponent implements OnInit {
  lat = 25.8147201
  lng = -108.980121
  precio = ""
  direccion = ""
  cp = ""
  descripcion = ""
  titulo = ""
  propiedad_nueva:Propiedad
  constructor(
    public crud:DbService, public userService: UserServiceService, private http: HttpClient) { }

  ngOnInit() {

  }

  registrar(){
    if (this.lat == 25.8147201) {
      alert("Seleccione ubicación")
      return
    }
    const doc = this.crud.db.collection('Propiedades').doc();
    this.propiedad_nueva = {
      id: doc.id,
      titulo: this.titulo,
      descripcion: this.descripcion,
      propietario_id: this.userService.Usuario.correo,
      precio: parseFloat(this.precio),
      tipo_venta: 1,
      domicilio: this.direccion,
      cp: this.cp,
      latitud: this.lat,
      longitud: this.lng,
      timestamp: new Date().getTime(),
      estado: true,
      imagenes: [],
    }
    this.crud.db.collection('Propiedades').doc(this.propiedad_nueva.id).set(this.propiedad_nueva, {merge: true}).then(()=>{
      location.reload()
    });
  }

  // google maps zoom level
  zoom: number = 8;

  mapClicked($event: MouseEvent) {
    this.markers = []
    this.lat = $event.coords.lat
    this.lng = $event.coords.lng
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [

  ]



}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
