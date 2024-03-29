import { Component, Input, OnInit, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { TrainersService } from '../../services/trainers.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-trainers',
  standalone: true,
  imports: [ButtonComponent, RouterLink, AsyncPipe],
  templateUrl: './my-trainers.component.html',
  styleUrl: './my-trainers.component.scss',
})
export class MyTrainersComponent implements OnInit {
  @Input() addTrainer: boolean = false;

  private trainersService = inject(TrainersService);
  myTrainers$ = this.trainersService.myTrainers$;

  ngOnInit(): void {
    this.trainersService.getActiveTrainers().subscribe();
  }
}
