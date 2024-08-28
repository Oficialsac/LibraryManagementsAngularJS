import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/shell/auth.routes'),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/dashboard/dashboard.routes'),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
