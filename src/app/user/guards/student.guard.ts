import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

export const studentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.tokenPayload$.pipe(
    map((payload) =>
      payload?.role === 'student' ? true : router.parseUrl('/')
    )
  );
};
