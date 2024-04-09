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
import { TrainerAddPageComponent } from './pages/trainer-add-page/trainer-add-page.component';
import { PATHS } from './paths';

export const routes: Routes = [
  {
    path: PATHS.changePassword,
    title: 'Change password',
    component: ChangePasswordPageComponent,
    canActivate: [authorizedGuard],
  },
  {
    path: PATHS.home,
    title: 'Home',
    component: HomePageComponent,
  },
  {
    path: PATHS.joinUs,
    title: 'Join us',
    component: JoinUsPageComponent,
    canActivate: [notAuthorizedGuard],
  },
  {
    path: PATHS.login,
    title: 'Login',
    component: LoginPageComponent,
    canActivate: [notAuthorizedGuard],
  },
  {
    path: PATHS.myAccount,
    title: 'My account',
    component: MyAccountPageComponent,
    canActivate: [authorizedGuard],
  },
  {
    path: PATHS.registration + '/:role',
    title: 'Registration',
    component: RegistrationPageComponent,
    canActivate: [notAuthorizedGuard],
  },
  {
    path: PATHS.registrationVerification,
    title: 'Registration verification',
    component: RegistrationVerificationPageComponent,
  },
  {
    path: PATHS.trainings,
    title: 'Trainings',
    component: TrainingPageComponent,
    canActivate: [authorizedGuard],
  },
  {
    path: PATHS.addTraining,
    title: 'Add training',
    component: TrainingAddPageComponent,
    canActivate: [authorizedGuard, studentGuard],
  },
  {
    path: PATHS.addTrainer,
    title: 'Add trainer',
    component: TrainerAddPageComponent,
    canActivate: [authorizedGuard, studentGuard],
  },
  { path: '', redirectTo: PATHS.home, pathMatch: 'full' },
  {
    path: '**',
    title: 'Not found',
    component: NotFoundPageComponent,
  },
];
