import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {
  lat = 40.730610;
  lng = -73.935242;
  constructor() { }

  ngOnInit() {
  }

}
