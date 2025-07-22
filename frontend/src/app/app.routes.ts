import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: 'registration',
        loadComponent: () => import('./components/registration/registration.component').then(m => m.RegistrationComponent)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'expense',
        loadComponent: () => import('./components/expense/expense.component').then(m => m.ExpenseComponent),
        canActivate: [authGuard],
        data: { roles: ['user'] }
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard],
        data: { roles: ['user'] }
    },
    {
        path: 'bank',
        loadComponent: () => import('./components/admin/bank/bank.component').then(m => m.BankComponent),
        canActivate: [authGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'create-account',
        loadComponent: () => import('./components/admin/create-account/create-account.component').then(m => m.CreateAccountComponent),
        canActivate: [authGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'loan-apply',
        loadComponent: () => import('./components/loan-apply/loan-apply.component').then(m => m.LoanApplyComponent),
        canActivate: [authGuard],
        data: { roles: ['user'] }
    }
];