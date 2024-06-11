import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { ErrorResponse } from '../models/error-response.model';
import { LoadingService } from '../services/loading.service';

export const errorResponseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const snackBar = inject(MatSnackBar);
  const loadingService = inject(LoadingService);
  console.log('errorResponseInterceptor');
  return next(req).pipe(
    catchError(error => handleErrorResponse(error, loadingService, snackBar))
  );
};

function handleErrorResponse(
  error: HttpErrorResponse,
  loadingService: LoadingService,
  snackBar: MatSnackBar
): ReturnType<typeof throwError> {
  loadingService.hide();
  const config: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };
  if (error.status === HttpStatusCode.Unauthorized) {
    snackBar.open('No tienes acceso', 'OK', config);
  } else {
    snackBar.open(
      'Sucedio un error inesperado, intenta más tarde',
      'OK',
      config
    );
  }

  // `Error code :${error.status}, message: ${error.message}`
  const errorResponse: ErrorResponse = {
    code: error.status,
    message: error.message,
  };
  return throwError(() => errorResponse);
}
