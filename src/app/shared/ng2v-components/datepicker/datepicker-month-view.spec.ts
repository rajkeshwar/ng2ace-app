import {TestBed, ComponentFixture} from '@angular/core/testing';
import {createGenericTestComponent, isBrowser} from '../test/common';

import {Component} from '@angular/core';

import {Ng2vDatepickerModule} from './datepicker.module';
import {Ng2vDatepickerMonthView} from './datepicker-month-view';
import {MonthViewModel} from './datepicker-view-model';
import {Ng2vDate} from './ng2v-date';
import {Ng2vDatepickerDayView} from './datepicker-day-view';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getWeekdays(element: HTMLElement): HTMLElement[] {
  return <HTMLElement[]>Array.from(element.querySelectorAll('.ng2v-dp-weekday'));
}

function getWeekNumbers(element: HTMLElement): HTMLElement[] {
  return <HTMLElement[]>Array.from(element.querySelectorAll('.ng2v-dp-week-number'));
}

function getDates(element: HTMLElement): HTMLElement[] {
  return <HTMLElement[]>Array.from(element.querySelectorAll('.ng2v-dp-day'));
}

function expectWeekdays(element: HTMLElement, weekdays: string[]) {
  const result = getWeekdays(element).map(td => td.innerText.trim());
  expect(result).toEqual(weekdays);
}

function expectWeekNumbers(element: HTMLElement, weeknumbers: string[]) {
  const result = getWeekNumbers(element).map(td => td.innerText.trim());
  expect(result).toEqual(weeknumbers);
}

function expectDates(element: HTMLElement, dates: string[]) {
  const result = getDates(element).map(td => td.innerText.trim());
  expect(result).toEqual(dates);
}

