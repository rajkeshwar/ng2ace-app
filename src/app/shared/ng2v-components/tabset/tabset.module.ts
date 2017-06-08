import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Ng2vTabset, Ng2vTab, Ng2vTabContent, Ng2vTabTitle, Ng2vTabChangeEvent} from './tabset';
import {Ng2vTabsetConfig} from './tabset-config';

export {Ng2vTabset, Ng2vTab, Ng2vTabContent, Ng2vTabTitle, Ng2vTabChangeEvent} from './tabset';
export {Ng2vTabsetConfig} from './tabset-config';

const NGB_TABSET_DIRECTIVES = [Ng2vTabset, Ng2vTab, Ng2vTabContent, Ng2vTabTitle];

@NgModule({declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule]})
export class Ng2vTabsetModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vTabsetModule, providers: [Ng2vTabsetConfig]}; }
}
