/**
 * @author   : Rajkeshwawr Prasad (rajkeshwar.pd@gmail.com) 
 * @date     : 2017-05-11 14:51:24 
 * @copyright: (c) 2016 Kanerika Software Pvt. Ltd. 
 * @website  : https://www.docnme.com/ 
 */
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2vSidemenuConfig } from './sidemenu.config';

@Component({
    selector: 'ng2v-side-menu',
    template: `
        <aside class="main-sidebar" [ngStyle]="styles" [class.open]="isOpen" [style.z-index]="zIndex">
            <section class="sidebar">
                <ul class="group">
                <li class="group__item">
                    <div class="menu">
                    <div class="menu__logo" (click)="toggleCollapse()">
                        <i class="fa" area-hidden="true" [ngClass]="{
                            'fa-arrow-circle-right':!isOpen, 
                            'fa-arrow-circle-left':isOpen
                            }"></i>
                        </div>
                    <div class="menu__label"><span>Veraction</span></div> 
                    </div>
                </li>
                <li class="group__item" *ngFor="let menu of menus"> 
                    <div class="menu" (click)="toggleSubMenu(menu)">
                    <div class="menu__logo"><i class="fa {{menu.icon}}" area-hidden="true"></i></div>
                    <div class="menu__label"><span>{{menu.label}}</span></div>
                    <div class="menu__angle" *ngIf="menu?.subMenus?.length>0">
                        <i class="fa fa-angle-right" aria-hidden="true" [ngClass]="{
                            'fa-angle-right' : !menu.isExpanded,
                            'fa-angle-down' : menu.isExpanded
                        }"></i></div>
                    </div>
                    <ul class="sub-menu" [class.open]="menu.isExpanded">
                        <li class="sub-menu__item" *ngFor="let sb of menu.subMenus">
                        <a class="sub-link">{{sb.label}}</a>
                        </li>
                    </ul>
                </li>
                </ul>
            </section>
        </aside>
    `,
    encapsulation: ViewEncapsulation.None
})
export class Ng2vSideMenuComponent {

    public isOpen: boolean;
    public zIndex: number;
    public isMenuOpen: boolean;

    @Input() menus: Array<any> = [];
    @Input() styles: any = {};

    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private config: Ng2vSidemenuConfig) {

        this.menus = this.config.menus;
        this.styles = this.config.styles;

        this.menus = this.menus.map( eachMenu => {
            eachMenu.subMenus = eachMenu.subMenus || [];
            eachMenu.isExpanded = false;
            return eachMenu;
        });
    }

    toggleCollapse() {
        this.isOpen = !this.isOpen;
        if ( this.isOpen ) {
            this.zIndex = this.findMaxZIndex();
        }
    }

    toggleSubMenu( eachMenu ) {
        let index = this.menus.indexOf(eachMenu);
        this.menus[index].isExpanded = !eachMenu.isExpanded;

        if ( !eachMenu.href ) {
            return;
        }

        if ( /^(http|https::\/\/)/.test(eachMenu.href)) {
            window.location.href = eachMenu.href;
        } else {
            this.router.navigate([eachMenu.href]);
        }
    }

    findMaxZIndex() {

        let maxZIndex = 0;
        let elements = document.querySelectorAll('body *');

        // later, potentially repeatedly
        maxZIndex = Math.max(maxZIndex, ...[
        ...Array.from(elements)
        ].map(a => parseFloat(getComputedStyle(a).zIndex))
        .filter(a => !isNaN(a)));

        return maxZIndex;
    }
}
