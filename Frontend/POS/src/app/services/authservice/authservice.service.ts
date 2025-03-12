import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = 'http://localhost:4000/admin/users/login';

  constructor(private http : HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }
  

  postData(payload: any): Observable<any> {
    console.log('Posting data:', payload);
    return this.http.post(`${this.apiUrl}/data`, payload);

  }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
    console.log(this.http.get)
  }

  
  
}


