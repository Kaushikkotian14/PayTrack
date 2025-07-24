
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const expectedRole = route.data?.['role'];

  if (!token) {
   
    window.location.href = '/login';
    return false;
  }

  if (expectedRole && role !== expectedRole) {
    alert('You do not have permission to access this page');
    window.location.href = '/unauthorized';
    return false;
  }
  
   const isAuthenticated = !!token;
    if (!isAuthenticated) {
        return false;
    }

   
    const roles = route.data['roles'] as Array<string>;
    if (roles && roles.length > 0) {
        const userRole = role ?? '';
        return roles.includes(userRole);
    }

    return true;
}
 