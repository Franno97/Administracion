import { ConfigStateService, ListResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObtenerSignatarioInput, UnidadAdministrativaService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { EnviarDatosModalService, MeensajeOnBoardService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { VisaElectronica, VisaService } from '@mre/visa';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '@proxy/identidad';
import { SignatarioConUsuarioDto } from 'projects/mre/administrative-unit/src/lib/components/add-signer/add-signer.component';
import { DatosBeneficiarioCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-beneficiario-compartido-modelo';
import { DatosSolicitanteModelo } from 'projects/mre/comunes/src/lib/modelos/datos-solicitante-modelo';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { SolicitudGenerarVisaPorTramiteId } from 'projects/mre/comunes/src/lib/modelos/reportes-api-servicio-modelo';
import { ReportesApiService } from 'projects/mre/comunes/src/lib/services/reportes-api/reportes-api.service';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-generar-visa-electronica-funcionario',
  templateUrl: './generar-visa-electronica-funcionario.component.html',
  styleUrls: ['./generar-visa-electronica-funcionario.component.scss']
})
export class GenerarVisaElectronicaFuncionarioComponent implements OnInit {
  /* tabHeader: Array<any> = [
    { name: 'Descripción', propiedad: '' },
    { name: 'Ver', propiedad: '' },
    { name: 'Clave de acceso', propiedad: '' },
  ]; */
  tabDataSource: Array<any> = [];
  formData: FormGroup;
  /* arrField1 = [
    { disabledx: true, placeHolder: "Días de vigencia", typeInput: "text", formCtrolName: "numberMDG", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Firma Electrónica", typeInput: "text", formCtrolName: "numberMDG", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Contraseña", typeInput: "text", formCtrolName: "numberMDG", icon: "fas fa-user-circle", contentInfo: false }
  ]; */
  data: any;
  formTitle: string;
  visaTitular: boolean;
  linksVisitedAll: boolean = false;
  observacionesName: string = "Datos Personales";
  observacionesAnteriores: string = '';
  entroSubsanacionObservaciones: boolean = false;

  movimientoActivo: MovimientoRequest;
  observacionesModel: any;
  observacionesObj: any = {};

  mostraPdfVisas = false;
  archivoBase64 = '';
  visaElectronica: VisaElectronica;

  signatarios: ListResultDto<SignatarioConUsuarioDto>;

  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;
  datosSolicitante: DatosSolicitanteModelo;

  constructor(
    private modalService: NgbActiveModal,
    private mensajeOnBoardService: MeensajeOnBoardService,
    private enviarDatosModalService: EnviarDatosModalService,
    private tramitesPendientesService: TramitesPendientesService,
    private configStateService: ConfigStateService,
    private servicioReporte: ReportesApiService,
    private servicioVisa: VisaService,
    private servicioUnidadAdministrativa: UnidadAdministrativaService,
    private servicioUsuario: UsuarioService
  ) {
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;

    const dataTemp1 = this.data as TramitesObj;
    // servicioId unidadAdministrativaIdCEV unidadAdministrativaIdZonal
    this.visaTitular = !(dataTemp1.solicitanteId == dataTemp1.beneficiarioId);
    this.movimientoActivo = dataTemp1.movimientos[dataTemp1.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;
    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);

    this.linksVisitedAll = dataTemp.tramiteAsignado;
    if (!this.linksVisitedAll) {
      this.mensajeOnBoardService.showMensajePredefinido("info");
    } else {
      this.consultarVisa();
    }


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

    this.datosSolicitante = {
      cedula: this.formData.controls['cedulaSolicitante'].value,
      nacionalidad: this.formData.controls['nacionalidadSolicitante'].value,
      nombreCompleto: this.formData.controls['nombreCompletSolicitanteo'].value,
      pais: this.formData.controls['paisSolicitante'].value,
      ciudad: this.formData.controls['ciudadSolicitante'].value,
      paisUnidadAdministrativa: this.formData.controls['paisConsuladoUnidadAdministrativaSolicitante'].value,
      direccion: this.formData.controls['cedulaSolicitante'].value,
      telefono: this.formData.controls['direccionSolicitante'].value,
      edad: this.formData.controls['edadSolicitante'].value,
      nombreUnidadAdministrativa: this.formData.controls['nombreConsuladoUnidadAdministrativaSolicitante'].value
    };

  }

  // Consulta los valores de la visa
  consultarVisa(): void {
    const solicitud = this.servicioVisa.consultarVisaElectronicaPorTramiteId(this.data.id);
    solicitud.subscribe(respuesta => {
      this.visaElectronica = respuesta;
      this.cargarSignatarios();
      this.descargarVisaPdf();
    });
  }

  // Carga la información de los signatarios
  cargarSignatarios(): void {
    const entradaBuscarSignatario: ObtenerSignatarioInput = {
      servicioId: this.data.servicioId
    };

    const consultaBuscarSignatario = this.servicioUnidadAdministrativa
      .buscarSignatarios(this.data.unidadAdministrativaIdCEV, entradaBuscarSignatario);
    consultaBuscarSignatario.subscribe(response => {
      let signatariosData = { items: [], totalCount: 0 } as ListResultDto<SignatarioConUsuarioDto>;
      signatariosData.items = response.items.map(item => ({ ...item, nombres: "", apellidos: "" }));

      // Obtener datos de usuarios
      let userIds = response.items.map(({ usuarioId }) => usuarioId);

      this.servicioUsuario.obtenerLista(userIds).subscribe((response) => {

        signatariosData.items.forEach(item => {
          item.nombres = response.find(u => u.id == item.usuarioId).name;
          item.apellidos = response.find(u => u.id == item.usuarioId).surname;
        });

        this.signatarios = signatariosData;
        console.log(this.signatarios);
      });

    });
  }

  // Descarga el pdf de la visa electrónica
  descargarVisaPdf(): void {
    const solicitudDato: SolicitudGenerarVisaPorTramiteId = {
      tramiteId: this.data.id
    };
    this.servicioReporte.postGenerarVisaPorTramiteId(solicitudDato)
      .subscribe(respuesta => {
        if (respuesta.estado.toLowerCase() === 'ok') {
          this.archivoBase64 = respuesta.base64;
          this.mostraPdfVisas = true;
        } else {
          // Mostrar error
          this.mensajeOnBoardService.showMensaje('Hubo error al obtener el documento de la visa', 'info');
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
    movimiento.estado = EstadoTramite.Terminado;
    movimiento.estadoOrigen = EstadoTramite.GenerarVisa;
    this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService);
  }

  comprobarObservacionesDesactivarOptionPositiva() {
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
  }

  onCloseModal() {
  }

}