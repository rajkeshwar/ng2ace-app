import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingTableSmallComponent } from './pricing-table-small.component';

describe('PricingTableSmallComponent', () => {
  let component: PricingTableSmallComponent;
  let fixture: ComponentFixture<PricingTableSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingTableSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingTableSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