describe('ng2v-datepicker-month-view', () => {

  beforeEach(() => {
    TestBed.overrideModule(Ng2vDatepickerModule, {set: {exports: [Ng2vDatepickerMonthView, Ng2vDatepickerDayView]}});
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [Ng2vDatepickerModule.forRoot()]});
  });

  it('should show/hide weekdays', () => {
    const fixture = createTestComponent(
        '<ng2v-datepicker-month-view [month]="month" [showWeekdays]="showWeekdays"></ng2v-datepicker-month-view>');

    expectWeekdays(fixture.nativeElement, ['Mo']);

    fixture.componentInstance.showWeekdays = false;
    fixture.detectChanges();
    expectWeekdays(fixture.nativeElement, []);
  });

  it('should show/hide week numbers', () => {
    const fixture = createTestComponent(
        '<ng2v-datepicker-month-view [month]="month" [showWeekNumbers]="showWeekNumbers"></ng2v-datepicker-month-view>');

    expectWeekNumbers(fixture.nativeElement, ['2']);

    fixture.componentInstance.showWeekNumbers = false;
    fixture.detectChanges();
    expectWeekNumbers(fixture.nativeElement, []);
  });

  it('should use custom template to display dates', () => {
    const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="month" [dayTemplate]="tpl"></ng2v-datepicker-month-view>
      `);
    expectDates(fixture.nativeElement, ['22', '23']);
  });

  it('should send date selection events', () => {
    const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="month" [dayTemplate]="tpl" (select)="onClick($event)"></ng2v-datepicker-month-view>
      `);

    spyOn(fixture.componentInstance, 'onClick');

    const dates = getDates(fixture.nativeElement);
    dates[0].click();

    expect(fixture.componentInstance.onClick).toHaveBeenCalledWith(new Ng2vDate(2016, 7, 22));
  });

  it('should not send date selection events for disabled dates', () => {
    const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="month" [dayTemplate]="tpl" (select)="onClick($event)"></ng2v-datepicker-month-view>
      `);

    fixture.componentInstance.month.weeks[0].days[0].disabled = true;
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'onClick');

    const dates = getDates(fixture.nativeElement);
    dates[0].click();

    expect(fixture.componentInstance.onClick).not.toHaveBeenCalled();
  });

  it('should not send date selection events if disabled', () => {
    const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="month" [dayTemplate]="tpl" [disabled]="true" (select)="onClick($event)">        
        </ng2v-datepicker-month-view>
      `);

    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'onClick');

    const dates = getDates(fixture.nativeElement);
    dates[0].click();

    expect(fixture.componentInstance.onClick).not.toHaveBeenCalled();
  });

  if (!isBrowser('ie9')) {
    it('should set cursor to pointer', () => {
      const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="month" [dayTemplate]="tpl" (change)="onClick($event)"></ng2v-datepicker-month-view>
      `);

      const dates = getDates(fixture.nativeElement);
      expect(window.getComputedStyle(dates[0]).getPropertyValue('cursor')).toBe('pointer');
    });
  }

  if (!isBrowser('ie9')) {
    it('should set default cursor for disabled dates', () => {
      const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="month" [dayTemplate]="tpl" (change)="onClick($event)"></ng2v-datepicker-month-view>
      `);

      fixture.componentInstance.month.weeks[0].days[0].disabled = true;
      fixture.detectChanges();

      const dates = getDates(fixture.nativeElement);
      expect(window.getComputedStyle(dates[0]).getPropertyValue('cursor')).toBe('default');
    });

    it('should set default cursor for all dates if disabled', () => {
      const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="month" [dayTemplate]="tpl" (change)="onClick($event)" [disabled]="true">        
        </ng2v-datepicker-month-view>
      `);

      fixture.detectChanges();

      const dates = getDates(fixture.nativeElement);
      dates.forEach((date) => expect(window.getComputedStyle(date).getPropertyValue('cursor')).toBe('default'));
    });

    it('should set default cursor for other months days', () => {
      const fixture = createTestComponent(
          '<ng2v-datepicker-month-view [month]="month" [outsideDays]="outsideDays"></ng2v-datepicker-month-view>');

      const dates = getDates(fixture.nativeElement);
      expect(window.getComputedStyle(dates[1]).getPropertyValue('cursor')).toBe('pointer');

      fixture.componentInstance.outsideDays = 'collapsed';
      fixture.detectChanges();
      expect(window.getComputedStyle(dates[1]).getPropertyValue('cursor')).toBe('default');

      fixture.componentInstance.outsideDays = 'hidden';
      fixture.detectChanges();
      expect(window.getComputedStyle(dates[1]).getPropertyValue('cursor')).toBe('default');
    });
  }

  it('should apply proper visibility to other months days', () => {
    const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="month" [outsideDays]="outsideDays" [dayTemplate]="tpl"></ng2v-datepicker-month-view>
    `);

    let dates = getDates(fixture.nativeElement);
    expect(dates[0]).not.toHaveCssClass('hidden');
    expect(dates[1]).not.toHaveCssClass('hidden');
    expectDates(fixture.nativeElement, ['22', '23']);

    fixture.componentInstance.outsideDays = 'collapsed';
    fixture.detectChanges();
    expect(dates[0]).not.toHaveCssClass('hidden');
    expect(dates[1]).toHaveCssClass('hidden');
    expectDates(fixture.nativeElement, ['22', '']);

    fixture.componentInstance.outsideDays = 'hidden';
    fixture.detectChanges();
    expect(dates[0]).not.toHaveCssClass('hidden');
    expect(dates[1]).toHaveCssClass('hidden');
    expectDates(fixture.nativeElement, ['22', '']);
  });

  it('should collapse weeks outside of current month', () => {
    const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="monthCollapsedWeeks" [outsideDays]="outsideDays" [dayTemplate]="tpl">        
        </ng2v-datepicker-month-view>
    `);

    expectDates(fixture.nativeElement, ['4', '1', '2', '3', '4', '1', '2', '3']);

    fixture.componentInstance.outsideDays = 'collapsed';
    fixture.detectChanges();
    expectDates(fixture.nativeElement, ['', '1', '2', '3', '4', '']);

    fixture.componentInstance.outsideDays = 'hidden';
    fixture.detectChanges();
    expectDates(fixture.nativeElement, ['', '1', '2', '3', '4', '', '', '']);
  });

  it('should collapse weeks regardless of "showWeekNumbers" value', () => {
    const fixture = createTestComponent(`
        <ng-template #tpl let-date="date">{{ date.day }}</ng-template>
        <ng2v-datepicker-month-view [month]="monthCollapsedWeeks" outsideDays="collapsed" [dayTemplate]="tpl">        
        </ng2v-datepicker-month-view>
    `);

    expectDates(fixture.nativeElement, ['', '1', '2', '3', '4', '']);

    fixture.componentInstance.showWeekNumbers = true;
    fixture.detectChanges();
    expectDates(fixture.nativeElement, ['', '1', '2', '3', '4', '']);
  });

});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  month: MonthViewModel = {
    firstDate: new Ng2vDate(2016, 7, 22),
    year: 2016,
    number: 7,
    weekdays: [1],
    weeks: [{
      number: 2,
      days: [{date: new Ng2vDate(2016, 7, 22), disabled: false}, {date: new Ng2vDate(2016, 8, 23), disabled: false}]
    }]
  };

  monthCollapsedWeeks: MonthViewModel = {
    firstDate: new Ng2vDate(2016, 8, 1),
    year: 2016,
    number: 8,
    weekdays: [1, 2],
    weeks: [
      // month: 7, 8
      {
        number: 2,
        days: [{date: new Ng2vDate(2016, 7, 4), disabled: false}, {date: new Ng2vDate(2016, 8, 1), disabled: false}]
      },
      // month: 8, 8
      {
        number: 3,
        days: [{date: new Ng2vDate(2016, 8, 2), disabled: false}, {date: new Ng2vDate(2016, 8, 3), disabled: false}]
      },
      // month: 8, 9
      {
        number: 3,
        days: [{date: new Ng2vDate(2016, 8, 4), disabled: false}, {date: new Ng2vDate(2016, 9, 1), disabled: false}]
      },
      // month: 9, 9 -> to collapse
      {
        number: 4,
        days: [{date: new Ng2vDate(2016, 9, 2), disabled: false}, {date: new Ng2vDate(2016, 9, 3), disabled: false}]
      }
    ]
  };

  showWeekdays = true;
  showWeekNumbers = true;
  outsideDays = 'visible';

  onClick = () => {};
}
