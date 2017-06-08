import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public invoice:any = {};

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('assets/data/pages/partials/invoice/invoice.json')
      .map( resp => resp.json())
      .subscribe( invoice => this.invoice = invoice);
  }

}
