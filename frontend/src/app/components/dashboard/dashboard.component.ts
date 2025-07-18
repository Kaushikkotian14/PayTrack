import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  
  expenses: any[] = [];
  isLoading = false;
  showExpenseDialog = false;
  isEditing = false;
  currentExpenseId = '';
  

  totalExpenses = 0;
  monthlyExpenses = 0;
  totalTransactions = 0;
  averageDaily = 0;
  
  expenseData = {
    to: '',
    description: '',
    amount: 0,
    category: '',
    date: ''
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.isLoading = true;
    this.dashboardService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.calculateSummary();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
        this.isLoading = false;
      }
    });
  }

  calculateSummary() {
  // Make sure expenses is an array
  if (!Array.isArray(this.expenses)) {
    this.expenses = [];
  }
  
  // Calculate total expenses
  this.totalExpenses = this.expenses.reduce((sum, expense) => {
    return sum + (parseFloat(expense.amount) || 0);
  }, 0);
  
  this.totalTransactions = this.expenses.length;
  
  // Get current date info
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11 (January = 0)
  const currentYear = now.getFullYear();
  const currentDayOfMonth = now.getDate();
  
  // Calculate monthly expenses with DD-MM-YYYY format parsing
  this.monthlyExpenses = this.expenses
    .filter(expense => {
      if (!expense.date) return false;
      
      // Parse DD-MM-YYYY format (like "18-07-2025")
      const dateParts = expense.date.split('-');
      if (dateParts.length !== 3) return false;
      
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1; // -1 because JavaScript months are 0-11
      const year = parseInt(dateParts[2]);
      
      // Create date object
      const expenseDate = new Date(year, month, day);
      
      // Check if date is valid
      if (isNaN(expenseDate.getTime())) return false;
      
      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();
      
      return expenseMonth === currentMonth && expenseYear === currentYear;
    })
    .reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);
  
  // Calculate average daily
  if (currentDayOfMonth > 0 && this.monthlyExpenses > 0) {
    this.averageDaily = Math.round(this.monthlyExpenses / currentDayOfMonth);
  } else {
    this.averageDaily = 0;
  }
}
  
}