import { Injectable } from '@angular/core';
import { isString, isNumber, isFunction } from './toasty.utils';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

/**
 * Options to configure specific Toast
 */
@Injectable()
export class Ng2vToastOptions {
  title: string;
  msg?: string;
  showClose?: boolean;
  theme?: string;
  timeout?: number;
  onAdd?: Function;
  onRemove?: Function;
}

/**
 * Structrure of Toast
 */
@Injectable()
export class Ng2vToastData {
  id: number;
  title: string;
  msg: string;
  showClose: boolean;
  type: string;
  theme: string;
  timeout: number;
  onAdd: Function;
  onRemove: Function;
  onClick: Function;
}

/**
 * Default configuration foa all toats and toasty container
 */
@Injectable()
export class Ng2vToastyConfig {

  // Maximum number of toasties to show at once
  limit: number = 5;

  // Whether to show the 'X' icon to close the toast
  showClose: boolean = true;

  // The window position where the toast pops up
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center' | 'center-center' = 'bottom-right';

  // How long (in miliseconds) the toasty shows before it's removed. Set to null/0 to turn off.
  timeout: number = 5000;

  // What theme to use
  theme: 'default' | 'material' | 'bootstrap' = 'default';
}

export enum Ng2vToastyEventType {
  ADD,
  CLEAR,
  CLEAR_ALL
}

export class Ng2vToastyEvent {
    constructor(public type:Ng2vToastyEventType, public value?:any) {}
}

export function toastyServiceFactory(config: Ng2vToastyConfig): Ng2vToastyService  {
    return new Ng2vToastyService(config);
}

/**
 * Toasty service helps create different kinds of Toasts
 */
@Injectable()
export class Ng2vToastyService {
  // Allowed THEMES
  static THEMES: Array<string> = ['default', 'material', 'bootstrap'];
  // Init the counter
  uniqueCounter: number = 0;
  // ToastData event emitter
  // private toastsEmitter: EventEmitter<ToastData> = new EventEmitter<ToastData>();
  // Clear event emitter
  // private clearEmitter: EventEmitter<number> = new EventEmitter<number>();

  private eventSource: Subject<Ng2vToastyEvent> = new Subject<Ng2vToastyEvent>();
  public events: Observable<Ng2vToastyEvent> = this.eventSource.asObservable();

  constructor(private config: Ng2vToastyConfig) {}

  /**
   * Get list of toats
   */
  // getToasts(): Observable<Ng2vToastData> {
  //   return this.toastsEmitter.asObservable();
  // }

  // getClear(): Observable<number> {
  //   return this.clearEmitter.asObservable();
  // }

  /**
   * Create Toast of a default type
   */
  default(options: Ng2vToastOptions|string|number): void {
    this.add(options, 'default');
  }

  /**
   * Create Toast of info type
   * @param  {object} options Individual toasty config overrides
   */
  info(options: Ng2vToastOptions|string|number): void {
    this.add(options, 'info');
  }

  /**
   * Create Toast of success type
   * @param  {object} options Individual toasty config overrides
   */
  success(options: Ng2vToastOptions|string|number): void {
    this.add(options, 'success');
  }

  /**
   * Create Toast of wait type
   * @param  {object} options Individual toasty config overrides
   */
  wait(options: Ng2vToastOptions|string|number): void {
    this.add(options, 'wait');
  }

  /**
   * Create Toast of error type
   * @param  {object} options Individual toasty config overrides
   */
  error(options: Ng2vToastOptions|string|number): void {
    this.add(options, 'error');
  }

  /**
   * Create Toast of warning type
   * @param  {object} options Individual toasty config overrides
   */
  warning(options: Ng2vToastOptions|string|number): void {
    this.add(options, 'warning');
  }


  // Add a new toast item
  private add(options: Ng2vToastOptions|string|number, type: string) {
    let toastyOptions: Ng2vToastOptions;

    if (isString(options) && options !== '' || isNumber(options)) {
      toastyOptions = <Ng2vToastOptions>{
        title: options.toString()
      };
    } else {
      toastyOptions = <Ng2vToastOptions>options;
    }

    if (!toastyOptions || !toastyOptions.title && !toastyOptions.msg) {
      throw new Error('ng2v-toasty: No toast title or message specified!');
    }

    type = type || 'default';

    // Set a unique counter for an id
    this.uniqueCounter++;

    // Set the local vs global config items
    let showClose = this._checkConfigItem(this.config, toastyOptions, 'showClose');

    // If we have a theme set, make sure it's a valid one
    let theme: string;
    if (toastyOptions.theme) {
      theme = Ng2vToastyService.THEMES.indexOf(toastyOptions.theme) > -1 ? toastyOptions.theme : this.config.theme;
    } else {
      theme = this.config.theme;
    }

    let toast: Ng2vToastData = <Ng2vToastData>{
      id       : this.uniqueCounter,
      title    : toastyOptions.title,
      msg      : toastyOptions.msg,
      showClose: showClose,
      type     : 'toasty-type-' + type,
      theme    : 'toasty-theme-' + theme,
      onAdd    : toastyOptions.onAdd && isFunction(toastyOptions.onAdd) ? toastyOptions.onAdd : null,
      onRemove : toastyOptions.onRemove && isFunction(toastyOptions.onRemove) ? toastyOptions.onRemove : null
    };

    // If there's a timeout individually or globally, set the toast to timeout
    // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
    toast.timeout = toastyOptions.hasOwnProperty('timeout') ? toastyOptions.timeout : this.config.timeout;

    // Push up a new toast item
    // this.toastsSubscriber.next(toast);
    // this.toastsEmitter.next(toast);
    this.emitEvent(new Ng2vToastyEvent(Ng2vToastyEventType.ADD, toast));
    // If we have a onAdd function, call it here
    if (toastyOptions.onAdd && isFunction(toastyOptions.onAdd)) {
      toastyOptions.onAdd.call(this, toast);
    }
  }

  // Clear all toasts
  clearAll() {
    // this.clearEmitter.next(null);
    this.emitEvent(new Ng2vToastyEvent(Ng2vToastyEventType.CLEAR_ALL));
  }

  // Clear the specific one
  clear(id: number) {
    // this.clearEmitter.next(id);
    this.emitEvent(new Ng2vToastyEvent(Ng2vToastyEventType.CLEAR, id));
  }

  // Checks whether the local option is set, if not,
  // checks the global config
  private _checkConfigItem(config: any, options: any, property: string) {
    if (options[property] === false) {
      return false;
    } else if (!options[property]) {
      return config[property];
    } else {
      return true;
    }
  }

  private emitEvent(event: Ng2vToastyEvent) {
        if (this.eventSource) {
            // Push up a new event
            this.eventSource.next(event);
        }
    }
}