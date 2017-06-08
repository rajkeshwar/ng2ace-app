import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Ng2vRatingConfig} from './rating-config';

import {Ng2vRating} from './rating';

export {Ng2vRating} from './rating';
export {Ng2vRatingConfig} from './rating-config';

@NgModule({declarations: [Ng2vRating], exports: [Ng2vRating], imports: [CommonModule]})
export class Ng2vRatingModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vRatingModule, providers: [Ng2vRatingConfig]}; }
}
