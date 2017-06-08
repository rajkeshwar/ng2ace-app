import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

  public page:any = {};
  public members:any = [];

  constructor(private http:Http) { }

  ngOnInit() {

    this.http.get('assets/data/pages/widgets.json')
      .map( resp => resp.json())
      .subscribe( page => this.page = page);

    this.http.get('assets/data/pages/partials/widgets/members.json')
      .map( resp => resp.json())
      .subscribe( members => this.members = members);

  }

}
