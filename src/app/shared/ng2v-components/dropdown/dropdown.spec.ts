import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

import {Ng2vDropdownModule} from './dropdown.module';
import {Ng2vDropdown} from './dropdown';
import {Ng2vDropdownConfig} from './dropdown-config';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getDropdownEl(tc) {
  return tc.querySelector(`[ng2vDropdown]`);
}

describe('ng2v-dropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [Ng2vDropdownModule.forRoot()]});
  });

  it('should initialize inputs with provided config', () => {
    const defaultConfig = new Ng2vDropdownConfig();
    const dropdown = new Ng2vDropdown(defaultConfig);
    expect(dropdown.up).toBe(defaultConfig.up);
    expect(dropdown.autoClose).toBe(defaultConfig.autoClose);
  });

  it('should be closed and down by default', () => {
    const html = `<div ng2vDropdown></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(getDropdownEl(compiled)).toHaveCssClass('dropdown');
    expect(getDropdownEl(compiled)).not.toHaveCssClass('show');
  });

  it('should be up if up input is true', () => {
    const html = `<div ng2vDropdown [up]="true"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(getDropdownEl(compiled)).toHaveCssClass('dropup');
  });

  it('should be open initially if open expression is true', () => {
    const html = `<div ng2vDropdown [open]="true"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(getDropdownEl(compiled)).toHaveCssClass('dropdown');
    expect(getDropdownEl(compiled)).toHaveCssClass('show');
  });

  it('should toggle open class', () => {
    const html = `<div ng2vDropdown [open]="isOpen"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    let dropdownEl = getDropdownEl(compiled);

    expect(dropdownEl).not.toHaveCssClass('show');

    fixture.componentInstance.isOpen = true;
    fixture.detectChanges();

    expect(dropdownEl).toHaveCssClass('show');

    fixture.componentInstance.isOpen = false;
    fixture.detectChanges();

    expect(dropdownEl).not.toHaveCssClass('show');
  });

  it('should allow toggling dropdown from outside', () => {
    const html = `
      <button (click)="drop.open(); $event.stopPropagation()">Open</button>
      <button (click)="drop.close(); $event.stopPropagation()">Close</button>
      <button (click)="drop.toggle(); $event.stopPropagation()">Toggle</button>
      <div ng2vDropdown #drop="ng2vDropdown"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEls = compiled.querySelectorAll('button');

    buttonEls[0].click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    buttonEls[1].click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('show');

    buttonEls[2].click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    buttonEls[2].click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('show');
  });

  it('should allow binding to open output', () => {
    const html = `
      <button (click)="drop.toggle(); $event.stopPropagation()">Toggle</button>
      <div ng2vDropdown [(open)]="isOpen" #drop="ng2vDropdown"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let buttonEl = compiled.querySelector('button');

    expect(fixture.componentInstance.isOpen).toBe(false);

    buttonEl.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.isOpen).toBe(true);

    buttonEl.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.isOpen).toBe(false);
  });

  it('should not raise open events if open state does not change', () => {
    const html = `
      <button (click)="drop.open(); $event.stopPropagation()">Open</button>
      <button (click)="drop.close(); $event.stopPropagation()">Close</button>
      <div ng2vDropdown (openChange)="recordStateChange($event)" #drop="ng2vDropdown"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let buttonEls = compiled.querySelectorAll('button');

    expect(fixture.componentInstance.isOpen).toBe(false);
    expect(fixture.componentInstance.stateChanges).toEqual([]);

    buttonEls[1].click();  // close a closed one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(false);
    expect(fixture.componentInstance.stateChanges).toEqual([]);

    buttonEls[0].click();  // open a closed one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(true);
    expect(fixture.componentInstance.stateChanges).toEqual([true]);

    buttonEls[0].click();  // open an opened one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(true);
    expect(fixture.componentInstance.stateChanges).toEqual([true]);

    buttonEls[1].click();  // close an opened one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(false);
    expect(fixture.componentInstance.stateChanges).toEqual([true, false]);
  });
});

describe('ng2v-dropdown-toggle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [Ng2vDropdownModule.forRoot()]});
  });

  it('should toggle dropdown on click', () => {
    const html = `
      <div ng2vDropdown>
          <button ng2vDropdownToggle>Toggle dropdown</button>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    expect(dropdownEl).not.toHaveCssClass('show');
    expect(buttonEl.getAttribute('aria-haspopup')).toBe('true');
    expect(buttonEl.getAttribute('aria-expanded')).toBe('false');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');
    expect(buttonEl.getAttribute('aria-expanded')).toBe('true');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('show');
    expect(buttonEl.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle dropdown on click of child of toggle', () => {
    const html = `
      <div ng2vDropdown>
          <button ng2vDropdownToggle>
            <span class="toggle">Toggle dropdown</span>
          </button>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let toggleEl = compiled.querySelector('.toggle');

    expect(dropdownEl).not.toHaveCssClass('show');

    toggleEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    toggleEl.click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('show');
  });

  it('should close on outside click', () => {
    const html = `<button>Outside</button><div ng2vDropdown [open]="true"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('show');
  });

  it('should not close on outside click if right button click', () => {
    const html = `<button>Outside</button><div ng2vDropdown [open]="true"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    const evt = document.createEvent('MouseEvent');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 2, null);
    buttonEl.dispatchEvent(evt);
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');
  });

  it('should not close on outside click if autoClose is set to false', () => {
    const html = `<button>Outside</button><div ng2vDropdown [open]="true" [autoClose]="false"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');
  });

  it('should close on ESC', () => {
    const html = `
      <div ng2vDropdown>
          <button ng2vDropdownToggle>Toggle dropdown</button>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    fixture.debugElement.query(By.directive(Ng2vDropdown)).triggerEventHandler('keyup.esc', {});
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('show');
  });

  it('should not close on ESC if autoClose is set to false', () => {
    const html = `
      <div ng2vDropdown [autoClose]="false">
          <button ng2vDropdownToggle>Toggle dropdown</button>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    fixture.debugElement.query(By.directive(Ng2vDropdown)).triggerEventHandler('keyup.esc', {});
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');
  });

  it('should close on item click if autoClose is set to false', () => {
    const html = `
      <div ng2vDropdown [open]="true" [autoClose]="false">
          <button ng2vDropdownToggle>Toggle dropdown</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <a class="dropdown-item">Action</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let linkEl = compiled.querySelector('a');

    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    linkEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');
  });

  it('should close on item click', () => {
    const html = `
      <div ng2vDropdown [open]="true">
          <button ng2vDropdownToggle>Toggle dropdown</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <a class="dropdown-item">Action</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let linkEl = compiled.querySelector('a');

    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('show');

    linkEl.click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('show');
  });


  it('should close on other dropdown click', () => {
    const html = `
      <div ng2vDropdown>
          <button ng2vDropdownToggle>Toggle dropdown 1</button>
          <div class="dropdown-menu">
            <a class="dropdown-item">Action 1</a>
          </div>
      </div>
      <div ng2vDropdown>
          <button ng2vDropdownToggle>Toggle dropdown 2</button>
          <div class="dropdown-menu">
            <a class="dropdown-item">Action 2</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    const buttonEls = compiled.querySelectorAll('button');
    const dropdownEls = compiled.querySelectorAll('div[ng2vDropdown]');

    fixture.detectChanges();
    expect(dropdownEls[0]).not.toHaveCssClass('show');
    expect(dropdownEls[1]).not.toHaveCssClass('show');

    buttonEls[0].click();
    fixture.detectChanges();
    expect(dropdownEls[0]).toHaveCssClass('show');
    expect(dropdownEls[1]).not.toHaveCssClass('show');

    buttonEls[1].click();
    fixture.detectChanges();
    expect(dropdownEls[0]).not.toHaveCssClass('show');
    expect(dropdownEls[1]).toHaveCssClass('show');
  });

  describe('Custom config', () => {
    let config: Ng2vDropdownConfig;

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [Ng2vDropdownModule.forRoot()]});
      TestBed.overrideComponent(TestComponent, {set: {template: '<div ng2vDropdown></div>'}});
    });

    beforeEach(inject([Ng2vDropdownConfig], (c: Ng2vDropdownConfig) => {
      config = c;
      config.up = true;
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;

      expect(getDropdownEl(compiled)).toHaveCssClass('dropup');
    });
  });

  describe('Custom config as provider', () => {
    let config = new Ng2vDropdownConfig();
    config.up = true;

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [Ng2vDropdownModule.forRoot()], providers: [{provide: Ng2vDropdownConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = createTestComponent('<div ng2vDropdown></div>');
      fixture.detectChanges();

      const compiled = fixture.nativeElement;

      expect(getDropdownEl(compiled)).toHaveCssClass('dropup');
    });
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  isOpen = false;
  stateChanges = [];

  recordStateChange($event) {
    this.stateChanges.push($event);
    this.isOpen = $event;
  }
}
