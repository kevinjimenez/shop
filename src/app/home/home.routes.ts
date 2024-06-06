import { Routes } from '@angular/router';
import { productsResolver } from '../core/resolvers/products.resolver';
import { DetailsProductComponent } from './components/details-product/details-product.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent),
    resolve: {
      products: productsResolver,
    },
  },
  {
    path: 'product/:id',
    component: DetailsProductComponent,
    // loadComponent: () =>
    //   import('./components/details-product/details-product.component').then(
    //     m => m.DetailsProductComponent
    //   ),
  },
];
