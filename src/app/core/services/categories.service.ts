import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorResponse } from '../models/error-response.mode';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _httpClient = inject(HttpClient);

  getAll() {
    return this._httpClient
      .get<string[]>('https://fakestoreapi.com/products/categories')
      .pipe(catchError(this.handleErrorResponse));
  }

  private handleErrorResponse(
    // error: HttpErrorResponse,
    error: ErrorResponse
  ): ReturnType<typeof throwError> {
    return throwError(() => error);
  }
}
