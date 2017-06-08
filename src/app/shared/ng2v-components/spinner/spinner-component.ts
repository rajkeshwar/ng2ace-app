import { Component, Input, Directive, ElementRef, Pipe, PipeTransform } from '@angular/core';


@Component({
    selector: 'ng2v-spinner',
    template: `
        <div class="ng2v-spinner" [ngSwitch]="spinnerType">
            <div class="sk-rotating-plane" *ngSwitchCase="'sk-rotating-plane'"></div>

            <div class="sk-double-bounce" *ngSwitchCase="'sk-double-bounce'">
                <div class="sk-child sk-double-bounce1"></div>
                <div class="sk-child sk-double-bounce2"></div>
            </div>

            <div class="sk-wave" *ngSwitchCase="'sk-wave'">
                <div class="sk-rect sk-rect1"></div>
                <div class="sk-rect sk-rect2"></div>
                <div class="sk-rect sk-rect3"></div>
                <div class="sk-rect sk-rect4"></div>
                <div class="sk-rect sk-rect5"></div>
            </div>

            <div class="sk-wandering-cubes" *ngSwitchCase="SPINNER_TYPE.SK_WANDERING_CUBES">
                <div class="sk-cube sk-cube1"></div>
                <div class="sk-cube sk-cube2"></div>
            </div>

            <div class="sk-spinner sk-spinner-pulse" *ngSwitchCase="SPINNER_TYPE.SK_SPINNER_PULSE"></div>

            <div class="sk-chasing-dots" *ngSwitchCase="SPINNER_TYPE.SK_CHASING_DOTS">
                <div class="sk-child sk-dot1"></div>
                <div class="sk-child sk-dot2"></div>
            </div>

            <div class="sk-three-bounce" *ngSwitchCase="SPINNER_TYPE.SK_THREE_BOUNCE">
                <div class="sk-child sk-bounce{{item}}" *ngFor="let item of items | limit:3"></div>
            </div>

            <div class="sk-circle" *ngSwitchCase="SPINNER_TYPE.SK_CIRCLE">
                <div class="sk-circle{{item}} sk-child" *ngFor="let item of items | limit:12"></div>
            </div>

            <div class="sk-cube-grid" *ngSwitchCase="SPINNER_TYPE.SK_CUBE_GRID">
                <div class="sk-cube sk-cube{{item}}" *ngFor="let item of items | limit:9"></div>
            </div>

            <div class="sk-fading-circle" *ngSwitchCase="SPINNER_TYPE.SK_FADING_CIRCLE">
                <div class="sk-circle{{item}} sk-circle" *ngFor="let item of items | limit:12"></div>
            </div>

            <div class="sk-folding-cube" *ngSwitchCase="SPINNER_TYPE.SK_FOLDING_CUBE">
                <div class="sk-cube{{item}} sk-cube" *ngFor="let item of items | limit:12"></div>
            </div>

            <div class="load8">
                <div class="sk-linear-circle" *ngSwitchCase="SPINNER_TYPE.SK_LINEAR_CIRCLE"></div>
            </div>

            <div class="load2">
                <div class="sk-spin-circle" *ngSwitchCase="SPINNER_TYPE.SK_SPIN_CIRCLE"></div>
            </div>

        </div>
    `,
})
export class Ng2vSpinner  { 

    // `square-flip` | `circle-zoom` | `sk-vertical-bars` | `sk-circle` | `sk-fading-circle`    
    @Input() spinnerType: string;
    @Input() isVisible: boolean;

    SPINNER_TYPE = {
        SK_ROTATING_PLANE :'sk-rotating-plane',
        SK_DOUBLE_BOUNCE: 'sk-double-bounce',
        SH_WAVE: 'sk-wave', 
        SK_WANDERING_CUBES: 'sk-wandering-cubes', 
        SK_SPINNER_PULSE: 'sk-spinner-pulse',
        SK_CHASING_DOTS: 'sk-chasing-dots', 
        SK_THREE_BOUNCE: 'sk-three-bounce', 
        SK_CIRCLE: 'sk-circle', 
        SK_CUBE_GRID: 'sk-cube-grid',
        SK_FADING_CIRCLE: 'sk-fading-circle', 
        SK_FOLDING_CUBE: 'sk-folding-cube',
        SK_LINEAR_CIRCLE: 'sk-linear-circle',
        SK_SPIN_CIRCLE: 'sk-spin-circle'
    }

    public items:Array<number> = [];

    constructor() {
        for(let i = 1; i < 20; i++) {
            this.items.push(i); 
        }
        
    }
}

@Pipe({ name: 'limit'})
export class LimitPipe implements PipeTransform{
    transform( items, limit ) {
        return items.slice(0, limit);
    }
}