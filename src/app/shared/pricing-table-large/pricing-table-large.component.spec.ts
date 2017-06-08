import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingTableLargeComponent } from './pricing-table-large.component';

describe('PricingTableLargeComponent', () => {
  let component: PricingTableLargeComponent;
  let fixture: ComponentFixture<PricingTableLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingTableLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingTableLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
