import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input() activities:any;

  constructor() { }

  ngOnInit() {
  }

}
