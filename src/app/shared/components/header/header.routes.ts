import { Routes } from '@angular/router';

export default [
  {
    path: 'books',
    loadComponent: () =>
      import('../../../dashboard/features/books/dashboard.component'),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('../../../auth/features/sign-in/sign-in.component'),
  },
] as Routes;
