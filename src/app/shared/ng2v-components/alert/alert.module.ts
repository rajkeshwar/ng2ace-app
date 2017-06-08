import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Ng2vAlert} from './alert';
import {Ng2vAlertConfig} from './alert-config';

export {Ng2vAlert} from './alert';
export {Ng2vAlertConfig} from './alert-config';

@NgModule({declarations: [Ng2vAlert], exports: [Ng2vAlert], imports: [CommonModule], entryComponents: [Ng2vAlert]})
export class Ng2vAlertModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vAlertModule, providers: [Ng2vAlertConfig]}; }
}
