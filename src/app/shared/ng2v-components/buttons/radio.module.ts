import {NgModule, ModuleWithProviders} from '@angular/core';
import {Ng2vRadio, Ng2vActiveLabel, Ng2vRadioGroup} from './radio';

export {Ng2vRadio, Ng2vActiveLabel, Ng2vRadioGroup} from './radio';

const NGB_RADIO_DIRECTIVES = [Ng2vRadio, Ng2vActiveLabel, Ng2vRadioGroup];

@NgModule({declarations: NGB_RADIO_DIRECTIVES, exports: NGB_RADIO_DIRECTIVES})
export class Ng2vButtonsModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vButtonsModule, providers: []}; }
}
