import { Injectable } from '@angular/core';

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
