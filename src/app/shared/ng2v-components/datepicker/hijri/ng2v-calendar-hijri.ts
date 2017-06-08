import {Ng2vDate} from '../ng2v-date';
import {Ng2vPeriod, Ng2vCalendar} from '../ng2v-calendar';
import {Injectable} from '@angular/core';
import {isNumber} from '../../util/util';

@Injectable()
export abstract class Ng2vCalendarHijri extends Ng2vCalendar {
  getDaysPerWeek() { return 7; }

  getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }

  getWeeksPerMonth() { return 6; }

  isValid(date: Ng2vDate): boolean {
    return date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
        !isNaN(this.toGregorian(date).getTime());
  }

  setDay(date: Ng2vDate, day: number): Ng2vDate {
    day = +day;
    let mDays = this.getDaysInIslamicMonth(date.month, date.year);
    if (day <= 0) {
      while (day <= 0) {
        date = this.setMonth(date, date.month - 1);
        mDays = this.getDaysInIslamicMonth(date.month, date.year);
        day += mDays;
      }
    } else if (day > mDays) {
      while (day > mDays) {
        day -= mDays;
        date = this.setMonth(date, date.month + 1);
        mDays = this.getDaysInIslamicMonth(date.month, date.year);
      }
    }
    date.day = day;
    return date;
  }

  setMonth(date: Ng2vDate, month: number): Ng2vDate {
    month = +month;
    date.year = date.year + Math.floor((month - 1) / 12);
    date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
    return date;
  }

  setYear(date: Ng2vDate, yearValue: number): Ng2vDate {
    date.year = +yearValue;
    return date;
  }

  abstract getWeekday(date: Ng2vDate): number;

  abstract getNext(date: Ng2vDate, period?: Ng2vPeriod, number?: number): Ng2vDate;

  abstract getPrev(date: Ng2vDate, period?: Ng2vPeriod, number?: number): Ng2vDate;

  abstract getWeekNumber(week: Ng2vDate[], firstDayOfWeek: number): number;

  abstract getToday(): Ng2vDate;

  /**
   * Returns the equivalent Hijri date value for a give input Gregorian date.
   * `gDate` is s JS Date to be converted to Hijri.
   */
  abstract fromGregorian(gDate: Date): Ng2vDate;

  /**
   * Converts the current Hijri date to Gregorian.
   */
  abstract toGregorian(hijriDate: Ng2vDate): Date;

  /**
   * Returns the number of days in a specific Hijri month.
   * `month` is 1 for Muharram, 2 for Safar, etc.
   * `year` is any Hijri year.
   */
  abstract getDaysInIslamicMonth(month: number, year: number): number;

  protected _isIslamicLeapYear(year: number): boolean { return (14 + 11 * year) % 30 < 11; }

  /**
   * Returns the start of Hijri Month.
   * `month` is 0 for Muharram, 1 for Safar, etc.
   * `year` is any Hijri year.
   */
  protected _getMonthStart(year: number, month: number): number {
    return Math.ceil(29.5 * month) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
  }

  /**
   * Returns the start of Hijri year.
   * `year` is any Hijri year.
   */
  protected _getYearStart(year: number): number { return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0); }
}
