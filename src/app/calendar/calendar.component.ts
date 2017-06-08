import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public page:any = {};

  constructor(private http:Http) { }

  ngOnInit() {
    
    this.http.get('assets/data/pages/calendar.json')
      .map( resp => resp.json())
      .subscribe( page => this.page = page);
  }

}
