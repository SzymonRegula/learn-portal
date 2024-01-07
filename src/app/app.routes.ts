import { Routes } from '@angular/router';

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
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration-page/registration-page.component').then(
        (m) => m.RegistrationPageComponent
      ),
  },
  {
    path: 'training',
    loadComponent: () =>
      import('./pages/training-page/training-page.component').then(
        (m) => m.TrainingPageComponent
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
