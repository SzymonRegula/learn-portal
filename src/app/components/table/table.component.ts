import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';

export type TrainingData = {
  date: Date;
  trainingName: string;
  type: 'webinar';
  name: string;
  duration: string;
};

const ELEMENT_DATA: TrainingData[] = [
  {
    date: new Date('2020-01-01'),
    trainingName: 'Training 1',
    type: 'webinar',
    name: 'John Doe',
    duration: '1h',
  },

  {
    date: new Date('2020-01-01'),
    trainingName: 'Training 2',
    type: 'webinar',
    name: 'John Doe',
    duration: '1h',
  },
];

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CustomDatePipe, CapitalizeFirstPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  studentView = true;
  displayedColumns: string[] = [
    'date',
    'trainingName',
    'type',
    'name',
    'duration',
  ];
  dataSource = ELEMENT_DATA;
}
