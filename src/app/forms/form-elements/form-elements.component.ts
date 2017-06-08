import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.css']
})
export class FormElementsComponent implements OnInit {

  public formElements:any;
  public states:any;
  
  constructor(private http:Http) { }

  ngOnInit() {

    this.http.get('assets/data/pages/form-elements.json')
      .map( resp => resp.json())
      .subscribe(formElements => this.formElements = formElements);

    this.http.get('assets/data/pages/partials/form-elements/states.json')
      .map( resp => resp.json())
      .subscribe( states => this.states = states);
  }

}
