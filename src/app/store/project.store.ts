import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../core/models/product.model';

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

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => {
      console.log({ products });

      return products.length;
    }),
    totalAmount: computed(() => 0),
  })),
  withMethods(({ products, ...store }) => ({
    addToCart(product: Product) {
      console.log({ product });
      patchState(store, { products: [...products(), product] });
    },
  }))
);
