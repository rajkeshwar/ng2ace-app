import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public comments = [];
  public isVisible = true;

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('assets/data/layouts/partials/default/topbar_messages.json')
      .map( resp => resp.json())
      .subscribe( comments => this.comments = comments);
  }

  closeAlert() {
    this.isVisible = false;
  }
}
