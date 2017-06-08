import {TestBed, inject} from '@angular/core/testing';

import {Ng2vCalendar, Ng2vCalendarGregorian} from './ng2v-calendar';
import {Ng2vDate} from './ng2v-date';
import {Ng2vDatepickerI18n} from './datepicker-i18n';
import {Ng2vDatepickerService} from './datepicker-service';

class MockCalendar extends Ng2vCalendarGregorian {
  getDaysPerWeek(): number { return 1; }

  getWeeksPerMonth(): number { return 1; }

  getWeekday(date: Ng2vDate): number { return 1; }

  getWeekNumber(week: Ng2vDate[], firstDayOfWeek: number): number { return 1; }

  getNext(date: Ng2vDate, period = 'd'): Ng2vDate { return new Ng2vDate(2000, 0, 1); }

  getPrev(date: Ng2vDate, period = 'd'): Ng2vDate { return new Ng2vDate(2000, 2, 1); }

  getToday(): Ng2vDate { return new Ng2vDate(2000, 1, 1); }

  isValid(date: Ng2vDate): boolean { return true; }
}

describe('ng2v-datepicker-service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(
        {providers: [Ng2vDatepickerI18n, Ng2vDatepickerService, {provide: Ng2vCalendar, useClass: MockCalendar}]});
  });

  it('should generate month view model', inject([Ng2vDatepickerService, Ng2vCalendar], (service, calendar) => {
       const monthViewModel = service.generateMonthViewModel(
           calendar.getToday(), new Ng2vDate(2000, 0, 1), new Ng2vDate(2000, 2, 1), 1, null);
       expect(monthViewModel).toEqual({
         number: 1,
         year: 2000,
         firstDate: new Ng2vDate(2000, 1, 1),
         weeks: [{number: 1, days: [{date: new Ng2vDate(2000, 1, 1), disabled: false}]}],
         weekdays: [1]
       });
     }));

  it('should mark dates out of min/max bounds as disabled',
     inject([Ng2vDatepickerService, Ng2vCalendar], (service, calendar) => {
       let monthViewModel = service.generateMonthViewModel(
           calendar.getToday(), new Ng2vDate(2000, 2, 1), new Ng2vDate(2000, 2, 10), 1, null);
       expect(monthViewModel).toEqual({
         number: 1,
         year: 2000,
         firstDate: new Ng2vDate(2000, 1, 1),
         weeks: [{number: 1, days: [{date: new Ng2vDate(2000, 1, 1), disabled: true}]}],
         weekdays: [1]
       });

       monthViewModel = service.generateMonthViewModel(
           calendar.getToday(), new Ng2vDate(2000, 0, 1), new Ng2vDate(2000, 0, 10), 1, null);
       expect(monthViewModel).toEqual({
         number: 1,
         year: 2000,
         firstDate: new Ng2vDate(2000, 1, 1),
         weeks: [{number: 1, days: [{date: new Ng2vDate(2000, 1, 1), disabled: true}]}],
         weekdays: [1]
       });
     }));

  it('should mark dates out of min/max bounds as disabled',
     inject([Ng2vDatepickerService, Ng2vCalendar], (service, calendar) => {
       let monthViewModel = service.generateMonthViewModel(
           calendar.getToday(), new Ng2vDate(2000, 0, 1), new Ng2vDate(2000, 1, 10), 1, () => true);
       expect(monthViewModel).toEqual({
         number: 1,
         year: 2000,
         firstDate: new Ng2vDate(2000, 1, 1),
         weeks: [{number: 1, days: [{date: new Ng2vDate(2000, 1, 1), disabled: true}]}],
         weekdays: [1]
       });
     }));

  it('markDisabled callback should not override date bounds',
     inject([Ng2vDatepickerService, Ng2vCalendar], (service, calendar) => {
       let monthViewModel = service.generateMonthViewModel(
           calendar.getToday(), new Ng2vDate(2000, 0, 1), new Ng2vDate(2000, 0, 10), 1, () => false);
       expect(monthViewModel).toEqual({
         number: 1,
         year: 2000,
         firstDate: new Ng2vDate(2000, 1, 1),
         weeks: [{number: 1, days: [{date: new Ng2vDate(2000, 1, 1), disabled: true}]}],
         weekdays: [1]
       });
     }));

  it('markDisabled should pass the correct year and month',
     inject([Ng2vDatepickerService, Ng2vCalendar], (service, calendar) => {

       let result;

       const markDisabled = (date, current) => {
         result = current;
         return false;
       };

       service.generateMonthViewModel(
           new Ng2vDate(2016, 10, 10), new Ng2vDate(2000, 0, 1), new Ng2vDate(2020, 0, 10), 1, markDisabled);
       expect(result).toEqual({month: 10, year: 2016});
     }));

  describe('toValidDate() for Gregorian Calendar', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [Ng2vDatepickerI18n, Ng2vDatepickerService, {provide: Ng2vCalendar, useClass: Ng2vCalendarGregorian}]
      });
    });

    it('should convert a valid Ng2vDate', inject([Ng2vDatepickerService], (service) => {
         expect(service.toValidDate(new Ng2vDate(2016, 10, 5))).toEqual(new Ng2vDate(2016, 10, 5));
         expect(service.toValidDate({year: 2016, month: 10, day: 5})).toEqual(new Ng2vDate(2016, 10, 5));
       }));

    it('should return today for an invalid Ng2vDate',
       inject([Ng2vDatepickerService, Ng2vCalendar], (service, calendar) => {
         const today = calendar.getToday();
         expect(service.toValidDate(null)).toEqual(today);
         expect(service.toValidDate({})).toEqual(today);
         expect(service.toValidDate(undefined)).toEqual(today);
         expect(service.toValidDate(new Date())).toEqual(today);
       }));

    it('should return today if default value is undefined',
       inject([Ng2vDatepickerService, Ng2vCalendar], (service, calendar) => {
         expect(service.toValidDate(null, undefined)).toEqual(calendar.getToday());
       }));

    it('should return default value for an invalid Ng2vDate if provided', inject([Ng2vDatepickerService], (service) => {
         expect(service.toValidDate(null, new Ng2vDate(1066, 6, 6))).toEqual(new Ng2vDate(1066, 6, 6));
         expect(service.toValidDate(null, null)).toEqual(null);
       }));
  });

});
