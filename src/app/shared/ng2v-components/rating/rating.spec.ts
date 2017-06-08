import {TestBed, ComponentFixture, inject, async, fakeAsync, tick} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component, DebugElement} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';

import {Ng2vRatingModule} from './rating.module';
import {Ng2vRating} from './rating';
import {Ng2vRatingConfig} from './rating-config';
import {By} from '@angular/platform-browser';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

enum Key {
  End = 35,
  Home = 36,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40
}

function createKeyDownEvent(key: number) {
  const event = {which: key, preventDefault: () => {}};
  spyOn(event, 'preventDefault');
  return event;
}

function getAriaState(compiled) {
  const stars = getStars(compiled, '.sr-only');
  return stars.map(star => star.textContent === '(*)');
}

function getStar(compiled, num: number) {
  return getStars(compiled)[num - 1];
}

function getStars(element, selector = 'span:not(.sr-only)') {
  return <HTMLElement[]>Array.from(element.querySelectorAll(selector));
}

function getDbgStar(element, num: number) {
  return element.queryAll(By.css('span:not(.sr-only)'))[num - 1];
}

function getState(element: DebugElement | HTMLElement) {
  const stars = getStars(element instanceof DebugElement ? element.nativeElement : element);
  return stars.map(star => star.textContent.trim() === String.fromCharCode(9733));
}

function getStateText(compiled) {
  const stars = getStars(compiled);
  return stars.map(star => star.textContent.trim());
}

