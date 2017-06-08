import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import { Ng2vMultiselect, MultiSelectSearchFilter } from './multiselect';
import {Ng2vMultiselectConfig} from './multiselect-config';
import { FormsModule } from '@angular/forms';

export {Ng2vMultiselect} from './multiselect';
export {Ng2vMultiselectConfig} from './multiselect-config';

@NgModule({
  declarations: [Ng2vMultiselect, MultiSelectSearchFilter],
  exports: [Ng2vMultiselect, MultiSelectSearchFilter],
  imports: [CommonModule, FormsModule]
})
export class Ng2vMultiselectModule {
    static forRoot(): ModuleWithProviders {
      return {ngModule: Ng2vMultiselectModule, providers: [Ng2vMultiselectConfig]};
    }
}
