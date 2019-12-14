import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropiedadesComponent } from "../app/propiedades/propiedades.component";
import { VendedoresComponent } from "../app/vendedores/vendedores.component";
import { PropiedadeslistComponent } from "../app/propiedadeslist/propiedadeslist.component";
import { RegistroComponent } from "../app/registro/registro.component";
import { LoginComponent } from "../app/login/login.component";


const routes: Routes = [
 { path: 'propiedades/nueva',
 component: PropiedadesComponent},
 { path: 'vendedor/nuevo',
 component: VendedoresComponent},
 {path: 'propiedades',
 component: PropiedadeslistComponent},
 {path: 'IniciarSesion',
 component: LoginComponent},
 {path: 'registro',
 component: RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
