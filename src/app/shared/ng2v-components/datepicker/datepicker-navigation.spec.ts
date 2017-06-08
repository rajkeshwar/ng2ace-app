import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {createGenericTestComponent} from '../test/common';
import {getMonthSelect, getYearSelect, getNavigationLinks} from '../test/datepicker/common';

import {Component} from '@angular/core';

import {Ng2vDatepickerModule} from './datepicker.module';
import {NavigationEvent} from './datepicker-view-model';
import {Ng2vDatepickerNavigation} from './datepicker-navigation';
import {Ng2vDate} from './ng2v-date';
import {Ng2vDatepickerNavigationSelect} from './datepicker-navigation-select';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function changeSelect(element: HTMLSelectElement, value: string) {
  element.value = value;
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('change', true, true);
  element.dispatchEvent(evt);
}

describe('ng2v-datepicker-navigation', () => {

  beforeEach(() => {
    TestBed.overrideModule(
        Ng2vDatepickerModule, {set: {exports: [Ng2vDatepickerNavigation, Ng2vDatepickerNavigationSelect]}});
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [Ng2vDatepickerModule.forRoot()]});
  });

  it('should toggle navigation select component', () => {
    const fixture = createTestComponent(`<ng2v-datepicker-navigation [showSelect]="showSelect" [date]="date" 
          [minDate]="minDate" [maxDate]="maxDate"></ng2v-datepicker-navigation>`);

    expect(fixture.debugElement.query(By.directive(Ng2vDatepickerNavigationSelect))).not.toBeNull();
    expect(getMonthSelect(fixture.nativeElement).value).toBe('8');
    expect(getYearSelect(fixture.nativeElement).value).toBe('2016');

    fixture.componentInstance.showSelect = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(Ng2vDatepickerNavigationSelect))).toBeNull();
  });

  it('should send date selection event', () => {
    const fixture = createTestComponent(`<ng2v-datepicker-navigation [showSelect]="true" [date]="date" 
          [minDate]="minDate" [maxDate]="maxDate" (select)="onSelect($event)"></ng2v-datepicker-navigation>`);

    const monthSelect = getMonthSelect(fixture.nativeElement);
    const yearSelect = getYearSelect(fixture.nativeElement);
    spyOn(fixture.componentInstance, 'onSelect');

    changeSelect(monthSelect, '2');
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledWith(new Ng2vDate(2016, 2, 1));

    changeSelect(yearSelect, '2020');
    expect(fixture.componentInstance.onSelect).toHaveBeenCalledWith(new Ng2vDate(2020, 8, 1));
  });

  it('should make prev navigation button disabled', () => {
    const fixture = createTestComponent(`<ng2v-datepicker-navigation [showSelect]="true" [date]="date" 
          [minDate]="minDate" [maxDate]="maxDate"></ng2v-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    expect(links[0].hasAttribute('disabled')).toBeFalsy();

    fixture.componentInstance.minDate = new Ng2vDate(2016, 7, 30);
    fixture.detectChanges();
    expect(links[0].hasAttribute('disabled')).toBeFalsy();

    fixture.componentInstance.minDate = new Ng2vDate(2016, 8, 1);
    fixture.detectChanges();
    expect(links[0].hasAttribute('disabled')).toBeTruthy();

    fixture.componentInstance.date = new Ng2vDate(2016, 9, 1);
    fixture.detectChanges();
    expect(links[0].hasAttribute('disabled')).toBeFalsy();
  });

  it('should make next navigation button disabled', () => {
    const fixture = createTestComponent(`<ng2v-datepicker-navigation [showSelect]="true" [date]="date" 
          [minDate]="minDate" [maxDate]="maxDate"></ng2v-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    expect(links[1].hasAttribute('disabled')).toBeFalsy();

    fixture.componentInstance.maxDate = new Ng2vDate(2016, 9, 1);
    fixture.detectChanges();
    expect(links[1].hasAttribute('disabled')).toBeFalsy();

    fixture.componentInstance.maxDate = new Ng2vDate(2016, 8, 31);
    fixture.detectChanges();
    expect(links[1].hasAttribute('disabled')).toBeTruthy();

    fixture.componentInstance.date = new Ng2vDate(2016, 7, 1);
    fixture.detectChanges();
    expect(links[1].hasAttribute('disabled')).toBeFalsy();
  });

  it('should have disabled navigation buttons and year and month select boxes when disabled', () => {
    const fixture = createTestComponent(`<ng2v-datepicker-navigation [disabled]="true" [showSelect]="true" 
          [date]="date" [minDate]="minDate" [maxDate]="maxDate"></ng2v-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    expect(links[0].hasAttribute('disabled')).toBeTruthy();
    expect(links[1].hasAttribute('disabled')).toBeTruthy();
    expect(getYearSelect(fixture.nativeElement).disabled).toBeTruthy();
    expect(getMonthSelect(fixture.nativeElement).disabled).toBeTruthy();
  });

  it('should send navigation events', () => {
    const fixture = createTestComponent(`<ng2v-datepicker-navigation [date]="date" [minDate]="minDate" 
          [maxDate]="maxDate" (navigate)="onNavigate($event)"></ng2v-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    spyOn(fixture.componentInstance, 'onNavigate');

    // prev
    links[0].click();
    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith(NavigationEvent.PREV);

    // next
    links[1].click();
    expect(fixture.componentInstance.onNavigate).toHaveBeenCalledWith(NavigationEvent.NEXT);
  });

  it('should have buttons of type button', () => {
    const fixture = createTestComponent(`<ng2v-datepicker-navigation [date]="date" [minDate]="minDate" 
        [maxDate]="maxDate"></ng2v-datepicker-navigation>`);

    const links = getNavigationLinks(fixture.nativeElement);
    links.forEach((link) => { expect(link.getAttribute('type')).toBe('button'); });
  });

});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  date = new Ng2vDate(2016, 8, 1);
  minDate = new Ng2vDate(2015, 0, 1);
  maxDate = new Ng2vDate(2020, 11, 31);
  showSelect = true;

  onNavigate = () => {};
  onSelect = () => {};
}
