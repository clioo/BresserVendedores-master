import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertOptions } from "sweetalert2";
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Usuario: string;
  Pass: string;
  cargando:boolean = false;
  constructor(public usuarioservice: UserServiceService, private router: Router) {}
  Conectar() {
    this.cargando = true;
    if (this.Usuario == null || this.Usuario == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido un correo electrónico."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.Pass == null || this.Pass == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido una contraseña."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else {
      this.usuarioservice.Conectar(this.Usuario, this.Pass, ()=> {
        this.router.navigate(["/"]);
      }, ()=> {
        const opt: SweetAlertOptions = {
          icon: 'error',
          title: "¡Error!",
          text: "No has introducido un correo electrónico y/o contraseña válidos."
        }
        Swal.fire(opt);
        this.cargando = false;
      });
    }
  }
  ngOnInit() {
  }

}
