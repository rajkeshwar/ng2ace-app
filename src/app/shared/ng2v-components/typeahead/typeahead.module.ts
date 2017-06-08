import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Ng2vHighlight} from './highlight';
import {Ng2vTypeaheadWindow} from './typeahead-window';
import {Ng2vTypeahead, Ng2vTypeaheadSelectItemEvent} from './typeahead';
import {Ng2vTypeaheadConfig} from './typeahead-config';

export {Ng2vHighlight} from './highlight';
export {Ng2vTypeaheadWindow} from './typeahead-window';
export {Ng2vTypeaheadConfig} from './typeahead-config';
export {Ng2vTypeahead, Ng2vTypeaheadSelectItemEvent} from './typeahead';

@NgModule({
  declarations: [Ng2vTypeahead, Ng2vHighlight, Ng2vTypeaheadWindow],
  exports: [Ng2vTypeahead],
  imports: [CommonModule],
  entryComponents: [Ng2vTypeaheadWindow]
})
export class Ng2vTypeaheadModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vTypeaheadModule, providers: [Ng2vTypeaheadConfig]}; }
}
