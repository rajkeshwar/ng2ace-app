import { Directive, ElementRef, HostListener, Input } from '@angular/core';

declare var $:any;

@Directive({selector: '[slim-scroll]'})
export class SlimScrollDirective {
    constructor(private el: ElementRef) { 
        $(this.el.nativeElement).slimScroll({height: '100%'});
    }
}
