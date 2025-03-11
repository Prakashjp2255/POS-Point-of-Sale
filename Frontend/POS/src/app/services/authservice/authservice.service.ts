import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes the service globally available
})
export class AuthService {
  private apiUrl = 'https://example.com/auth'; // Replace with your backend API endpoint

  constructor(private http: HttpClient) {}

  // Example Login Method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Example Signup Method (Optional)
  signup(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }
}
