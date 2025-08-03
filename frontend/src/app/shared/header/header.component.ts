import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  logout(): void {
    this.authService.logout();

    window.location.reload();
  }
}
