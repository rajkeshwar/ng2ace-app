import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import 'prismjs';

declare var require:any;
declare var Prism:any;

@Component({
    selector: 'code-view',
    template: `
        <code class="language-{{language}}">
            <pre [innerHTML]="higlightedCodeHTML" class="language-{{language}}">
            </pre>
        </code>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [require('prismjs/themes/prism-coy.css')] 
})
export class CodeView implements OnInit {
    constructor() { 
        console.log('Prism: ', Prism);
    }

    @Input() language:string;

    @Input() 
    set content(content: string) {
        this.higlightedCodeHTML = Prism.highlight(content, this.language ? Prism.languages[this.language] : '');
        
    }
    get name() { return this.higlightedCodeHTML; }

    @Input() 

    higlightedCodeHTML:string;

    ngOnInit() {
        
    }
}