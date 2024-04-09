import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomDateService {
  constructor() {}

  ddmmyyyy = (date: Date): string => {
    const day = this.pad(date.getDate());
    const month = this.pad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  ddmmyyyyToISO = (date: string): string => {
    const [day, month, year] = date.split('.');
    return new Date(`${year}-${month}-${day}`).toISOString();
  };

  ddmmyyyyValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex =
        /^((0[1-9])|([12][0-9])|(3[01]))\.((0[1-9])|(1[012]))\.\d{4}$/;

      if (!value) {
        return null;
      }

      return regex.test(value) ? null : { invalidDateFormat: true };
    };
  };

  monthddyyyy = (date: Date): string => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${monthNames[monthIndex]} ${day}, ${year}`;
  };

  private pad = (num: number): string => num.toString().padStart(2, '0');
}
