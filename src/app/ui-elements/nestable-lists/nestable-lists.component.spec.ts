import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestableListsComponent } from './nestable-lists.component';

describe('NestableListsComponent', () => {
  let component: NestableListsComponent;
  let fixture: ComponentFixture<NestableListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestableListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestableListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
