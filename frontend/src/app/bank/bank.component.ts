import { Component, OnInit } from '@angular/core';
import { LoanService } from '../services/loan.service';
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
  loans: any[] = [];
  phone = '';
  user: any;

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.loadPendingLoans();
  }

  loadPendingLoans() {
    this.loanService.getPendingLoans().subscribe(data => this.loans = data);
  }

  approve(id: string) {
    this.loanService.approveLoan(id).subscribe(() => this.loadPendingLoans());
  }

  reject(id: string) {
    this.loanService.rejectLoan(id).subscribe(() => this.loadPendingLoans());
  }

  searchUser() {
    this.loanService.getUserByPhone(this.phone).subscribe(data => this.user = data);
  }
}