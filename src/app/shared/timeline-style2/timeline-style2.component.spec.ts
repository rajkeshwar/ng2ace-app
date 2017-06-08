import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineStyle2Component } from './timeline-style2.component';

describe('TimelineStyle2Component', () => {
  let component: TimelineStyle2Component;
  let fixture: ComponentFixture<TimelineStyle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineStyle2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineStyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
