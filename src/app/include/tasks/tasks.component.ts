import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[layout-topbar-tasks]',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() tasks:any;

  constructor() { } 

  ngOnInit() {
  }

}
