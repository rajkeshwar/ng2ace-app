import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSelectComponent } from './message-select.component';

describe('MessageSelectComponent', () => {
  let component: MessageSelectComponent;
  let fixture: ComponentFixture<MessageSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
