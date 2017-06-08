import {Component, Input} from '@angular/core';
import {Ng2vDateStruct} from './ng2v-date-struct';

@Component({
  selector: '[ng2vDatepickerDayView]',
  styles: [`
    :host {
      text-align: center;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;      
      border-radius: 0.25rem;
    }
    :host.outside {
      opacity: 0.5;
    }
  `],
  host: {
    '[class.bg-primary]': 'selected',
    '[class.text-white]': 'selected',
    '[class.text-muted]': 'isMuted()',
    '[class.outside]': 'isMuted()',
    '[class.btn-secondary]': '!disabled'
  },
  template: `{{ date.day }}`
})
export class Ng2vDatepickerDayView {
  @Input() currentMonth: number;
  @Input() date: Ng2vDateStruct;
  @Input() disabled: boolean;
  @Input() selected: boolean;

  isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
