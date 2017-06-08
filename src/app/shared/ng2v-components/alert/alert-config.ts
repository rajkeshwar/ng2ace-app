import {Injectable} from '@angular/core';

/**
 * Configuration service for the Ng2vAlert component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the alerts used in the application.
 */
@Injectable()
export class Ng2vAlertConfig {
  dismissible = true;
  type = 'warning';
}
