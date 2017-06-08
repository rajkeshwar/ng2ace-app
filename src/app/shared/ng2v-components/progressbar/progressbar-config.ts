import {Injectable} from '@angular/core';

/**
 * Configuration service for the Ng2vProgressbar component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
@Injectable()
export class Ng2vProgressbarConfig {
  max = 100;
  animated = false;
  striped = false;
  type: string;
  showValue: boolean = false;
}
