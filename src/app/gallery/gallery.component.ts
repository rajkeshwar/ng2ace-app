import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public page:any = {};

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('assets/data/pages/gallery.json')
        .map( resp => resp.json())
        .subscribe( page => this.page = page);
  }

}
