import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:4000/admin/users/allproducts';
  private postapiUrl = 'http://localhost:4000/admin/users/product';
  private editapiurl = 'http://localhost:4000/admin/users/product/:id/delete'

  constructor(private http: HttpClient) {}

  getProducts(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  createProduct(token: string, product: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.postapiUrl}`, product, { headers });
  }

  editProduct(token: string, productId: string, updatedProduct: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.editapiurl}/${productId}`, updatedProduct, { headers });
  }

  deleteProduct(token: string, productId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers });
    
    
  }
}
