import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
} from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { CUSTOM_DATE_FORMATS, CustomDateAdapter } from './custom-date-adapter';

type Size = 'medium' | 'large';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule, FontAwesomeModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
})
export class DatePickerComponent {
  @Output() dateChange = new EventEmitter<Date>();
  @Input() size: Size = 'medium';
  @Input() date: Date | null = null;
  icon = faCalendar;

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.dateChange.emit(event.value);
    }
  }
}
