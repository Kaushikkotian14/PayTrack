import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

export interface RecentTransaction {
  id: number;  
  amount: number;
  description: string;
  category: string;
  date: string;
  user_id: number;
} 

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  
  sendPayment(transferRequest: TransferRequest): Observable<TransferResponse> {
    const params = new URLSearchParams({
      receiver_phone: transferRequest.receiver_phone.toString(),
      amount: transferRequest.amount.toString(),
      description: transferRequest.description,
      category: transferRequest.category
    });

    return this.http.post<TransferResponse>( `${this.apiUrl}/transfer/phone?${params.toString()}`,{},
      { headers: this.getHeaders() }
    );
  }

  getRecentTransactions(): Observable<RecentTransaction[]> {
    return this.http.get<RecentTransaction[]>(`${this.apiUrl}/expense`, {
      headers: this.getHeaders()
    });
  }
}