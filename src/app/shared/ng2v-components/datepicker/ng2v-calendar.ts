import {Ng2vDate} from './ng2v-date';
import {Injectable} from '@angular/core';
import {isInteger} from '../util/util';

function fromJSDate(jsDate: Date) {
  return new Ng2vDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
function toJSDate(date: Ng2vDate) {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  // this is done avoid 30 -> 1930 conversion
  if (!isNaN(jsDate.getTime())) {
    jsDate.setFullYear(date.year);
  }
  return jsDate;
}

export type Ng2vPeriod = 'y' | 'm' | 'd';

@Injectable()
export abstract class Ng2vCalendar {
  abstract getDaysPerWeek(): number;
  abstract getMonths(): number[];
  abstract getWeeksPerMonth(): number;
  abstract getWeekday(date: Ng2vDate): number;

  abstract getNext(date: Ng2vDate, period?: Ng2vPeriod, number?: number): Ng2vDate;
  abstract getPrev(date: Ng2vDate, period?: Ng2vPeriod, number?: number): Ng2vDate;

  abstract getWeekNumber(week: Ng2vDate[], firstDayOfWeek: number): number;

  abstract getToday(): Ng2vDate;

  abstract isValid(date: Ng2vDate): boolean;
}

@Injectable()
export class Ng2vCalendarGregorian extends Ng2vCalendar {
  getDaysPerWeek() { return 7; }

  getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }

  getWeeksPerMonth() { return 6; }

  getNext(date: Ng2vDate, period: Ng2vPeriod = 'd', number = 1) {
    let jsDate = toJSDate(date);

    switch (period) {
      case 'y':
        return new Ng2vDate(date.year + number, 1, 1);
      case 'm':
        jsDate = new Date(date.year, date.month + number - 1, 1);
        break;
      case 'd':
        jsDate.setDate(jsDate.getDate() + number);
        break;
      default:
        return date;
    }

    return fromJSDate(jsDate);
  }

  getPrev(date: Ng2vDate, period: Ng2vPeriod = 'd', number = 1) { return this.getNext(date, period, -number); }

  getWeekday(date: Ng2vDate) {
    let jsDate = toJSDate(date);
    let day = jsDate.getDay();
    // in JS Date Sun=0, in ISO 8601 Sun=7
    return day === 0 ? 7 : day;
  }

  getWeekNumber(week: Ng2vDate[], firstDayOfWeek: number) {
    // in JS Date Sun=0, in ISO 8601 Sun=7
    if (firstDayOfWeek === 7) {
      firstDayOfWeek = 0;
    }

    const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
    let date = week[thursdayIndex];

    const jsDate = toJSDate(date);
    jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));  // Thursday
    const time = jsDate.getTime();
    jsDate.setMonth(0);  // Compare with Jan 1
    jsDate.setDate(1);
    return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
  }

  getToday(): Ng2vDate { return fromJSDate(new Date()); }

  isValid(date: Ng2vDate): boolean {
    if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
      return false;
    }

    const jsDate = toJSDate(date);

    return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
        jsDate.getDate() === date.day;
  }
}
