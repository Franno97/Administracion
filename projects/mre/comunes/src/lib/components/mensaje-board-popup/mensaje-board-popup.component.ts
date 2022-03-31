import { Component,OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { MeensajeOnBoardService } from '../../services/meensaje-on-board/meensaje-on-board.service';

@Component({
  selector: 'lib-mensaje-board-popup',
  templateUrl: './mensaje-board-popup.component.html',
  styleUrls: ['./mensaje-board-popup.component.scss']
})
export class MensajeBoardPopupComponent implements OnInit {
  dataObj = {
    formTitle:'',
    mensaje:'',
    option:'',
    msgConfirmAction:false
  };

  constructor( 
               private modalService: NgbActiveModal,
               private config: NgbModalConfig,
               private meensajeOnBoardService:MeensajeOnBoardService) { 

               }

  ngOnInit(): void {
    this.dataObj = this.meensajeOnBoardService.getMensajePopup();
  }
  onCloseModal(){
   this.config.size = 'xl';
   this.config.centered = false; 
   this.modalService.close();
  }
  onCloseModalAceptar(){
    this.config.size = 'xl';
    this.config.centered = false; 
    if(!this.dataObj.msgConfirmAction)
      this.modalService.dismiss();
     else
     this.modalService.close(this.dataObj.msgConfirmAction); 
}
}