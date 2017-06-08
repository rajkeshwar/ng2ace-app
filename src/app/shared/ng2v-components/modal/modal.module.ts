import {NgModule, ModuleWithProviders} from '@angular/core';

import {Ng2vModalBackdrop} from './modal-backdrop';
import {Ng2vModalWindow} from './modal-window';
import {Ng2vModalStack} from './modal-stack';
import {Ng2vModal} from './modal';

export {Ng2vModal, Ng2vModalOptions} from './modal';
export {Ng2vModalRef, Ng2vActiveModal} from './modal-ref';
export {ModalDismissReasons} from './modal-dismiss-reasons';

@NgModule({
  declarations: [Ng2vModalBackdrop, Ng2vModalWindow],
  entryComponents: [Ng2vModalBackdrop, Ng2vModalWindow],
  providers: [Ng2vModal]
})
export class Ng2vModalModule {
  static forRoot(): ModuleWithProviders { return {ngModule: Ng2vModalModule, providers: [Ng2vModal, Ng2vModalStack]}; }
}
