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
      .where('contraseña', '==', userlogin.contraseña)
      .limit(1)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          this.Usuario = JSON.parse(JSON.stringify(doc.data()));
          delete this.Usuario.contraseña;
        });
        if (res.size === 0) {
          this.Desconectar();
        }
      });
    }
  }
  Conectar(usuario: string, contraseña: string, exito, error) {
    this.crud.db.collection('Usuarios')
    .where('correo', '==', usuario)
    .where('contraseña', '==', contraseña)
    .where('tipo', '==', 1)
    .limit(1).get().then((res) => {
      if (res.size > 0) {
        res.forEach((doc) => {
          this.Usuario = JSON.parse(JSON.stringify(doc.data()));
          const Token = {
            User: this.Usuario.correo,
            contraseña: this.Usuario.contraseña
          };
          localStorage.setItem('Token', JSON.stringify(Token));
          delete this.Usuario.contraseña;
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
    contraseña: string,
    foto: string,
    telefono: string,
    exito, 
    error) {
      this.Usuario = {
        nombre,
        correo,
        contraseña,
        foto,
        apellido,
        telefono,
        tipo: 1
      };
      this.crud.db.collection('Usuarios').add(this.Usuario).then(() => {
        const Token = {
          User: this.Usuario.correo,
          contraseña: this.Usuario.contraseña
        };
        localStorage.setItem('Token', JSON.stringify(Token));
        exito();
      }).catch(() => {
        error();
      });
  }
}
