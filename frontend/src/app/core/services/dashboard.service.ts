import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
  user_id: number;
}

export interface BankAccount {
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



@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  getBalance(): Observable<number> {
    return this.http.get<BankAccount>(`${this.apiUrl}/bank-account`, {
      headers: this.getHeaders()
    }).pipe(
      map(response => response.balance)
    );
  }
  
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expense`, {
      headers: this.getHeaders()
    });
  }

}