import {
  Directive,
  Input,
  ComponentRef,
  ElementRef,
  ViewContainerRef,
  Renderer2,
  ComponentFactoryResolver,
  NgZone,
  TemplateRef,
  forwardRef,
  EventEmitter,
  Output,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {AbstractControl, ControlValueAccessor, Validator, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms';

import {Ng2vDate} from './ng2v-date';
import {Ng2vDatepicker, Ng2vDatepickerNavigateEvent} from './datepicker';
import {DayTemplateContext} from './datepicker-day-template-context';
import {Ng2vDateParserFormatter} from './ng2v-date-parser-formatter';

import {positionElements} from '../util/positioning';
import {Ng2vDateStruct} from './ng2v-date-struct';
import {Ng2vCalendar} from './ng2v-calendar';
import {Ng2vDatepickerService} from './datepicker-service';

const NGB_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Ng2vInputDatepicker),
  multi: true
};

const NGB_DATEPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => Ng2vInputDatepicker),
  multi: true
};

/**
 * A directive that makes it possible to have datepickers on input fields.
 * Manages integration with the input field itself (data entry) and ngModel (validation etc.).
 */
@Directive({
  selector: 'input[ng2vDatepicker]',
  exportAs: 'ng2vDatepicker',
  host: {'(change)': 'manualDateChange($event.target.value)', '(keyup.esc)': 'close()', '(blur)': 'onBlur()'},
  providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NGB_DATEPICKER_VALIDATOR, Ng2vDatepickerService]
})
export class Ng2vInputDatepicker implements OnChanges,
    OnDestroy, ControlValueAccessor, Validator {
  private _cRef: ComponentRef<Ng2vDatepicker> = null;
  private _model: Ng2vDate;
  private _zoneSubscription: any;

  /**
   * Reference for the custom template for the day display
   */
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;

  /**
   * Number of months to display
   */
  @Input() displayMonths: number;

  /**
  * First day of the week. With default calendar we use ISO 8601: 1=Mon ... 7=Sun
   */
  @Input() firstDayOfWeek: number;

  /**
   * Callback to mark a given date as disabled.
   * 'Current' contains the month that will be displayed in the view
   */
  @Input() markDisabled: (date: Ng2vDateStruct, current: {year: number, month: number}) => boolean;

  /**
   * Min date for the navigation. If not provided will be 10 years before today or `startDate`
   */
  @Input() minDate: Ng2vDateStruct;

  /**
   * Max date for the navigation. If not provided will be 10 years from today or `startDate`
   */
  @Input() maxDate: Ng2vDateStruct;

  /**
   * Navigation type: `select` (default with select boxes for month and year), `arrows`
   * (without select boxes, only navigation arrows) or `none` (no navigation at all)
   */
  @Input() navigation: 'select' | 'arrows' | 'none';

  /**
   * The way to display days that don't belong to current month: `visible` (default),
   * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
   */
  @Input() outsideDays: 'visible' | 'collapsed' | 'hidden';

  /**
   * Whether to display days of the week
   */
  @Input() showWeekdays: boolean;

  /**
   * Whether to display week numbers
   */
  @Input() showWeekNumbers: boolean;

  /**
   * Date to open calendar with.
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided, calendar will open with current month.
   * Use 'navigateTo(date)' as an alternative
   */
  @Input() startDate: {year: number, month: number};

  /**
   * An event fired when navigation happens and currently displayed month changes.
   * See Ng2vDatepickerNavigateEvent for the payload info.
   */
  @Output() navigate = new EventEmitter<Ng2vDatepickerNavigateEvent>();

  private _onChange = (_: any) => {};
  private _onTouched = () => {};
  private _validatorChange = () => {};


  constructor(
      private _parserFormatter: Ng2vDateParserFormatter, private _elRef: ElementRef, private _vcRef: ViewContainerRef,
      private _renderer: Renderer2, private _cfr: ComponentFactoryResolver, ngZone: NgZone,
      private _service: Ng2vDatepickerService, private _calendar: Ng2vCalendar) {
    this._zoneSubscription = ngZone.onStable.subscribe(() => {
      if (this._cRef) {
        positionElements(this._elRef.nativeElement, this._cRef.location.nativeElement, 'bottom-left');
      }
    });
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  registerOnValidatorChange(fn: () => void): void { this._validatorChange = fn; };

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elRef.nativeElement, 'disabled', isDisabled);
    if (this.isOpen()) {
      this._cRef.instance.setDisabledState(isDisabled);
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    const value = c.value;

    if (value === null || value === undefined) {
      return null;
    }

    if (!this._calendar.isValid(value)) {
      return {'ng2vDate': {invalid: c.value}};
    }

    if (this.minDate && Ng2vDate.from(value).before(Ng2vDate.from(this.minDate))) {
      return {'ng2vDate': {requiredBefore: this.minDate}};
    }

    if (this.maxDate && Ng2vDate.from(value).after(Ng2vDate.from(this.maxDate))) {
      return {'ng2vDate': {requiredAfter: this.maxDate}};
    }
  }

  writeValue(value) {
    const ng2vDate = value ? new Ng2vDate(value.year, value.month, value.day) : null;
    this._model = this._calendar.isValid(value) ? ng2vDate : null;
    this._writeModelValue(this._model);
  }

  manualDateChange(value: string) {
    this._model = this._service.toValidDate(this._parserFormatter.parse(value), null);
    this._onChange(this._model ? {year: this._model.year, month: this._model.month, day: this._model.day} : value);
    this._writeModelValue(this._model);
  }

  isOpen() { return !!this._cRef; }

  /**
   * Opens the datepicker with the selected date indicated by the ngModel value.
   */
  open() {
    if (!this.isOpen()) {
      const cf = this._cfr.resolveComponentFactory(Ng2vDatepicker);
      this._cRef = this._vcRef.createComponent(cf);

      this._applyPopupStyling(this._cRef.location.nativeElement);
      this._cRef.instance.writeValue(this._model);
      this._applyDatepickerInputs(this._cRef.instance);
      this._subscribeForDatepickerOutputs(this._cRef.instance);
      this._cRef.instance.ngOnInit();

      // date selection event handling
      this._cRef.instance.registerOnChange((selectedDate) => {
        this.writeValue(selectedDate);
        this._onChange(selectedDate);
        this.close();
      });
    }
  }

  /**
   * Closes the datepicker popup.
   */
  close() {
    if (this.isOpen()) {
      this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
      this._cRef = null;
    }
  }

  /**
   * Toggles the datepicker popup (opens when closed and closes when opened).
   */
  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Navigates current view to provided date.
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided calendar will open current month.
   * Use 'startDate' input as an alternative
   */
  navigateTo(date?: {year: number, month: number}) {
    if (this.isOpen()) {
      this._cRef.instance.navigateTo(date);
    }
  }

  onBlur() { this._onTouched(); }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minDate'] || changes['maxDate']) {
      this._validatorChange();
    }
  }

  ngOnDestroy() {
    this.close();
    this._zoneSubscription.unsubscribe();
  }

  private _applyDatepickerInputs(datepickerInstance: Ng2vDatepicker): void {
    ['dayTemplate', 'displayMonths', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'navigation',
     'outsideDays', 'showNavigation', 'showWeekdays', 'showWeekNumbers']
        .forEach((optionName: string) => {
          if (this[optionName] !== undefined) {
            datepickerInstance[optionName] = this[optionName];
          }
        });
    datepickerInstance.startDate = this.startDate || this._model;
  }

  private _applyPopupStyling(nativeElement: any) {
    this._renderer.addClass(nativeElement, 'dropdown-menu');
    this._renderer.setStyle(nativeElement, 'padding', '0');
  }

  private _subscribeForDatepickerOutputs(datepickerInstance: Ng2vDatepicker) {
    datepickerInstance.navigate.subscribe(date => this.navigate.emit(date));
  }

  private _writeModelValue(model: Ng2vDate) {
    this._renderer.setProperty(this._elRef.nativeElement, 'value', this._parserFormatter.format(model));
    if (this.isOpen()) {
      this._cRef.instance.writeValue(model);
      this._onTouched();
    }
  }
}
