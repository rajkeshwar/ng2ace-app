import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component} from '@angular/core';

import {Ng2vAlertModule} from './alert.module';
import {Ng2vAlert} from './alert';
import {Ng2vAlertConfig} from './alert-config';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getAlertElement(element: HTMLElement): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.alert');
}

function getCloseButton(element: HTMLElement): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

describe('ng2v-alert', () => {

  beforeEach(
      () => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [Ng2vAlertModule.forRoot()]}); });

  it('should initialize inputs with default values', () => {
    const defaultConfig = new Ng2vAlertConfig();
    const alertCmp = new Ng2vAlert(new Ng2vAlertConfig());

    expect(alertCmp.dismissible).toBe(defaultConfig.dismissible);
    expect(alertCmp.type).toBe(defaultConfig.type);
  });

  it('should allow specifying alert type', () => {
    const fixture = createTestComponent('<ng2v-alert type="success">Cool!</ng2v-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl.getAttribute('role')).toEqual('alert');
    expect(alertEl).toHaveCssClass('alert-success');
  });

  it('should render close button and have "alert-dismissible" CSS class when dismissible', () => {
    const fixture = createTestComponent('<ng2v-alert [dismissible]="true">Watch out!</ng2v-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl).toHaveCssClass('alert-dismissible');
    expect(getCloseButton(alertEl)).toBeTruthy();
  });

  it('should render close button and not have "alert-dismissible" CSS class only if dismissible', () => {
    const fixture = createTestComponent(`<ng2v-alert [dismissible]="false">Don't close!</ng2v-alert>`);
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl).not.toHaveCssClass('alert-dismissible');
    expect(getCloseButton(getAlertElement(fixture.nativeElement))).toBeFalsy();
  });

  describe('Custom config', () => {
    let config: Ng2vAlertConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [Ng2vAlertModule.forRoot()]}); });

    beforeEach(inject([Ng2vAlertConfig], (c: Ng2vAlertConfig) => {
      config = c;
      config.dismissible = false;
      config.type = 'success';
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(Ng2vAlert);
      fixture.detectChanges();

      const alert = fixture.componentInstance;
      expect(alert.dismissible).toBe(config.dismissible);
      expect(alert.type).toBe(config.type);
    });
  });

  describe('Custom config as provider', () => {
    let config = new Ng2vAlertConfig();
    config.dismissible = false;
    config.type = 'success';

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [Ng2vAlertModule.forRoot()], providers: [{provide: Ng2vAlertConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(Ng2vAlert);
      fixture.detectChanges();

      const alert = fixture.componentInstance;
      expect(alert.dismissible).toBe(config.dismissible);
      expect(alert.type).toBe(config.type);
    });
  });
});

@Component({selector: 'test-cmp', template: '', entryComponents: [Ng2vAlert]})
class TestComponent {
  name = 'World';
  closed = false;
}
