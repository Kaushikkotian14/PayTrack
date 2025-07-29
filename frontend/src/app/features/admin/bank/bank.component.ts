import { Component, OnInit } from '@angular/core';
import { LoanService,Loan} from '../../../core/services/loan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-bank',
  standalone: true,
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
  imports: [CommonModule, FormsModule],
  providers: [LoanService]

})
export class BankComponent implements OnInit {
  loans: Loan[] = [];
  phone = 0;
  pending=true;

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.loadPendingLoans();
  }

  loadPendingLoans() {
    this.loanService.getPendingLoans().subscribe(data => {
      this.loans = data;
      this.pending = !data || data.length === 0;
    });
  }

  approve(id: string) {
    this.loanService.approveLoan(id).subscribe(() => this.loadPendingLoans());
  }

  reject(id: string) {
    this.loanService.rejectLoan(id).subscribe(() => this.loadPendingLoans());
  }

 
}