import {Injectable} from '@angular/core';

/**
 * Configuration service for the Ng2vTypeahead component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
@Injectable()
export class Ng2vTypeaheadConfig {
  editable = true;
  focusFirst = true;
  showHint = false;
}
