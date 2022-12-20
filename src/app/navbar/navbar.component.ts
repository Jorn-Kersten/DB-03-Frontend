import { Component, OnInit } from '@angular/core';
import {UserComponent} from "../user/user.component";
import {User} from "../user/User";
import {UserService} from "../user/user.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [UserService, UserComponent],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private userComponent: UserComponent, private keycloakservice: KeycloakService) { }

  async ngOnInit() {
    this.loggedIn = await this.keycloakservice.isLoggedIn();
  }

  logOut() {
    this.userComponent.logOut();
  }

  login() {
    this.userComponent.login("http://localhost:4200/index");
  }

  register() {
    this.userComponent.register("http://localhost:4200/index");
  }
}
