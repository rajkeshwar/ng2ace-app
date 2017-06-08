import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxReadComponent } from './inbox-read.component';

describe('InboxReadComponent', () => {
  let component: InboxReadComponent;
  let fixture: ComponentFixture<InboxReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
