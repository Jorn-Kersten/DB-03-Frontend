import {Component, Input, OnInit} from '@angular/core';
import {IndexService} from "./index.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "./Product";
import {UserService} from "../user/user.service";
import {KeycloakService} from "keycloak-angular";
import {User} from "../user/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ShoppingListService} from "../shoppinglist/shoppinglist.service";
import {ShoppingListProduct} from "../shoppinglist/ShoppingListProduct";
import {ShoppingList} from "../shoppinglist/ShoppingList";
import * as moment from "moment";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [ IndexService, UserService, ShoppingListService ],
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
  tempShoppingListProduct: ShoppingListProduct[] = [];
  shoppingListProduct: ShoppingListProduct | any;
  shoppingList: ShoppingList | any;
  shoppingLists: ShoppingList[] = [];
  user: User | any;

  formGroups: FormGroup = this.formBuilder.group({
    forms: this.formBuilder.array([])
  });

  constructor(private indexService: IndexService, private shoppinglistService: ShoppingListService, private userService: UserService, private formBuilder: FormBuilder, private keycloakService: KeycloakService,  private _snackBar: MatSnackBar) { }

  clear() {
    this.product = undefined;
    this.error = undefined;
    this.headers = [];
    this.products = [];
  }

  get forms() {
    return this.formGroups.controls["forms"] as FormArray;
  }

  async ngOnInit() {
    this.loggedIn = await this.keycloakService.isLoggedIn();

    this.getAllProducts()

    if (this.loggedIn) {
      this.checkUser();
      this.userService.getUser(this.keycloakService.getUsername())?.subscribe(res => {
        this.user = <User>res;
      })
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
          this.userService.addToDatabase(profile.username, profile.email);
        }
      });
    });
  }

  async getAllProducts() {
    (await this.indexService.getAllProducts()).subscribe(
      products => {
        if (products) {
          this.products = products
          Object.keys(products).forEach((i) => {
            const tempFormGroup = this.formBuilder.group({
              productId: new FormControl({value: products[Number(i)].id, disabled: false}),
              quantity: new FormControl({value: 1, disabled: false})
            });

            this.forms.push(tempFormGroup);
          });
        }
      },
      error => {
        this._snackBar.open("The backend service is not available: " + error.statusText, 'OK', {
          duration: 5000,
          panelClass: ['errorSnackbar']
        });
      }
    );
  }

  getProductById(productId: number){
    this.indexService.getProductById(productId).subscribe(
      product => {
        this.product = product
      })
  }

  async addToShoppingList(id: number){
    if (this.loggedIn) {
      this.userService.getUser(this.keycloakService.getUsername())?.subscribe(res => {
        this.user = <User>res;
        this.shoppinglistService.getShoppingList(this.user.name).subscribe(
          async shoppingListProducts => {
            if (shoppingListProducts) {
              this.tempShoppingListProduct = shoppingListProducts;
              if (this.tempShoppingListProduct) {
                for (let i = 0; i < this.formGroups.value.forms.length; i++) {
                  var startOfWeek = moment().startOf('isoWeek').toDate();
                  var endOfWeek = moment().endOf('isoWeek').toDate();
                  if (this.tempShoppingListProduct) {
                    if (this.formGroups.value.forms[i].productId == id) {
                      if (this.tempShoppingListProduct[this.tempShoppingListProduct.length-1].date >= startOfWeek && this.tempShoppingListProduct[this.tempShoppingListProduct.length-1].date <= endOfWeek) {
                        this.shoppingListProduct = this.shoppingListProduct || {};
                        this.shoppingListProduct.shoppingListId = this.tempShoppingListProduct[this.tempShoppingListProduct.length-1].id;
                        this.shoppingListProduct.userName = this.user?.name;
                        this.shoppingListProduct.quantity = this.formGroups.value.forms[i].quantity;
                        this.shoppingListProduct.content = this.products[id-1].content;
                        this.shoppingListProduct.name = this.products[id-1].name;
                        this.shoppingListProduct.superMarket = this.products[id-1].supermarket;
                        this.shoppingListProduct.url = this.products[id-1].url;
                        this.shoppingListProduct.date = this.products[id-1].date;
                        this.shoppingListProduct.price = this.products[id-1].price;

                        (await this.shoppinglistService.addShoppingListProduct(this.user.name, this.shoppingListProduct)).subscribe(
                          succes => {
                            console.log("added to shoppinglist")
                            this._snackBar.open("Successfully added product to shopping list.", 'OK', {
                                duration: 5000,
                                panelClass: ['errorSnackbar']
                              }
                            );
                          },
                          error => {
                            this._snackBar.open("Could not add to shopping list: " + error.statusText, 'OK', {
                                duration: 5000,
                                panelClass: ['errorSnackbar']
                              }
                            );
                          }
                        )
                      } else {
                        this.shoppingList = this.shoppingList || {};
                        this.shoppingList.name = "Shopping List " + Date.now().toString();
                        this.shoppingList.supermarket = "";
                        this.shoppingList.date = Date.now();
                        this.shoppingList.totalPrice = 0.0;
                        this.shoppinglistService.addShoppingList(this.user.name, this.shoppingList);

                        this.shoppinglistService.getAllShoppingList(this.user.name).subscribe(
                          shoppingLists => {
                            this.shoppingLists = shoppingLists;
                            this.shoppingList = this.shoppingLists[this.shoppingLists.length-1];
                            this.shoppingListProduct = this.shoppingListProduct || {};
                            this.shoppingListProduct.shoppingListId = this.shoppingList.id;
                            this.shoppingListProduct.userName = this.user?.name;
                            this.shoppingListProduct.quantity = this.formGroups.value.forms[i].quantity;
                            this.shoppingListProduct.content = this.products[id-1].content;
                            this.shoppingListProduct.name = this.products[id-1].name;
                            this.shoppingListProduct.superMarket = this.products[id-1].supermarket;
                            this.shoppingListProduct.url = this.products[id-1].url;
                            this.shoppingListProduct.date = this.products[id-1].date;
                            this.shoppingListProduct.price = this.products[id-1].price;

                            this.shoppinglistService.addShoppingListProduct(this.user.name, this.shoppingListProduct).subscribe(
                              succes => {
                                console.log("Created shoppingList and added to database")
                                this._snackBar.open("Successfully added product to shopping list.", 'OK', {
                                    duration: 5000,
                                    panelClass: ['errorSnackbar']
                                  }
                                );
                              },
                              error => {
                                this._snackBar.open("Could not add to shopping list: " + error.statusText, 'OK', {
                                    duration: 5000,
                                    panelClass: ['errorSnackbar']
                                  }
                                );
                              }
                            )

                          },
                          error => {
                            this._snackBar.open("An error occurred when trying to retrieve data: " + error.statusText, 'OK', {
                                duration: 5000,
                                panelClass: ['errorSnackbar']
                              }
                            );
                          }
                        )
                      }
                    }
                  }
                }
              }
            }
            else {
              for (let i = 0; i < this.formGroups.value.forms.length; i++) {
                if (this.tempShoppingListProduct) {
                  if (this.formGroups.value.forms[i].productId == id) {
                    this.shoppingList.name = "Shopping List " + new Date("dd-mm-YYYY") + "";
                    this.shoppingList.supermarket = "";
                    this.shoppingList.date = new Date("dd-mm-YYYY");
                    this.shoppingList.totalPrice = 0.0;
                    this.shoppinglistService.addShoppingList(this.user.name, this.shoppingList);

                    this.shoppinglistService.getAllShoppingList(this.user.name).subscribe(
                      shoppingLists => {
                        this.shoppingLists = shoppingLists;
                        this.shoppingList = this.shoppingLists[this.shoppingLists.length - 1];
                        this.shoppingListProduct = this.shoppingListProduct || {};
                        this.shoppingListProduct.shoppingListId = this.shoppingList.id;
                        this.shoppingListProduct.userName = this.user?.name;
                        this.shoppingListProduct.quantity = this.formGroups.value.forms[i].quantity;
                        this.shoppingListProduct.content = this.products[id - 1].content;
                        this.shoppingListProduct.name = this.products[id - 1].name;
                        this.shoppingListProduct.superMarket = this.products[id - 1].supermarket;
                        this.shoppingListProduct.url = this.products[id - 1].url;
                        this.shoppingListProduct.date = this.products[id - 1].date;
                        this.shoppingListProduct.price = this.products[id - 1].price;

                        this.shoppinglistService.addShoppingListProduct(this.user.name, this.shoppingListProduct).subscribe(
                          succes => {
                            console.log("added to shoppinglist")
                            this._snackBar.open("Successfully added product to shopping list.", 'OK', {
                                duration: 5000,
                                panelClass: ['errorSnackbar']
                              }
                            );
                          },
                          error => {
                            this._snackBar.open("Could not add to shopping list: " + error.statusText, 'OK', {
                                duration: 5000,
                                panelClass: ['errorSnackbar']
                              }
                            );
                          }
                        )

                      },
                      error => {
                        this._snackBar.open("An error occurred when trying to retrieve data: " + error.statusText, 'OK', {
                            duration: 5000,
                            panelClass: ['errorSnackbar']
                          }
                        );
                      }
                    )
                  }
                }
              }
            }
          });
      });
    }
    else
    {
      this._snackBar.open("please login to add products to you're shopping list.", "OK", {
          duration: 5000,
          panelClass: ['errorSnackbar']
        }
      );
    }
  }
}
