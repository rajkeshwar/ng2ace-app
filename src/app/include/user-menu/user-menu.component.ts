import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[layout-topbar-usermenu]',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  @Input() usermenu:any;

  constructor() { }

  ngOnInit() {
  }

}
