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
import { SolicitudObtenerPagoServicio, SolicitudValidarComprobante } from 'projects/mre/comunes/src/lib/modelos/pagos-api-servicio-modelos';
import { VisualizarImagenDato } from 'projects/mre/comunes/src/lib/modelos/visualizar-imagen-dato';
import { PagosApiService } from 'projects/mre/comunes/src/lib/services/pagos-api/pagos-api.service';
import { ClienteExternoService, ConsultarPagoRespuesta } from 'projects/mre/registro-persona/src/lib/proxy/mre/sb/registro-persona/proceso';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-validar-pago-consultor',
  templateUrl: './validar-pago-consultor.component.html',
  styleUrls: ['./validar-pago-consultor.component.scss']
})
export class ValidarPagoConsultorComponent implements OnInit {

  // tabDataSource: Array<any> = [];
  radioButtons = [
    { label: 'Pago válido', idFor: 'consultorRadioButton1' },
    { label: 'Pago no válido - Enviar a subsanación', idFor: 'consultorRadioButton2' },
    { label: 'Pago no válido - Enviar a negativa', idFor: 'consultorRadioButton3' },
  ];

  formData: FormGroup;
  formTitle: string;
  radioButtonChecked: string = 'consultorRadioButton1';
  data: any;
  visaTitular: boolean;
  observacionesName: string = "Datos Personales";
  observacionesAnteriores: string = '';
  entroSubsanacionObservaciones: boolean = false;

  movimientoActivo: MovimientoRequest;
  observacionesModel: any;
  observacionesObj: any = {};

  registrosMostrar: any[];
  pagoId = '';

  habilitarBotonGuardar = true;
  mostrarDatosCuenta = false;
  datosCuenta: ConsultarPagoRespuesta;

