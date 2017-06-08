import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-pricing-tables',
  templateUrl: './pricing-tables.component.html',
  styleUrls: ['./pricing-tables.component.css']
})
export class PricingTablesComponent implements OnInit {

  public largeTable:any;
  public smallTable:any;

  constructor(private http:Http) {}

  ngOnInit() {
    this.http.get('assets/data/pages/partials/pricing/packages-small.json')
      .map( resp => resp.json())
      .subscribe( smallTable => this.smallTable = smallTable);

    this.http.get('assets/data/pages/partials/pricing/packages-large.json')
      .map( resp => resp.json())
      .subscribe( largeTable => this.largeTable = largeTable);
  }

}
