import {Injectable, Injector, ComponentFactoryResolver} from '@angular/core';

import {Ng2vModalStack} from './modal-stack';
import {Ng2vModalRef} from './modal-ref';

/**
 * Represent options available when opening new modal windows.
 */
export interface Ng2vModalOptions {
  /**
   * Whether a backdrop element should be created for a given modal (true by default).
   * Alternatively, specify 'static' for a backdrop which doesn't close the modal on click.
   */
  backdrop?: boolean | 'static';

  /**
   * An element to which to attach newly opened modal windows.
   */
  container?: string;

  /**
   * Whether to close the modal when escape key is pressed (true by default).
   */
  keyboard?: boolean;

  /**
   * Size of a new modal window.
   */
  size?: 'sm' | 'lg';

  /**
   * Custom class to append to the modal window
   */
  windowClass?: string;
}

/**
 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
 * the "open" method!
 */
@Injectable()
export class Ng2vModal {
  constructor(
      private _moduleCFR: ComponentFactoryResolver, private _injector: Injector, private _modalStack: Ng2vModalStack) {}

  /**
   * Opens a new modal window with the specified content and using supplied options. Content can be provided
   * as a TemplateRef or a component type. If you pass a component type as content than instances of those
   * components can be injected with an instance of the Ng2vActiveModal class. You can use methods on the
   * Ng2vActiveModal class to close / dismiss modals from "inside" of a component.
   */
  open(content: any, options: Ng2vModalOptions = {}): Ng2vModalRef {
    return this._modalStack.open(this._moduleCFR, this._injector, content, options);
  }
}