  datosSolicitanteCompartido: DatosSolicitanteCompartidoModelo;
  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private tramitesPendientesService: TramitesPendientesService,
    private configStateService: ConfigStateService,
    private modalService: NgbActiveModal,
    private servicioPagos: PagosApiService,
    private ventanaModal: NgbModal,
    private mensajeOnBoardService: MeensajeOnBoardService,
    private servicioClienteExterno: ClienteExternoService
  ) { }

  ngOnInit(): void {
    let dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;

    let tramite = this.data as TramitesObj;
    this.visaTitular = !(tramite.solicitanteId == tramite.beneficiarioId);
    this.movimientoActivo = tramite.movimientos[tramite.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;
    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);

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
    const solicitud: SolicitudObtenerPagoServicio = {
      idTramite: this.data.id,
      valoresMayoraCero: true,
      facturarEn: '0'
    };
    this.servicioPagos.postObtenerPago(solicitud).subscribe(respuesta => {
      this.publicarPagos(respuesta.result.listaPagoDetalle);
    });
  }

  // Publica los pagos
  publicarPagos(registros: any[]): void {
    this.registrosMostrar = [];
    registros.forEach(x => {
      this.pagoId = x.idPago;
      const tipoArchivo = this.obtenerTipoArchivo(x.comprobantePago);

      const pago = {
        id: x.id,
        descripcion: x.descripcion,
        numeroOrden: x.ordenPago,
        numeroTransaccion: x.numeroTransaccion,
        fechaPago: x.fechaPago,
        valor: x.valorTotal,
        tipoArchivo: tipoArchivo,
        imagenBase64: x.comprobantePago,
        puedeVer: x.comprobantePago !== null && x.comprobantePago !== undefined && x.comprobantePcomprobantePago !== '',
      };

      this.registrosMostrar.push(pago);
    });
  }

  // Retorna el tipo de archivo
  obtenerTipoArchivo(archivo: string): string {
    if (archivo !== null && archivo !== undefined && archivo !== '') {
      if (archivo.indexOf('data:application/pdf') !== -1) {
        return 'pdf';
      } else if (archivo.indexOf('data:image/') !== -1) {
        return 'imagen';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  // Realiza la validación de los comprobantes
  validarComprobantes(): void {

    // this.habilitarBotonGuardar = false;
    this.mostrarDatosCuenta = false;
    this.datosCuenta = null;

    if (this.existeComprobanteRepetido()) {
      this.mensajeOnBoardService.showMensaje('Existen comprobantes repetidos', 'info');
    } else {
      let solicitudes: SolicitudValidarComprobante[] = [];
      this.registrosMostrar.forEach(x => {
        const solicitud: SolicitudValidarComprobante = {
          idPagoDetalle: x.id,
          numeroTransaccion: x.numeroTransaccion
        };
        solicitudes.push(solicitud);
      });
      this.servicioPagos.postValidarComprobante(solicitudes)
        .subscribe(respuesta => {
          if (respuesta.httpStatusCode === 200) {
            this.accionComprobanteValido();
          } else if (respuesta.httpStatusCode === 400) {
            this.accionComprobanteInvalido();
          }
        });
    }


  }

  // Si existe comprobante repetido
  existeComprobanteRepetido(): boolean {
    let resultado = false;
    let valoresVistos: string[] = [];
    this.registrosMostrar.forEach(x => {
      const registroExiste = valoresVistos.find(v => v === x.numeroTransaccion);
      if (registroExiste !== undefined && registroExiste !== null && registroExiste !== '') {
        resultado = true;
      }
      valoresVistos.push(x.numeroTransaccion);
    });

    return resultado;
  }

  // Ejecuta acciones cuando el comprobante es inválido
  accionComprobanteInvalido(): void {
    // Mostrar mensaje que el número está siendo usado en otra transacción
    this.mensajeOnBoardService.showMensaje('El número está siendo usado en otra transacción', 'info');

    this.radioButtons = [
      { label: 'Pago no válido - Enviar a subsanación', idFor: 'consultorRadioButton2' },
      { label: 'Pago no válido - Enviar a negativa', idFor: 'consultorRadioButton3' },
    ];
  }

  // Ejecuta acciones cuando el comprobante es válido
  accionComprobanteValido(): void {
    const numeroComprobante: string = this.registrosMostrar[0].numeroTransaccion;
    if (numeroComprobante === null || numeroComprobante === undefined || numeroComprobante === '') {
      this.radioButtons = [
        { label: 'Pago no válido - Enviar a subsanación', idFor: 'consultorRadioButton2' },
        { label: 'Pago no válido - Enviar a negativa', idFor: 'consultorRadioButton3' },
      ];
      this.mensajeOnBoardService.showMensaje('El número del comprobante es inválido', 'success');
      return;
    }
    const solicitud = this.servicioClienteExterno.consultarPago(numeroComprobante);
    solicitud.subscribe(respuesta => {
      this.mostrarResultadoConsultarPago(respuesta);
    });
  }

  // Realiza las acciones en dependencia del resultado de consultar el pago
  mostrarResultadoConsultarPago(respuesta: ConsultarPagoRespuesta): void {
    if (respuesta.codigoBanEcuador === -1) {
      this.radioButtons = [
        { label: 'Pago no válido - Enviar a subsanación', idFor: 'consultorRadioButton2' },
        { label: 'Pago no válido - Enviar a negativa', idFor: 'consultorRadioButton3' },
      ];
      this.mensajeOnBoardService.showMensaje('El número del comprobante es inválido', 'success');
    } else {
      this.datosCuenta = respuesta;
      this.mostrarDatosCuenta = true;
      this.habilitarBotonGuardar = true;
    }
  }

  clicRadioButton(radioId: string) {
    this.radioButtonChecked = radioId;
  }

  //Ver la imagen del comprobante de pago
  verImagen(registro: any): void {
    let archivoBase64 = registro.imagenBase64;
    archivoBase64 = archivoBase64.replace('data:application/pdf;base64,', '');
    const dato: VisualizarImagenDato = {
      tipo: registro.tipoArchivo,
      imagenBase64: archivoBase64,
      visualizarUrl: false,
      url: ''
    };
    this.enviarDatosModalService.setData(dato);
    this.ventanaModal.open(VisualizarImagenComponent);
  }

  comprobarObservacionesDesactivarOptionPositiva() {
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    // this.comprobarObservacionesDesactivarOptionPositiva();
  }

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    let accionMovimiento = '';

    switch (this.radioButtonChecked) {
      case 'consultorRadioButton1'://pago valido
        // movimiento.estado = 22;
        movimiento.estado = EstadoTramite.VerificarInformacion;
        accionMovimiento = 'Pago válido';
        break;
      case 'consultorRadioButton2'://Pago no válido - Enviar a subsanación
        // movimiento.estado = 21;
        movimiento.estado = EstadoTramite.SubsanarPago;
        accionMovimiento = 'Pago no válido - Enviar a subsanación';
        break;
      case 'consultorRadioButton3'://NO Pago no válido - Enviar a negativa
        // movimiento.estado = 27;
        movimiento.estado = EstadoTramite.VerificarInformacionNegativa;
        accionMovimiento = 'Pago no válido - Enviar a negativa';
        break;
    }
    this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService, accionMovimiento);
  }

  onCloseModal() {
    // this.modalService.close();
  }

}
