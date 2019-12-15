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
  lat = 25.8147201
  lng = -108.980121
  precio = ""
  direccion = ""
  cp = ""
  propiedad_nueva:Propiedad
  constructor(public crud:DbService, public userService: UserServiceService) { }

  ngOnInit() {
  }

  registrar(){
    //FALTA VALIDAR Y AGREGAR FOTOS Y GOOGLEMAPS
    const doc = this.crud.db.collection('Propiedades').doc();
    this.propiedad_nueva = {
      id: doc.id,
      titulo: "",
      descripcion: "",
      propietario_id: this.userService.Usuario.correo,
      precio: parseFloat(this.precio),
      tipoVenta: 1,
      domicilio: this.direccion,
      cp: this.cp,
      latitud: this.lat,
      longitud: this.lng,
      timestamp: new Date().getTime(),
      estado: true,
      imagenes: [],
      keywords: [this.direccion, this.cp]
    }
    this.crud.db.collection('Propiedades').doc(this.propiedad_nueva.id).set(this.propiedad_nueva, {merge: true}).then(()=>{
      location.reload()
    });
  }
 


}
