import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
'@angular/core';
import { DbService } from "../db.service";
export interface Propiedad {
  propietario_id: string;
  precio: number;
  tipoVenta: number;
  domicilio: string;
  cp: string;
  latitud: number;
  longitud: number;
}
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
  constructor(public crud:DbService) { }

  ngOnInit() {
  }

  registrar(){
    /*
    alert(this.cp);
    this.propiedad_nueva.cp=this.cp;
    this.propiedad_nueva.latitud=this.lat;
    this.propiedad_nueva.longitud=this.lng;
    this.propiedad_nueva.precio=Number(this.precio);
    //this.propiedad_nueva.propietario_id=this.precio;
    this.propiedad_nueva.domicilio=this.direccion;
    //Falta aqui insertar
    //recarga pagina
    window.location.reload();*/

  }
 


}
