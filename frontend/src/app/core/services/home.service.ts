import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface DashboardStats {
  totalMonthly: number;
  totalYearly: number;
  totalTransactions: number;
  averageDaily: number;
  currentMonth: number;
}

export interface RecentTransaction {
  expense_id: string;
  date: string;
  to: string;
  description: string;
  category: string;
  amount: number;
  location?: string;
  time?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<RecentTransaction[]>(`${this.apiUrl}/expense`, {
      headers: this.getHeaders()
    }).pipe(
      map(expenses => this.calculateStats(expenses))
    );
  }


  getRecentTransactions(limit: number = 5): Observable<RecentTransaction[]> {
    return this.http.get<RecentTransaction[]>(`${this.apiUrl}/expense`, {
      headers: this.getHeaders()
    }).pipe(
      map(expenses => 
        expenses
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit)
      )
    );
  }

  
  private calculateStats(expenses: RecentTransaction[]): DashboardStats {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });
    

    const currentYearExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === currentYear;
    });
    

    const totalMonthly = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalYearly = currentYearExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalTransactions = expenses.length;
    
    
    const daysInMonth = currentDate.getDate();
    const averageDaily = daysInMonth > 0 ? totalMonthly / daysInMonth : 0;
    
    return {
      totalMonthly,
      totalYearly,
      totalTransactions,
      averageDaily,
      currentMonth: totalMonthly
    };
  }


  getMonthlyExpenses(year: number): Observable<any[]> {
    return this.http.get<RecentTransaction[]>(`${this.apiUrl}/expense`, {
      headers: this.getHeaders()
    }).pipe(
      map(expenses => this.groupExpensesByMonth(expenses, year))
    );
  }

  
  getCategoryData(year?: number, month?: number): Observable<any[]> {
    return this.http.get<RecentTransaction[]>(`${this.apiUrl}/expense`, {
      headers: this.getHeaders()
    }).pipe(
      map(expenses => this.groupExpensesByCategory(expenses, year, month))
    );
  }

  private groupExpensesByMonth(expenses: RecentTransaction[], year: number) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const monthlyData = months.map((month, index) => ({
      month,
      amount: 0
    }));
    
    expenses
      .filter(expense => new Date(expense.date).getFullYear() === year)
      .forEach(expense => {
        const expenseMonth = new Date(expense.date).getMonth();
        monthlyData[expenseMonth].amount += expense.amount;
      });
    
    return monthlyData;
  }

  private groupExpensesByCategory(expenses: RecentTransaction[], year?: number, month?: number) {
    const categoryColors = {
      'Food': '#FF6384',
      'Transport': '#36A2EB',
      'Entertainment': '#FFCE56',
      'Health': '#4BC0C0',
      'Shopping': '#9966FF',
      'Bills': '#FF9F40',
      'Transfer': '#FF6384',
      'Other': '#C9CBCF'
    };
    
    let filteredExpenses = expenses;
    
    if (year) {
      filteredExpenses = filteredExpenses.filter(expense => 
        new Date(expense.date).getFullYear() === year
      );
    }
    
    if (month) {
      filteredExpenses = filteredExpenses.filter(expense => 
        new Date(expense.date).getMonth() === month - 1
      );
    }
    
    const categoryTotals: { [key: string]: number } = {};
    
    filteredExpenses.forEach(expense => {
      const category = expense.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
    });
    
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      color: categoryColors[category as keyof typeof categoryColors] || '#C9CBCF'
    }));
  }
}