import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-vizard-validation',
  templateUrl: './vizard-validation.component.html',
  styleUrls: ['./vizard-validation.component.css']
})
export class VizardValidationComponent implements OnInit {

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
