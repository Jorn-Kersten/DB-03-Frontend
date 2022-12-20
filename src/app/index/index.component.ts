import {Component, Input, OnInit} from '@angular/core';
import {IndexService} from "./index.service";
import {FormControl, Validators} from "@angular/forms";
import {Product} from "./Product";
import {UserService} from "../user/user.service";
import {KeycloakService} from "keycloak-angular";
import {User} from "../user/User";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [ IndexService, UserService ],
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  hide: boolean = true;
  loggedIn: boolean = false;
  name: string = "";
  checkUsername: User | undefined;

  productId: any | undefined;

  panelOpenState = false;
  error: any;
  headers: string[] = [];
  product: Product | undefined;
  products: Product[] = [];

  constructor(private indexService: IndexService, private userService: UserService, private keycloakService: KeycloakService,  private _snackBar: MatSnackBar) { }

  clear() {
    this.product = undefined;
    this.error = undefined;
    this.headers = [];
    this.products = [];
  }

  async ngOnInit() {
    this.getAllProducts()
    this.loggedIn = await this.keycloakService.isLoggedIn();

    if (this.loggedIn) {
      this.checkUser();
    }
  }

  checkUser() {
    this.keycloakService.loadUserProfile().then(profile => {
      this.userService.getUser(profile.username)?.subscribe(res => {
        this.checkUsername = <User>res;

        if (profile.username == this.checkUsername?.name) {
          console.log('already in database');
        } else {
          this.userService.addToDatabase(profile.username, profile.email);
        }
      }, error => {
        console.log("ERROR: ", error.statusText);

        if (profile.username == this.checkUsername?.name) {
          console.log('already in database');
        } else {
          console.log(profile.username, profile.email)
          this.userService.addToDatabase(profile.username, profile.email);
        }
      });
    });
  }

  async getAllProducts() {
    (await this.indexService.getAllProducts()).subscribe(
      products => (this.products = products),
      error => {
        this._snackBar.open("The backend service is not available: " + error.statusText, 'OK', {
          duration: 5000,
          panelClass: ['errorSnackbar']
        });
      }
    );
    // if(!userId){
    //   this.configService.getAllProducts().subscribe(
    //     products => {(this.products = products)
    //       console.log(products)
    //   })
    // }
    // else{
    //   this.configService.getProductsByUser(userId).subscribe(
    //     products => {(this.products = products)
    //       console.log(userId)
    //     })
    // }
  }

  getProductById(productId: number){
    this.indexService.getProductById(productId).subscribe(
      product => {(this.product = product)
        console.log(product)
      })
  }
}
