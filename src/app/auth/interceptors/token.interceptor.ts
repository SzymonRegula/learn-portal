import { HttpInterceptorFn } from '@angular/common/http';
import { SessionStorageService } from '../services/session-storage.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(SessionStorageService).getToken();

  if (token) {
    const reqWithToken = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(reqWithToken);
  }

  return next(req);
};
