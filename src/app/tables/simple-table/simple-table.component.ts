import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent implements OnInit {

  public domain1:any;
  public domain2:any;

  constructor(private http:Http) { }

  ngOnInit() {

    this.http.get('assets/data/pages/partials/tables/domains1.json')
      .map( resp => resp.json())
      .subscribe( domain1 => this.domain1 = domain1);
    
    this.http.get('assets/data/pages/partials/tables/domains2.json')
      .map( resp => resp.json())
      .subscribe( domain2 => this.domain2 = domain2);

  }

}
