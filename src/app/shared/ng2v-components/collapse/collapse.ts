import {Directive, Input} from '@angular/core';

/**
 * The Ng2vCollapse directive provides a simple way to hide and show an element with animations.
 */
@Directive({
  selector: '[ng2vCollapse]',
  exportAs: 'ng2vCollapse',
  host: {'[class.collapse]': 'true', '[class.show]': '!collapsed'}
})
export class Ng2vCollapse {
  /**
   * A flag indicating collapsed (true) or open (false) state.
   */
  @Input('ng2vCollapse') collapsed = false;
}
