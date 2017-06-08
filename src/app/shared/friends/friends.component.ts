import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Input() friends:any;

  constructor() { }

  ngOnInit() {
  }

}
