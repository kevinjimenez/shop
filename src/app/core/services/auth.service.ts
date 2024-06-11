import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { ErrorResponse } from '../models/error-response.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);

  signIn(payload: Login) {
    const url = `${environment.apiUrl}/auth/login`;
    return this._httpClient
      .post<{ token: string }>(url, payload)
      .pipe(catchError(this.handleErrorResponse));
  }

  private handleErrorResponse(
    // error: HttpErrorResponse,
    error: ErrorResponse
  ): ReturnType<typeof throwError> {
    return throwError(() => error);
  }
}