describe('ng2v-rating', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [TestComponent], imports: [Ng2vRatingModule.forRoot(), FormsModule, ReactiveFormsModule]});
  });

  it('should initialize inputs with default values', () => {
    const defaultConfig = new Ng2vRatingConfig();
    const rating = new Ng2vRating(new Ng2vRatingConfig(), null);
    expect(rating.max).toBe(defaultConfig.max);
    expect(rating.readonly).toBe(defaultConfig.readonly);
  });

  it('should show as many stars as the configured max by default', () => {
    const fixture = TestBed.createComponent(Ng2vRating);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    const stars = getStars(compiled);
    expect(stars.length).toBe(new Ng2vRatingConfig().max);
  });

  it('should change the num of stars with `max`', () => {
    const fixture = createTestComponent('<ng2v-rating max="3"></ng2v-rating>');

    const compiled = fixture.nativeElement;
    const stars = getStars(compiled);
    expect(stars.length).toBe(3);
  });

  it('initializes the default star icons as selected', () => {
    const fixture = createTestComponent('<ng2v-rating rate="3" max="5"></ng2v-rating>');

    const compiled = fixture.nativeElement;
    expect(getState(compiled)).toEqual([true, true, true, false, false]);
  });

  it('sets stars within 0..max limits', () => {
    const fixture = createTestComponent('<ng2v-rating [rate]="rate" max="5"></ng2v-rating>');

    const compiled = fixture.nativeElement;
    expect(getState(compiled)).toEqual([true, true, true, false, false]);

    fixture.componentInstance.rate = 0;
    fixture.detectChanges();
    expect(getState(compiled)).toEqual([false, false, false, false, false]);

    fixture.componentInstance.rate = -5;
    fixture.detectChanges();
    expect(getState(compiled)).toEqual([false, false, false, false, false]);

    fixture.componentInstance.rate = 20;
    fixture.detectChanges();
    expect(getState(compiled)).toEqual([true, true, true, true, true]);
  });

  it('should now fire change event initially', fakeAsync(() => {
       const fixture = createTestComponent('<ng2v-rating [rate]="3" (rateChange)="changed = true"></ng2v-rating>');
       tick();
       expect(fixture.componentInstance.changed).toBeFalsy();
     }));

  it('handles correctly the click event', fakeAsync(() => {
       const fixture = createTestComponent('<ng2v-rating [(rate)]="rate" max="5"></ng2v-rating>');
       const el = fixture.debugElement;
       const rating = el.query(By.directive(Ng2vRating)).children[0];

       // 3/5
       expect(getState(el)).toEqual([true, true, true, false, false]);

       // enter 2 -> 2/5, rate = 3
       getDbgStar(el, 2).triggerEventHandler('mouseenter', {});
       fixture.detectChanges();
       expect(getState(el)).toEqual([true, true, false, false, false]);
       expect(fixture.componentInstance.rate).toBe(3);

       // click 2 -> 2/5, rate = 2
       getStar(el.nativeElement, 2).click();
       fixture.detectChanges();
       tick();
       expect(getState(el)).toEqual([true, true, false, false, false]);
       expect(fixture.componentInstance.rate).toBe(2);

       // leave 2 -> 2/5, rate = 2
       rating.triggerEventHandler('mouseleave', {});
       fixture.detectChanges();
       expect(getState(el)).toEqual([true, true, false, false, false]);
       expect(fixture.componentInstance.rate).toBe(2);
     }));

  it('ignores the click event on a readonly rating', () => {
    const fixture = createTestComponent('<ng2v-rating [(rate)]="rate" max="5" [readonly]="true"></ng2v-rating>');
    const el = fixture.debugElement;
    const rating = el.query(By.directive(Ng2vRating)).children[0];

    // 3/5
    expect(getState(el)).toEqual([true, true, true, false, false]);

    // enter 2 -> 3/5
    getDbgStar(el, 2).triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, false, false]);
    expect(fixture.componentInstance.rate).toBe(3);

    // click 2 -> 2/5
    getStar(el.nativeElement, 2).click();
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, false, false]);
    expect(fixture.componentInstance.rate).toBe(3);

    // leave 2 -> 3/5
    rating.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, false, false]);
    expect(fixture.componentInstance.rate).toBe(3);
  });

  it('should not reset rating to 0 by default', fakeAsync(() => {
       const fixture = createTestComponent('<ng2v-rating [(rate)]="rate" max="5"></ng2v-rating>');
       const el = fixture.debugElement;

       // 3/5 initially
       expect(getState(el)).toEqual([true, true, true, false, false]);
       expect(fixture.componentInstance.rate).toBe(3);

       // click 3 -> 3/5
       getStar(el.nativeElement, 3).click();
       fixture.detectChanges();
       expect(getState(el)).toEqual([true, true, true, false, false]);
       expect(fixture.componentInstance.rate).toBe(3);
     }));

  it('should set `resettable` rating to 0', fakeAsync(() => {
       const fixture = createTestComponent('<ng2v-rating [(rate)]="rate" max="5" [resettable]="true"></ng2v-rating>');
       const el = fixture.debugElement;

       // 3/5 initially
       expect(getState(el)).toEqual([true, true, true, false, false]);
       expect(fixture.componentInstance.rate).toBe(3);

       // click 3 -> 0/5
       getStar(el.nativeElement, 3).click();
       tick();
       fixture.detectChanges();
       expect(getState(el)).toEqual([false, false, false, false, false]);
       expect(fixture.componentInstance.rate).toBe(0);

       // click 2 -> 2/5
       getStar(el.nativeElement, 2).click();
       tick();
       fixture.detectChanges();
       expect(getState(el)).toEqual([true, true, false, false, false]);
       expect(fixture.componentInstance.rate).toBe(2);
     }));

  it('handles correctly the mouse enter/leave', () => {
    const fixture = createTestComponent('<ng2v-rating [(rate)]="rate" max="5"></ng2v-rating>');
    const el = fixture.debugElement;
    const rating = el.query(By.directive(Ng2vRating));

    // 3/5
    expect(getState(el)).toEqual([true, true, true, false, false]);

    // enter 1 -> 1/5, rate = 3
    getDbgStar(el, 1).triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, false, false, false, false]);
    expect(fixture.componentInstance.rate).toBe(3);

    // leave -> 3/5, rate = 3
    rating.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, false, false]);
    expect(fixture.componentInstance.rate).toBe(3);

    // enter 5 -> 5/5, rate = 3
    getDbgStar(el, 5).triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, true, true]);
    expect(fixture.componentInstance.rate).toBe(3);

    // enter 4 -> 4/5, rate = 3
    getDbgStar(el, 4).triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, true, false]);
    expect(fixture.componentInstance.rate).toBe(3);
  });

  it('handles correctly the mouse enter/leave on readonly rating', () => {
    const fixture = createTestComponent('<ng2v-rating [(rate)]="rate" max="5" [readonly]="true"></ng2v-rating>');
    const el = fixture.debugElement;
    const rating = el.query(By.directive(Ng2vRating)).children[0];

    // 3/5
    expect(getState(el)).toEqual([true, true, true, false, false]);

    // enter 1 -> 3/5, rate = 3
    getDbgStar(el, 1).triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, false, false]);
    expect(fixture.componentInstance.rate).toBe(3);

    // leave -> 3/5, rate = 3
    rating.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, false, false]);
    expect(fixture.componentInstance.rate).toBe(3);

    // enter 5 -> 3/5, rate = 3
    getDbgStar(el, 5).triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, false, false]);
    expect(fixture.componentInstance.rate).toBe(3);

    // enter 4 -> 3/5, rate = 3
    getDbgStar(el, 4).triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    expect(getState(el)).toEqual([true, true, true, false, false]);
    expect(fixture.componentInstance.rate).toBe(3);
  });

  it('should set pointer cursor on stars when not readonly', () => {
    const fixture = TestBed.createComponent(Ng2vRating);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(window.getComputedStyle(getStar(compiled, 1)).getPropertyValue('cursor')).toBe('pointer');
  });

  it('should set default cursor on stars when readonly', () => {
    const fixture = createTestComponent('<ng2v-rating [readonly]="true"></ng2v-rating>');

    const compiled = fixture.nativeElement;

    expect(window.getComputedStyle(getStar(compiled, 1)).getPropertyValue('cursor')).toBe('default');
  });

  it('should allow custom star template', () => {
    const fixture = createTestComponent(`
      <ng-template #t let-fill="fill">{{ fill === 100 ? 'x' : 'o' }}</ng-template>
      <ng2v-rating [starTemplate]="t" rate="2" max="4"></ng2v-rating>`);

    const compiled = fixture.nativeElement;
    expect(getStateText(compiled)).toEqual(['x', 'x', 'o', 'o']);
  });

  it('should allow custom template as a child element', () => {
    const fixture = createTestComponent(`
      <ng2v-rating rate="2" max="4">
        <ng-template let-fill="fill">{{ fill === 100 ? 'x' : 'o' }}</ng-template>
      </ng2v-rating>`);

    const compiled = fixture.nativeElement;
    expect(getStateText(compiled)).toEqual(['x', 'x', 'o', 'o']);
  });

  it('should prefer explicitly set custom template to a child one', () => {
    const fixture = createTestComponent(`
      <ng-template #t let-fill="fill">{{ fill === 100 ? 'a' : 'b' }}</ng-template>
      <ng2v-rating [starTemplate]="t" rate="2" max="4">
        <ng-template let-fill="fill">{{ fill === 100 ? 'c' : 'd' }}</ng-template>
      </ng2v-rating>`);

    const compiled = fixture.nativeElement;
    expect(getStateText(compiled)).toEqual(['a', 'a', 'b', 'b']);
  });

  it('should calculate fill percentage correctly', () => {
    const fixture = createTestComponent(`
      <ng-template #t let-fill="fill">{{fill}}</ng-template>
      <ng2v-rating [starTemplate]="t" [rate]="rate" max="4"></ng2v-rating>`);

    const compiled = fixture.nativeElement;
    expect(getStateText(compiled)).toEqual(['100', '100', '100', '0']);

    fixture.componentInstance.rate = 0;
    fixture.detectChanges();
    expect(getStateText(compiled)).toEqual(['0', '0', '0', '0']);

    fixture.componentInstance.rate = 2.2;
    fixture.detectChanges();
    expect(getStateText(compiled)).toEqual(['100', '100', '20', '0']);

    fixture.componentInstance.rate = 2.25;
    fixture.detectChanges();
    expect(getStateText(compiled)).toEqual(['100', '100', '25', '0']);

    fixture.componentInstance.rate = 2.2548;
    fixture.detectChanges();
    expect(getStateText(compiled)).toEqual(['100', '100', '25', '0']);

    fixture.componentInstance.rate = 7;
    fixture.detectChanges();
    expect(getStateText(compiled)).toEqual(['100', '100', '100', '100']);
  });

  describe('aria support', () => {
    it('contains aria-valuemax with the number of stars', () => {
      const fixture = createTestComponent('<ng2v-rating [max]="max"></ng2v-rating>');

      const rating = fixture.debugElement.query(By.directive(Ng2vRating));

      expect(rating.attributes['aria-valuemax']).toBe('10');
    });

    it('contains aria-valuemin', () => {
      const fixture = createTestComponent('<ng2v-rating [max]="max"></ng2v-rating>');

      const rating = fixture.debugElement.query(By.directive(Ng2vRating));

      expect(rating.attributes['aria-valuemin']).toBe('0');
    });

    it('contains a hidden span for each star for screenreaders', () => {
      const fixture = createTestComponent('<ng2v-rating max="5"></ng2v-rating>');

      const compiled = fixture.nativeElement;
      const hiddenStars = getStars(compiled, '.sr-only');

      expect(hiddenStars.length).toBe(5);
    });

    it('initializes populates the current rate for screenreaders', () => {
      const fixture = createTestComponent('<ng2v-rating rate="3" max="5"></ng2v-rating>');

      const compiled = fixture.nativeElement;
      expect(getAriaState(compiled)).toEqual([true, true, true, false, false]);
    });

    it('contains aria-valuenow with the current rate', () => {
      const fixture = createTestComponent('<ng2v-rating [max]="max" rate="3"></ng2v-rating>');

      const rating = fixture.debugElement.query(By.directive(Ng2vRating));

      expect(rating.attributes['aria-valuenow']).toBe('3');
    });

    it('updates aria-valuenow when the rate changes', () => {
      const fixture = createTestComponent('<ng2v-rating [max]="max" rate="3"></ng2v-rating>');

      const rating = fixture.debugElement.query(By.directive(Ng2vRating));

      getStar(rating.nativeElement, 7).click();
      fixture.detectChanges();

      expect(rating.attributes['aria-valuenow']).toBe('7');
    });

    it('updates aria-valuetext when the rate changes', () => {
      const fixture = createTestComponent('<ng2v-rating [max]="max" rate="3"></ng2v-rating>');

      const rating = fixture.debugElement.query(By.directive(Ng2vRating));

      getStar(rating.nativeElement, 7).click();
      fixture.detectChanges();

      expect(rating.attributes['aria-valuetext']).toBe('7 out of 10');
    });

    it('updates aria-disabled when readonly', () => {
      const fixture = createTestComponent('<ng2v-rating></ng2v-rating>');
      let ratingEl = fixture.debugElement.query(By.directive(Ng2vRating));
      fixture.detectChanges();
      expect(ratingEl.attributes['aria-disabled']).toBeNull();

      let ratingComp = <Ng2vRating>ratingEl.componentInstance;
      ratingComp.readonly = true;
      fixture.detectChanges();
      expect(ratingEl.attributes['aria-disabled']).toBe('true');
    });
  });

  describe('keyboard support', () => {

    it('should handle arrow keys', () => {
      const fixture = createTestComponent('<ng2v-rating [rate]="3" [max]="5"></ng2v-rating>');

      const element = fixture.debugElement.query(By.directive(Ng2vRating));

      // right -> +1
      let event = createKeyDownEvent(Key.ArrowRight);
      element.triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expect(getState(element.nativeElement)).toEqual([true, true, true, true, false]);
      expect(event.preventDefault).toHaveBeenCalled();

      // up -> +1
      event = createKeyDownEvent(Key.ArrowUp);
      element.triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expect(getState(element.nativeElement)).toEqual([true, true, true, true, true]);
      expect(event.preventDefault).toHaveBeenCalled();

      // left -> -1
      event = createKeyDownEvent(Key.ArrowLeft);
      element.triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expect(getState(element.nativeElement)).toEqual([true, true, true, true, false]);
      expect(event.preventDefault).toHaveBeenCalled();

      // down -> -1
      event = createKeyDownEvent(Key.ArrowDown);
      element.triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expect(getState(element.nativeElement)).toEqual([true, true, true, false, false]);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should handle home/end keys', () => {
      const fixture = createTestComponent('<ng2v-rating [rate]="3" [max]="5"></ng2v-rating>');

      const element = fixture.debugElement.query(By.directive(Ng2vRating));

      // home -> 0
      let event = createKeyDownEvent(Key.Home);
      element.triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
      expect(event.preventDefault).toHaveBeenCalled();

      // end -> max
      event = createKeyDownEvent(Key.End);
      element.triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expect(getState(element.nativeElement)).toEqual([true, true, true, true, true]);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('forms', () => {

    it('should work with template-driven form validation', async(() => {
         const html = `
        <form>
          <ng2v-rating [(ngModel)]="model" name="control" max="5" required></ng2v-rating>
        </form>`;

         const fixture = createTestComponent(html);
         const element = fixture.debugElement.query(By.directive(Ng2vRating));

         fixture.detectChanges();
         fixture.whenStable()
             .then(() => {
               fixture.detectChanges();
               expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
               expect(element.nativeElement).toHaveCssClass('ng-invalid');
               expect(element.nativeElement).toHaveCssClass('ng-untouched');

               fixture.componentInstance.model = 1;
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               fixture.detectChanges();
               expect(getState(element.nativeElement)).toEqual([true, false, false, false, false]);
               expect(element.nativeElement).toHaveCssClass('ng-valid');
               expect(element.nativeElement).toHaveCssClass('ng-untouched');

               fixture.componentInstance.model = 0;
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               fixture.detectChanges();
               expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
               expect(element.nativeElement).toHaveCssClass('ng-valid');
               expect(element.nativeElement).toHaveCssClass('ng-untouched');
             });
       }));

    it('should work with reactive form validation', () => {
      const html = `
        <form [formGroup]="form">
          <ng2v-rating formControlName="rating" max="5"></ng2v-rating>
        </form>`;

      const fixture = createTestComponent(html);
      const element = fixture.debugElement.query(By.directive(Ng2vRating));

      expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
      expect(element.nativeElement).toHaveCssClass('ng-invalid');
      expect(element.nativeElement).toHaveCssClass('ng-untouched');

      fixture.componentInstance.form.patchValue({rating: 3});
      fixture.detectChanges();
      expect(getState(element.nativeElement)).toEqual([true, true, true, false, false]);
      expect(element.nativeElement).toHaveCssClass('ng-valid');
      expect(element.nativeElement).toHaveCssClass('ng-untouched');

      fixture.componentInstance.form.patchValue({rating: 0});
      fixture.detectChanges();
      expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
      expect(element.nativeElement).toHaveCssClass('ng-valid');
      expect(element.nativeElement).toHaveCssClass('ng-untouched');
    });

    it('should handle clicks and update form control', () => {
      const html = `
        <form [formGroup]="form">
          <ng2v-rating formControlName="rating" max="5"></ng2v-rating>
        </form>`;

      const fixture = createTestComponent(html);
      const element = fixture.debugElement.query(By.directive(Ng2vRating));

      expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
      expect(element.nativeElement).toHaveCssClass('ng-invalid');
      expect(element.nativeElement).toHaveCssClass('ng-untouched');

      getStar(element.nativeElement, 3).click();
      fixture.detectChanges();
      expect(getState(element.nativeElement)).toEqual([true, true, true, false, false]);
      expect(element.nativeElement).toHaveCssClass('ng-valid');
      expect(element.nativeElement).toHaveCssClass('ng-touched');
    });

    it('should work with both rate input and form control', fakeAsync(() => {
         const html = `
        <form [formGroup]="form">
          <ng2v-rating [(rate)]="rate" formControlName="rating" max="5"></ng2v-rating>
        </form>`;

         const fixture = createTestComponent(html);
         const element = fixture.debugElement.query(By.directive(Ng2vRating));

         expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
         expect(element.nativeElement).toHaveCssClass('ng-invalid');

         getStar(element.nativeElement, 2).click();
         fixture.detectChanges();
         tick();
         expect(getState(element.nativeElement)).toEqual([true, true, false, false, false]);
         expect(fixture.componentInstance.rate).toBe(2);
         expect(element.nativeElement).toHaveCssClass('ng-valid');

         fixture.componentInstance.rate = 4;
         fixture.detectChanges();
         tick();
         expect(getState(element.nativeElement)).toEqual([true, true, true, true, false]);
         expect(fixture.componentInstance.form.get('rating').value).toBe(4);
         expect(element.nativeElement).toHaveCssClass('ng-valid');
       }));

    it('should disable widget when a control is disabled', fakeAsync(() => {
         const html = `
        <form [formGroup]="form">
          <ng2v-rating formControlName="rating" max="5"></ng2v-rating>
        </form>`;

         const fixture = createTestComponent(html);
         const element = fixture.debugElement.query(By.directive(Ng2vRating));

         expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
         expect(fixture.componentInstance.form.get('rating').disabled).toBeFalsy();

         fixture.componentInstance.form.get('rating').disable();
         fixture.detectChanges();
         expect(fixture.componentInstance.form.get('rating').disabled).toBeTruthy();

         getStar(element.nativeElement, 3).click();
         fixture.detectChanges();
         expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
       }));

    it('should mark control as touched on blur', fakeAsync(() => {
         const html = `
        <form [formGroup]="form">
          <ng2v-rating formControlName="rating" max="5"></ng2v-rating>
        </form>`;

         const fixture = createTestComponent(html);
         const element = fixture.debugElement.query(By.directive(Ng2vRating));

         expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
         expect(element.nativeElement).toHaveCssClass('ng-untouched');

         element.triggerEventHandler('blur', {});
         fixture.detectChanges();
         expect(getState(element.nativeElement)).toEqual([false, false, false, false, false]);
         expect(element.nativeElement).toHaveCssClass('ng-touched');
       }));
  });

  describe('Custom config', () => {
    let config: Ng2vRatingConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [Ng2vRatingModule.forRoot()]}); });

    beforeEach(inject([Ng2vRatingConfig], (c: Ng2vRatingConfig) => {
      config = c;
      config.max = 5;
      config.readonly = true;
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(Ng2vRating);
      fixture.detectChanges();

      let rating = fixture.componentInstance;
      expect(rating.max).toBe(config.max);
      expect(rating.readonly).toBe(config.readonly);
    });
  });

  describe('Custom config as provider', () => {
    let config = new Ng2vRatingConfig();
    config.max = 5;
    config.readonly = true;

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [Ng2vRatingModule.forRoot()], providers: [{provide: Ng2vRatingConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(Ng2vRating);
      fixture.detectChanges();

      let rating = fixture.componentInstance;
      expect(rating.max).toBe(config.max);
      expect(rating.readonly).toBe(config.readonly);
    });
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  changed = false;
  form = new FormGroup({rating: new FormControl(null, Validators.required)});
  max = 10;
  model;
  rate = 3;
}
