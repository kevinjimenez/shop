import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('apiInterceptor');

  const reqClone = req.clone({
    headers: req.headers.set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    ),
  });

  return next(reqClone);
};
