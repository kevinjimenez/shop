import { HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

let activeRquest = signal<number>(0);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('loadingInterceptor');

  const loadingService = inject(LoadingService);
  console.log({ activeRquest: activeRquest() });

  // loadingService.show();
  // return next(req).pipe(finalize(() => loadingService.hide()));

  if (activeRquest() === 0) loadingService.show();
  activeRquest.update(cunrrent => cunrrent + 1);

  return next(req).pipe(finalize(() => stopLoader(loadingService)));
};

const stopLoader = (loadingService: LoadingService) => {
  activeRquest.update(cunrrent => cunrrent - 1);
  if (activeRquest() === 0) loadingService.hide();
};
