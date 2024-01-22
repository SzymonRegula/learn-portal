import { Component } from '@angular/core';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-training-add-page',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './training-add-page.component.html',
  styleUrl: './training-add-page.component.scss',
})
export class TrainingAddPageComponent {
  breadcrumbs: Breadcrumb[] = [
    { text: 'My account', url: '/my-account' },
    { text: 'Trainings', url: '/training' },
    { text: 'Add trainings', url: '/add-training' },
  ];
}
