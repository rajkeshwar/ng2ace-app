import { NgModule, ModuleWithProviders, Pipe } from '@angular/core';

import {Ng2vAccordionModule, Ng2vPanelChangeEvent} from './accordion/accordion.module';
import {Ng2vAlertModule} from './alert/alert.module';
import {Ng2vButtonsModule} from './buttons/radio.module';
import {Ng2vCarouselModule} from './carousel/carousel.module';
import {Ng2vCollapseModule} from './collapse/collapse.module';
import {Ng2vDatepickerModule} from './datepicker/datepicker.module';
import {Ng2vDropdownModule} from './dropdown/dropdown.module';
import {Ng2vModalModule, Ng2vModal, Ng2vModalOptions, Ng2vModalRef, ModalDismissReasons} from './modal/modal.module';
import {Ng2vPaginationModule} from './pagination/pagination.module';
import {Ng2vPopoverModule} from './popover/popover.module';
import {Ng2vProgressbarModule} from './progressbar/progressbar.module';
import {Ng2vRatingModule} from './rating/rating.module';
import {Ng2vTabsetModule, Ng2vTabChangeEvent} from './tabset/tabset.module';
import {Ng2vTimepickerModule} from './timepicker/timepicker.module';
import {Ng2vTooltipModule} from './tooltip/tooltip.module';
import {Ng2vTypeaheadModule, Ng2vTypeaheadSelectItemEvent} from './typeahead/typeahead.module';
import {Ng2vSidemenuModule} from './sidemenu/sidemenu.module';
import {Ng2vMultiselectModule} from './multiselect/multiselect.module';
import { Ng2vLoaderModule } from './loader/loader-module';
import { Ng2vSpinnerModule } from './spinner/spinner-module';

import { Ng2vToastyModule, Ng2vToastData, Ng2vToastyService, Ng2vToastyConfig, Ng2vToastOptions } from './toasty/toasty.module';

export {Ng2vSidemenuModule} from './sidemenu/sidemenu.module';
export {Ng2vMultiselectModule} from './multiselect/multiselect.module';
export { Ng2vLoaderModule } from './loader/loader-module';
export { Ng2vSpinnerModule } from './spinner/spinner-module';

export { 
  Ng2vToastyModule, 
  Ng2vToastData, 
  Ng2vToastyService, 
  Ng2vToastyConfig, 
  Ng2vToastOptions 
} from './toasty/toasty.module';

export {
  Ng2vAccordionModule,
  Ng2vPanelChangeEvent,
  Ng2vAccordionConfig,
  Ng2vAccordion,
  Ng2vPanel,
  Ng2vPanelTitle,
  Ng2vPanelContent
} from './accordion/accordion.module';
export {Ng2vAlertModule, Ng2vAlertConfig, Ng2vAlert} from './alert/alert.module';
export {Ng2vButtonsModule, Ng2vRadioGroup} from './buttons/radio.module';
export {Ng2vCarouselModule, Ng2vCarouselConfig, Ng2vCarousel, Ng2vSlide} from './carousel/carousel.module';
export {Ng2vCollapseModule, Ng2vCollapse} from './collapse/collapse.module';
export {
  Ng2vCalendar,
  Ng2vCalendarIslamicCivil,
  Ng2vDatepickerModule,
  Ng2vDatepickerI18n,
  Ng2vDatepickerConfig,
  Ng2vDateStruct,
  Ng2vDateParserFormatter,
  Ng2vDatepicker,
  Ng2vInputDatepicker
} from './datepicker/datepicker.module';
export {Ng2vDropdownModule, Ng2vDropdownConfig, Ng2vDropdown} from './dropdown/dropdown.module';
export {
  Ng2vModalModule,
  Ng2vModal,
  Ng2vModalOptions,
  Ng2vActiveModal,
  Ng2vModalRef,
  ModalDismissReasons
} from './modal/modal.module';
export {Ng2vPaginationModule, Ng2vPaginationConfig, Ng2vPagination} from './pagination/pagination.module';
export {Ng2vPopoverModule, Ng2vPopoverConfig, Ng2vPopover} from './popover/popover.module';
export {Ng2vProgressbarModule, Ng2vProgressbarConfig, Ng2vProgressbar} from './progressbar/progressbar.module';
export {Ng2vRatingModule, Ng2vRatingConfig, Ng2vRating} from './rating/rating.module';
export {
  Ng2vTabsetModule,
  Ng2vTabChangeEvent,
  Ng2vTabsetConfig,
  Ng2vTabset,
  Ng2vTab,
  Ng2vTabContent,
  Ng2vTabTitle
} from './tabset/tabset.module';
export {Ng2vTimepickerModule, Ng2vTimepickerConfig, Ng2vTimeStruct, Ng2vTimepicker} from './timepicker/timepicker.module';
export {Ng2vTooltipModule, Ng2vTooltipConfig, Ng2vTooltip} from './tooltip/tooltip.module';
export {
  Ng2vTypeaheadModule,
  Ng2vTypeaheadConfig,
  Ng2vTypeaheadSelectItemEvent,
  Ng2vTypeahead
} from './typeahead/typeahead.module';

const NGV_MODULES = [
  Ng2vSidemenuModule, Ng2vMultiselectModule, Ng2vLoaderModule, Ng2vSpinnerModule,
  Ng2vAccordionModule, Ng2vAlertModule, Ng2vButtonsModule, Ng2vCarouselModule,
  Ng2vCollapseModule, Ng2vDatepickerModule, Ng2vDropdownModule, Ng2vModalModule,
  Ng2vPaginationModule, Ng2vPopoverModule, Ng2vProgressbarModule, Ng2vRatingModule,
  Ng2vTabsetModule, Ng2vTimepickerModule, Ng2vTooltipModule, Ng2vTypeaheadModule,
  Ng2vToastyModule
];

@NgModule({
  imports: [
    Ng2vSidemenuModule.forRoot(), Ng2vMultiselectModule.forRoot(),
    Ng2vAlertModule.forRoot(), Ng2vButtonsModule.forRoot(),
    Ng2vCollapseModule.forRoot(), Ng2vProgressbarModule.forRoot(),
    Ng2vTooltipModule.forRoot(), Ng2vTypeaheadModule.forRoot(),
    Ng2vAccordionModule.forRoot(), Ng2vCarouselModule.forRoot(),
    Ng2vDatepickerModule.forRoot(), Ng2vDropdownModule.forRoot(),
    Ng2vModalModule.forRoot(), Ng2vPaginationModule.forRoot(),
    Ng2vPopoverModule.forRoot(), Ng2vProgressbarModule.forRoot(),
    Ng2vRatingModule.forRoot(), Ng2vTabsetModule.forRoot(),
    Ng2vTimepickerModule.forRoot(), Ng2vTooltipModule.forRoot(),
    Ng2vLoaderModule.forRoot(), Ng2vSpinnerModule.forRoot(),
    Ng2vToastyModule.forRoot()
  ],
  exports: NGV_MODULES
})
export class Ng2vRootModule {
}

@NgModule({imports: NGV_MODULES, exports: NGV_MODULES})
export class Ng2vModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vRootModule}; }
}
