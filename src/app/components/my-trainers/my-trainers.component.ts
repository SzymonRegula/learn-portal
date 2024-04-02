import { Component, Input, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { TrainersService } from '../../services/trainers.service';
import { AsyncPipe } from '@angular/common';
import { PATHS } from '../../paths';

@Component({
  selector: 'app-my-trainers',
  standalone: true,
  imports: [ButtonComponent, RouterLink, AsyncPipe],
  templateUrl: './my-trainers.component.html',
  styleUrl: './my-trainers.component.scss',
})
export class MyTrainersComponent {
  addTrainerPath = '/' + PATHS.addTrainer;
  @Input() addTrainer: boolean = false;

  private trainersService = inject(TrainersService);
  myTrainers$ = this.trainersService.myTrainers$;
}
