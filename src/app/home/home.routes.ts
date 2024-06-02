import { Routes } from '@angular/router';
import { productsResolver } from '../core/resolvers/products.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent),
    // resolve: {
    //   products: productsResolver,
    // },
  },
];
