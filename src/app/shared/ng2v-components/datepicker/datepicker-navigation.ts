import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NavigationEvent} from './datepicker-view-model';
import {Ng2vDate} from './ng2v-date';
import {Ng2vDatepickerI18n} from './datepicker-i18n';
import {Ng2vCalendar} from './ng2v-calendar';

@Component({
  selector: 'ng2v-datepicker-navigation',
  host: {'class': 'd-flex justify-content-between', '[class.collapsed]': '!showSelect'},
  styles: [`
    :host {
      height: 2rem;
      line-height: 1.85rem;
    }
    :host.collapsed {
      margin-bottom: -2rem;        
    }
    .ng2v-dp-navigation-chevron::before {
      border-style: solid;
      border-width: 0.2em 0.2em 0 0;
      content: '';
      display: inline-block;
      height: 0.75em;
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
      -ms-transform: rotate(-135deg);
      width: 0.75em;
      margin: 0 0 0 0.5rem;
    }    
    .ng2v-dp-navigation-chevron.right:before {
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      margin: 0 0.5rem 0 0;
    }
    .btn-link {
      cursor: pointer;
      outline: 0;
    }
    .btn-link[disabled] {
      cursor: not-allowed;
      opacity: .65;
    }    
  `],
  template: `
    <button type="button" class="btn-link" (click)="!!doNavigate(navigation.PREV)" [disabled]="prevDisabled()">
      <span class="ng2v-dp-navigation-chevron"></span>    
    </button>
    
    <ng2v-datepicker-navigation-select *ngIf="showSelect" class="d-block" [style.width.rem]="months * 9"
      [date]="date"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabled] = "disabled"
      (select)="selectDate($event)">
    </ng2v-datepicker-navigation-select>
    
    <button type="button" class="btn-link" (click)="!!doNavigate(navigation.NEXT)" [disabled]="nextDisabled()">
      <span class="ng2v-dp-navigation-chevron right"></span>
    </button>
  `
})
export class Ng2vDatepickerNavigation {
  navigation = NavigationEvent;

  @Input() date: Ng2vDate;
  @Input() disabled: boolean;
  @Input() maxDate: Ng2vDate;
  @Input() minDate: Ng2vDate;
  @Input() months: number;
  @Input() showSelect: boolean;
  @Input() showWeekNumbers: boolean;

  @Output() navigate = new EventEmitter<NavigationEvent>();
  @Output() select = new EventEmitter<Ng2vDate>();

  constructor(public i18n: Ng2vDatepickerI18n, private _calendar: Ng2vCalendar) {}

  doNavigate(event: NavigationEvent) { this.navigate.emit(event); }

  nextDisabled() {
    return this.disabled || (this.maxDate && this._calendar.getNext(this.date, 'm').after(this.maxDate));
  }

  prevDisabled() {
    const prevDate = this._calendar.getPrev(this.date, 'm');
    return this.disabled || (this.minDate && prevDate.year <= this.minDate.year && prevDate.month < this.minDate.month);
  }

  selectDate(date: Ng2vDate) { this.select.emit(date); }
}
