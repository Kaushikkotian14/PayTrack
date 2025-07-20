import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class LoanService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  applyLoan(data: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(`${this.baseUrl}/apply`, data, { headers });
}

  getPendingLoans(): Observable<any> {
    return this.http.get(`${this.baseUrl}/loan/pending`);
  }

  approveLoan(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/loan/approve/${id}`, {});
  }

  rejectLoan(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/loan/reject/${id}`, {});
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bank/users`);
  }

  getUserByPhone(phone: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/bank/user/${phone}`);
  }
}