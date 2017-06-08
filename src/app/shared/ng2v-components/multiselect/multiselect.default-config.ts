import {Injectable} from '@angular/core';

@Injectable()
export class Ng2vMultiselectDefaultConfig {
    pullRight: false;
    enableSearch: true;
    checkedStyle: 'checkboxes';
    buttonClasses: 'btn btn-default btn-secondary';
    selectionLimit: 0;
    closeOnSelect: false;
    autoUnselect: false;
    showCheckAll: true;
    showUncheckAll: true;
    dynamicTitleMaxItems: 1;
    maxHeight: '300px';
}
