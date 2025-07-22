import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.services';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

 login() {
  if (this.username && this.password) {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        alert('Login successful');
        if (response.role === 'user') {
         
          this.router.navigate(['/home']);
          
        } else {
          this.router.navigate(['/bank']);
        }
      },
      error: () => {
        alert('Login failed');
      }
    });
  }
}
}
