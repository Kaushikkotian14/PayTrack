import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule ],
  providers: [AuthService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  userRole: string | null = null;

  constructor() {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.userRole = localStorage.getItem('role');
  }
   
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    window.location.reload(); 
  }
}
