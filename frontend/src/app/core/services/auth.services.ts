import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

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

  private userRole = new BehaviorSubject<string | null>(this.getRoleFromToken());
  userRole$ = this.userRole.asObservable();

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
        this.loginStatus.next(true);
        this.userRole.next(this.getRoleFromToken());
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');

    this.loginStatus.next(false);
    this.userRole.next(null);
  }

  getRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    } catch {
      return null;
    }
  }

  getUsernameFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub || null;
    } catch {
      return null;
    }
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
