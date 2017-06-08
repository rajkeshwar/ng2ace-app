import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  public messages:Array<any>;

  constructor(private http:Http) {}

  ngOnInit() {
    this.http.get('assets/data/pages/partials/inbox/messages.json')
      .map( resp => resp.json())
      .subscribe( messages => this.messages = messages);
  }

  getCssClass( label ) {
    return 'badge-' + label;
  }

}
