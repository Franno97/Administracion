import { ConfigStateService } from '@abp/ng.core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-revision-datos-menor-edad-funcionario',
  templateUrl: './revision-datos-menor-edad-funcionario.component.html',
  styleUrls: ['./revision-datos-menor-edad-funcionario.component.scss']
})
export class RevisionDatosMenorEdadFuncionarioComponent implements OnInit {
  @Input() formData: FormGroup;
  @Output() allLinkVisited = new EventEmitter<boolean>();

  tabsHeader: Array<string> = [
    'Datos Personales',
    'Requisitos'
  ];
  tabHeaderRequisitios = [
    {
      name: 'Documento',
      propiedad: 'nombre'
    },
    {
      name: 'Nombre documento',
      propiedad: 'ruta'
    },
    {
      name: 'Subir',
      icon: ['fas fa-book']
    },
    {
      name: 'View',
      icon: ['fas fa-home']
    }
  ];

  tabDataSourceRequisitios = [];
  linksVisitedAll: boolean = false;
  data: any;
  formTitle: string;
  requisitos: boolean = true;
  tramiteAsignado: boolean = false;
  visaTitular: boolean;
  observacionesName: string = "Datos Personales";
  observacionesAnteriores: string = '';
  entroSubsanacionObservaciones: boolean = false;

  movimientoActivo: MovimientoRequest;
  observacionesModel: any;
  observacionesObj: any = {};
  observacionesRequisitos: any = {};

  datosAgendarCitaEntrada: AgendarCitaEntrada;
  formularioCitaValido = false;
  datosFormularioAgendarCita: CreateUpdateCitaDto;

  datosSolicitanteCompartido: DatosSolicitanteCompartidoModelo;
  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;

  constructor(
    private modalService: NgbActiveModal,
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private tramitesPendientesService: TramitesPendientesService,
    private servicioCita: CitaService
  ) {
    let dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;
    let tramite = this.data as TramitesObj;

    this.visaTitular = !(tramite.solicitanteId == tramite.beneficiarioId);
    this.movimientoActivo = tramite.movimientos[tramite.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;

    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
    this.tabDataSourceRequisitios = tramite.documentos;
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.tramiteAsignado = dataTemp.tramiteAsignado;

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

  onCloseModal(): void {
  }

  // Cuando se cambia un la fecha en la cita
  cambioDatosFormularioCita(datosFormulario: AgendarCitaSalida): void {
    this.formularioCitaValido = datosFormulario.formularioValido;
    this.datosFormularioAgendarCita = datosFormulario.datos;
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

  // Se guarda el movimiento
  guardarMovimientos(): void {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    // movimiento.estado = 6;//actualizar movimiento
    movimiento.estado = EstadoTramite.EfectuarCitaMenorEdad;
    movimiento.fechaHoraCita = this.datosFormularioAgendarCita.inicio;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    this.tramitesPendientesService.guardarObservRequisitosContinuarProcGuardado(this.observacionesRequisitos, movimiento, this.modalService);
  }

  comprobarLinkVistados(data: any) {
    let objObservacion = this.enviarDatosModalService.switchData(data.tabsName);
    this.observacionesName = (data.tabsName == 'Soporte de Gestión') ? "Generales" : data.tabsName;
    this.observacionesAnteriores = this.movimientoActivo[objObservacion];
    this.requisitos = (data.tabsName == 'Requisitos') ? false : true;
    this.observacionesModel = this.observacionesObj[objObservacion] == undefined ? '' : this.observacionesObj[objObservacion];
    if (!this.linksVisitedAll && !this.tramiteAsignado)
      this.meensajeOnBoardService.showMensajePredefinido("info");
    this.linksVisitedAll = data.linkVisited && this.tramiteAsignado;
  }

  comprobarObservacionesDesactivarOptionPositiva() {
    // for(let item in this.observacionesObj)
    // {
    //   if(this.observacionesObj[item] != '')
    //    {
    //     this.entroSubsanacionObservaciones = this.radioButtons[0].disabled = true;
    //     return;
    //    }
    // }
    // // this.entroSubsanacionObservaciones = this.radioButtons[3].disabled = this.entroSubsanacionMultas;
    // this.entroSubsanacionObservaciones = this.radioButtons[0].disabled = false;
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
  }

  rowClicked(data: any) {
    switch (data.option) {
      case 'Observaciones':
        data.data.observacion = data.value;
        this.observacionesRequisitos[data.rowIndex] = data.data;
        break;
    }
  }
}
