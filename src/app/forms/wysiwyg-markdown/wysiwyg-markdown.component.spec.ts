import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WysiwygMarkdownComponent } from './wysiwyg-markdown.component';

describe('WysiwygMarkdownComponent', () => {
  let component: WysiwygMarkdownComponent;
  let fixture: ComponentFixture<WysiwygMarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WysiwygMarkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WysiwygMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
