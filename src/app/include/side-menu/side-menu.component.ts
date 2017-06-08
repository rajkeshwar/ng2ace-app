import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {


  public sideMenuList:any;

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('assets/data/layouts/partials/default/side_menu.json')
      .map( resp => resp.json())
      .subscribe( menus => this.sideMenuList = menus);
  }

}
