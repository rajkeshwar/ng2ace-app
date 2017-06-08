import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Ng2vTimepicker} from './timepicker';
import {Ng2vTimepickerConfig} from './timepicker-config';

export {Ng2vTimepicker} from './timepicker';
export {Ng2vTimepickerConfig} from './timepicker-config';
export {Ng2vTimeStruct} from './ng2v-time-struct';

@NgModule({declarations: [Ng2vTimepicker], exports: [Ng2vTimepicker], imports: [CommonModule]})
export class Ng2vTimepickerModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vTimepickerModule, providers: [Ng2vTimepickerConfig]}; }
}
