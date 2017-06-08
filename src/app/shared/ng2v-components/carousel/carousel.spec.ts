import {fakeAsync, discardPeriodicTasks, tick, TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';

import {Ng2vCarouselModule} from './carousel.module';
import {Ng2vCarousel} from './carousel';
import {Ng2vCarouselConfig} from './carousel-config';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function expectActiveSlides(nativeEl: HTMLDivElement, active: boolean[]) {
  const slideElms = nativeEl.querySelectorAll('.carousel-item');
  const indicatorElms = nativeEl.querySelectorAll('ol.carousel-indicators > li');

  expect(slideElms.length).toBe(active.length);
  expect(indicatorElms.length).toBe(active.length);

  for (let i = 0; i < active.length; i++) {
    if (active[i]) {
      expect(slideElms[i]).toHaveCssClass('active');
      expect(indicatorElms[i]).toHaveCssClass('active');
    } else {
      expect(slideElms[i]).not.toHaveCssClass('active');
      expect(indicatorElms[i]).not.toHaveCssClass('active');
    }
  }
}

describe('ng2v-carousel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [Ng2vCarouselModule.forRoot()]});
  });

  it('should initialize inputs with default values', () => {
    const defaultConfig = new Ng2vCarouselConfig();
    const carousel = new Ng2vCarousel(new Ng2vCarouselConfig());

    expect(carousel.interval).toBe(defaultConfig.interval);
    expect(carousel.wrap).toBe(defaultConfig.wrap);
    expect(carousel.keyboard).toBe(defaultConfig.keyboard);
  });

  it('should render slides and navigation indicators', fakeAsync(() => {
       const html = `
      <ng2v-carousel>
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;
       const fixture = createTestComponent(html);

       const slideElms = fixture.nativeElement.querySelectorAll('.carousel-item');
       expect(slideElms.length).toBe(2);
       expect(slideElms[0].textContent).toMatch(/foo/);
       expect(slideElms[1].textContent).toMatch(/bar/);

       expect(fixture.nativeElement.querySelectorAll('ol.carousel-indicators > li').length).toBe(2);

       discardPeriodicTasks();
     }));


  it('should mark the first slide as active by default', fakeAsync(() => {
       const html = `
      <ng2v-carousel>
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;

       const fixture = createTestComponent(html);
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));


  it('should mark the requested slide as active', fakeAsync(() => {
       const html = `
       <ng2v-carousel [activeId]="activeSlideId">
         <ng-template ng2vSlide id="1">foo</ng-template>
         <ng-template ng2vSlide id="2">bar</ng-template>
       </ng2v-carousel>
     `;

       const fixture = createTestComponent(html);

       fixture.componentInstance.activeSlideId = 1;
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));

  it('should auto-correct when slide index is undefined', fakeAsync(() => {
       const html = `
            <ng2v-carousel [activeId]="doesntExist">
              <ng-template ng2vSlide>foo</ng-template>
              <ng-template ng2vSlide>bar</ng-template>
            </ng2v-carousel>
          `;

       const fixture = createTestComponent(html);
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));


  it('should change slide on indicator click', fakeAsync(() => {
       const html = `
      <ng2v-carousel>
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;

       const fixture = createTestComponent(html);
       const indicatorElms = fixture.nativeElement.querySelectorAll('ol.carousel-indicators > li');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       indicatorElms[1].click();
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));


  it('should change slide on carousel control click', fakeAsync(() => {
       const html = `
      <ng2v-carousel>
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;

       const fixture = createTestComponent(html);

       const prevControlElm = fixture.nativeElement.querySelector('.carousel-control-prev');
       const nextControlElm = fixture.nativeElement.querySelector('.carousel-control-next');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       prevControlElm.click();  // prev
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));

  it('should change slide on time passage (default interval value)', fakeAsync(() => {
       const html = `
      <ng2v-carousel>
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;

       const fixture = createTestComponent(html);

       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should change slide on time passage (custom interval value)', fakeAsync(() => {
       const html = `
      <ng2v-carousel [interval]="2000">
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;

       const fixture = createTestComponent(html);

       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(1000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(1200);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should not change slide on time passage (custom interval value is zero)', fakeAsync(() => {
       const html = `
      <ng2v-carousel [interval]="0">
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;

       const fixture = createTestComponent(html);

       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(1000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(1200);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       discardPeriodicTasks();
     }));

  it('should pause / resume slide change with time passage on mouse enter / leave', fakeAsync(() => {
       const html = `
      <ng2v-carousel>
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;

       const fixture = createTestComponent(html);

       const carouselDebugEl = fixture.debugElement.query(By.directive(Ng2vCarousel));

       expectActiveSlides(fixture.nativeElement, [true, false]);

       carouselDebugEl.triggerEventHandler('mouseenter', {});
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       carouselDebugEl.triggerEventHandler('mouseleave', {});
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       tick(6000);
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should wrap slide changes by default', fakeAsync(() => {
       const html = `
      <ng2v-carousel>
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;

       const fixture = createTestComponent(html);

       const prevControlElm = fixture.nativeElement.querySelector('.carousel-control-prev');
       const nextControlElm = fixture.nativeElement.querySelector('.carousel-control-next');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       prevControlElm.click();  // prev
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should not wrap slide changes by when requested', fakeAsync(() => {
       const html = `
      <ng2v-carousel [wrap]="false">
        <ng-template ng2vSlide>foo</ng-template>
        <ng-template ng2vSlide>bar</ng-template>
      </ng2v-carousel>
    `;

       const fixture = createTestComponent(html);

       const prevControlElm = fixture.nativeElement.querySelector('.carousel-control-prev');
       const nextControlElm = fixture.nativeElement.querySelector('.carousel-control-next');

       expectActiveSlides(fixture.nativeElement, [true, false]);

       prevControlElm.click();  // prev
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       nextControlElm.click();  // next
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();
     }));

  it('should change on key arrowRight and arrowLeft', fakeAsync(() => {
       const html = `
            <ng2v-carousel [keyboard]="keyboard" [wrap]="false">
              <ng-template ng2vSlide>foo</ng-template>
              <ng-template ng2vSlide>bar</ng-template>
            </ng2v-carousel>
          `;

       const fixture = createTestComponent(html);
       expectActiveSlides(fixture.nativeElement, [true, false]);

       fixture.debugElement.query(By.directive(Ng2vCarousel)).triggerEventHandler('keydown.arrowRight', {});  // next()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       fixture.debugElement.query(By.directive(Ng2vCarousel)).triggerEventHandler('keydown.arrowLeft', {});  // prev()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       fixture.componentInstance.keyboard = false;
       fixture.detectChanges();
       fixture.debugElement.query(By.directive(Ng2vCarousel)).triggerEventHandler('keydown.arrowRight', {});  // prev()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);


       discardPeriodicTasks();

     }));

  it('should listen to keyevents based on keyboard attribute', fakeAsync(() => {
       const html = `
               <ng2v-carousel [keyboard]="keyboard" >
                 <ng-template ng2vSlide>foo</ng-template>
                 <ng-template ng2vSlide>bar</ng-template>
               </ng2v-carousel>
             `;

       const fixture = createTestComponent(html);
       expectActiveSlides(fixture.nativeElement, [true, false]);

       fixture.componentInstance.keyboard = false;
       fixture.detectChanges();
       fixture.debugElement.query(By.directive(Ng2vCarousel)).triggerEventHandler('keydown.arrowRight', {});  // prev()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [true, false]);

       fixture.componentInstance.keyboard = true;
       fixture.detectChanges();
       fixture.debugElement.query(By.directive(Ng2vCarousel)).triggerEventHandler('keydown.arrowRight', {});  // next()
       fixture.detectChanges();
       expectActiveSlides(fixture.nativeElement, [false, true]);

       discardPeriodicTasks();

     }));

  describe('Custom config', () => {
    let config: Ng2vCarouselConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [Ng2vCarouselModule.forRoot()]}); });

    beforeEach(inject([Ng2vCarouselConfig], (c: Ng2vCarouselConfig) => {
      config = c;
      config.interval = 1000;
      config.wrap = false;
      config.keyboard = false;
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(Ng2vCarousel);
      fixture.detectChanges();

      const carousel = fixture.componentInstance;
      expect(carousel.interval).toBe(config.interval);
      expect(carousel.wrap).toBe(config.wrap);
      expect(carousel.keyboard).toBe(config.keyboard);
    });
  });

  describe('Custom config as provider', () => {
    const config = new Ng2vCarouselConfig();
    config.interval = 1000;
    config.wrap = false;
    config.keyboard = false;

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [Ng2vCarouselModule.forRoot()], providers: [{provide: Ng2vCarouselConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(Ng2vCarousel);
      fixture.detectChanges();

      const carousel = fixture.componentInstance;
      expect(carousel.interval).toBe(config.interval);
      expect(carousel.wrap).toBe(config.wrap);
      expect(carousel.keyboard).toBe(config.keyboard);
    });
  });

});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  activeSlideId;
  keyboard = true;
}
