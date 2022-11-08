import {Component, Input, OnInit} from '@angular/core';
import { ConfigService, Product } from "./index.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // number = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);
  //
  // getErrorMessage() {
  //   if (this.number.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //
  //   return this.number.hasError('pattern') ? 'Not a valid number' : '';
  // }

  productId: any | undefined;

  panelOpenState = false;
  error: any;
  headers: string[] = [];
  product: Product | undefined;
  products: Product[] = [];

  constructor(private configService: ConfigService) { }

  clear() {
    this.product = undefined;
    this.error = undefined;
    this.headers = [];
    this.products = [];
  }

  getAllProducts() {
    this.configService.getAllProducts().subscribe(
      products => {(this.products = products)
        console.log(products)
    })
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
    this.configService.getProductById(productId).subscribe(
      product => {(this.product = product)
        console.log(product)
      })
  }

  ngOnInit(): void {
    this.getAllProducts()
  }
}
