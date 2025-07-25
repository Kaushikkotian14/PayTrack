import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  isLoggedIn: boolean = false;
  userRole: string | null = null;

  constructor(private authService: AuthService) {
    this.userRole = localStorage.getItem('role');
    
      this.authService.role.subscribe(role => {
      this.isLoggedIn = localStorage.getItem('token')? true : false;
      this.userRole = role;
  });
  }

   isUser(): boolean {
    const role = localStorage.getItem('role');
    return role === 'user';
  }
   
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isLo');
    
    this.isLoggedIn = false;
    window.location.reload(); 
  }
}
