import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Usuario } from '../app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  Token: string = null;
  Usuario: Usuario = null;
  constructor(public crud: DbService) {
    this.Token = localStorage.getItem('Token');
    if (this.Token != null) {
      const userlogin = JSON.parse(this.Token);
      crud.db.collection('Usuarios')
      .where('correo', '==', userlogin.User)
      .where('contrasena', '==', userlogin.contrasena)
      .limit(1)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          this.Usuario = JSON.parse(JSON.stringify(doc.data()));
          delete this.Usuario.contrasena;
        });
        if (res.size === 0) {
          this.Desconectar();
        }
      });
    }
  }
  Conectar(usuario: string, contrasena: string, exito, error) {
    this.crud.db.collection('Usuarios')
    .where('correo', '==', usuario)
    .where('contrasena', '==', contrasena)
    .where('tipo', '==', 1)
    .limit(1).get().then((res) => {
      if (res.size > 0) {
        res.forEach((doc) => {
          this.Usuario = JSON.parse(JSON.stringify(doc.data()));
          const Token = {
            User: this.Usuario.correo,
            contrasena: this.Usuario.contrasena
          };
          localStorage.setItem('Token', JSON.stringify(Token));
          delete this.Usuario.contrasena;
          exito();
        });
      } else {
        error();
      }
    }).catch(() => {
      error();
    });
  }
  Desconectar() {
    this.Usuario = null;
    localStorage.removeItem('Token');
  }
  Verificarcorreo(correo: string, entonces, error) {
    this.crud.db.collection('Usuarios')
    .where('correo', '==', correo)
    .where('tipo', '==', 1)
    .get().then((res) => {
      if (res.size === 0) {
        entonces();
      } else {
        error();
      }
    });
  }
  Registrar(
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string,
    foto: string,
    telefono: string,
    exito, 
    error) {
      this.Usuario = {
        nombre,
        correo,
        contrasena,
        foto,
        apellido,
        telefono,
        tipo: 1
      };
      this.crud.db.collection('Usuarios').add(this.Usuario).then(() => {
        const Token = {
          User: this.Usuario.correo,
          contrasena: this.Usuario.contrasena
        };
        localStorage.setItem('Token', JSON.stringify(Token));
        exito();
      }).catch(() => {
        error();
      });
  }
}
