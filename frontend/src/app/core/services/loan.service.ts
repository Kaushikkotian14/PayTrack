import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Loan{
  _id:string;
  phone: number;
  pan: string;
  doa: string;
  amount: number;
  duration: number;
  reason: string;
  applied_by: string;
  status: 'pending' | 'approved' | 'rejected'
}

export interface LoanResponse {
  detail: string;
}

export interface LoanApprovalResponse {
  detail: string;
}

export interface User {
  phone: number;
  name: string;
  email: string;
  pan_no: string;
}

export interface BankAccountResponse {
  detail: string;
}

export interface BankAccountCreate {
  AccountHolder: string;
  pan_no: string;
  phone: number;
  email: string;
  account_type: 'Savings' | 'Current'; 
  address: string;
  balance: number;
  EmploymentStatus: 'Yes' | 'No';
  age: number;
}


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

  applyLoan(data: any): Observable<Loan[]> {
    return this.http.post<Loan[]>(`${this.baseUrl}/apply`, data, this.getAuthHeaders());
  }

  getPendingLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/pending`, this.getAuthHeaders());
  }

  approveLoan(id: string): Observable<LoanApprovalResponse> {
    return this.http.post<LoanApprovalResponse>(`${this.baseUrl}/approve/${id}`, {}, this.getAuthHeaders());
  }

  rejectLoan(id: string): Observable<LoanApprovalResponse> {
    return this.http.post<LoanApprovalResponse>(`${this.baseUrl}/reject/${id}`, {}, this.getAuthHeaders());
  }

  getUserByPhone(phone: number): Observable<User> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.get<User>(`${this.baseUrl}/user/${phone}`, { headers });
}

 createBankAccount(data: BankAccountCreate): Observable<BankAccountCreate> {
    return this.http.post<BankAccountCreate>(`${this.baseUrl}/bank-account`, data, this.getAuthHeaders());
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, this.getAuthHeaders());
  }
}
