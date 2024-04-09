import { Component, OnInit, inject } from '@angular/core';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../components/breadcrumbs/breadcrumbs.component';
import { PATHS } from '../../paths';
import { AddTrainingFormComponent } from '../../components/add-training-form/add-training-form.component';
import { TrainersService } from '../../services/trainers.service';
import { TrainingsService } from '../../services/trainings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-add-page',
  standalone: true,
  imports: [BreadcrumbsComponent, AddTrainingFormComponent],
  templateUrl: './training-add-page.component.html',
  styleUrl: './training-add-page.component.scss',
})
export class TrainingAddPageComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { text: 'My account', url: '/' + PATHS.myAccount },
    { text: 'Trainings', url: '/' + PATHS.trainings },
    { text: 'Add trainings', url: '/' + PATHS.addTraining },
  ];

  router = inject(Router);
  trainersService = inject(TrainersService);
  trainingService = inject(TrainingsService);

  ngOnInit(): void {
    this.trainersService.getActiveTrainers().subscribe();
    this.trainingService.getTrainingTypes().subscribe();
  }

  onCancel() {
    this.router.navigate(['/', PATHS.trainings]);
  }
}
