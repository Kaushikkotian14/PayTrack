import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.services';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false; 
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.username && this.password) {
      this.isLoading = true; 
      
     this.authService.login(this.username, this.password).subscribe({
  next: (response: any) => {
    this.isLoading = false;


    if (response.role === 'user') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/bank']);
    }
  },
  error: (error) => {
    this.isLoading = false;
    alert(error.error.detail);
  }
});

    }
  }
}