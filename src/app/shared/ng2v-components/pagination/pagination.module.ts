import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Ng2vPagination} from './pagination';
import {Ng2vPaginationConfig} from './pagination-config';

export {Ng2vPagination} from './pagination';
export {Ng2vPaginationConfig} from './pagination-config';

@NgModule({declarations: [Ng2vPagination], exports: [Ng2vPagination], imports: [CommonModule]})
export class Ng2vPaginationModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vPaginationModule, providers: [Ng2vPaginationConfig]}; }
}
