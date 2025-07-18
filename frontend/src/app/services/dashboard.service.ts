import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

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

  // Get all expenses
  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expense`, {
      headers: this.getHeaders()
    });
  }

  // Add new expense
  addExpense(expenseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/expense`, expenseData, {
      headers: this.getHeaders()
    });
  }

  // Update expense
  updateExpense(expenseId: string, expenseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/expense/${expenseId}`, expenseData, {
      headers: this.getHeaders()
    });
  }

  // Delete expense
  deleteExpense(expenseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/expense/${expenseId}`, {
      headers: this.getHeaders()
    });
  }
}