
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'lib-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss'],
})
export class FormTemplateComponent implements OnInit {
  @Input() formTitle: string = '';
  @Input() hasButtonClose: boolean = false;
  @Input() closeControl: boolean = true;
  @Output() clickedButtonClose = new EventEmitter();
  
  constructor(
    private modalService: NgbActiveModal,
    private servicioConfirmacion: ConfirmationService
  ) { }

  ngOnInit(): void {
  }
  /* onCloseModal() {
    let configTemp = this.config;
    this.config.size = 'sm';
    this.config.centered = true;
    this.config.beforeDismiss = () => {
      this.config = configTemp;
      this.modalService.close();
      // this.modalServiceGlobal.dismissAll();
      return true;
    }
    if (!this.closeControl) {
      this.meensajeOnBoardService.showMensajePopup("Información", "Si cierra perderá todos los cambios")
      this.modalServiceGlobal.open(MensajeBoardPopupComponent);
    }
    this.clickedButtonClose.emit('');
  } */

  onCloseModal(): void {
    if (this.closeControl) {
      this.servicioConfirmacion.info('', 'Si cierra perderá todos los cambios').subscribe((status) => {
        if (status === Confirmation.Status.confirm) {
          //this.clickedButtonClose.emit('');
          this.modalService.close();
          return true;
        }
      });
    } else {
      this.modalService.close();
    }

  }

}
