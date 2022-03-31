import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudObtenerArchivoBase64PorUrl } from '../../modelos/documentos-api-servicio-modelo';
import { VisualizarImagenDato } from '../../modelos/visualizar-imagen-dato';
import { DocumentosApiService } from '../../services/documentos-api/documentos-api.service';
import { EnviarDatosModalService } from '../../services/enviar-datos-modal/enviar-datos-modal.service';
import { MeensajeOnBoardService } from '../../services/meensaje-on-board/meensaje-on-board.service';
import { VisualizarImagenComponent } from '../visualizar-imagen/visualizar-imagen.component';

@Component({
  selector: 'lib-form-requisitios',
  templateUrl: './form-requisitios.component.html',
  styleUrls: ['./form-requisitios.component.scss']
})
export class FormRequisitiosComponent implements OnInit {
  @Input() tabDataSource: any[] = [];
  @Output() rowClicked = new EventEmitter();


  tipoArchivo: string = 'imagen';
  pathArchivo: string = '';

  constructor(
    private servicioDocumento: DocumentosApiService,
    private enviarDatosModalService: EnviarDatosModalService,
    private ventanaModal: NgbModal,
    private mensajeOnBoardService: MeensajeOnBoardService
  ) { }

  ngOnInit(): void {
  }

  rowClickedEvent(data: any) {
    this.rowClicked.emit(data);
  }

  // Visualiza la imagen
  visualizarImagen(data: any): void {
    if (data.ruta !== undefined && data.ruta !== undefined && data.ruta != '') {
      window.open(data.ruta);
    } else {
      this.mensajeOnBoardService.showMensaje('No se puede acceder al archivo', 'info');
    }
    /* const solicitudDocumento: SolicitudObtenerArchivoBase64PorUrl = {
      urlArchivo: data.ruta
    };
    this.servicioDocumento.postObtenerArchivoBase64PorUrl(solicitudDocumento)
      .subscribe(respuesta => {
        if (respuesta !== null && respuesta.ArchivoBase64 !== null && respuesta.ArchivoBase64 !== '') {
          const tipoArchivo = this.obtenerTipoArchivo(data.nombre);
          let archivo = respuesta.ArchivoBase64;
          if (tipoArchivo === 'pdf') {
            archivo = archivo.replace('data:application/pdf;base64,', '');
          }
          const dato: VisualizarImagenDato = {
            tipo: tipoArchivo,
            imagenBase64: archivo,
            visualizarUrl: false,
            url: ''
          };

          this.enviarDatosModalService.setData(dato);
          this.ventanaModal.open(VisualizarImagenComponent);
        } else {
          this.mensajeOnBoardService.showMensaje('No se pudo obtener el archivo', 'info');
        }
      }); */

  }

  // Obtiene el tipo de archivo
  obtenerTipoArchivo(archivoNombre: string): string {
    const tipoArchivo: string = archivoNombre.toLocaleLowerCase().indexOf('.pdf') !== -1 ? 'pdf' : 'imagen';

    return tipoArchivo;
  }

}
