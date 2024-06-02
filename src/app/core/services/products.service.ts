import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../models/product.model';
import { debounceTime, tap, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #httpClient = inject(HttpClient);

  public allProducts = signal<{
    data: Product[];
    lodging: boolean;
  }>({ data: [], lodging: false });

  getAll() {
    this.allProducts.set({ data: [], lodging: true });
    return this.#httpClient
      .get<Product[]>('https://fakestoreapi.com/products')
      .pipe(
        tap(products => {
          console.log(products);
          this.allProducts.set({ data: products, lodging: false });
        })
      );
  }
}
