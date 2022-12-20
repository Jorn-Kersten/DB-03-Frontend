import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShoppingListProduct} from "./ShoppingListProduct";
import {KeycloakService} from "keycloak-angular";
import {API_HEADERS} from "../url.constants";

@Injectable()
export class ShoppingListService {

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    this.setHeaders().then(r => console.log(r));
  }

  async setHeaders() {
    if (await this.keycloakService.getToken() != undefined) {
      API_HEADERS.headers = API_HEADERS.headers.set('Authorization', 'Bearer ' + await this.keycloakService.getToken());
      return "Success";
    }
    return "Logged out";
  }

  getShoppingList(userId: number):Observable<ShoppingListProduct[]> {
    const url = '/api/user/shoppingList/products/'+userId+'';
    return this.http.get<ShoppingListProduct[]>(url, API_HEADERS);
  }

  getShoppingListProductById(productId: number):Observable<ShoppingListProduct> {
    const url = '/api/user/shoppingList/products/'+ productId +'';
    return this.http.get<ShoppingListProduct>(url, API_HEADERS);
  }

  updateShoppingListProduct(productId: number, shoppingListProduct: ShoppingListProduct): ShoppingListProduct {
    console.log(productId, shoppingListProduct)

    if (shoppingListProduct)
    {
      console.log("test")
      const url = '/api/user/shoppingList/products/'+ productId +'';
      this.http.put<ShoppingListProduct>(url, shoppingListProduct, API_HEADERS)
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
    const url = '/api/user/shoppingList/products/'+ userId +'';
    return this.http.put<ShoppingListProduct>(url, shoppingListProduct, API_HEADERS);
  }

  deleteShoppingListProduct(shoppingListProductId: number): number {
    console.log(shoppingListProductId)
    const url = '/api/user/shoppingList/products/'+ shoppingListProductId +'';
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
