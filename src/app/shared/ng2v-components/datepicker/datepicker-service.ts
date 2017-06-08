import {Ng2vCalendar} from './ng2v-calendar';
import {Ng2vDate} from './ng2v-date';
import {MonthViewModel, DayViewModel} from './datepicker-view-model';
import {Injectable} from '@angular/core';

@Injectable()
export class Ng2vDatepickerService {
  constructor(private _calendar: Ng2vCalendar) {}

  generateMonthViewModel(
      date: Ng2vDate, minDate: Ng2vDate, maxDate: Ng2vDate, firstDayOfWeek: number,
      markDisabled: (date: Ng2vDate, current: {month: number, year: number}) => boolean): MonthViewModel {
    const month: MonthViewModel = {firstDate: null, number: date.month, year: date.year, weeks: [], weekdays: []};

    date = this._getFirstViewDate(date, firstDayOfWeek);

    // month has weeks
    for (let w = 0; w < this._calendar.getWeeksPerMonth(); w++) {
      const days: DayViewModel[] = [];

      // week has days
      for (let d = 0; d < this._calendar.getDaysPerWeek(); d++) {
        if (w === 0) {
          month.weekdays.push(this._calendar.getWeekday(date));
        }

        const newDate = new Ng2vDate(date.year, date.month, date.day);

        let disabled = (minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate));
        if (!disabled && markDisabled) {
          disabled = markDisabled(newDate, {month: month.number, year: month.year});
        }

        // saving first date of the month
        if (month.firstDate === null && date.month === month.number) {
          month.firstDate = newDate;
        }

        days.push({date: newDate, disabled: disabled});

        date = this._calendar.getNext(date);
      }

      month.weeks.push(
          {number: this._calendar.getWeekNumber(days.map(day => Ng2vDate.from(day.date)), firstDayOfWeek), days: days});
    }

    return month;
  }

  toValidDate(date: {year: number, month: number, day?: number}, defaultValue?: Ng2vDate): Ng2vDate {
    const ng2vDate = Ng2vDate.from(date);
    if (defaultValue === undefined) {
      defaultValue = this._calendar.getToday();
    }
    return this._calendar.isValid(ng2vDate) ? ng2vDate : defaultValue;
  }

  private _getFirstViewDate(date: Ng2vDate, firstDayOfWeek: number): Ng2vDate {
    const currentMonth = date.month;
    let today = new Ng2vDate(date.year, date.month, date.day);
    let yesterday = this._calendar.getPrev(today);

    const firstDayOfCurrentMonthIsAlsoFirstDayOfWeek =
        () => { return today.month !== yesterday.month && firstDayOfWeek === this._calendar.getWeekday(today); };

    const reachedTheFirstDayOfTheLastWeekOfPreviousMonth =
        () => { return today.month !== currentMonth && firstDayOfWeek === this._calendar.getWeekday(today); };

    // going back in time
    while (!reachedTheFirstDayOfTheLastWeekOfPreviousMonth() && !firstDayOfCurrentMonthIsAlsoFirstDayOfWeek()) {
      today = new Ng2vDate(yesterday.year, yesterday.month, yesterday.day);
      yesterday = this._calendar.getPrev(yesterday);
    }

    return today;
  }
}
