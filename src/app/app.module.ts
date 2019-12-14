import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FormsModule } from '@angular/forms';
import { PropiedadeslistComponent } from './propiedadeslist/propiedadeslist.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PropiedadesComponent,
    VendedoresComponent,
    PropiedadeslistComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSKNno0k2uTLczSQL08pRkCYN_Q419-hg'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
