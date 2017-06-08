import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  @Input() photos:any;

  constructor() { }

  ngOnInit() {
  }

}
