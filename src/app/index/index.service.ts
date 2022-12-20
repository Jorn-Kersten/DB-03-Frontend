import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Product} from "./Product";

@Injectable()
export class IndexService {

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<Product[]> {
    const url = '/api/products';
    return this.http.get<Product[]>(url);
  }

  getProductById(productId: number):Observable<Product> {
    const url = '/api/products/'+ productId +'';
    return this.http.get<Product>(url);
  }

  getProductsByUser(userId: number):Observable<Product[]> {
    const url = '/api/products';
    return this.http.get<Product[]>(url);
  }
}
