import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
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
 
export interface RegistrationResponse {
  detail: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  role: string;
  user: User;
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
 
  private loginStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  loginStatus$ = this.loginStatus.asObservable();
 
 role = new EventEmitter<string>();
  constructor(private http: HttpClient) {}
 
  register(userData: RegistrationData): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/register`, userData);
  }
 
  login(username: string, password: string): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
 
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, formData).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        
        localStorage.setItem('role', response.role);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.loginStatus.next(true);
        this.role.next(response.role);
      })
    );
  }
 
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.loginStatus.next(false);
    this.role.next('');
  }
 
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}