import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private apiUrl = 'http://localhost:4000/admin/users/login';
  private apiUrl2 = 'http://localhost:4000/admin/users';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      }),
    );
  }

  signup(credentials: { email: string; username:string; role:string; password: string }): Observable<any> {
    return this.http.get(this.apiUrl2);
  }

  postData(payload: any): Observable<any> {
    console.log('Posting data:', payload);
    return this.http.post(`${this.apiUrl}/data`, payload);
  }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
    console.log(this.http.get);
  }



  
    getUserProfile(): Observable<any> {
      return this.http.get(this.apiUrl2);
  }

  // signup(data: {
  //   username: string;
  //   role: string;
  //   email: string;
  //   password: string;
  // }): Observable<any> {
  //   return this.http.post(this.signupUrl, data); // No token needed
  // }

}
