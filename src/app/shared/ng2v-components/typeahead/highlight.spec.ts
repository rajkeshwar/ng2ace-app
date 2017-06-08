import {TestBed, ComponentFixture} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component} from '@angular/core';

import {Ng2vHighlight} from './highlight';
import {Ng2vTypeaheadModule} from './typeahead.module';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

/**
 * Get generated innerHtml without HTML comments and Angular debug attributes
 */
function highlightHtml(fixture) {
  const elms = fixture.nativeElement.children[0].childNodes;
  let elm;
  let result = '';
  let nodeName;

  for (let i = 0; i < elms.length; i++) {
    elm = elms[i];

    if (elm.nodeType === Node.ELEMENT_NODE) {
      nodeName = elm.nodeName.toLowerCase();
      result += `<${nodeName} class="${elm.className}">${elm.textContent}</${nodeName}>`;
    } else if (elm.nodeType === Node.TEXT_NODE) {
      result += elm.wholeText;
    }
  }

  return result;
}

describe('ng2v-highlight', () => {

  beforeEach(() => {
    TestBed.overrideModule(Ng2vTypeaheadModule, {set: {exports: [Ng2vHighlight]}});
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [Ng2vTypeaheadModule.forRoot()]});
  });

  it('should render highlighted text when there is one match', () => {
    const fixture = createTestComponent('<ng2v-highlight result="foo bar baz" term="bar"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe('foo <span class="ng2v-highlight">bar</span> baz');
  });

  it('should render highlighted text when there are multiple matches', () => {
    const fixture = createTestComponent('<ng2v-highlight result="foo bar baz bar foo" term="bar"></ng2v-highlight>');

    expect(highlightHtml(fixture))
        .toBe('foo <span class="ng2v-highlight">bar</span> baz <span class="ng2v-highlight">bar</span> foo');
  });

  it('should render highlighted text when there is a match at the beginning', () => {
    const fixture = createTestComponent('<ng2v-highlight result="bar baz" term="bar"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe('<span class="ng2v-highlight">bar</span> baz');
  });

  it('should render highlighted text when there is a match at the end', () => {
    const fixture = createTestComponent('<ng2v-highlight result="bar baz" term="baz"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe('bar <span class="ng2v-highlight">baz</span>');
  });

  it('should render highlighted text when there is a case-insensitive match', () => {
    const fixture = createTestComponent('<ng2v-highlight result="foo bAR baz" term="bar"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe('foo <span class="ng2v-highlight">bAR</span> baz');
  });

  it('should render highlighted text with special characters', () => {
    const fixture = createTestComponent('<ng2v-highlight result="foo (bAR baz" term="(BAR"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe('foo <span class="ng2v-highlight">(bAR</span> baz');
  });

  it('should render highlighted text for stringified non-string args', () => {
    const fixture = createTestComponent('<ng2v-highlight [result]="123" term="2"></ng2v-highlight>');
    fixture.detectChanges();
    expect(highlightHtml(fixture)).toBe('1<span class="ng2v-highlight">2</span>3');
  });

  it('should behave reasonably for blank result', () => {
    const fixture = createTestComponent('<ng2v-highlight [result]="null" term="2"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe('');
  });

  it('should not convert null result to string', () => {
    const fixture = createTestComponent('<ng2v-highlight [result]="null" term="null"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe('');
  });

  it('should properly detect matches in 0 result', () => {
    const fixture = createTestComponent('<ng2v-highlight [result]="0" term="0"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe(`<span class="ng2v-highlight">0</span>`);
  });

  it('should not higlight anything for blank term', () => {
    const fixture = createTestComponent('<ng2v-highlight result="1null23" [term]="null"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe('1null23');
  });

  it('should not higlight anything for blank term', () => {
    const fixture = createTestComponent(`<ng2v-highlight result="123" [term]="''"></ng2v-highlight>`);

    expect(highlightHtml(fixture)).toBe('123');
  });

  it('should properly higlight zeros', () => {
    const fixture = createTestComponent(`<ng2v-highlight result="0123" [term]="0"></ng2v-highlight>`);

    expect(highlightHtml(fixture)).toBe('<span class="ng2v-highlight">0</span>123');
  });

  it('should support custom highlight class', () => {
    const fixture = createTestComponent('<ng2v-highlight result="123" [term]="2" highlightClass="my"></ng2v-highlight>');

    expect(highlightHtml(fixture)).toBe('1<span class="my">2</span>3');
  });
});


@Component({selector: 'test-cmp', template: ''})
class TestComponent {
}
