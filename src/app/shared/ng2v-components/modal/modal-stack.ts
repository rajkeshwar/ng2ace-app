import {
  ApplicationRef,
  Injectable,
  Injector,
  ReflectiveInjector,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  TemplateRef
} from '@angular/core';

import {ContentRef} from '../util/popup';
import {isDefined, isString} from '../util/util';

import {Ng2vModalBackdrop} from './modal-backdrop';
import {Ng2vModalWindow} from './modal-window';
import {Ng2vActiveModal, Ng2vModalRef} from './modal-ref';

@Injectable()
export class Ng2vModalStack {
  private _backdropFactory: ComponentFactory<Ng2vModalBackdrop>;
  private _windowFactory: ComponentFactory<Ng2vModalWindow>;

  constructor(
      private _applicationRef: ApplicationRef, private _injector: Injector,
      private _componentFactoryResolver: ComponentFactoryResolver) {
    this._backdropFactory = _componentFactoryResolver.resolveComponentFactory(Ng2vModalBackdrop);
    this._windowFactory = _componentFactoryResolver.resolveComponentFactory(Ng2vModalWindow);
  }

  open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options): Ng2vModalRef {
    const containerSelector = options.container || 'body';
    const containerEl = document.querySelector(containerSelector);

    if (!containerEl) {
      throw new Error(`The specified modal container "${containerSelector}" was not found in the DOM.`);
    }

    const activeModal = new Ng2vActiveModal();
    const contentRef = this._getContentRef(moduleCFR, contentInjector, content, activeModal);

    let windowCmptRef: ComponentRef<Ng2vModalWindow>;
    let backdropCmptRef: ComponentRef<Ng2vModalBackdrop>;
    let ng2vModalRef: Ng2vModalRef;


    if (options.backdrop !== false) {
      backdropCmptRef = this._backdropFactory.create(this._injector);
      this._applicationRef.attachView(backdropCmptRef.hostView);
      containerEl.appendChild(backdropCmptRef.location.nativeElement);
    }
    windowCmptRef = this._windowFactory.create(this._injector, contentRef.nodes);
    this._applicationRef.attachView(windowCmptRef.hostView);
    containerEl.appendChild(windowCmptRef.location.nativeElement);

    ng2vModalRef = new Ng2vModalRef(windowCmptRef, contentRef, backdropCmptRef);

    activeModal.close = (result: any) => { ng2vModalRef.close(result); };
    activeModal.dismiss = (reason: any) => { ng2vModalRef.dismiss(reason); };

    this._applyWindowOptions(windowCmptRef.instance, options);

    return ng2vModalRef;
  }

  private _applyWindowOptions(windowInstance: Ng2vModalWindow, options: Object): void {
    ['backdrop', 'keyboard', 'size', 'windowClass'].forEach((optionName: string) => {
      if (isDefined(options[optionName])) {
        windowInstance[optionName] = options[optionName];
      }
    });
  }

  private _getContentRef(
      moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any,
      context: Ng2vActiveModal): ContentRef {
    if (!content) {
      return new ContentRef([]);
    } else if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(context);
      this._applicationRef.attachView(viewRef);
      return new ContentRef([viewRef.rootNodes], viewRef);
    } else if (isString(content)) {
      return new ContentRef([[document.createTextNode(`${content}`)]]);
    } else {
      const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
      const modalContentInjector =
          ReflectiveInjector.resolveAndCreate([{provide: Ng2vActiveModal, useValue: context}], contentInjector);
      const componentRef = contentCmptFactory.create(modalContentInjector);
      this._applicationRef.attachView(componentRef.hostView);
      return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    }
  }
}
