import { Routes } from '@angular/router';

export default [
  {
    path: 'books',
    loadComponent: () => import('./features/books/dashboard.component'),
  },
  {
    path: 'reservation',
    loadComponent: () => import('./features/reservation/reservation.component'),
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import('./features/reservations-list/reservations-list.component'),
  },
  {
    path: '**',
    redirectTo: 'books',
  },
] as Routes;
