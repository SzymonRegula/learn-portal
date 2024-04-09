import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class CustomDateAdapter extends NativeDateAdapter {
  shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  longMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Auguest',
    'September',
    'October',
    'November',
    'December',
  ];

  override format(date: Date, displayFormat: Object): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (displayFormat === 'input') {
      return `${day} ${this.shortMonths[month - 1]} ${year}`;
    } else if (displayFormat === 'header') {
      return `${this.longMonths[month - 1]} ${year}`;
    } else {
      return date.toDateString();
    }
  }
}

export const CUSTOM_DATE_FORMATS = {
  display: {
    dateInput: 'input',
    monthYearLabel: 'header',
  },
};
