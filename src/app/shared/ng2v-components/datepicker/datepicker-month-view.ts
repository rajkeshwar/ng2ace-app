import {Component, Input, TemplateRef, Output, EventEmitter} from '@angular/core';
import {DayViewModel, WeekViewModel} from './datepicker-view-model';
import {Ng2vDate} from './ng2v-date';
import {Ng2vDatepickerI18n} from './datepicker-i18n';
import {DayTemplateContext} from './datepicker-day-template-context';

@Component({
  selector: 'ng2v-datepicker-month-view',
  host: {'class': 'd-block'},
  styles: [`
    .ng2v-dp-weekday, .ng2v-dp-week-number {
      line-height: 2rem;
    }
    .ng2v-dp-day, .ng2v-dp-weekday, .ng2v-dp-week-number {
      width: 2rem;
      height: 2rem;      
    }
    .ng2v-dp-day {
      cursor: pointer;
    }
    .ng2v-dp-day.disabled, .ng2v-dp-day.hidden {
      cursor: default;
    }
  `],
  template: `
    <div *ngIf="showWeekdays" class="ng2v-dp-week d-flex">
      <div *ngIf="showWeekNumbers" class="ng2v-dp-weekday"></div>
      <div *ngFor="let w of month.weekdays" class="ng2v-dp-weekday small text-center text-info font-italic">
        {{ i18n.getWeekdayShortName(w) }}
      </div>
    </div>
    <ng-template ngFor let-week [ngForOf]="month.weeks">
      <div *ngIf="!isCollapsed(week)" class="ng2v-dp-week d-flex">
        <div *ngIf="showWeekNumbers" class="ng2v-dp-week-number small text-center font-italic text-muted">{{ week.number }}</div>
        <div *ngFor="let day of week.days" (click)="doSelect(day)" class="ng2v-dp-day" [class.disabled]="isDisabled(day)"
         [class.hidden]="isHidden(day)">
          <ng-template [ngIf]="!isHidden(day)">
            <ng-template [ngTemplateOutlet]="dayTemplate"
            [ngOutletContext]="{date: {year: day.date.year, month: day.date.month, day: day.date.day},
              currentMonth: month.number,
              disabled: isDisabled(day),
              selected: isSelected(day.date)}">
            </ng-template>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `
})
export class Ng2vDatepickerMonthView {
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;
  @Input() disabled: boolean;
  @Input() month: any;
  @Input() outsideDays: 'visible' | 'hidden' | 'collapsed';
  @Input() selectedDate: Ng2vDate;
  @Input() showWeekdays;
  @Input() showWeekNumbers;

  @Output() select = new EventEmitter<Ng2vDate>();

  constructor(public i18n: Ng2vDatepickerI18n) {}

  doSelect(day: DayViewModel) {
    if (!this.isDisabled(day) && !this.isHidden(day)) {
      this.select.emit(Ng2vDate.from(day.date));
    }
  }

  isDisabled(day: DayViewModel) { return this.disabled || day.disabled; }

  isSelected(date: Ng2vDate) { return this.selectedDate && this.selectedDate.equals(date); }

  isCollapsed(week: WeekViewModel) {
    return this.outsideDays === 'collapsed' && week.days[0].date.month !== this.month.number &&
        week.days[week.days.length - 1].date.month !== this.month.number;
  }

  isHidden(day: DayViewModel) {
    return (this.outsideDays === 'hidden' || this.outsideDays === 'collapsed') && this.month.number !== day.date.month;
  }
}
