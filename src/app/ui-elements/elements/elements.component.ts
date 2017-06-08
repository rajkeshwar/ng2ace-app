import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2vModal } from '../../shared/ng2v-components/modal/modal';
import { ModalDismissReasons } from '../../shared/ng2v-components/modal/modal-dismiss-reasons';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent {

  public alerts: Array<IAlert> = [];
  public closeResult: string;
  private backup: Array<IAlert>;
  public combined:Array<any>;
  
  constructor(private modalService: Ng2vModal) {
    this.alerts.push({
      id: 1,
      type: 'success',
      message: 'This is an success alert',
    }, {
      id: 2,
      type: 'info',
      message: 'This is an info alert',
    }, {
      id: 3,
      type: 'warning',
      message: 'This is a warning alert',
    }, {
      id: 4,
      type: 'danger',
      message: 'This is a danger alert',
    });
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));


    this.combined = [
      {type: 'success', value: 35},
      {type: 'warning', value: 20},
      {type: 'danger', value: 10}
    ];
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }

  panelChange( panel ) {
    console.log('Panel change called ', panel);
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}



export interface IAlert {
  id: number;
  type: string;
  message: string;
}