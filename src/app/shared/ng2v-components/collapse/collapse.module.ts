import {NgModule, ModuleWithProviders} from '@angular/core';
import {Ng2vCollapse} from './collapse';

export {Ng2vCollapse} from './collapse';

@NgModule({declarations: [Ng2vCollapse], exports: [Ng2vCollapse]})
export class Ng2vCollapseModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vCollapseModule, providers: []}; }
}
