import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

type Size = 'medium' | 'large';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule, FontAwesomeModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [],
})
export class DatePickerComponent {
  @Output() dateChange = new EventEmitter<Date>();
  @Input() size: Size = 'medium';
  icon = faCalendar;

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.dateChange.emit(event.value);
    }
  }
}
