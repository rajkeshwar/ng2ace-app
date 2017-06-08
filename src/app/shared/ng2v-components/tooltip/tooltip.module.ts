import {NgModule, ModuleWithProviders} from '@angular/core';

import {Ng2vTooltip, Ng2vTooltipWindow} from './tooltip';
import {Ng2vTooltipConfig} from './tooltip-config';

export {Ng2vTooltipConfig} from './tooltip-config';
export {Ng2vTooltip} from './tooltip';

@NgModule({declarations: [Ng2vTooltip, Ng2vTooltipWindow], exports: [Ng2vTooltip], entryComponents: [Ng2vTooltipWindow]})
export class Ng2vTooltipModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vTooltipModule, providers: [Ng2vTooltipConfig]}; }
}
