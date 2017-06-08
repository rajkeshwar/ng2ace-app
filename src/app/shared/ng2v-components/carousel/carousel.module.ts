import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NGB_CAROUSEL_DIRECTIVES} from './carousel';
import {Ng2vCarouselConfig} from './carousel-config';

export {Ng2vCarousel, Ng2vSlide} from './carousel';
export {Ng2vCarouselConfig} from './carousel-config';

@NgModule({declarations: NGB_CAROUSEL_DIRECTIVES, exports: NGB_CAROUSEL_DIRECTIVES, imports: [CommonModule]})
export class Ng2vCarouselModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vCarouselModule, providers: [Ng2vCarouselConfig]}; }
}
