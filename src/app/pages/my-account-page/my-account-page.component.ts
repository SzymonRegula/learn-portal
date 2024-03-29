import { Component, inject } from '@angular/core';
import { MyAccountComponent } from '../../components/my-account/my-account.component';
import { MyTrainersComponent } from '../../components/my-trainers/my-trainers.component';
import { UserService } from '../../user/services/user.service';
import { AsyncPipe } from '@angular/common';
import { MyStudentsComponent } from '../../components/my-students/my-students.component';

@Component({
  selector: 'app-my-account-page',
  standalone: true,
  imports: [
    MyAccountComponent,
    MyTrainersComponent,
    MyStudentsComponent,
    AsyncPipe,
  ],
  templateUrl: './my-account-page.component.html',
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent {
  user$ = inject(UserService).user$;
}
