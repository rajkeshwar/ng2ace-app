/**
 * @author   : Rajkeshwawr Prasad (rajkeshwar.pd@gmail.com) 
 * @date     : 2017-05-22 16:41:59 
 * @copyright: (c) 2016 Kanerika Software Pvt. Ltd. 
 * @website  : http://kanerika.com/ 
 */

import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Ng2vLoaderConfig } from './loader-config';

@Component({
  selector: 'ng2v-progress',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div *ngIf="isLoading" class="progress-linear">
        <div class="indeterminate"></div>
    </div>
    <div class="mask" *ngIf="isMask" >
      <span class="mask__gif ng2v-gif-loading"></span>
      <span class="mask__loading" *ngIf="maskLabel">{{maskLabel}}</span>
    </div>
  ` 
})
export class Ng2vLoader {

  @Input() isLoading: boolean;
  @Input() isMask: boolean;
  @Input() maskLabel: string;

  constructor(private config: Ng2vLoaderConfig) {
    this.isLoading = config.isLoading;
    this.isMask = config.isMask;
    this.maskLabel = config.maskLabel;
  }

}