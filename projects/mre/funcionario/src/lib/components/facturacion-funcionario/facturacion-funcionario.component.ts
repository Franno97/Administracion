import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnviarDatosModalService, MeensajeOnBoardService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VisualizarImagenComponent } from 'projects/mre/comunes/src/lib/components/visualizar-imagen/visualizar-imagen.component';
import { DatosBeneficiarioCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-beneficiario-compartido-modelo';
import { DatosSolicitanteCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-solicitante-compartido-modelos';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { SolicitudCrearPdfServicio } from 'projects/mre/comunes/src/lib/modelos/factura-electronica-api-servicio-modelos';
import { SolicitudObtenerPagoServicio } from 'projects/mre/comunes/src/lib/modelos/pagos-api-servicio-modelos';
import { VisualizarImagenDato } from 'projects/mre/comunes/src/lib/modelos/visualizar-imagen-dato';
import { FacturaElectronicaApiService } from 'projects/mre/comunes/src/lib/services/factura-electronica-api/factura-electronica-api.service';
import { PagosApiService } from 'projects/mre/comunes/src/lib/services/pagos-api/pagos-api.service';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-facturacion-funcionario',
  templateUrl: './facturacion-funcionario.component.html',
  styleUrls: ['./facturacion-funcionario.component.scss']
})
export class FacturacionFuncionarioComponent implements OnInit {
  tabHeader: Array<any> = [
    { name: 'Descripción', propiedad: '' },
    { name: 'Ver', propiedad: '' },
    { name: 'Clave de acceso', propiedad: '' },
  ];
  tabDataSource: Array<any> = [];
  formTitle: string;
  formData: FormGroup;
  tramiteAsignado: boolean = false;
  linksVisitedAll: boolean = false;
  data: any;
  visaTitular: boolean;
  movimientoActivo: MovimientoRequest;
  observacionesName: string = 'Datos Personales';
  observacionesModel: any;
  observacionesAnteriores: string = '';
  entroSubsanacionMultas: boolean = false;
  entroSubsanacionObservaciones: boolean = false;
  //Para guardar temporalmente la obsservaciones;;;;
  observacionesObj: any = {};

  habilitadoBotonGuardar = true;
  registrosPagosMostrar: any[];

