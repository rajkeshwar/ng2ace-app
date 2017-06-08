import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public messages = [];
  public notifications = [];
  public tasks = [];
  public usermenu = [];

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('assets/data/layouts/partials/default/topbar_messages.json')
      .map( resp => resp.json())
      .subscribe( messages => this.messages = messages);

    this.http.get('assets/data/layouts/partials/default/topbar_notifications.json')
      .map( resp => resp.json())
      .subscribe( notifications => this.notifications = notifications);

    this.http.get('assets/data/layouts/partials/default/topbar_tasks.json')
      .map( resp => resp.json())
      .subscribe( tasks => this.tasks = tasks);

    this.http.get('assets/data/layouts/partials/default/topbar_tasks.json')
      .map( resp => resp.json())
      .subscribe( usermenu => this.usermenu = usermenu);
  }

}
