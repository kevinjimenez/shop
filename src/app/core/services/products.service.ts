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

  getAll() {
    return this.#httpClient
      .get<Product[]>('https://fakestoreapi.com/products')
      .pipe(catchError(this.handleErrorResponse));
  }

  private handleErrorResponse(
    // error: HttpErrorResponse,
    error: ErrorResponse
  ): ReturnType<typeof throwError> {
    return throwError(() => error);
  }
}
