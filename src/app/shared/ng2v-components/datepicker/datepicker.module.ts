import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Ng2vDatepicker, Ng2vDatepickerNavigateEvent} from './datepicker';
import {Ng2vDatepickerMonthView} from './datepicker-month-view';
import {Ng2vDatepickerNavigation} from './datepicker-navigation';
import {Ng2vInputDatepicker} from './datepicker-input';
import {FormsModule} from '@angular/forms';
import {Ng2vDatepickerDayView} from './datepicker-day-view';
import {Ng2vDatepickerI18n, Ng2vDatepickerI18nDefault} from './datepicker-i18n';
import {Ng2vCalendar, Ng2vCalendarGregorian} from './ng2v-calendar';
import {Ng2vCalendarIslamicCivil} from './hijri/ng2v-calendar-islamic-civil';
import {Ng2vDateParserFormatter, Ng2vDateISOParserFormatter} from './ng2v-date-parser-formatter';
import {Ng2vDatepickerNavigationSelect} from './datepicker-navigation-select';
import {Ng2vDatepickerConfig} from './datepicker-config';

export {Ng2vDatepicker, Ng2vDatepickerNavigateEvent} from './datepicker';
export {Ng2vInputDatepicker} from './datepicker-input';
export {Ng2vCalendar} from './ng2v-calendar';
export {Ng2vCalendarIslamicCivil} from './hijri/ng2v-calendar-islamic-civil';
export {Ng2vDatepickerMonthView} from './datepicker-month-view';
export {Ng2vDatepickerDayView} from './datepicker-day-view';
export {Ng2vDatepickerNavigation} from './datepicker-navigation';
export {Ng2vDatepickerNavigationSelect} from './datepicker-navigation-select';
export {Ng2vDatepickerConfig} from './datepicker-config';
export {Ng2vDatepickerI18n} from './datepicker-i18n';
export {Ng2vDateStruct} from './ng2v-date-struct';
export {Ng2vDateParserFormatter} from './ng2v-date-parser-formatter';

@NgModule({
  declarations: [
    Ng2vDatepicker, Ng2vDatepickerMonthView, Ng2vDatepickerNavigation, Ng2vDatepickerNavigationSelect, Ng2vDatepickerDayView,
    Ng2vInputDatepicker
  ],
  exports: [Ng2vDatepicker, Ng2vInputDatepicker],
  imports: [CommonModule, FormsModule],
  entryComponents: [Ng2vDatepicker]
})
export class Ng2vDatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2vDatepickerModule,
      providers: [
        {provide: Ng2vCalendar, useClass: Ng2vCalendarGregorian},
        {provide: Ng2vDatepickerI18n, useClass: Ng2vDatepickerI18nDefault},
        {provide: Ng2vDateParserFormatter, useClass: Ng2vDateISOParserFormatter}, Ng2vDatepickerConfig
      ]
    };
  }
}
