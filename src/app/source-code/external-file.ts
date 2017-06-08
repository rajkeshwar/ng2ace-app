/**
 * @author   : Rajkeshwawr Prasad (rajkeshwar.pd@gmail.com) 
 * @date     : 2017-06-07 17:25:51 
 * @copyright: (c) 2016 Kanerika Software Pvt. Ltd. 
 * @website  : http://kanerika.com/ 
 */

import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';

declare var require:any;

@Directive({ selector:'[htmlTemplate]'})
export class HtmlTemplateDirective implements OnChanges {

    @Input('htmlTemplate') templateUrl:string;

    constructor(private el: ElementRef) {}

    ngOnChanges() {
        this.el.nativeElement.innerHTML = require(`${this.templateUrl}`);
    }
}