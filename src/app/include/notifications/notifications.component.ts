import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[layout-topbar-notifications]',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  @Input() notifications:any;

  constructor() { }

  ngOnInit() {
  }

}
