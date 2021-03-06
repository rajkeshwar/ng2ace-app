import {Ng2vCalendarGregorian} from './ng2v-calendar';
import {Ng2vDate} from './ng2v-date';

describe('ng2v-calendar-gregorian', () => {

  const calendar = new Ng2vCalendarGregorian();

  it('should return todays date', () => {
    const jsToday = new Date();
    const today = new Ng2vDate(jsToday.getFullYear(), jsToday.getMonth() + 1, jsToday.getDate());

    expect(calendar.getToday()).toEqual(today);
  });

  it('should return number of days per week', () => { expect(calendar.getDaysPerWeek()).toBe(7); });

  it('should return number of weeks per month', () => { expect(calendar.getWeeksPerMonth()).toBe(6); });

  it('should return months of a year', () => {
    expect(calendar.getMonths()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('should return day of week', () => {
    expect(calendar.getWeekday(new Ng2vDate(2017, 1, 2))).toBe(1);  // Mon, 2 Jan 2017
    expect(calendar.getWeekday(new Ng2vDate(2017, 1, 3))).toBe(2);
    expect(calendar.getWeekday(new Ng2vDate(2017, 1, 4))).toBe(3);
    expect(calendar.getWeekday(new Ng2vDate(2017, 1, 5))).toBe(4);
    expect(calendar.getWeekday(new Ng2vDate(2017, 1, 6))).toBe(5);
    expect(calendar.getWeekday(new Ng2vDate(2017, 1, 7))).toBe(6);
    expect(calendar.getWeekday(new Ng2vDate(2017, 1, 8))).toBe(7);  // Sun, 8 Jan 2017
  });

  it('should add days to date', () => {
    expect(calendar.getNext(new Ng2vDate(2016, 12, 31))).toEqual(new Ng2vDate(2017, 1, 1));
    expect(calendar.getNext(new Ng2vDate(2016, 2, 28))).toEqual(new Ng2vDate(2016, 2, 29));
    expect(calendar.getNext(new Ng2vDate(2017, 2, 28))).toEqual(new Ng2vDate(2017, 3, 1));
  });

  it('should subtract days from date', () => {
    expect(calendar.getPrev(new Ng2vDate(2017, 1, 1))).toEqual(new Ng2vDate(2016, 12, 31));
    expect(calendar.getPrev(new Ng2vDate(2016, 2, 29))).toEqual(new Ng2vDate(2016, 2, 28));
    expect(calendar.getPrev(new Ng2vDate(2017, 3, 1))).toEqual(new Ng2vDate(2017, 2, 28));
  });

  it('should add months to date', () => {
    expect(calendar.getNext(new Ng2vDate(2016, 7, 22), 'm')).toEqual(new Ng2vDate(2016, 8, 1));
    expect(calendar.getNext(new Ng2vDate(2016, 7, 1), 'm')).toEqual(new Ng2vDate(2016, 8, 1));
    expect(calendar.getNext(new Ng2vDate(2016, 12, 22), 'm')).toEqual(new Ng2vDate(2017, 1, 1));
  });

  it('should subtract months from date', () => {
    expect(calendar.getPrev(new Ng2vDate(2016, 7, 22), 'm')).toEqual(new Ng2vDate(2016, 6, 1));
    expect(calendar.getPrev(new Ng2vDate(2016, 8, 1), 'm')).toEqual(new Ng2vDate(2016, 7, 1));
    expect(calendar.getPrev(new Ng2vDate(2017, 1, 22), 'm')).toEqual(new Ng2vDate(2016, 12, 1));
  });

  it('should add years to date', () => {
    expect(calendar.getNext(new Ng2vDate(2016, 1, 22), 'y')).toEqual(new Ng2vDate(2017, 1, 1));
    expect(calendar.getNext(new Ng2vDate(2017, 12, 22), 'y')).toEqual(new Ng2vDate(2018, 1, 1));
  });

  it('should subtract years from date', () => {
    expect(calendar.getPrev(new Ng2vDate(2016, 12, 22), 'y')).toEqual(new Ng2vDate(2015, 1, 1));
    expect(calendar.getPrev(new Ng2vDate(2017, 1, 22), 'y')).toEqual(new Ng2vDate(2016, 1, 1));
  });

  it('should properly recognize invalid javascript date', () => {
    expect(calendar.isValid(null)).toBeFalsy();
    expect(calendar.isValid(undefined)).toBeFalsy();
    expect(calendar.isValid(<any>NaN)).toBeFalsy();
    expect(calendar.isValid(<any>new Date())).toBeFalsy();
    expect(calendar.isValid(new Ng2vDate(null, null, null))).toBeFalsy();
    expect(calendar.isValid(new Ng2vDate(undefined, undefined, undefined))).toBeFalsy();
    expect(calendar.isValid(new Ng2vDate(NaN, NaN, NaN))).toBeFalsy();
    expect(calendar.isValid(new Ng2vDate(<any>'2017', <any>'03', <any>'10'))).toBeFalsy();
  });

  it('should recognize dates outside of JS range as invalid', () => {
    expect(calendar.isValid(new Ng2vDate(275760, 9, 14))).toBeFalsy();
    expect(calendar.isValid(new Ng2vDate(-271821, 4, 19))).toBeFalsy();
  });

  it('should recognize dates outside of calendar range as invalid', () => {
    expect(calendar.isValid(new Ng2vDate(0, 0, 0))).toBeFalsy();
    expect(calendar.isValid(new Ng2vDate(-1, -1, -1))).toBeFalsy();
    expect(calendar.isValid(new Ng2vDate(2016, 17, 1))).toBeFalsy();
    expect(calendar.isValid(new Ng2vDate(2017, 5, 35))).toBeFalsy();
  });

  it('should mark valid JS dates as valid', () => {
    expect(calendar.isValid(new Ng2vDate(275760, 9, 12))).toBeTruthy();
    expect(calendar.isValid(new Ng2vDate(2016, 8, 8))).toBeTruthy();
  });

});
