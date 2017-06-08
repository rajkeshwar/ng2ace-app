import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsIconsComponent } from './buttons-icons.component';

describe('ButtonsIconsComponent', () => {
  let component: ButtonsIconsComponent;
  let fixture: ComponentFixture<ButtonsIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
