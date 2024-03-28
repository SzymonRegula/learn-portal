import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { tokenInterceptor } from './auth/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    provideAnimations(),
    provideToastr({ positionClass: 'toast-top-center' }),
  ],
};
