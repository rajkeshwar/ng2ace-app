
import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Ng2vSideMenuComponent} from './sidemenu.component';
import {Ng2vSidemenuConfig} from './sidemenu.config';

export {Ng2vSideMenuComponent} from './sidemenu.component';
export {Ng2vSidemenuConfig} from './sidemenu.config';

const NG2V_SIDEMENU_DIRECTIVES = [Ng2vSideMenuComponent];

@NgModule({declarations: NG2V_SIDEMENU_DIRECTIVES, exports: NG2V_SIDEMENU_DIRECTIVES, imports: [CommonModule]})
export class Ng2vSidemenuModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vSidemenuModule, providers: [Ng2vSidemenuConfig]}; }
}
