import {Injectable} from '@angular/core';

/**
 * Configuration service for the Ng2vSideMenu component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the sidemenu used in the application.
 */
@Injectable()
export class Ng2vSidemenuConfig {
    isOpen = false;
    zIndex = 0;
    isMenuOpen = false;
    styles = {top: '60px'};
    menus = [
        {'icon': 'fa-home', label: 'Home', href: 'keymetrics'},
        {'icon': 'fa-dashboard', label: 'Dashboard', href: 'http://app-ft-30.mem-tw.veraction.net:7550/workbench'},
        {'icon': 'fa-wrench', label: 'Geometrics', href: 'geometrics'},
        {'icon': 'fa-microchip', label: 'Modes', href: 'modes'},
        {'icon': 'fa-bar-chart', label: 'Insights', href: 'http://app-ft-30.mem-tw.veraction.net:7370/'},
        {'icon': 'fa-code', label: 'Reports'},
        {'icon': 'fa-list-alt', label: 'AEM', href: 'http://10.10.10.108:7080/'},
        {'icon': 'fa-line-chart', label: 'TTSM', subMenus: [
            {'icon': 'fa-line-chart', label: 'Insights'},
            {'icon': 'fa-line-chart', label: 'Variance'},
            {'icon': 'fa-line-chart', label: 'Advicer'}
        ]}
    ];
}
