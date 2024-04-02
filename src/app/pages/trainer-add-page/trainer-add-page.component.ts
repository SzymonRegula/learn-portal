import { Component, OnInit, inject } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { MyTrainersComponent } from '../../components/my-trainers/my-trainers.component';
import { AllTrainersComponent } from '../../components/all-trainers/all-trainers.component';
import { TrainersService } from '../../services/trainers.service';
import { PATHS } from '../../paths';

@Component({
  selector: 'app-trainer-add-page',
  standalone: true,
  imports: [BreadcrumbsComponent, MyTrainersComponent, AllTrainersComponent],
  templateUrl: './trainer-add-page.component.html',
  styleUrl: './trainer-add-page.component.scss',
})
export class TrainerAddPageComponent implements OnInit {
  breadcrumbs = [
    { text: 'My account', url: '/' + PATHS.myAccount },
    { text: 'Add trainer', url: '/' + PATHS.addTrainer },
  ];

  private trainersService = inject(TrainersService);

  ngOnInit(): void {
    this.trainersService.getActiveTrainers().subscribe();
  }
}
