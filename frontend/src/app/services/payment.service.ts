import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface TransferRequest {
  receiver_phone: number;
  amount: number;
  description: string;
  category: string;
}

export interface TransferResponse {
  success?: boolean;
  message?: string;
  transaction_id?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Send money via phone number using your bank router
  sendPayment(transferRequest: TransferRequest): Observable<TransferResponse> {
    const params = new URLSearchParams({
      receiver_phone: transferRequest.receiver_phone.toString(),
      amount: transferRequest.amount.toString(),
      description: transferRequest.description,
      category: transferRequest.category
    });

    return this.http.post<TransferResponse>(
      `${this.apiUrl}/transfer/phone?${params.toString()}`, 
      {}, // Empty body since we're using query parameters
      { headers: this.getHeaders() }
    );
  }

  // Alternative method using request body (if you want to change backend to accept JSON body)
  sendPaymentWithBody(transferRequest: TransferRequest): Observable<TransferResponse> {
    return this.http.post<TransferResponse>(
      `${this.apiUrl}/transfer/phone`,
      transferRequest,
      { headers: this.getHeaders() }
    );
  }

  // Get recent transactions from expense service
  getRecentTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expense`, {
      headers: this.getHeaders()
    });
  }
}