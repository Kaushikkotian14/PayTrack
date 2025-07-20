import { Component } from '@angular/core';
import { LoanService } from '../services/loan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-apply',
  standalone: true,
  templateUrl: './loan-apply.component.html',
  styleUrls: ['./loan-apply.component.css'],
  imports: [CommonModule, FormsModule],
  providers: [LoanService]
})
export class LoanApplyComponent {
  formData = {
    username: '',
    phone: '',
    amount: null,
    pan: '',
    duration: null,
    reason: ''

  };
  success = '';

  constructor(private loanService: LoanService) {}

  applyLoan() {
    this.loanService.applyLoan(this.formData).subscribe(
      res => {
        this.success = 'Application submitted successfully!';
        alert(this.success);
      },
      err => {
        this.success = 'Error occurred.';
        alert(this.success);
      }
    );
  }
}