import { computed, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../core/models/product.model';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';

export interface CartState {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartState = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

const config: MatSnackBarConfig = {
  horizontalPosition: 'right',
  verticalPosition: 'top',
  duration: 250,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductCount(products())),
    subtotalAmount: computed(() => calculateSubtotalAmount(products())),
    totalAmount: computed(() => calculateTotalAmount(products())),
  })),
  withMethods(({ products, ...store }, snackBar = inject(MatSnackBar)) => ({
    addToCart(product: Product) {
      const foundProduct = products().find(item => item.id === product.id);

      if (!foundProduct) {
        product.count = 1;
        product.subTotal = product.price;
        patchState(store, { products: [...products(), product] });
      } else {
        foundProduct.count++;
        foundProduct.subTotal = foundProduct.price * foundProduct.count;
        patchState(store, { products: [...products()] });
      }
      // snackBar.open('Add item', '', config);
      snackBar.openFromComponent(SnackbarComponent, {
        ...config,
        panelClass: ['snackbar-success'],
      });
    },
    removeFromCart(id: number) {
      const foundProduct = products().find(product => product.id === id);

      if (!foundProduct) return;

      if (foundProduct.count > 1) {
        foundProduct.count--;
        foundProduct.subTotal = foundProduct.price * foundProduct.count;
        patchState(store, { products: [...products()] });
      } else {
        const updatedProducts = products().filter(product => product.id !== id);
        patchState(store, { products: updatedProducts });
      }
      snackBar.open('Remove item', '', {
        ...config,
        panelClass: ['snackbar-danger'],
      });
    },
  }))
);

function calculateTotalAmount(products: Product[]): number {
  return calculateSubtotalAmount(products) * 1.15;
}

function calculateSubtotalAmount(products: Product[]): number {
  return products.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
}

function calculateProductCount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.count, 0);
}
