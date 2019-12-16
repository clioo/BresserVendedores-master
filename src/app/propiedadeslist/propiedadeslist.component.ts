import { Component, OnInit } from '@angular/core';
import { DbService } from "../db.service";
interface propiedades{
  precio:Number;
  domicilio:String;
  id:Number;
  latitud:String;
  longitud:String;
  codigoPostal:String;
  status:boolean;
}
@Component({
  selector: 'app-propiedadeslist',
  templateUrl: './propiedadeslist.component.html',
  styleUrls: ['./propiedadeslist.component.css']
})


export class PropiedadeslistComponent implements OnInit {
  user_data:propiedades[]=[]
  constructor(public crud:DbService) { 
    const self=this
    this.crud.db.collection("Propiedades").get().then(d=>{
        d.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          var documento = doc.data();
          self.user_data.push(JSON.parse(JSON.stringify(documento)));
          console.log(this.user_data[0]);
      });
    });
    
  }

  ngOnInit() {
  }

}
