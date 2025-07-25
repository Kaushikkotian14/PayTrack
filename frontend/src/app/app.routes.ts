import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: 'registration',
        loadComponent: () => import('./features/registration/registration.component').then(m => m.RegistrationComponent)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'expense',
        loadComponent: () => import('./features/expense/expense.component').then(m => m.ExpenseComponent),
        canActivate: [authGuard],
        data: { roles: ['user'] }
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard],
        data: { roles: ['user'] }
    },
    {
        path: 'bank',
        loadComponent: () => import('./features/admin/bank/bank.component').then(m => m.BankComponent),
        canActivate: [authGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'create-account',
        loadComponent: () => import('./features/admin/create-account/create-account.component').then(m => m.CreateAccountComponent),
        canActivate: [authGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'loan-apply',
        loadComponent: () => import('./features/loan-apply/loan-apply.component').then(m => m.LoanApplyComponent),
        canActivate: [authGuard],
        data: { roles: ['user'] }
    },
    {
        path:'unauthorized',
        loadComponent: () => import('./core/guard/unauthorized.component').then(m => m.UnauthorizedComponent)
    }
];