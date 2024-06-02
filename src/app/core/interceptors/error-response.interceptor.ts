import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const errorResponseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loadingService = inject(LoadingService);
  console.log('errorResponseInterceptor');
  return next(req).pipe(
    catchError(error => handleErrorResponse(error, loadingService))
  );
};

function handleErrorResponse(
  error: HttpErrorResponse,
  loadingService: LoadingService
): ReturnType<typeof throwError> {
  loadingService.hide();
  const errorResponse = `Error code :${error.status}, message: ${error.message}`;
  return throwError(() => errorResponse);
}
