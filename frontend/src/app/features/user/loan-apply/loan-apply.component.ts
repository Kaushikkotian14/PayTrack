import { Component } from '@angular/core';
import { LoanService,Loan } from '../../../core/services/loan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-apply',
  standalone: true,
  templateUrl: './loan-apply.component.html',
  styleUrls: ['./loan-apply.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoanApplyComponent  {
  formData = {
    amount: null,
    duration: null,
    reason: ''
  };
  success = '';

  constructor(private loanService: LoanService) {}
  
  calculateInterestRate(): number {
    let rate = 10;
    if (this.formData.duration && this.formData.duration > 12) {
      rate += 2;
    }
    if (this.formData.amount && this.formData.amount > 100000) {
      rate += 1.5;
    }
    return rate;
  }

  calculateTotalRepayable(): number {
    const principal = this.formData.amount!;
    const rate = this.calculateInterestRate();
    const duration = this.formData.duration!;
    const interest = (principal * rate * duration) / (100 * 12); 
    return +(principal + interest).toFixed(2);
  }
  calculateMonthlyInstallment(): number {
    const totalRepayable = this.calculateTotalRepayable();
    const duration = this.formData.duration!; 
    return +(totalRepayable / duration).toFixed(2);
  }

  applyLoan() {
    this.loanService.applyLoan(this.formData).subscribe(
      res => {
        this.success = 'Application submitted successfully!';
        alert(this.success);
      },
      err => {
        this.success = 'Application not submitted.';
        alert(this.success);
      }
    );
  }

  
}