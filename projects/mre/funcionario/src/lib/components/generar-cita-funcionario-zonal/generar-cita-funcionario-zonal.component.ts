import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
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
  selector: 'lib-generar-cita-funcionario-zonal',
  templateUrl: './generar-cita-funcionario-zonal.component.html',
  styleUrls: ['./generar-cita-funcionario-zonal.component.scss']
})
export class GenerarCitaFuncionarioZonalComponent implements OnInit {
  formData: FormGroup;
  formTitle: string;
  linksVisitedAll: boolean = false;
  data: any;
  visaTitular: boolean;
  tramiteAsignado: boolean = false;
  movimientoActivo: MovimientoRequest;
  observacionesModel: any;
  observacionesObj: any = {};

  datosAgendarCitaEntrada: AgendarCitaEntrada;
  formularioCitaValido = false;
  datosFormularioAgendarCita: CreateUpdateCitaDto;

  datosSolicitanteCompartido: DatosSolicitanteCompartidoModelo;
  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;

  constructor(
    private modalService: NgbActiveModal,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private tramitesPendientesService: TramitesPendientesService,
    private servicioCita: CitaService) {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;

    const dataTemp1 = this.data as TramitesObj;
    this.visaTitular = !(dataTemp1.solicitanteId == dataTemp1.beneficiarioId);
    this.movimientoActivo = dataTemp1.movimientos[dataTemp1.movimientos.length - 1];
    this.observacionesModel = this.movimientoActivo[this.enviarDatosModalService.switchData('Datos Personales')];

    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.linksVisitedAll = this.tramiteAsignado = dataTemp.tramiteAsignado;
    if (!this.linksVisitedAll) {
      this.meensajeOnBoardService.showMensajePredefinido("info");
    }

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

  // Cuando se cambia un la fecha en la cita
  cambioDatosFormularioCita(datosFormulario: AgendarCitaSalida): void {
    this.formularioCitaValido = datosFormulario.formularioValido;
    this.datosFormularioAgendarCita = datosFormulario.datos;
  }

  onSubmit() {
    const currentUser = this.configStateService.getOne('currentUser');
    this.datosFormularioAgendarCita.funcionarioId = currentUser.id;

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
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    // movimiento.estado = 15;
    movimiento.estado = EstadoTramite.EfectuarCitaReconocimientoFacial;
    movimiento.fechaHoraCita = this.datosFormularioAgendarCita.inicio;
    this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService);
  }

  onCloseModal() {
  }
}
