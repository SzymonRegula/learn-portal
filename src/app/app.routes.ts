import { Routes } from '@angular/router';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { JoinUsPageComponent } from './pages/join-us-page/join-us-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyAccountPageComponent } from './pages/my-account-page/my-account-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { RegistrationVerificationPageComponent } from './pages/registration-verification-page/registration-verification-page.component';
import { TrainingPageComponent } from './pages/training-page/training-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TrainingAddPageComponent } from './pages/training-add-page/training-add-page.component';

export const routes: Routes = [
  {
    path: 'change-password',
    title: 'Change password',
    component: ChangePasswordPageComponent,
  },
  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent,
  },
  {
    path: 'join-us',
    title: 'Join us',
    component: JoinUsPageComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginPageComponent,
  },
  {
    path: 'my-account',
    title: 'My account',
    component: MyAccountPageComponent,
  },
  {
    path: 'registration/:role',
    title: 'Registration',
    component: RegistrationPageComponent,
  },
  {
    path: 'registration-verification',
    title: 'Registration verification',
    component: RegistrationVerificationPageComponent,
  },
  {
    path: 'training',
    title: 'Training',
    component: TrainingPageComponent,
  },
  {
    path: 'add-training',
    title: 'Add training',
    component: TrainingAddPageComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    title: 'Not found',
    component: NotFoundPageComponent,
  },
];
