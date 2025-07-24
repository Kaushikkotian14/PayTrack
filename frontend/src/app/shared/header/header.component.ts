import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule ],
  providers: [AuthService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string | null = null;

  constructor(private authService: AuthService) {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.userRole = localStorage.getItem('role');
  }

   ngOnInit() {
     this.authService.role$.subscribe(role => {
      this.userRole = role;
      console.log('User role:', this.userRole);

  });
  }
   
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    window.location.reload(); 
  }
}
