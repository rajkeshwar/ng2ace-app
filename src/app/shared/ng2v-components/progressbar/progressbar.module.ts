import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Ng2vProgressbar} from './progressbar';
import {Ng2vProgressbarConfig} from './progressbar-config';

export {Ng2vProgressbar} from './progressbar';
export {Ng2vProgressbarConfig} from './progressbar-config';

@NgModule({declarations: [Ng2vProgressbar], exports: [Ng2vProgressbar], imports: [CommonModule]})
export class Ng2vProgressbarModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vProgressbarModule, providers: [Ng2vProgressbarConfig]}; }
}
