import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService, CreateUpdateCitaDto, ObtenerDisponibilidadEntrada, ObtenerServicioCalendarioEntrada, PeriodoDisponibleDto, ServicioCalendarioService } from '@mre/cita/proxy/cita';
import { EstadoCita } from '@mre/cita/proxy/models';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AgendarCitaEntrada } from '../../modelos/agendar-cita-entrada';
import { AgendarCitaSalida } from '../../modelos/agendar-cita-salida';


@Component({
  selector: 'lib-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit, AfterViewInit {

  @Input() datosEntrada: AgendarCitaEntrada;
  @Output() cambioDatosFormulario = new EventEmitter<AgendarCitaSalida>();

  showPreCheckError = false;
  preCheckMensajeError = '';
  procesando = false;

  maxDate: any;
  minDate: any;

  listaHorarios: string[];

  formularioDisponibilidad: FormGroup;
  mostrarFormularioDisponibilidad = false;

  mostrarMensajeErrorCrear = false;
  mensajeErrorCrear = '';

  unidadAdminitrativaNombre: string;
  servicioNombre: string;
  fechaSeleccionada: string;
  horaSeleccionada: string;

  constructor(
    private servicioCita: CitaService,
    private servicioCalendarioServicio: ServicioCalendarioService,
    private fb: FormBuilder
  ) { }

  ngAfterViewInit(): void {
    const fechaHoy = new Date();
    this.minDate = { year: fechaHoy.getUTCFullYear(), month: fechaHoy.getUTCMonth() + 1, day: fechaHoy.getDate() };
    this.listaHorarios = [];

    this.validarAgendamiento();
  }

  ngOnInit(): void {

  }

  validarAgendamiento(): void {
    this.preCheckMensajeError = '';
    const estadoCita: EstadoCita = EstadoCita.Registrado;

    const entrada: CreateUpdateCitaDto = {
      unidadAdministrativaId: this.datosEntrada.unidadAdministrativaId,
      servicioId: this.datosEntrada.servicioId,
      estado: estadoCita,
      personaId: this.datosEntrada.personaId,
    };

    const request = this.servicioCita.existeCitaAgendadaByEntrada(entrada);
    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(respuesta => {
        if (respuesta === true) {
          this.preCheckMensajeError = 'Ya existe una cita agendada con igual características';
          this.showPreCheckError = true;
        } else {
          this.validarExistenciaHorarios();
        }
      });
  }

  validarExistenciaHorarios(): void {
    this.procesando = true;
    const datosEntrada: ObtenerServicioCalendarioEntrada = {
      unidadAdministrativaId: this.datosEntrada.unidadAdministrativaId,
      servicioId: this.datosEntrada.servicioId,
    }

    const request = this.servicioCalendarioServicio.existePorServicioUnidadAdministrativaByEntrada(datosEntrada);

    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(respuesta => {
        if (respuesta === true) {
          this.obtenerInformacionCalendario();
        } else {
          this.preCheckMensajeError = 'No hay disponibilidad';
          this.showPreCheckError = true;
        }
      });
  }

  obtenerInformacionCalendario(): void {
    this.procesando = true;
    const datosEntrada: ObtenerServicioCalendarioEntrada = {
      unidadAdministrativaId: this.datosEntrada.unidadAdministrativaId,
      servicioId: this.datosEntrada.servicioId,
    }

    const request = this.servicioCalendarioServicio.obtenerPorServicioUnidadAdministrativaByEntrada(datosEntrada);
    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(respuesta => {
        const duracion: number = respuesta.length > 0 ? respuesta[0].diasDisponibilidad : 90;
        let fechaHoy = new Date();
        fechaHoy.setDate(fechaHoy.getDate() + duracion);
        this.maxDate = { year: fechaHoy.getUTCFullYear(), month: (fechaHoy.getMonth() + 1), day: fechaHoy.getDate() };
        this.construirFormularioValidacion();
      });
  }

  construirFormularioValidacion(): void {
    this.formularioDisponibilidad = this.fb.group({
      fecha: [null, [Validators.required]],
      horario: [null, [Validators.required]],
    });
    this.mostrarFormularioDisponibilidad = true;
    this.procesando = false;

    this.formularioDisponibilidad.valueChanges.subscribe(() => {
      this.cambioValoresFormulario();
    });
  }

  cambioFechaHorario(): void {
    this.formularioDisponibilidad.controls.horario.setValue(null);
    this.obtenerDisponibilidad();
  }

  obtenerDisponibilidad(): void {
    this.procesando = true;

    const temporalDate: NgbDateStruct = this.formularioDisponibilidad.controls.fecha.value;
    const myDate = new Date(temporalDate.year, temporalDate.month - 1, temporalDate.day);
    const dateIso = myDate.toISOString();

    const datosEntrada: ObtenerDisponibilidadEntrada = {
      unidadAdministrativaId: this.datosEntrada.unidadAdministrativaId,
      servicioId: this.datosEntrada.servicioId,
      fecha: dateIso
    };
    const request = this.servicioCalendarioServicio.obtenerPeriodosDisponiblesByEntrada(datosEntrada);
    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(respuesta => {
        this.publicarHorarios(respuesta);
      });
  }

  publicarHorarios(periodos: PeriodoDisponibleDto[]): void {
    if (periodos.length === 0) {
      return;
    }
    this.listaHorarios = periodos[0].horarios;
  }

  cambioValoresFormulario(): void {
    const formularioValido = !this.formularioDisponibilidad.invalid;
    let fecha = '';
    if (formularioValido) {
      const horario = this.formularioDisponibilidad.controls.horario.value;
      const fechaTemporal: NgbDateStruct = this.formularioDisponibilidad.controls.fecha.value;
      let mesTexto = fechaTemporal.month.toString();
      mesTexto = mesTexto.length == 2 ? mesTexto : ('0' + mesTexto);
      const fechaIso: string = fechaTemporal.year.toString() + '-' + mesTexto + '-' + fechaTemporal.day.toString() + 'T' + horario;

      fecha = fechaIso;
    }

    const datosFormulario: CreateUpdateCitaDto = {
      unidadAdministrativaId: this.datosEntrada.unidadAdministrativaId,
      servicioId: this.datosEntrada.servicioId,
      inicio: fecha,
      estado: EstadoCita.Registrado
    };

    const datosFormularioEnviar: AgendarCitaSalida = {
      datos: datosFormulario,
      formularioValido: formularioValido
    };

    this.cambioDatosFormulario.emit(datosFormularioEnviar);
  }


  continuarFormularioValidacion(): void {
    /* if (this.formularioDisponibilidad.invalid) {
      return;
    }

    this.procesando = true;
    this.mostrarFormularioDisponibilidad = false;

    const horario = this.formularioDisponibilidad.controls.horario.value;
    const fechaTemporal: NgbDateStruct = this.formularioDisponibilidad.controls.fecha.value;
    let mesTexto = fechaTemporal.month.toString();
    mesTexto = mesTexto.length == 2 ? mesTexto : ('0' + mesTexto);
    const fechaIso: string = fechaTemporal.year.toString() + '-' + mesTexto + '-' + fechaTemporal.day.toString() + 'T' + horario;

    const estadoCita: EstadoCita = EstadoCita.Registrado;

    const entrada: CreateUpdateCitaDto = {
      unidadAdministrativaId: this.datosEntrada.unidadAdministrativaId,
      servicioId: this.datosEntrada.servicioId,
      inicio: fechaIso,
      estado: estadoCita
    };

    const request = this.servicioCita.agendarByEntrada(entrada);
    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(respuesta => {
        if (respuesta.satisfactorio === true) {
          this.publicarPantallaFinal();
        } else {
          this.mensajeErrorCrear = respuesta.mensajeError;
          this.mostrarMensajeErrorCrear = true;
        }
      }); */

  }

  cancelar() {
    // this.mostrarFormularioDisponibilidad = true;
  }

}
