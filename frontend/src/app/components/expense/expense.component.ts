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
  categories: string[] = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];
  selectedCategory: string = '';
  searchText: string = '';
  errorMessage: string = '';

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
      const matchesSearch = this.searchText
        ? expense.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
          expense.to.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
    this.sortByDate();
  }

  sortByDate(): void {
    this.filteredExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  editExpense(expense: Expense): void {
    // Implement edit functionality (e.g., open a modal or navigate to an edit form)
    const updatedExpense: ExpenseCreate = {
      date: expense.date,
      to: expense.to,
      description: expense.description,
      category: expense.category,
      amount: expense.amount

    };
    this.expenseService.updateExpense(expense.expense_id, updatedExpense).subscribe({
      next: () => this.loadExpenses(),
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
  

  deleteExpense(expenseId: string): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(expenseId).subscribe({
        next: () => this.loadExpenses(),
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}