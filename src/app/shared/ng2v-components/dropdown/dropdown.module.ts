import {NgModule, ModuleWithProviders} from '@angular/core';
import {Ng2vDropdown, Ng2vDropdownToggle} from './dropdown';
import {Ng2vDropdownConfig} from './dropdown-config';

export {Ng2vDropdown, Ng2vDropdownToggle} from './dropdown';
export {Ng2vDropdownConfig} from './dropdown-config';

const NGB_DROPDOWN_DIRECTIVES = [Ng2vDropdownToggle, Ng2vDropdown];

@NgModule({declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES})
export class Ng2vDropdownModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vDropdownModule, providers: [Ng2vDropdownConfig]}; }
}
