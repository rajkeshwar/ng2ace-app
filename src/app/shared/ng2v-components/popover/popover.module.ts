import {NgModule, ModuleWithProviders} from '@angular/core';

import {Ng2vPopover, Ng2vPopoverWindow} from './popover';
import {Ng2vPopoverConfig} from './popover-config';

export {Ng2vPopover} from './popover';
export {Ng2vPopoverConfig} from './popover-config';

@NgModule({declarations: [Ng2vPopover, Ng2vPopoverWindow], exports: [Ng2vPopover], entryComponents: [Ng2vPopoverWindow]})
export class Ng2vPopoverModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vPopoverModule, providers: [Ng2vPopoverConfig]}; }
}
