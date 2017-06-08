import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Style3Component } from './style3.component';

describe('Style3Component', () => {
  let component: Style3Component;
  let fixture: ComponentFixture<Style3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Style3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Style3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
