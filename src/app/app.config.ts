import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
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
      withInterceptors([errorResponseInterceptor, loadingInterceptor])
    ),
    provideRouter(routes, withHashLocation(), withViewTransitions()),
    importProvidersFrom(),
    provideAnimations(),
    provideAnimationsAsync(),
  ],
};
