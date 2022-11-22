import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShoppingListProduct} from "./ShoppingListProduct";
import {catchError} from "rxjs/operators";

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) { }

  getShoppingList(userId: number):Observable<ShoppingListProduct[]> {
    const url = 'http://localhost:8080/api/shoppingList/products/user/'+userId+'';
    return this.http.get<ShoppingListProduct[]>(url);
  }

  getShoppingListProductById(productId: number):Observable<ShoppingListProduct> {
    const url = 'http://localhost:8080/api/shoppingList/products/'+ productId +'';
    return this.http.get<ShoppingListProduct>(url);
  }

  updateShoppingListProduct(productId: number, shoppingListProduct: ShoppingListProduct): ShoppingListProduct {
    console.log(productId, shoppingListProduct)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    if (shoppingListProduct)
    {
      console.log("test")
      const url = 'http://localhost:8080/api/shoppingList/products/'+ productId +'';
      this.http.put<ShoppingListProduct>(url, shoppingListProduct, httpOptions)
        .subscribe({
          next: data => {
            shoppingListProduct = data;
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });

      return shoppingListProduct;
    }
    else
    {
      return shoppingListProduct;
    }
  }

  addShoppingListProduct(userId: number, shoppingListProduct: ShoppingListProduct): Observable<ShoppingListProduct> {
    const url = 'http://localhost:8080/api/shoppingList/products/user/'+ userId +'';
    return this.http.put<ShoppingListProduct>(url, shoppingListProduct);
  }

  deleteShoppingListProduct(shoppingListProductId: number): number {
    console.log(shoppingListProductId)
    const url = 'http://localhost:8080/api/shoppingList/products/'+ shoppingListProductId +'';
    let succes = 200;
    this.http.delete(url)
      .subscribe({
        next: data => {
          succes = 200;
        },
        error: error => {
          succes = error.errorCode
          console.error('There was an error!', error);
        }
      });
    return succes;
  }
}
