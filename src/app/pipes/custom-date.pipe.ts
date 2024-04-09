import { Pipe, PipeTransform, inject } from '@angular/core';
import { CustomDateService } from '../services/custom-date.service';

type DateFormat = 'dd.mm.yyyy' | 'month dd, yyyy';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  customDateService = inject(CustomDateService);

  transform(value: Date, format: DateFormat = 'dd.mm.yyyy'): string {
    if (format === 'dd.mm.yyyy') {
      return this.customDateService.ddmmyyyy(value);
    } else if (format === 'month dd, yyyy') {
      return this.customDateService.monthddyyyy(value);
    } else return value.toDateString();
  }
}
