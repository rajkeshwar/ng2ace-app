import {TestBed} from '@angular/core/testing';

import {Ng2vModalBackdrop} from './modal-backdrop';

describe('ng2v-modal-backdrop', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [Ng2vModalBackdrop]}); });

  it('should render backdrop with required CSS classes', () => {
    const fixture = TestBed.createComponent(Ng2vModalBackdrop);

    fixture.detectChanges();
    expect(fixture.nativeElement).toHaveCssClass('modal-backdrop');
  });
});
