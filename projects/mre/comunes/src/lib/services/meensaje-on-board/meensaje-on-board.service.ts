import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { MensajeBoardPopupComponent } from '../../components/mensaje-board-popup/mensaje-board-popup.component';

@Injectable({
  providedIn: 'root'
})

export class MeensajeOnBoardService {
  mensajeArr: Array<Object>;
  mensajePopup: any;
  constructor(
    private modalServiceGlobal: NgbModal,
    private modalService: NgbActiveModal,
    private config: NgbModalConfig
    // private modalServiceActive:NgbModalRef,
  ) {
    this.mensajeArr = [];
  }
  //notificaciones
  //---------------------------------------
  showMensajePredefinido(tipoMensaje: string) {
    let msg: any;
    switch (tipoMensaje) {
      case 'info':
        msg = { mensaje: "Debe tomar el trámite antes de seguir con el proceso", tipoMensaje: 'info' };
        break;
      case 'success':
        msg = { mensaje: "Guardado satisfactoriamente", tipoMensaje: 'success' };
        break;
    }
    this.showMensaje(msg.mensaje, msg.tipoMensaje);
  }

  showMensaje(mensaje: string, tipoMensaje: string) {
    let data = { mensaje: mensaje, classMensaje: 'bg-' + tipoMensaje };
    this.mensajeArr.push(data);
    timer(3000).subscribe(x => {
      this.mensajeArr.splice(0, 1);
    });
  }
  getMensajes() {
    return this.mensajeArr;
  }
  //-------------------------------
  //popup de mensaje
  showMensajePopup(tituloMensaje: string, mensaje: string, option: string = '') {
    this.mensajePopup = { formTitle: tituloMensaje, mensaje: mensaje, option: option, msgConfirmAction: false };
  }
  getMensajePopup() {
    return this.mensajePopup;
  }
  showMensajePopupConfirmacion(tituloMensaje: string, mensaje: string, option: string = ''): Promise<any> {
    this.mensajePopup = { formTitle: tituloMensaje, mensaje: mensaje, option: option, msgConfirmAction: true };
    let configTemp = this.config;
    this.config.size = 'sm';
    this.config.centered = true;
    this.config.beforeDismiss = () => {
      this.config = configTemp;
      this.modalService.close();
      return true;
    }
    var modalRef = this.modalServiceGlobal.open(MensajeBoardPopupComponent);
    return modalRef.result;
  }
}

