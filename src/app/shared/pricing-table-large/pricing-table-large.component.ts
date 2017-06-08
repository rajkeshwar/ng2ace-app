import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pricing-table-large',
  templateUrl: './pricing-table-large.component.html',
  styleUrls: ['./pricing-table-large.component.css']
})
export class PricingTableLargeComponent implements OnInit {

  @Input() pricing:any;
  
  constructor() { }

  ngOnInit() {
  }

}
