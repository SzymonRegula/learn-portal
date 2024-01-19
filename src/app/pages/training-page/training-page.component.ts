import { Component } from '@angular/core';
import {
  Breadcrumb,
  BreadcrumbsComponent,
} from '../../components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../components/table/table.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { DateRange } from '../../models/date-range.model';

@Component({
  selector: 'app-training-page',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent, DatePickerComponent],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.scss',
})
export class TrainingPageComponent {
  breadcrumbs: Breadcrumb[] = [
    { text: 'My account', url: '/my-account' },
    { text: 'Trainigs', url: '/my-account/trainig' },
    { text: 'Add trainig', url: '/training' },
  ];

  onRangeChange(range: DateRange) {
    console.log(range);
  }
}
