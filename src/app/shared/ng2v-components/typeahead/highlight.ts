import {Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges} from '@angular/core';
import {regExpEscape, toString} from '../util/util';

@Component({
  selector: 'ng2v-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">` +
      `<span *ngIf="isOdd" class="{{highlightClass}}">{{part}}</span><ng-template [ngIf]="!isOdd">{{part}}</ng-template>` +
      `</ng-template>`,  // template needs to be formatted in a certain way so we don't add empty text nodes
  styles: [`
    .ng2v-highlight {
      font-weight: bold;
    }
  `]
})
export class Ng2vHighlight implements OnChanges {
  parts: string[];

  @Input() highlightClass = 'ng2v-highlight';
  @Input() result: string;
  @Input() term: string;

  ngOnChanges(changes: SimpleChanges) {
    const resultStr = toString(this.result);
    const resultLC = resultStr.toLowerCase();
    const termLC = toString(this.term).toLowerCase();
    let currentIdx = 0;

    if (termLC.length > 0) {
      this.parts = resultLC.split(new RegExp(`(${regExpEscape(termLC)})`)).map((part) => {
        const originalPart = resultStr.substr(currentIdx, part.length);
        currentIdx += part.length;
        return originalPart;
      });
    } else {
      this.parts = [resultStr];
    }
  }
}
