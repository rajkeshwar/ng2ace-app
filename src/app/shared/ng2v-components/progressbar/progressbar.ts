import { Component, Input, ChangeDetectionStrategy, OnChanges, IterableDiffers } from '@angular/core';
import {getValueInRange} from '../util/util';
import {Ng2vProgressbarConfig} from './progressbar-config';

/**
 * Directive that can be used to provide feedback on the progress of a workflow or an action.
 */
@Component({
  selector: 'ng2v-progressbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="!combined" class="progress active {{class ? class : ''}}" [class.progress-striped]="striped">
      <div class="progress-bar{{type ? ' progress-bar-' + type : ''}}{{animated ? ' progress-bar-animated' : ''}}" role="progressbar" [style.width.%]="getPercentValue()"
      [attr.aria-valuenow]="getValue()" aria-valuemin="0" [attr.aria-valuemax]="max">
        <span *ngIf="showValue">{{getPercentValue()}}%</span><ng-content></ng-content>
      </div>
    </div>
    <div *ngIf="combined" class="progress">
      <div *ngFor="let strip of combined" 
        class="progress-bar progress-bar-{{strip.type}}" 
        [style.width.%]="formatPercentage(strip.value)"></div>
    </div>
  `
})
export class Ng2vProgressbar {
  /**
   * Maximal value to be displayed in the progressbar.
   */
  @Input() max: number;

  /**
   * A flag indicating if the stripes of the progress bar should be animated. Takes effect only for browsers
   * supporting CSS3 animations, and if striped is true.
   */
  @Input() animated: boolean;

  /**
   * A flag indicating if a progress bar should be displayed as striped.
   */
  @Input() striped: boolean;

  /**
   * These classes should be added on progressbar.
   */
  @Input() class: string;

  /**
   * These classes should be added on progressbar.
   */
  @Input() combined: boolean;

  /**
   * A flag indicating if the current percentage value should be shown.
   */
  @Input() showValue: boolean;

  /**
   * Type of progress bar, can be one of "success", "info", "warning" or "danger".
   */
  @Input() type: string;

  /**
   * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
   */
  @Input() value = 0;

  differ:any;

  constructor(config: Ng2vProgressbarConfig) {
    this.max = config.max;
    this.animated = config.animated;
    this.striped = config.striped;
    this.type = config.type;
    this.showValue = config.showValue;
  }

  getValue() { return getValueInRange(this.value, this.max); }

  getPercentValue() { return 100 * this.getValue() / this.max; }

  formatPercentage( value ) {
    return 100 * getValueInRange(value, this.max) / this.max;
  }

}
