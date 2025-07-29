import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../../core/services/loan.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
 form: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      pan_no: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i)]],
      phone: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      account_type: ['Savings', Validators.required],
      address: ['', Validators.required],
      balance: [null, Validators.required],
      employment_status: ['Yes', Validators.required],
      age: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const data = {
        ...this.form.value,
      };

      this.loanService.createBankAccount(data).subscribe({
        next: (response) => {
          this.message = 'Account created successfully!';
          this.form.reset();
        },
        error: (error) => {
          this.message = 'Error creating account: ' + error;
        }
      });
    }
    else {
      this.form.markAllAsTouched();
    }
  }
  
}
