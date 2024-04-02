import { Component } from '@angular/core';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../components/table/table.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { PATHS } from '../../paths';

@Component({
  selector: 'app-training-page',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent, DatePickerComponent],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.scss',
})
export class TrainingPageComponent {
  breadcrumbs: Breadcrumb[] = [
    { text: 'My account', url: '/' + PATHS.myAccount },
    { text: 'Trainings', url: '/' + PATHS.trainings },
  ];

  onDateChange(date: Date) {
    console.log(date);
  }
}
