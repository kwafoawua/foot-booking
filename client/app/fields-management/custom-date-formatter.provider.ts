import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { Injectable } from '@angular/core';
import { getISOWeek } from 'date-fns';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new Intl.DateTimeFormat(locale, {
      year: 'numeric'
    }).format(date);
    const weekNumber: number = getISOWeek(date);
    return `Semana ${weekNumber} en ${year}`;
  }
}
