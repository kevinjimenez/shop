import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorResponse } from '../models/error-response.mode';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #httpClient = inject(HttpClient);

  getAll(limit = 5) {
    return this.#httpClient
      .get<Product[]>(`https://fakestoreapi.com/products?limit=${limit}`)
      .pipe(catchError(this.handleErrorResponse));
  }

  getById(id: number) {
    return this.#httpClient
      .get<Product>('https://fakestoreapi.com/products/' + id)
      .pipe(catchError(this.handleErrorResponse));
  }

  getByCategory(category?: string) {
    if (!category) return this.getAll();
    return this.#httpClient
      .get<Product[]>(`https://fakestoreapi.com/products/category/${category}`)
      .pipe(catchError(this.handleErrorResponse));
  }

  private handleErrorResponse(
    // error: HttpErrorResponse,
    error: ErrorResponse
  ): ReturnType<typeof throwError> {
    return throwError(() => error);
  }
}
