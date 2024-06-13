import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../core/models/product.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
      snackBar.open('Elemento añadido', 'OK', config);
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
    },
    removeFromCart(id: number) {
      snackBar.open('Elemento removido', 'OK', config);
      const foundProduct = products().find(product => product.id === id);

      if (!foundProduct) return;

      if (foundProduct.count > 1) {
        foundProduct.count--;
        foundProduct.subTotal = foundProduct.price * foundProduct.count;
        patchState(store, { products: products() });
      } else {
        const updatedProducts = products().filter(product => product.id !== id);
        patchState(store, { products: updatedProducts });
      }
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
