import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from "./shoppinglist.service";
import {ShoppingListProduct} from "./ShoppingListProduct";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {User} from "../user/User";
import {UserService} from "../user/user.service";
import {KeycloakService} from "keycloak-angular";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  providers: [ShoppingListService, UserService],
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  productId: number = 0;
  quantity: number = 0;

  error: any;
  headers: string[] = [];
  shoppingListProduct: ShoppingListProduct | any;
  shoppingListProducts: ShoppingListProduct[] = [];

  loggedIn: boolean = false;
  email: string = "";
  user: User | undefined;

  formGroups: FormGroup = this.formBuilder.group({
    forms: this.formBuilder.array([])
  });

  constructor(private shoppingListService: ShoppingListService, private formBuilder: FormBuilder, private userService: UserService, private keycloakService: KeycloakService,  private _snackBar: MatSnackBar) {

  }

  clear() {
    this.shoppingListProduct = undefined;
    this.error = undefined;
    this.headers = [];
    this.shoppingListProducts = [];
  }

  get forms() {
    return this.formGroups.controls["forms"] as FormArray;
  }

  async getShoppingList(userName: string | undefined) {
    if (userName) {
      await this.shoppingListService.getShoppingList(userName).subscribe(
        shoppingListProducts => {
          if (shoppingListProducts) {
            this.shoppingListProducts = shoppingListProducts
            Object.keys(shoppingListProducts).forEach((i) => {
              const tempFormGroup = this.formBuilder.group({
                productId: new FormControl({value: shoppingListProducts[Number(i)].id, disabled: false}),
                quantity: new FormControl({value: shoppingListProducts[Number(i)].quantity, disabled: false})
              });

              this.forms.push(tempFormGroup);
            });
          }
        },
        error => {
          this._snackBar.open("An error occurred while loading the page: " + error.statusText, 'OK', {
              duration: 5000,
              panelClass: ['errorSnackbar']
            }
          );
        }
      )
    }
  }

  createFormGroups(){
    Object.keys(this.shoppingListProducts).forEach((i) => {
      const tempFormGroup = this.formBuilder.group({
        productId: new FormControl({ value: this.shoppingListProducts[Number(i)].id, disabled: false }),
        quantity: new FormControl({ value: this.shoppingListProducts[Number(i)].quantity, disabled: false })
      })

      this.forms.push(tempFormGroup)
    })
  }

  getShoppingListProductById(userName: string, productId: number){
    this.shoppingListService.getShoppingListProductById(userName, productId).subscribe(
      product => {
        this.shoppingListProduct = product
      },
      error => {
        this._snackBar.open("An error occurred: " + error.statusText, 'OK', {
            duration: 5000,
            panelClass: ['errorSnackbar']
          }
        );
      }
    )
  }

  updateQuantity(userName: string, quantity: number, productId: number){
    for(let i = 0; i < this.shoppingListProducts.length; i ++) {
      if (this.shoppingListProducts[i].id == productId) {
        this.shoppingListProduct = this.shoppingListProducts[i]
      }
    }

    this.shoppingListService.updateShoppingListProduct(userName, quantity, this.shoppingListProduct).subscribe(
      succes => {
        this._snackBar.open("Successfully updated product.", 'OK', {
            duration: 5000,
            panelClass: ['errorSnackbar']
          }
        );
      },
      error => {
        this._snackBar.open("An error occurred while loading the page: " + error.statusText, 'OK', {
            duration: 5000,
            panelClass: ['errorSnackbar']
          }
        );
      }
    );
  }

  async deleteShoppingListProduct(userName: string ,productId: number) {
    await this.shoppingListService.deleteShoppingListProduct(userName, productId).subscribe(
      succes => {
        this._snackBar.open("Successfully removed product from shopping list.", 'OK', {
            duration: 5000,
            panelClass: ['errorSnackbar']
          }
        );
      },
      error => {
        this._snackBar.open("An error occurred while removing product: " + error.statusText, 'OK', {
            duration: 5000,
            panelClass: ['errorSnackbar']
          }
        );
      }
    );
  }

  onUpdate() {
    for (let i = 0; i < this.formGroups.value.forms.length; i++) {
      if (this.shoppingListProducts[i].quantity != this.formGroups.value.forms[i].quantity) {
        this.shoppingListProducts[i].quantity = this.formGroups.value.forms[i].quantity;
        this.shoppingListService.updateShoppingListProduct(this.user?.name, this.formGroups.value.forms[i].productId, this.shoppingListProducts[i]).subscribe(
          shoppingListProduct => {
            this.shoppingListProducts[i] = shoppingListProduct;
            this._snackBar.open("Successfully updated the product.", 'OK', {
                duration: 5000,
                panelClass: ['errorSnackbar']
              }
            );
          },
          error => {
            this._snackBar.open("An error occurred while updating the product: " + error.statusText, 'OK', {
                duration: 5000,
                panelClass: ['errorSnackbar']
              }
            );
          }
        );
      }
    }
  }

  async ngOnInit(){
    this.loggedIn = await this.keycloakService.isLoggedIn();

    if (this.loggedIn) {
      await this.userService.getUser(this.keycloakService.getUsername())?.subscribe(res => {
        this.user = <User>res;

        if (this.user){
          this.getShoppingList(this.user.name)
        }
      })
    }
  }

}
