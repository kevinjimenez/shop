import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorResponse } from '../models/error-response.model';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #httpClient = inject(HttpClient);

  getAll(limit = 5) {
    const url = `${environment.apiUrl}/products?limit=${limit}`;
    return this.#httpClient
      .get<Product[]>(url)
      .pipe(catchError(this.handleErrorResponse));
  }

  getById(id: number) {
    const url = `${environment.apiUrl}/products/${id}`;
    return this.#httpClient
      .get<Product>(url)
      .pipe(catchError(this.handleErrorResponse));
  }

  getByCategory(category?: string) {
    const url = `${environment.apiUrl}/products/category/${category}`;
    if (!category) return this.getAll();
    return this.#httpClient
      .get<Product[]>(url)
      .pipe(catchError(this.handleErrorResponse));
  }

  private handleErrorResponse(
    // error: HttpErrorResponse,
    error: ErrorResponse
  ): ReturnType<typeof throwError> {
    return throwError(() => error);
  }
}
