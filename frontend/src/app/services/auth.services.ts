import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface RegistrationData {
  phone: string;
  pan_no: string;
  password: string;
}

export interface User {
  username: string;
  phone: string;
  pan_no: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(userData: RegistrationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, formData).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!token && !!user;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}