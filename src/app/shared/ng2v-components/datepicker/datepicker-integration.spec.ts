import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {Ng2vDatepickerModule} from './datepicker.module';
import {Ng2vCalendar, Ng2vCalendarGregorian} from './ng2v-calendar';
import {Ng2vDate} from './ng2v-date';
import {getMonthSelect, getYearSelect} from '../test/datepicker/common';
import {Ng2vDatepickerI18n, Ng2vDatepickerI18nDefault} from './datepicker-i18n';

describe('ng2v-datepicker integration', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [Ng2vDatepickerModule.forRoot()]});
  });

  it('should allow overriding datepicker calendar', () => {

    class FixedTodayCalendar extends Ng2vCalendarGregorian {
      getToday() { return new Ng2vDate(2000, 7, 1); }
    }

    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<ng2v-datepicker></ng2v-datepicker>`,
        providers: [{provide: Ng2vCalendar, useClass: FixedTodayCalendar}]
      }
    });
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(getMonthSelect(fixture.nativeElement).value).toBe('7');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2000');
  });

  it('should allow overriding datepicker i18n', () => {

    const MONTHS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    class AlphabetMonthsI18n extends Ng2vDatepickerI18nDefault {
      getMonthShortName(month: number) { return MONTHS[month - 1]; }
    }

    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<ng2v-datepicker></ng2v-datepicker>`,
        providers: [{provide: Ng2vDatepickerI18n, useClass: AlphabetMonthsI18n}]
      }
    });
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const monthOptionsText =
        Array.from(getMonthSelect(fixture.nativeElement).querySelectorAll('option')).map(o => o.innerHTML);

    expect(monthOptionsText).toEqual(MONTHS);
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
}
