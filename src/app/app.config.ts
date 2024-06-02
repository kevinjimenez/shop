import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorResponseInterceptor } from './core/interceptors/error-response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([errorResponseInterceptor, loadingInterceptor])
      // withInterceptorsFromDi()
    ),
    provideRouter(routes, withHashLocation()),
  ],
};
