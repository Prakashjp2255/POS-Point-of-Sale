import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:4000/admin/users/login';
  private apiUrl2 = 'http://localhost:4000/admin/users';
  private productUrl ='http://localhost:4000/admin/users/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
    console.log(this.http.get);
  }

  createProduct(): Observable<any> {
    return this.http.get(`${this.productUrl}/data`);
    console.log(this.http.get);
  }

  editProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
    console.log(this.http.get);
  }

  deletProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
    console.log(this.http.get);
  }
}