  datosSolicitanteCompartido: DatosSolicitanteCompartidoModelo;
  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private tramitesPendientesService: TramitesPendientesService,
    private configStateService: ConfigStateService,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private servicioPagos: PagosApiService,
    private ventanaModal: NgbModal,
    private servicioFacturaElectronica: FacturaElectronicaApiService,
    private servicioVentanaActiva: NgbActiveModal
  ) {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;

    const dataTemp1 = this.data as TramitesObj;

    this.visaTitular = !(dataTemp1.solicitanteId == dataTemp1.beneficiarioId);
    this.movimientoActivo = dataTemp1.movimientos[dataTemp1.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;

    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.linksVisitedAll = this.tramiteAsignado = dataTemp.tramiteAsignado;
    if (!this.linksVisitedAll) {
      this.meensajeOnBoardService.showMensajePredefinido("info");
    }

    this.datosSolicitanteCompartido = {
      cedula: this.formData.controls['cedulaSolicitante'].value,
      nacionalidad: this.formData.controls['nacionalidadSolicitante'].value,
      nombreCompleto: this.formData.controls['nombreCompletSolicitanteo'].value,
      pais: this.formData.controls['paisSolicitante'].value,
      ciudad: this.formData.controls['ciudadSolicitante'].value,
      telefono: this.formData.controls['telefonoSolicitante'].value,
      edad: this.formData.controls['edadSolicitante'].value,
      correoElectronico: this.formData.controls['correoSolicitante'].value
    };

    const tieneDiscapacidad: boolean = this.formData.controls['discapacidadBeneficiario'].value;

    this.datosBeneficiarioCompartido = {
      primerApellido: this.formData.controls['primerApellidoBeneficiario'].value,
      nombres: this.formData.controls['nombreCompletoBeneficiario'].value,
      paisNacimiento: this.formData.controls['paisNacimientoBeneficiario'].value,
      correoElectronico: this.formData.controls['emailBeneficiario'].value,
      nacionalidad: this.formData.controls['nacionalidadBeneficiario'].value,
      numeroDocumento: this.formData.controls['numeroPasaporteBeneficiario'].value,
      tieneDiscapacidad: tieneDiscapacidad ? 'Si' : 'No',
      numeroCarnetConadis: this.formData.controls['numeroCarnetConadisBeneficiario'].value,
      segundoApellido: this.formData.controls['segundoApellidoBeneficiario'].value,
      fechaNacimiento: this.formData.controls['fechaNacimientoBeneficiario'].value,
      edad: this.formData.controls['edadBeneficiario'].value,
      porcientoDiscapacidad: this.formData.controls['porcientoDiscapacidadBeneficiario'].value,
    };


    this.obtenerPago();
  }

  // Obtiene el pago del trámite
  obtenerPago(): void {
    const estadoTramite: number = EstadoTramite.Facturacion;
    const solicitud: SolicitudObtenerPagoServicio = {
      idTramite: this.data.id,
      valoresMayoraCero: false,
      facturarEn: estadoTramite.toString()
    };
    this.servicioPagos.postObtenerPago(solicitud).subscribe(respuesta => {
      this.publicarPagos(respuesta.result.listaPagoDetalle);
    });
  }

  // Publica los pagos
  publicarPagos(registros: any[]): void {
    this.registrosPagosMostrar = [];
    registros.forEach(x => {

      const pago = {
        id: x.id,
        descripcion: x.descripcion,
        numeroOrden: x.ordenPago,
        numeroTransaccion: x.numeroTransaccion,
        claveAcceso: x.claveAcceso,
        valor: x.valorTotal,
        imagenBase64: x.comprobantePago,
        puedeVerFactura: x.claveAcceso !== null && x.claveAcceso !== undefined && x.claveAcceso !== ''
      };

      this.registrosPagosMostrar.push(pago);
    });
  }

  // Para mostrar la factura
  visualizarFactura(registro: any): void {
    const solicitud: SolicitudCrearPdfServicio = {
      claveAcceso: registro.claveAcceso
    };
    this.servicioFacturaElectronica.postCrearPdf(solicitud)
      .subscribe(respuesta => {
        if (respuesta.estado === 'ERROR') {
          this.meensajeOnBoardService.showMensajePopupConfirmacion('Error', respuesta.message);
        } else {
          const dato: VisualizarImagenDato = {
            tipo: 'pdf',
            imagenBase64: respuesta.pdf,
            visualizarUrl: false,
            url: ''
          };
          this.enviarDatosModalService.setData(dato);
          this.ventanaModal.open(VisualizarImagenComponent);
        }
      });
  }

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    movimiento.estado = EstadoTramite.GenerarVisa;
    movimiento.estadoOrigen = EstadoTramite.Facturacion;
    // this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService);

    this.meensajeOnBoardService.showMensajePopupConfirmacion('Información', 'Desea continuar con la operación?')
      .then(aceptar => {
        if (aceptar) {
          this.habilitadoBotonGuardar = false;
          this.tramitesPendientesService.postCrearMovimiento(movimiento).subscribe(respuesta => {
            if (respuesta.httpStatusCode === 200) {
              this.meensajeOnBoardService.showMensajePredefinido('success');
              this.obtenerPago();
            } else {
              this.meensajeOnBoardService.showMensajePopupConfirmacion('Error', respuesta.message);
            }
          });
        }
      });
  }


  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;

  }

  onCloseModal() {
  }

  cerrarFormulario(): void {
    this.servicioVentanaActiva.close();
  }

}

