import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from "sweetalert2";
import { DbService } from '../db.service';
import { Documento } from '../interfaces/documento';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  Usuario: string;
  Pass: string;
  Nombre: string;
  Apellido: string;
  archivo: Documento = null;
  Telefono: string;
  constructor(public usuarioservice: UserServiceService, public crud: DbService, private router: Router) { }
  cargando = false;
  subiendofoto = false;
  file: File;
  ngOnInit() {
  }
  Registrar() {
    this.cargando = true;
    if (this.Nombre == null || this.Nombre == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu nombre."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.Apellido == null || this.Apellido == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu apellido."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.Usuario == null || this.Usuario == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu correo electrónico."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.Pass == null || this.Pass == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu contraseña."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.Telefono == null || this.Telefono == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu teléfono."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.archivo == null){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has seleccionado fotografía de perfil."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else {
      this.usuarioservice.Verificarcorreo(this.Usuario, ()=>{
        this.usuarioservice.Registrar(this.Nombre, this.Apellido, this.Usuario, this.Pass, this.archivo.URL, this.Telefono, ()=> {
          this.router.navigate(["/"]);
        }, ()=> {
          const opt: SweetAlertOptions = {
            icon: 'error',
            title: "¡Error!",
            text: "Ha ocurrido un error al registrarte."
          };
          Swal.fire(opt);
          this.cargando = false;
        });
      }, ()=>{
        const opt: SweetAlertOptions = {
          icon: 'error',
          title: "¡Error!",
          text: "Ha ocurrido un error al registrarte, ese correo ya está en uso."
        };
        Swal.fire(opt);
        this.cargando = false;
      });
    }
  }
  SelectFile(event) {
    this.file = <File>event.target.files[0];
    if (this.file) {
      this.subiendofoto = true;
      const storageref = this.crud.storage.ref();
      const metadata = {
        contentType: this.file.type
      };
      console.log(this.file.type);
      const self = this;
      const fecha = new Date();
      const ext = this.getExtension(this.file.name);
      storageref.child(fecha.getHours().toString() + fecha.getMinutes().toString() +
      fecha.getDate().toString() + fecha.getMonth().toString() + fecha.getFullYear().toString() + '/' +
      self.file.name)
      .put(self.file, metadata)
      .catch(function (err) {console.log(err); 
        Swal.fire('¡Error!', 'Error al subir mensaje ' + err.toString(), 'error');
        self.subiendofoto = false;
      })
      .then(function(snap) {
        snap.ref.getDownloadURL().then((URL)=>{
          const documento: Documento = {
            URL: URL,
            fecha: fecha,
            nombre: self.file.name,
            tipo: ext
          };
          self.crud.insert('documento', documento,
            function(res) {
              documento.id = res.id;
              self.archivo = documento;
              self.subiendofoto = false;
            },
            function(res) { 
              console.log(res); 
              self.subiendofoto = false;
            }
          );
        });
      });
    }
  }
  getExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
}
