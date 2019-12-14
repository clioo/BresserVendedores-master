import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userservice: UserServiceService) { }

  ngOnInit() {
  }
  logout() {
    this.userservice.Desconectar();
  }
}
