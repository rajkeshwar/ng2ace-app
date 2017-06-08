import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Ng2vLoader } from './loader-component';
import { Ng2vLoaderConfig } from './loader-config';


@NgModule({
    declarations: [Ng2vLoader], 
    exports: [Ng2vLoader], 
    imports: [CommonModule], entryComponents: [Ng2vLoader]})
export class Ng2vLoaderModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vLoaderModule, providers: [Ng2vLoaderConfig]}; }
}
