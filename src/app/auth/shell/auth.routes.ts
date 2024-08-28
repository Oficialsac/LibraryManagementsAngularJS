import { Routes } from '@angular/router';

export default [
  {
    path: 'sign-in',
    loadComponent: () => import('../features/sign-in/sign-in.component'),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('../features/sign-up/sign-up.component'),
  },
  {
    path: 'profile',
    loadComponent: () => import('../features/profile/profile.component'),
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
] as Routes;
