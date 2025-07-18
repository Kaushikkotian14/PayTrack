import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense, ExpenseCreate } from '../../services/expense.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [ExpenseService]
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  categories: string[] = ['Food','Bills', 'Transport', 'Utilities', 'Entertainment','Grocery', 'Other'];
  selectedCategory: string = '';
  searchText: string = '';
  errorMessage: string = '';

  // New properties for add/edit functionality
  showExpenseDialog = false;
  isEditing = false;
  currentExpenseId = '';
  
  expenseData = {
    to: '',
    description: '',
    amount: 0,
    category: '',
    date: ''
  };

  constructor(private expenseService: ExpenseService) {}

  onSearchTextChange(): void {
    this.filterExpenses();
  }

  onCategoryChange(): void {
    this.filterExpenses();
  }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses('current_user').subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        this.filterExpenses();
        this.sortByDate();
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  filterExpenses(): void {
    this.filteredExpenses = this.expenses.filter(expense => {
      const matchesCategory = this.selectedCategory ? expense.category === this.selectedCategory : true;
      const matchesSearch = this.searchText ? expense.description.toLowerCase().includes(this.searchText.toLowerCase()) ||expense.to.toLowerCase().includes(this.searchText.toLowerCase()) : true;
      return matchesCategory && matchesSearch;
    });
    this.sortByDate();
  }

  sortByDate(): void {
    this.filteredExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // NEW: Open add expense dialog
  openAddExpenseDialog(): void {
    this.showExpenseDialog = true;
    this.isEditing = false;
    this.expenseData = {
      to: '',
      description: '',
      amount: 0,
      category: '',
      date: new Date().toISOString().split('T')[0] // Today's date
    };
  }

  
  editExpense(expense: Expense): void {
    this.showExpenseDialog = true;
    this.isEditing = true;
    this.currentExpenseId = expense.expense_id;
    this.expenseData = {
      to: expense.to,
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    };
  }


  closeExpenseDialog(): void {
    this.showExpenseDialog = false;
    this.isEditing = false;
    this.currentExpenseId = '';
    this.errorMessage = '';
  }


  saveExpense(): void {
    if (this.isEditing) {
     
      const updatedExpense: ExpenseCreate = {
        date: this.expenseData.date,
        to: this.expenseData.to,
        description: this.expenseData.description,
        category: this.expenseData.category,
        amount: this.expenseData.amount
      };
      
      this.expenseService.updateExpense(this.currentExpenseId, updatedExpense).subscribe({
        next: () => {
          this.loadExpenses();
          this.closeExpenseDialog();
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Failed to update expense: ' + error.message;
        }
      });
    } else {
      
      const newExpense: ExpenseCreate = {
        date: this.expenseData.date,
        to: this.expenseData.to,
        description: this.expenseData.description,
        category: this.expenseData.category,
        amount: this.expenseData.amount
      };

      this.expenseService.createExpense(newExpense).subscribe({
        next: () => {
          this.loadExpenses();
          this.closeExpenseDialog();
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Failed to add expense: ' + error.message;
        }
      });
    }
  }

  
  deleteExpense(expenseId: string): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(expenseId).subscribe({
        next: () => {
          this.loadExpenses();
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete expense: ' + error.message;
        }
      });
    }
  }
}