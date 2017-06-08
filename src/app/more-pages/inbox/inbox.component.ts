import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public messages:Array<any>;

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('assets/data/pages/partials/inbox/messages.json')
      .map( resp => resp.json())
      .subscribe( messages => this.messages = messages);
  }

}
