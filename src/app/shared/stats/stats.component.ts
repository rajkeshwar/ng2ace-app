import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @Input() stats:any;

  constructor() { }

  ngOnInit() {
  }

}
