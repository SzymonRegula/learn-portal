import { Component } from '@angular/core';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../components/breadcrumbs/breadcrumbs.component';
import { PATHS } from '../../paths';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-training-add-page',
  standalone: true,
  imports: [BreadcrumbsComponent, ButtonComponent],
  templateUrl: './training-add-page.component.html',
  styleUrl: './training-add-page.component.scss',
})
export class TrainingAddPageComponent {
  breadcrumbs: Breadcrumb[] = [
    { text: 'My account', url: '/' + PATHS.myAccount },
    { text: 'Trainings', url: '/' + PATHS.trainings },
    { text: 'Add trainings', url: '/' + PATHS.addTraining },
  ];
}
