import { ConfigStateService } from '@abp/ng.core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CitaService, CreateUpdateCitaDto } from '@mre/cita/proxy/cita';
import { EnviarDatosModalService, MeensajeOnBoardService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendarCitaEntrada } from 'projects/mre/comunes/src/lib/modelos/agendar-cita-entrada';
import { AgendarCitaSalida } from 'projects/mre/comunes/src/lib/modelos/agendar-cita-salida';
import { DatosBeneficiarioCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-beneficiario-compartido-modelo';
import { DatosSolicitanteCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-solicitante-compartido-modelos';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { SoporteGestion } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/soporte-gestion';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-generar-cita-perito',
  templateUrl: './generar-cita-perito.component.html',
  styleUrls: ['./generar-cita-perito.component.scss']
})
export class GenerarCitaPeritoComponent implements OnInit {
  @Input() formData: FormGroup;
  linksVisitedAll: boolean = false;
  tabsHeader: Array<string> = [
    'Datos Personales',
    'Requisitos',
    'Soporte de Gestión'
  ];
  tabHeaderRequisitios = [{ name: 'Documento', propiedad: 'nombre' }, { name: 'Nombre documento', propiedad: 'ruta' }, { name: 'View', icon: ['fas fa-home'], valShow: 'icon' }];
  tabHeaderSoporteGestion = [{ name: 'Nombre', propiedad: 'nombre' }, { name: 'View', icon: ['fas fa-home'], valShow: 'icon' }];

  tabDataSourceRequisitios = [];
  tabDataSourceSoporteGestion = [];
  tramiteAsignado: boolean = false;
  linksArr: any;
  movimientoActivo: MovimientoRequest;
  data: any;
  formTitle: string;
  visaTitular: boolean;
  requisitos: boolean = true;
  observacionesName: string = 'Datos Personales';
  observacionesModel: any;
  observacionesAnteriores: string = '';
  entroSubsanacionMultas: boolean = false;
  entroSubsanacionObservaciones: boolean = false;
  //Para guardar temporalmente la obsservaciones;;;;
  observacionesObj: any = {};
  descripcionSoporteGestion: any = {};
  observacionesRequisitos: any = {};

  datosAgendarCitaEntrada: AgendarCitaEntrada;
  formularioCitaValido = false;
  datosFormularioAgendarCita: CreateUpdateCitaDto;

  datosSolicitanteCompartido: DatosSolicitanteCompartidoModelo;
  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;

  constructor(
    private meensajeOnBoardService: MeensajeOnBoardService,
    private modalService: NgbActiveModal,
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private tramitesPendientesService: TramitesPendientesService,
    private servicioCita: CitaService
  ) {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;

    const dataTemp1 = this.data as TramitesObj;
    this.visaTitular = !(dataTemp1.solicitanteId == dataTemp1.beneficiarioId);
    this.movimientoActivo = dataTemp1.movimientos[dataTemp1.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;


    const tramite = this.data as TramitesObj
    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
    this.tabDataSourceRequisitios = tramite.documentos;
    this.tabDataSourceSoporteGestion = tramite.soporteGestiones;
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    const ultimoMovimiento = dataTemp.data.movimientos[dataTemp.data.movimientos.length - 1];
    const usuarioIdUltimoMovimiento = ultimoMovimiento.usuarioId;
    const currentUser = this.configStateService.getOne('currentUser');

    // this.tramiteAsignado = dataTemp.tramiteAsignado;
    this.tramiteAsignado = usuarioIdUltimoMovimiento === currentUser.id;

    this.datosAgendarCitaEntrada = {
      unidadAdministrativaId: this.data.unidadAdministrativaIdZonal,
      servicioId: this.data.servicioId,
      personaId: this.data.personaId
    };

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

  }

  cambioDatosFormularioCita(datosFormulario: AgendarCitaSalida): void {
    this.formularioCitaValido = datosFormulario.formularioValido;
    this.datosFormularioAgendarCita = datosFormulario.datos;
  }

  comprobarObservacionesDesactivarOptionPositiva() {
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
  }

  comprobarLinkVistados(data: any) {
    let objObservacion = this.enviarDatosModalService.switchData(data.tabsName);
    this.observacionesName = (data.tabsName == 'Soporte de Gestión') ? "Generales" : data.tabsName;
    this.observacionesAnteriores = this.movimientoActivo[objObservacion];
    this.requisitos = (data.tabsName == 'Requisitos') ? false : true;
    this.observacionesModel = this.observacionesObj[objObservacion] == undefined ? '' : this.observacionesObj[objObservacion];
    if (data.linkVisited && !this.tramiteAsignado) {
      this.meensajeOnBoardService.showMensajePredefinido('info');
    }

    this.linksVisitedAll = data.linkVisited && this.tramiteAsignado;
  }

  onSubmit() {
    const currentUser = this.configStateService.getOne('currentUser');
    this.datosFormularioAgendarCita.funcionarioId = currentUser.id;
    this.datosFormularioAgendarCita.personaId = this.data.personaId;

    // Guardar el agendaniento de la cita
    const request = this.servicioCita.agendarByEntrada(this.datosFormularioAgendarCita);
    request.subscribe(respuesta => {
      if (respuesta.satisfactorio === true) {
        this.guardarMovimientos();
      } else {
        this.meensajeOnBoardService.showMensajePopup('Error', 'respuesta.mensajeError');
      }
    });

  }

  guardarMovimientos(): void {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    // movimiento.estado = 8;
    movimiento.estado = EstadoTramite.EfectuarCitaPeritaje;
    movimiento.fechaHoraCita = this.datosFormularioAgendarCita.inicio;
    let val: SoporteGestion;
    let dataObj2: any;
    for (let x in this.descripcionSoporteGestion) {
      val = this.descripcionSoporteGestion[x] as SoporteGestion;
      dataObj2 = {
        tramiteId: data.id,
        nombre: val.nombre,
        ruta: val.ruta,
        descripcion: val.descripcion,
        creatorId: currentUser.id
      }
      this.tramitesPendientesService.grabarInformacionArchivo(dataObj2).subscribe();
    }
    this.tramitesPendientesService.guardarObservRequisitosContinuarProcGuardado(this.observacionesRequisitos, movimiento, this.modalService);
  }

  rowClicked(data: any) {
    switch (data.option) {
      case 'Descripción':
        data.data.descripcion = data.value;
        this.descripcionSoporteGestion[data.rowIndex] = data.value;
        break;
      case 'Observaciones':
        data.data.observacion = data.value;
        this.observacionesRequisitos[data.rowIndex] = data.data;
        break;
    }
  }

  onCloseModal() {

  }
}
