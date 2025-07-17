import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Expense {
  expense_id: string;
  date: string;
  to: string;
  description: string;
category: string;
time?: string;
Location: string;
user_id?: string;
transaction_id?: string;
  amount: number;
}

export interface ExpenseCreate {
  date: string;
  to: string;
  description: string;
  category: string;
  amount: number;
  location?: string;
    time?: string;
    transaction_id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/expense`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust based on where you store the token
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getExpenses(username: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/${username}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  createExpense(expense: ExpenseCreate): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateExpense(expenseId: string, expense: ExpenseCreate): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${expenseId}`, expense, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteExpense(expenseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${expenseId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}