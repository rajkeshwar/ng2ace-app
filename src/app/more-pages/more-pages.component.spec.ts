import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePagesComponent } from './more-pages.component';

describe('MorePagesComponent', () => {
  let component: MorePagesComponent;
  let fixture: ComponentFixture<MorePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
