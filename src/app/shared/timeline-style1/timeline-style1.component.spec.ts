import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineStyle1Component } from './timeline-style1.component';

describe('TimelineStyle1Component', () => {
  let component: TimelineStyle1Component;
  let fixture: ComponentFixture<TimelineStyle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineStyle1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
