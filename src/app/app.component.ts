import { Component } from '@angular/core';
import { Broadcaster } from './source-code/broadcaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  
  activeRoute( route:string ):boolean {
      return new RegExp(route+'$').test(window.location.href);
  }

}
