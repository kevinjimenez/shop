import { Routes } from '@angular/router';
import { productsResolver } from '../../core/resolvers/products.resolver';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products.component').then(m => m.ProductsComponent),
    resolve: {
      products: productsResolver,
    },
  },
  {
    path: ':id',
    component: ProductComponent,
    // loadComponent: () =>
    //   import('./components/details-product/details-product.component').then(
    //     m => m.DetailsProductComponent
    //   ),
  },
];
