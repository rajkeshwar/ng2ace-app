import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  public messages:Array<any>;

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('assets/data/pages/partials/inbox/messages.json')
      .map( resp => resp.json())
      .subscribe( messages => this.messages = messages);
  }

}
