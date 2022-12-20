import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {KeycloakService} from "keycloak-angular";
import {User} from "./User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [ UserService ],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loggedIn: boolean = false;
  email: string = "";
  user: User | undefined;

  constructor(private userService: UserService, private keycloakservice: KeycloakService, private router: Router) {

  }

  async ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}
    this.loggedIn = await this.keycloakservice.isLoggedIn();

    if (this.loggedIn) {
      this.getUser();
    }
    else {
      this.keycloakservice.login({redirectUri: 'http://localhost:4200/account'})
    }
  }

  getUser() {
    this.keycloakservice.loadUserProfile().then(profile => {
      this.userService.getUser(profile.username)?.subscribe(res => {
        return this.user = <User>res;
      });
    });
  }

  logOut() {
    this.keycloakservice.logout("http://localhost:4200/index").then((success) => {
      this.keycloakservice.clearToken()
      return success;
    }).catch((error) => {
      return error.errorCode;
    })
  }

  login(source: string) {
    this.keycloakservice.login({redirectUri: source}).then(() => {
      this.getUser();
      console.log(source)
    }).catch((error) => {
      console.log(error)
      return error.errorCode;
    })
  }

  register(source: string) {
    this.keycloakservice.register({redirectUri: source}).then(() => {
      this.getUser();
    }).catch((error) => {
      return error.errorCode;
    })
  }
}
