import { apiInterceptor } from './core/interceptors/api.interceptor';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withViewTransitions,
} from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import { errorResponseInterceptor } from './core/interceptors/error-response.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        apiInterceptor,
        errorResponseInterceptor,
      ])
    ),
    provideRouter(
      routes,
      withHashLocation(),
      withViewTransitions(),
      withComponentInputBinding()
    ),
    importProvidersFrom(),
    provideAnimations(),
    provideAnimationsAsync(),
  ],
};
