import { Routes } from '@angular/router';
import LayoutComponent from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'main',
        loadComponent: () =>
          import('./main/main.component').then((m) => m.default),
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then((m) => m.routes),
      },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.default),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./register/register.component').then((m) => m.default),
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then((m) => m.default),
  },
];
