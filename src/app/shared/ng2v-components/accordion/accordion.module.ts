import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Ng2vAccordion, Ng2vPanel, Ng2vPanelTitle, Ng2vPanelContent, Ng2vPanelChangeEvent} from './accordion';
import {Ng2vAccordionConfig} from './accordion-config';

export {Ng2vAccordion, Ng2vPanel, Ng2vPanelTitle, Ng2vPanelContent, Ng2vPanelChangeEvent} from './accordion';
export {Ng2vAccordionConfig} from './accordion-config';

const NGB_ACCORDION_DIRECTIVES = [Ng2vAccordion, Ng2vPanel, Ng2vPanelTitle, Ng2vPanelContent];

@NgModule({declarations: NGB_ACCORDION_DIRECTIVES, exports: NGB_ACCORDION_DIRECTIVES, imports: [CommonModule]})
export class Ng2vAccordionModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vAccordionModule, providers: [Ng2vAccordionConfig]}; }
}
