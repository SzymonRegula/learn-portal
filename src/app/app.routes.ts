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
import { authorizedGuard } from './auth/guards/authorized.guard';
import { notAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { studentGuard } from './user/guards/student.guard';

export const routes: Routes = [
  {
    path: 'change-password',
    title: 'Change password',
    component: ChangePasswordPageComponent,
    canActivate: [authorizedGuard],
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
    canActivate: [notAuthorizedGuard],
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginPageComponent,
    canActivate: [notAuthorizedGuard],
  },
  {
    path: 'my-account',
    title: 'My account',
    component: MyAccountPageComponent,
    canActivate: [authorizedGuard],
  },
  {
    path: 'registration/:role',
    title: 'Registration',
    component: RegistrationPageComponent,
    canActivate: [notAuthorizedGuard],
  },
  {
    path: 'registration-verification',
    title: 'Registration verification',
    component: RegistrationVerificationPageComponent,
    canActivate: [notAuthorizedGuard],
  },
  {
    path: 'training',
    title: 'Training',
    component: TrainingPageComponent,
    canActivate: [authorizedGuard],
  },
  {
    path: 'add-training',
    title: 'Add training',
    component: TrainingAddPageComponent,
    canActivate: [studentGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    title: 'Not found',
    component: NotFoundPageComponent,
  },
];
