
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.services';

import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route) => {
  const token = localStorage.getItem('token');
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getRoleFromToken();
  
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  
   const isAuthenticated = !token;
    if (isAuthenticated) {
        return false;
    }

    const roles = route.data['roles'] as Array<string>;
    if (roles && roles.length > 0) {
        const userRole = role ?? '';
        return roles.includes(userRole);
    }

    return true;
}
 