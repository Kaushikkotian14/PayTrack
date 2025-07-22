import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private baseUrl = `${environment.apiUrl}`; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
      }
    };
  }

  applyLoan(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/apply`, data, this.getAuthHeaders());
  }

  getPendingLoans(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending`, this.getAuthHeaders());
  }

  approveLoan(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve/${id}`, {}, this.getAuthHeaders());
  }

  rejectLoan(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject/${id}`, {}, this.getAuthHeaders());
  }

  getUserByPhone(phone: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.get(`${this.baseUrl}/user/${phone}`, { headers });
}

 createBankAccount(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bank-account`, data, this.getAuthHeaders());
  }


  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, this.getAuthHeaders());
  }
}
