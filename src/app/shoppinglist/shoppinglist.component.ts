import { Component, OnInit } from '@angular/core';
import {ConfigService} from "./shoppinglist.service";
import {ShoppingListProduct} from "./ShoppingListProduct";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  providers: [ConfigService],
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  productId: number = 0;
  quantity: number = 0;

  error: any;
  headers: string[] = [];
  shoppingListProduct: ShoppingListProduct | any;
  shoppingListProducts: ShoppingListProduct[] = [];

  formGroups: FormGroup | any;

  constructor(private configService: ConfigService, private formBuilder: FormBuilder) {

  }

  clear() {
    this.shoppingListProduct = undefined;
    this.error = undefined;
    this.headers = [];
    this.shoppingListProducts = [];
  }

  getShoppingList(userId: number) {
    if (!userId) {
      this.configService.getShoppingList(userId).subscribe(
        shoppingListProducts => {
          (this.shoppingListProducts = shoppingListProducts)
          // console.log(shoppingListProducts)

          this.formGroups = this.formBuilder.group({
            forms: this.formBuilder.array([])
          });

          const controlArray = this.formGroups.get("forms") as FormArray;

          Object.keys(shoppingListProducts).forEach((i) => {
            controlArray.push(
              this.formBuilder.group({
                productId: new FormControl({ value: shoppingListProducts[Number(i)].id, disabled: false }),
                quantity: new FormControl({ value: shoppingListProducts[Number(i)].quantity, disabled: false })
              })
            )
          })
        })
    }
  }

  getShoppingListProductById(productId: number){
    this.configService.getShoppingListProductById(productId).subscribe(
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

    this.configService.updateShoppingListProduct(quantity, this.shoppingListProduct);
  }

  deleteShoppingListProduct(productId: number) {
    this.configService.deleteShoppingListProduct(productId);
  }

  onUpdate() {
    for (let i = 0; i < this.formGroups.value.forms.length; i++) {
      if (this.shoppingListProducts[i].quantity != this.formGroups.value.forms[i].quantity) {
        console.log(this.shoppingListProducts[i].quantity + " " + this.formGroups.value.forms[i].quantity)
        this.shoppingListProducts[i].quantity = this.formGroups.value.forms[i].quantity;
        this.shoppingListProducts[i] = this.configService.updateShoppingListProduct(this.formGroups.value.forms[i].productId, this.shoppingListProducts[i]);
      }
    }
  }

  ngOnInit(): void {
    this.getShoppingList(0)
  }

}
