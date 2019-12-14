import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
'@angular/core';
import { DbService } from "../db.service";
import { Propiedad } from '../interfaces/propiedad';
import { UserServiceService } from '../user-service.service';
@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})

export class PropiedadesComponent implements OnInit {
  lat=25.7901963
  lng=-108.986368
  precio
  direccion
  cp
  propiedad_nueva:Propiedad
  constructor(public crud:DbService, public userService: UserServiceService) { }

  ngOnInit() {
  }

  registrar(){
    //FALTA VALIDAR Y AGREGAR FOTOS
    const doc = this.crud.db.collection('Propiedades').doc();
    this.propiedad_nueva = {
      id: doc.id,
      titulo: "",
      propietario_id: this.userService.Usuario.id,
      precio: this.precio,
      tipoVenta: 1,
      domicilio: this.direccion,
      cp: this.cp,
      latitud: this.lat,
      longitud: this.lng,
      timestamp: new Date().getTime(),
      estado: true,
      imagenes: []
    }
    this.crud.insert('Propiedades', doc, ()=>{
      location.reload()
    }, ()=>{})
  }
 


}
