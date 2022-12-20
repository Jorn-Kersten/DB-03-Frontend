import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from "./shoppinglist.service";
import {ShoppingListProduct} from "./ShoppingListProduct";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {User} from "../user/User";
import {UserService} from "../user/user.service";
import {KeycloakService} from "keycloak-angular";

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

  constructor(private shoppingListService: ShoppingListService, private formBuilder: FormBuilder, private userService: UserService, private keycloakService: KeycloakService) {

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

  getShoppingList(userId: number | undefined) {
    if (userId) {
      this.shoppingListService.getShoppingList(userId).subscribe(
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
        })
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

  getShoppingListProductById(productId: number){
    this.shoppingListService.getShoppingListProductById(productId).subscribe(
      product => {(this.shoppingListProduct = product)
        console.log(product)
      })
  }

  updateQuantity(quantity: number, productId: number){
    for(let i = 0; i < this.shoppingListProducts.length; i ++) {
      if (this.shoppingListProducts[i].id == productId) {
        this.shoppingListProduct = this.shoppingListProducts[i]
      }
    }

    this.shoppingListService.updateShoppingListProduct(quantity, this.shoppingListProduct);
  }

  deleteShoppingListProduct(productId: number) {
    this.shoppingListService.deleteShoppingListProduct(productId);
  }

  onUpdate() {
    for (let i = 0; i < this.formGroups.value.forms.length; i++) {
      if (this.shoppingListProducts[i].quantity != this.formGroups.value.forms[i].quantity) {
        console.log(this.shoppingListProducts[i].quantity + " " + this.formGroups.value.forms[i].quantity)
        this.shoppingListProducts[i].quantity = this.formGroups.value.forms[i].quantity;
        this.shoppingListProducts[i] = this.shoppingListService.updateShoppingListProduct(this.formGroups.value.forms[i].productId, this.shoppingListProducts[i]);
      }
    }
  }

  async ngOnInit(){
    this.loggedIn = await this.keycloakService.isLoggedIn();

    console.log("is user logged in: " + this.loggedIn);
    if (this.loggedIn) {
      this.userService.getUser(this.keycloakService.getUsername())?.subscribe(res => {
        this.user = <User>res;

        console.log("user is: " + this.user.name + " id: " +this.user.id);
        if (this.user){
          this.getShoppingList(this.user.id)
        }
      })
    }
  }

}
