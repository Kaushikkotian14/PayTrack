import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  expenses: any[] = [];
  isLoading = false;
  totalExpenses = 0;
  monthlyExpenses = 0;
  totalTransactions = 0;
  averageDaily = 0;
  balance = 0;

  
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
  this.dashboardService.getBalance().subscribe({
    next: (balance) => {
      this.balance = balance;
      
    }
   });
    this.loadExpenses();
  }

  ngAfterViewInit() {
    setTimeout(() => this.renderCharts(), 500);
  }

  loadExpenses() {
    this.isLoading = true;
    this.dashboardService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.calculateSummary();
        this.renderCharts();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  calculateSummary() {
    this.totalExpenses = 0;
    this.monthlyExpenses = 0;
    this.totalTransactions = this.expenses.length;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDay = now.getDate();

    this.expenses.forEach(e => {
      const amount = parseFloat(e.amount) || 0;
      this.totalExpenses += amount;
      if (e.date) {
        const [day, month, year] = e.date.split('-').map(Number);
        if (month - 1 === currentMonth && year === currentYear) {
          this.monthlyExpenses += amount;
        }
      }
    });
    this.averageDaily = currentDay > 0 ? Math.round(this.monthlyExpenses / currentDay) : 0;
  }

  renderCharts() {
    this.renderMonthlyChart();
    this.renderCategoryChart();
    this.renderDailyLineChart();
    this.renderLimitRadialChart();
  }

  renderMonthlyChart() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const monthlyData = Array(12).fill(0);
    this.expenses.forEach(exp => {
      if (exp.date) {
        const [day, month, year] = exp.date.split('-').map(Number);
        if (year === currentYear) {
          monthlyData[month - 1] += parseFloat(exp.amount) || 0;
        }
      }
    });

    new ChartJS('monthlyBarChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Expenses',
          data: monthlyData,
          backgroundColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  renderCategoryChart() {
    const categoryMap: { [key: string]: number } = {};
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    this.expenses.forEach(exp => {
      if (exp.date) {
        const [dayStr, monthStr, yearStr] = exp.date.split('-');
        const month = parseInt(monthStr) - 1;
        const year = parseInt(yearStr);
        if (month === currentMonth && year === currentYear) {
          const category = exp.category || 'Others';
          categoryMap[category] = (categoryMap[category] || 0) + (parseFloat(exp.amount) || 0);
        }
      }
    });

    new ChartJS('categoryDoughnut', {
      type: 'doughnut',
      data: {
        labels: Object.keys(categoryMap),
        datasets: [{
          label: 'Expenses by Category',
          data: Object.values(categoryMap),
          backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#c084fc']
        }]
      },
      options: {
        responsive: true,
        cutout: '50%', 
        plugins: {
          legend: {
            position: 'right',
            align: 'center'
          }
        }
      }
    });
  }

  renderDailyLineChart() {
    const dailyTotals: { [day: number]: number } = {};
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    this.expenses.forEach(exp => {
      if (exp.date) {
        const [dayStr, monthStr, yearStr] = exp.date.split('-');
        const day = parseInt(dayStr);
        const month = parseInt(monthStr) - 1;
        const year = parseInt(yearStr);
        if (month === currentMonth && year === currentYear) {
          dailyTotals[day] = (dailyTotals[day] || 0) + (parseFloat(exp.amount) || 0);
        }
      }
    });

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const lineData = days.map(d => dailyTotals[d] || 0);

    new ChartJS('dailyLineChart', {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Daily Expense (This Month)',
          data: lineData,
          borderColor: '#6366f1',
          backgroundColor: '#c7d2fe',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  renderLimitRadialChart() {
    const value = this.monthlyExpenses;
    const max = this.balance;

    new ChartJS('limitRadialChart', {
      type: 'doughnut',
      data: {
        labels: ['Used', 'Remaining'],
        datasets: [{
          data: [value, Math.max(0, max - value)],
          backgroundColor: ['#f87171', '#e5e7eb'],
          borderWidth: 0,
          circumference: 180,
          rotation: -90
        }]
      },
      options: {
        responsive: true,
        cutout: '80%',
        plugins: {
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return `${ctx.label}: ₹${ctx.parsed}`;
              }
            }
          }
        }
      }
    });
  }
}
