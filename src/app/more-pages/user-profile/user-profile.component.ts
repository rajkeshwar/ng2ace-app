import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public page:any = {};
  public activities:any = [];
  public friends:any = [];
  public info1:any;
  public info2:any;
  public stats:any;

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('assets/data/pages/profile.json')
        .map( resp => resp.json())
        .subscribe( page => this.page = page);

    this.http.get('assets/data/pages/partials/profile/activities.json')
        .map( resp => resp.json())
        .subscribe( activities => this.activities = activities);

    this.http.get('assets/data/pages/partials/profile/friends.json')
        .map( resp => resp.json())
        .subscribe( friends => this.friends = friends);

    this.http.get('assets/data/pages/partials/profile/info1.json')
        .map( resp => resp.json())
        .subscribe( info1 => this.info1 = info1);

    this.http.get('assets/data/pages/partials/profile/info2.json')
        .map( resp => resp.json())
        .subscribe( info2 => this.info2 = info2);

    this.http.get('assets/data/pages/partials/profile/stats.json')
        .map( resp => resp.json())
        .subscribe( stats => this.stats = stats);
  }

}
