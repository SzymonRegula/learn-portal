import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map, of } from 'rxjs';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  const userService = inject(UserService);

  return userService.getUser().pipe(
    map((user) => !!user),
    catchError(() => of(false))
  );
};
