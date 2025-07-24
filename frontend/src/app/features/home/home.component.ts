import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../core/services/payment.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import{RouterLink} from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardComponent , RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  
  showPaymentDialog = false;
  isTransferring = false;
  transferComplete = false;
  loadingMessage = 'Processing payment...';
  transactionId = '';
  
  transferRequest = {
    receiver_phone: 0,
    amount: 0,
    description: '',
    category: ''
  };

  constructor(private paymentService: PaymentService) {}

  openPaymentDialog() {
    this.showPaymentDialog = true;
  }

  closePaymentDialog() {
    this.showPaymentDialog = false;
    this.isTransferring = false;
    this.transferComplete = false;
    this.transferRequest = {
      receiver_phone: 0,
      amount: 0,
      description: '',
      category: ''
    };
     window.location.reload();
  }

  initiateTransfer() {
    this.isTransferring = true;
    
    
    setTimeout(() => {
      this.paymentService.sendPayment(this.transferRequest).subscribe({
        next: (response) => {
          this.isTransferring = false;
          this.transferComplete = true;
          this.transactionId = 'TXN' + Date.now();
        },
        error: (error) => {
          this.isTransferring = false;
          alert('Payment failed!');
        }
      });
    }, 2000);
    
  }
 
}