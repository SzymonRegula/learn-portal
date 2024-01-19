import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: 'change-password',
    loadComponent: () =>
      import(
        './pages/change-password-page/change-password-page.component'
      ).then((m) => m.ChangePasswordPageComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'join-us',
    loadComponent: () =>
      import('./pages/join-us-page/join-us-page.component').then(
        (m) => m.JoinUsPageComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'my-account',
    loadComponent: () =>
      import('./pages/my-account-page/my-account-page.component').then(
        (m) => m.MyAccountPageComponent
      ),
  },
  {
    path: 'registration/:role',
    loadComponent: () =>
      import('./pages/registration-page/registration-page.component').then(
        (m) => m.RegistrationPageComponent
      ),
  },
  {
    path: 'registration-verification',
    loadComponent: () =>
      import(
        './pages/registration-verification-page/registration-verification-page.component'
      ).then((m) => m.RegistrationVerificationPageComponent),
  },
  {
    path: 'training',
    loadComponent: () =>
      import('./pages/training-page/training-page.component').then(
        (m) => m.TrainingPageComponent
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];
