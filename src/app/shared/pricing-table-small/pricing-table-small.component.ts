import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pricing-table-small',
  templateUrl: './pricing-table-small.component.html',
  styleUrls: ['./pricing-table-small.component.css']
})
export class PricingTableSmallComponent implements OnInit {

  @Input() pricing:any;

  constructor() {}

  ngOnInit() {
  }

}
