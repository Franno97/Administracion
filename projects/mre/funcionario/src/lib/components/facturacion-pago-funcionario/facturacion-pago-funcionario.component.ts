import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnviarDatosModalService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VisualizarImagenComponent } from 'projects/mre/comunes/src/lib/components/visualizar-imagen/visualizar-imagen.component';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { SolicitudObtenerPagoServicio } from 'projects/mre/comunes/src/lib/modelos/pagos-api-servicio-modelos';
import { VisualizarImagenDato } from 'projects/mre/comunes/src/lib/modelos/visualizar-imagen-dato';
import { PagosApiService } from 'projects/mre/comunes/src/lib/services/pagos-api/pagos-api.service';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-facturacion-pago-funcionario',
  templateUrl: './facturacion-pago-funcionario.component.html',
  styleUrls: ['./facturacion-pago-funcionario.component.css']
})
export class FacturacionPagoFuncionarioComponent implements OnInit {

  formData: FormGroup;
  formTitle: string;
  data: any;

  visaTitular: boolean;

  registrosMostrar: any[];
  pagoId = '';

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private servicioPagos: PagosApiService,
    private ventanaModal: NgbModal,
    private configStateService: ConfigStateService,
    private tramitesPendientesService: TramitesPendientesService,
    private modalService: NgbActiveModal
  ) { }

  ngOnInit(): void {
    let dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;

    let tramite = this.data as TramitesObj;
    this.visaTitular = !(tramite.solicitanteId == tramite.beneficiarioId);

    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);

    this.obtenerPago();
  }

  // Obtiene el pago del trámite
  obtenerPago(): void {
    const solicitud: SolicitudObtenerPagoServicio = {
      idTramite: this.data.id,
      valoresMayoraCero: true,
      facturarEn: '0'
    };
    this.servicioPagos.postObtenerPago(solicitud).subscribe(respuesta => {
      console.log(respuesta);
      this.publicarPagos(respuesta.result.listaPagoDetalle);
    });
  }

  // Publica los pagos
  publicarPagos(registros: any[]): void {
    this.registrosMostrar = [];
    registros.forEach(x => {
      this.pagoId = x.idPago;
      const pago = {
        id: x.id,
        descripcion: x.descripcion,
        numeroOrden: x.ordenPago,
        numeroTransaccion: x.numeroTransaccion,
        claveAcceso: '',
        valor: x.valorTotal,
        tipoArchivo: '',
        imagenBase64: '',
        puedeVer: false,
      };

      this.registrosMostrar.push(pago);
    });
  }

  verImagen(registro: any): void {
    const dato: VisualizarImagenDato = {
      tipo: registro.tipoArchivo,
      imagenBase64: registro.imagenBase64,
      visualizarUrl: false,
      url: ''
    };
    this.enviarDatosModalService.setData(dato);
    this.ventanaModal.open(VisualizarImagenComponent);
  }

  onCloseModal(): void {

  }

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    // movimiento.estado = 23;
    movimiento.estado = EstadoTramite.VerificarVisas;

    this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService);
  }

}
