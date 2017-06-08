import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Style2Component } from './style2.component';

describe('Style2Component', () => {
  let component: Style2Component;
  let fixture: ComponentFixture<Style2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Style2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Style2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
