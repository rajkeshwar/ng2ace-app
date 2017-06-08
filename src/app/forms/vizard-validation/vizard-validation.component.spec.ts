import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizardValidationComponent } from './vizard-validation.component';

describe('VizardValidationComponent', () => {
  let component: VizardValidationComponent;
  let fixture: ComponentFixture<VizardValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizardValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizardValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
