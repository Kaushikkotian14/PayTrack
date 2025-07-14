import { Routes } from '@angular/router';

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
        loadComponent: () => import('./components/expense/expense.component').then(m => m.ExpenseComponent)
    }
];