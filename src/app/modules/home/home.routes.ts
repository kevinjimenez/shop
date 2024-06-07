import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('../products/products.routes').then(m => m.routes),
  },
];
