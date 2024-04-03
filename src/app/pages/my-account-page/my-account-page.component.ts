import { Component, OnInit, inject } from '@angular/core';
import { MyAccountComponent } from '../../components/my-account/my-account.component';
import { MyTrainersComponent } from '../../components/my-trainers/my-trainers.component';
import { UserService } from '../../user/services/user.service';
import { AsyncPipe } from '@angular/common';
import { MyStudentsComponent } from '../../components/my-students/my-students.component';
import { TrainersService } from '../../services/trainers.service';
import { AuthService } from '../../auth/services/auth.service';
import { first, switchMap } from 'rxjs';
import { SpecializationsService } from '../../services/specializations.service';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { PATHS } from '../../paths';

@Component({
  selector: 'app-my-account-page',
  standalone: true,
  imports: [
    MyAccountComponent,
    MyTrainersComponent,
    MyStudentsComponent,
    ButtonComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './my-account-page.component.html',
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent implements OnInit {
  trainingsPath = '/' + PATHS.trainings;
  user$ = inject(UserService).user$;
  authService = inject(AuthService);
  trainersService = inject(TrainersService);
  specializationsService = inject(SpecializationsService);

  ngOnInit(): void {
    this.authService.tokenPayload$
      .pipe(
        first(),
        switchMap((payload) =>
          payload?.role === 'student'
            ? this.trainersService.getActiveTrainers()
            : this.specializationsService.getSpecializations()
        )
      )
      .subscribe();
  }
}
