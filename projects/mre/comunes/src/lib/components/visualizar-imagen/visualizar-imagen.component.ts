import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VisualizarImagenDato } from '../../modelos/visualizar-imagen-dato';
import { EnviarDatosModalService } from '../../services/enviar-datos-modal/enviar-datos-modal.service';

@Component({
  selector: 'lib-visualizar-imagen',
  templateUrl: './visualizar-imagen.component.html',
  styleUrls: ['./visualizar-imagen.component.css']
})
export class VisualizarImagenComponent implements OnInit {

  tipoArchivo = '';
  archivo = '';

  constructor(
    private enviarDatosModalService: EnviarDatosModalService
  ) { }

  ngOnInit(): void {
    const dato: VisualizarImagenDato = this.enviarDatosModalService.getData();

    this.tipoArchivo = dato.tipo;
    this.archivo = dato.visualizarUrl ? dato.url : dato.imagenBase64;
  }

}
