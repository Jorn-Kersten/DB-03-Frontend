import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {ShoppingListProduct} from "./ShoppingListProduct";
import {KeycloakService} from "keycloak-angular";
import {API_HEADERS} from "../url.constants";
import {ShoppingList} from "./ShoppingList";

@Injectable()
export class ShoppingListService {

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    this.setHeaders();
  }

  async setHeaders() {
    if (await this.keycloakService.getToken() != undefined) {
      API_HEADERS.headers = API_HEADERS.headers.set('Authorization', 'Bearer ' + await this.keycloakService.getToken());
      return "Success";
    }
    return "Logged out";
  }

  private _refreshrequired = new Subject<void>()

  get Refreshrequired() {
    return this._refreshrequired;
  }

  getShoppingList(userName: string):Observable<ShoppingListProduct[]> {
    const url = '/api/user/shoppingList/products/'+userName+'';
    return this.http.get<ShoppingListProduct[]>(url, API_HEADERS);
  }

  getShoppingListProductById(userName: string, productId: number):Observable<ShoppingListProduct> {
    const url = '/api/user/shoppingList/products/'+ userName +'/'+ productId +'';
    return this.http.get<ShoppingListProduct>(url, API_HEADERS);
  }

  updateShoppingListProduct(userName: string | undefined, productId: number, shoppingListProduct: ShoppingListProduct):Observable<ShoppingListProduct> {
    const url = '/api/user/shoppingList/products/'+ userName +'/'+ productId +'';
    return this.http.put<ShoppingListProduct>(url, shoppingListProduct, API_HEADERS).pipe(
      tap(()=>{
        this._refreshrequired.next();
      })
    );
  }

  addShoppingListProduct(userName: string | undefined, shoppingListProduct: ShoppingListProduct): Observable<ShoppingListProduct> {
    const url = '/api/user/shoppingList/products/'+ userName +'';
    return this.http.post<ShoppingListProduct>(url, shoppingListProduct, API_HEADERS);
  }

  deleteShoppingListProduct(userName: string, shoppingListProductId: number):Observable<any>{
    const url = '/api/user/shoppingList/products/'+ userName +'/'+ shoppingListProductId +'';
    return this.http.delete(url).pipe(
      tap(()=>{
        this._refreshrequired.next();
      })
    );
  }

  getAllShoppingList(userName: string):Observable<ShoppingList[]> {
    const url = '/api/user/shoppingLists/'+userName+'';
    return this.http.get<ShoppingList[]>(url, API_HEADERS);
  }

  addShoppingList(userName: string, shoppingList: ShoppingList):Observable<ShoppingList> {
    const url = 'api/user/shoppingLists/'+ userName +'';
    return this.http.post<ShoppingList>(url, shoppingList, API_HEADERS);
  }
}
