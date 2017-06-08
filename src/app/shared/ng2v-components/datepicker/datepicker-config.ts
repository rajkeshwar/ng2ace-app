import {Injectable, TemplateRef} from '@angular/core';
import {DayTemplateContext} from './datepicker-day-template-context';
import {Ng2vDateStruct} from './ng2v-date-struct';

/**
 * Configuration service for the Ng2vDatepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
@Injectable()
export class Ng2vDatepickerConfig {
  dayTemplate: TemplateRef<DayTemplateContext>;
  displayMonths = 1;
  firstDayOfWeek = 1;
  markDisabled: (date: Ng2vDateStruct, current: {year: number, month: number}) => boolean;
  minDate: Ng2vDateStruct;
  maxDate: Ng2vDateStruct;
  navigation: 'select' | 'arrows' | 'none' = 'select';
  outsideDays: 'visible' | 'collapsed' | 'hidden' = 'visible';
  showWeekdays = true;
  showWeekNumbers = false;
  startDate: {year: number, month: number};
}
