import { Routes } from '@angular/router';
import { exitGuard } from './core/guards/exit.guard';
import LayoutComponent from './layout/layout.component';

export const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.routes').then(m => m.routes),
      },
    ],
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.default),
  },
  {
    path: 'sign-up',
    canDeactivate: [exitGuard],
    loadComponent: () =>
      import('./pages/register/register.component').then(m => m.default),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./pages/main/main.component').then(m => m.default),
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.default),
  },
];
