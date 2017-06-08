import {
  AfterContentChecked,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';

import {isString} from '../util/util';

import {Ng2vAccordionConfig} from './accordion-config';

let nextId = 0;

/**
 * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
 */
@Directive({selector: 'ng-template[ng2vPanelTitle]'})
export class Ng2vPanelTitle {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * This directive must be used to wrap accordion panel content.
 */
@Directive({selector: 'ng-template[ng2vPanelContent]'})
export class Ng2vPanelContent {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * The Ng2vPanel directive represents an individual panel with the title and collapsible
 * content
 */
@Directive({selector: 'ng2v-panel'})
export class Ng2vPanel {
  /**
   *  A flag determining whether the panel is disabled or not.
   *  When disabled, the panel cannot be toggled.
   */
  @Input() disabled = false;

  /**
   *  An optional id for the panel. The id should be unique.
   *  If not provided, it will be auto-generated.
   */
  @Input() id = `ng2v-panel-${nextId++}`;

  /**
   *  The title for the panel.
   */
  @Input() title: string;

  /**
   *  Accordion's types of panels to be applied per panel basis.
   *  Bootstrap 4 recognizes the following types: "success", "info", "warning" and "danger".
   */
  @Input() type: string;

  @ContentChild(Ng2vPanelContent) contentTpl: Ng2vPanelContent;
  @ContentChild(Ng2vPanelTitle) titleTpl: Ng2vPanelTitle;
}

/**
 * The payload of the change event fired right before toggling an accordion panel
 */
export interface Ng2vPanelChangeEvent {
  /**
   * Id of the accordion panel that is toggled
   */
  panelId: string;

  /**
   * Whether the panel will be opened (true) or closed (false)
   */
  nextState: boolean;

  /**
   * Function that will prevent panel toggling if called
   */
  preventDefault: () => void;
}

/**
 * The Ng2vAccordion directive is a collection of panels.
 * It can assure that only one panel can be opened at a time.
 */
@Component({
  selector: 'ng2v-accordion',
  exportAs: 'ng2vAccordion',
  host: {'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels'},
  template: `
  <ng-template ngFor let-panel [ngForOf]="panels">
    <div class="panel panel-default">
      <div role="tab" id="{{panel.id}}-header"
        [class]="'panel-heading ' + (panel.type ? 'card-'+panel.type: type ? 'card-'+type : '')" [class.active]="isOpen(panel.id)">
        <h4 class="panel-title">
          <a class="accordion-toggle" href (click)="!!toggle(panel.id)" [class.text-muted]="panel.disabled" [attr.tabindex]="(panel.disabled ? '-1' : null)"
            [attr.aria-expanded]="isOpen(panel.id)" [attr.aria-controls]="(isOpen(panel.id) ? panel.id : null)"
            [attr.aria-disabled]="panel.disabled" [class.collapsed]="!isOpen(panel.id)">
            {{panel.title}}<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
          </a>
        </h4>
      </div>
      <div id="{{panel.id}}" role="tabpanel" [attr.aria-labelledby]="panel.id + '-header'" class="panel-collapse" [ngClass]="{'in':isOpen(panel.id), 'collapse':!isOpen(panel.id)}">
        <div class="panel-body">
          <ng-template [ngTemplateOutlet]="panel.contentTpl.templateRef"></ng-template>
        </div>
      </div>
      </div>
  </ng-template>
`
})
export class Ng2vAccordion implements AfterContentChecked {
  /**
   * A map that stores each panel state
   */
  private _states: Map<string, boolean> = new Map<string, boolean>();

  /**
   * A map that stores references to all panels
   */
  private _panelRefs: Map<string, Ng2vPanel> = new Map<string, Ng2vPanel>();

  @ContentChildren(Ng2vPanel) panels: QueryList<Ng2vPanel>;

  /**
   * An array or comma separated strings of panel identifiers that should be opened
   */
  @Input() activeIds: string | string[] = [];

  /**
   *  Whether the other panels should be closed when a panel is opened
   */
  @Input('closeOthers') closeOtherPanels: boolean;

  /**
   *  Accordion's types of panels to be applied globally.
   *  Bootstrap 4 recognizes the following types: "success", "info", "warning" and "danger".
   */
  @Input() type: string;

  /**
   * A panel change event fired right before the panel toggle happens. See Ng2vPanelChangeEvent for payload details
   */
  @Output() panelChange = new EventEmitter<Ng2vPanelChangeEvent>();

  constructor(config: Ng2vAccordionConfig) {
    this.type = config.type;
    this.closeOtherPanels = config.closeOthers;
  }

  /**
   * Programmatically toggle a panel with a given id.
   */
  toggle(panelId: string) {
    const panel = this._panelRefs.get(panelId);

    if (panel && !panel.disabled) {
      const nextState = !this._states.get(panelId);
      let defaultPrevented = false;

      this.panelChange.emit(
          {panelId: panelId, nextState: nextState, preventDefault: () => { defaultPrevented = true; }});

      if (!defaultPrevented) {
        this._states.set(panelId, nextState);

        if (this.closeOtherPanels) {
          this._closeOthers(panelId);
        }
        this._updateActiveIds();
      }
    }
  }

  ngAfterContentChecked() {
    // active id updates
    if (isString(this.activeIds)) {
      this.activeIds = (this.activeIds as string).split(/\s*,\s*/);
    }
    this._updateStates();

    // closeOthers updates
    if (this.activeIds.length > 1 && this.closeOtherPanels) {
      this._closeOthers(this.activeIds[0]);
      this._updateActiveIds();
    }
  }

  /**
   * @internal
   */
  isOpen(panelId: string): boolean { return this._states.get(panelId); }

  private _closeOthers(panelId: string) {
    this._states.forEach((state, id) => {
      if (id !== panelId) {
        this._states.set(id, false);
      }
    });
  }

  private _updateActiveIds() {
    this.activeIds =
        this.panels.toArray().filter(panel => this.isOpen(panel.id) && !panel.disabled).map(panel => panel.id);
  }

  private _updateStates() {
    this._states.clear();
    this._panelRefs.clear();
    this.panels.toArray().forEach((panel) => {
      this._states.set(panel.id, this.activeIds.indexOf(panel.id) > -1 && !panel.disabled);
      this._panelRefs.set(panel.id, panel);
    });
  }
}
