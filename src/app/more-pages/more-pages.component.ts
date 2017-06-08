import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-more-pages',
  templateUrl: './more-pages.component.html',
  styleUrls: ['./more-pages.component.css']
})
export class MorePagesComponent implements OnInit {

  public page:any = {};

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('assets/data/pages/gallery.json')
        .map( resp => resp.json())
        .subscribe( page => this.page = page);
  }

}
