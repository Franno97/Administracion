import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';

import { ServicioCalendarioService, ServicioCalendarioDto, ServicioCalendarioLookupDto, CrearActualizarServicioCalendarioDto } from '@mre/cita/proxy/cita';
import { Horario, PlanDiario, PlanSemanal } from '@mre/cita/proxy/models';
import { ActivatedRoute } from '@angular/router';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ServicioDto } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { UnidadAdministrativaService, UnidadAdministrativaServicioDto } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';

const acciones = { 'crear': 'Crear', 'editar': 'Editar', 'ver': 'Visualizar' };

const accionesDescanso = { 'agregar': 'Agregar', 'guardar': 'Guardar', 'editar': 'Editar', 'ver': 'Visualizar', 'eliminar': 'Eliminar' };

export interface ServiciosCalendariosDto {
  id: string;
  unidadAdministrativaId?: string;
  servicioId?: string;
  nombre?: string;
  tipoServicio?: string;
  tipoServicioId?: string;
  configurado: boolean;
}

@Component({
  selector: 'lib-servicio-calendario',
  templateUrl: './servicio-calendario.component.html',
  styleUrls: ['./servicio-calendario.component.css'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class ServicioCalendarioComponent implements OnInit {

  lunes: PlanDiario = { dia: "Lunes", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  martes: PlanDiario = { dia: "Martes", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  miercoles: PlanDiario = { dia: "Miercoles", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  jueves: PlanDiario = { dia: "Jueves", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  viernes: PlanDiario = { dia: "Viernes", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  sabado: PlanDiario = { dia: "Sabado", horario: { inicio: '', fin: '' }, descanso: null };
  domingo: PlanDiario = { dia: "Domingo", horario: { inicio: '', fin: '' }, descanso: null };
  
  planSemanal: PlanDiario[] = [this.lunes, this.martes, this.miercoles, this.jueves, this.viernes, this.sabado, this.domingo];
  diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  administrativeUnitServices = { items: [], totalCount: 0 } as PagedResultDto<UnidadAdministrativaServicioDto>;
  serviciosCalendarios = { items: [], totalCount: 0 } as PagedResultDto<ServiciosCalendariosDto>;

  servicioCalendarioLookup: ServicioCalendarioLookupDto[];

  servicio: ServicioDto[];

  form: FormGroup;

  planTrabajoForm: FormGroup;

  configuraciones: FormArray = new FormArray([]);

  descansoForm: FormGroup;

  descansos: FormArray = new FormArray([]);

  arrayDescansos = [];

  selectedServicioCalendario = {} as ServicioCalendarioDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  horario: Horario;

  checked = false;
  unidadAdministrativaId = '';
  unidadAdministrativaNombre: string;
  accion = '';
  accionDescanso = '';

  diaSemana = '';
  indiceEditar = undefined;

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  constructor(public readonly list: ListService,
    private servicioCalendarioService: ServicioCalendarioService,
    private unidadAdministrativaService: UnidadAdministrativaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService) {
  }

  ngOnInit() {
    this.unidadAdministrativaId = this.route.snapshot.params.id;
    this.unidadAdministrativaNombre = this.route.snapshot.params.nombre;
    this.obtenerServiciosCalendario();
  }

  async obtenerServiciosCalendario() {
    const resultado = await this.servicioCalendarioService.getLookup().toPromise();
    this.servicioCalendarioLookup = resultado.items;

    this.unidadAdministrativaService
      .obtenerServiciosPorUnidadAdministrativaByUnidadAdministrativaId(this.unidadAdministrativaId).subscribe(respuesta => {
        this.servicio = respuesta.items;

        this.serviciosCalendarios.items = this.servicio.map(item => {
          let servicioCalendario = {} as ServiciosCalendariosDto;
          const estaConfigurado = this.estaConfigurado(this.unidadAdministrativaId, item.id)

          servicioCalendario.id = estaConfigurado.servicioCalendarioId;
          servicioCalendario.unidadAdministrativaId = this.unidadAdministrativaId;
          servicioCalendario.servicioId = item.id;
          servicioCalendario.nombre = item.nombre;
          servicioCalendario.tipoServicioId = item.tipoServicioId;
          servicioCalendario.tipoServicio = item.tipoServicio;
          servicioCalendario.configurado = estaConfigurado.estaConfigurado;

          return servicioCalendario;
        });

        this.serviciosCalendarios.totalCount = this.serviciosCalendarios.items.length;
      })
  }

  estaConfigurado(unidadAdministrativaId: string, servicioId: string) {
    const servicioCalendario = this.servicioCalendarioLookup.find(item => item.unidadAdministrativaId === unidadAdministrativaId && item.servicioId === servicioId);
    if (servicioCalendario) {
      return { estaConfigurado: true, servicioCalendarioId: servicioCalendario.id }
    }

    return { estaConfigurado: false, servicioCalendarioId: undefined }
  }

  buildPlanTrabajo() {
    this.planTrabajoForm = this.fb.group({
      configuraciones: this.configuraciones
    });
  }

  buildDescanso() {
    this.descansoForm = this.fb.group({
      descansos: this.descansos
    });
  }

  agregarPlanesDiarios(accion: string) {
    this.accionDescanso = accionesDescanso.ver;
    let configuraciones: PlanDiario[] = [];
    if (accion === acciones.editar) {
      configuraciones = this.selectedServicioCalendario.planTrabajo.configuraciones;
    } else {
      configuraciones = this.planSemanal;
    }

    configuraciones.forEach(item => {
      this.horario = item.horario;
      const inicio = item.horario?.inicio ? item.horario.inicio : null;
      const fin = item.horario?.fin ? item.horario.fin : null;

      if (accion === acciones.editar) {
        item.dia = this.obtenerNombreDiaPorOrden(Number(item.dia));
      }

      const descansos = item.descanso?.descansos;
      if (descansos !== undefined && descansos.length > 0) {
        descansos.forEach(horario => {
          const inicioDescanso = horario?.inicio;
          const finDescanso = horario?.fin;
          const descanso = this.fb.group({
            dia: item.dia,
            horario: this.fb.group({
              inicio: inicioDescanso,
              fin: finDescanso
            })
          });
          this.descansos.push(descanso)
        })

        this.arrayDescansos = this.descansos.controls;
      }

      const planDiario = this.fb.group({
        dia: [item.dia, Validators.required],
        horario: this.fb.group({
          inicio: inicio === null ? new FormControl({ value: '', disabled: true }) : new FormControl({ value: inicio, disabled: false }),
          fin: fin === null ? new FormControl({ value: '', disabled: true }) : new FormControl({ value: fin, disabled: false })
        }),
        descanso: item.descanso
      })
      this.configuraciones.push(planDiario);
    });
  }

  agregarDescanso() {
    this.accionDescanso = accionesDescanso.agregar;
    const descanso = this.fb.group({
      dia: [null],
      horario: this.fb.group({
        inicio: '',
        fin: ''
      })
    });
    this.descansos.push(descanso);
    this.arrayDescansos = [...this.descansos.controls];
  }

  guardarDescanso(index: number) {
    this.accionDescanso = accionesDescanso.ver;
    const diaSemana = this.descansos.at(index).value['dia'];
    const horarioDescanso = this.descansos.at(index).value['horario'];
    const indiceDiaSemana = this.diasSemana.indexOf(diaSemana);
    const planDiario = this.configuraciones.at(indiceDiaSemana);
    const descanso = planDiario.value['descanso'];
    let descansos = [];
    if (descanso !== null) {
      descansos = descanso['descansos'];
    }
    descansos.push(horarioDescanso);
    this.configuraciones.at(indiceDiaSemana).patchValue({ descanso: { descansos: descansos } });
    this.arrayDescansos = [...this.descansos.controls];
    this.indiceEditar = undefined;
  }

  editarDescanso(index: number) {
    this.arrayDescansos = [...this.descansos.controls];
    this.accionDescanso = accionesDescanso.editar;
    this.indiceEditar = index;
  }

  guardarEditarDescanso(index: number) {
    this.accionDescanso = accionesDescanso.ver;
    const diaSemana = this.descansos.at(index).value['dia'];
    const indiceDiaSemana = this.diasSemana.indexOf(diaSemana);

    let descansos = this.arrayDescansos.map(d => {
      if (d.value['dia'] === diaSemana) {
        return d.value['horario'];
      }
    })
    descansos = descansos.filter(Boolean);
    this.configuraciones.at(indiceDiaSemana).patchValue({ descanso: { descansos: descansos } });
    this.arrayDescansos = [...this.descansos.controls];
    this.indiceEditar = undefined;
  }

  quitarDescanso(index: number) {
    const diaSemana = this.descansos.at(index).value['dia'];
    const indiceDiaSemana = this.diasSemana.indexOf(diaSemana);
    this.descansos.removeAt(index);
    this.arrayDescansos = [...this.descansos.controls];

    let descansos = this.arrayDescansos.map(d => {
      if (d.value['dia'] === diaSemana) {
        return d.value['horario'];
      }
    })
    descansos = descansos.filter(Boolean);
    this.configuraciones.at(indiceDiaSemana).patchValue({ descanso: { descansos: descansos } });

    this.accionDescanso = accionesDescanso.ver;
  }

  cancelarDescanso(index: number) {
    this.arrayDescansos = [...this.descansos.controls];
    this.accionDescanso = accionesDescanso.ver;
    this.indiceEditar = undefined;
  }

  onCheckboxChange(event, rowIndex) {
    const control = this.configuraciones.at(rowIndex) as FormGroup;
    const horario = control.controls['horario'] as FormGroup;
    if (event.target.checked) {
      horario.controls['inicio'].enable();
      horario.controls['fin'].enable();
      horario.controls['inicio'].setValue('08:00');
      horario.controls['fin'].setValue('17:00');
    } else {
      horario.controls['inicio'].disable();
      horario.controls['fin'].disable();
      horario.controls['inicio'].setValue('');
      horario.controls['fin'].setValue('');
    }
  }

  createServicioCalendario(servicioId: string) {
    this.accion = '';
    this.configuraciones.clear();
    this.descansos.clear();
    this.arrayDescansos = [];
    const current = new Date();
    this.minDate = { year: current.getFullYear(), month: current.getMonth(), day: current.getDate() };
    this.maxDate = null;
    this.submitted = false;
    this.obtenerServicios();
    this.selectedServicioCalendario = {} as ServicioCalendarioDto;
    this.buildForm(servicioId);
    this.buildPlanTrabajo();
    this.agregarPlanesDiarios(acciones.crear);
    this.buildDescanso();

    this.isModalOpen = true;
  }

  editServicioCalendario(id: string, accion: string) {
    this.configuraciones.clear();
    this.descansos.clear();
    this.arrayDescansos = [];
    this.submitted = false;
    this.accion = accion;
    this.servicioCalendarioService.get(id).subscribe((response) => {
      this.selectedServicioCalendario = response;
      this.obtenerServicios();
      this.buildForm(this.selectedServicioCalendario.servicioId);
      this.form.get('servicioId').disable();
      this.buildPlanTrabajo();
      this.agregarPlanesDiarios(acciones.editar);
      this.buildDescanso();
      this.isModalOpen = true;
    });
  }

  buildForm(servicioId: string) {
    this.form = this.fb.group({
      unidadAdministrativaId: [this.selectedServicioCalendario.unidadAdministrativaId || this.unidadAdministrativaId, Validators.required],
      servicioId: [this.selectedServicioCalendario.servicioId || servicioId, Validators.required],
      duracion: [this.selectedServicioCalendario.duracion || '', [Validators.required]],
      inicioAgendamiento: [this.selectedServicioCalendario.inicioAgendamiento ? new Date(this.selectedServicioCalendario.inicioAgendamiento) : null,
      [Validators.required]],
      finAgendamiento: [this.selectedServicioCalendario.finAgendamiento ? new Date(this.selectedServicioCalendario.finAgendamiento) : null],
      planTrabajo: this.planTrabajoForm,
      diasDisponibilidad: [this.selectedServicioCalendario.diasDisponibilidad || '', [Validators.required]],
      citaAutomatica: [this.selectedServicioCalendario.citaAutomatica || false],
      horasGracia: [this.selectedServicioCalendario.horasGracia || 0, [Validators.required]],
      usarVentanillas: [this.selectedServicioCalendario.usarVentanillas || false],
    });
  }

  obtenerServicios() {
    this.unidadAdministrativaService.getLookup(this.unidadAdministrativaId).subscribe(respuesta => {
      this.servicio = respuesta.items;
    })
  }

  onSelectInicioAgendamiento(event: NgbDateStruct) {
    this.minDate = { year: event.year, month: event.month, day: event.day + 1 };
  }

  onSelectFinAgendamiento(event: NgbDateStruct) {
    this.maxDate = { year: event.year, month: event.month, day: event.day - 1 };
  }

  guardar() {
    this.submitted = true;
    if (this.selectedServicioCalendario.id) {
      this.form.get('servicioId').enable();
    }
    this.form.controls['planTrabajo'].patchValue(this.planTrabajoForm.value);
    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const model: CrearActualizarServicioCalendarioDto = this.obtenerDatosFormulario(this.form.value);

    const request = this.selectedServicioCalendario.id
      ? this.servicioCalendarioService.update(this.selectedServicioCalendario.id, model)
      : this.servicioCalendarioService.create(model);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.obtenerServiciosCalendario();
        this.configuraciones.clear();
        this.descansos.clear();
        this.arrayDescansos = [];
        this.planTrabajoForm.reset();
      });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.servicioCalendarioService.delete(id).subscribe(() => this.obtenerServiciosCalendario());
      }
    });
  }

  obtenerDatosFormulario(formulario: CrearActualizarServicioCalendarioDto): CrearActualizarServicioCalendarioDto {
    let planTrabajo: PlanSemanal = formulario.planTrabajo;
    let i = 1;
    planTrabajo.configuraciones.forEach(item => {
      item.dia = i.toString();
      i++;
    });

    const formularioNuevo: CrearActualizarServicioCalendarioDto = {
      unidadAdministrativaId: formulario.unidadAdministrativaId,
      servicioId: formulario.servicioId,
      planTrabajo: planTrabajo,
      duracion: formulario.duracion,
      inicioAgendamiento: formulario.inicioAgendamiento,
      finAgendamiento: formulario.finAgendamiento,
      diasDisponibilidad: formulario.diasDisponibilidad,
      citaAutomatica: formulario.citaAutomatica,
      horasGracia: formulario.horasGracia,
      usarVentanillas: formulario.usarVentanillas
    };
    return formularioNuevo;
  }

  obtenerNombreDiaPorOrden(ordenDia: number): string {
    switch (ordenDia) {
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miercoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
      case 6:
        return 'Sabado';
      default:
        return 'Domingo';
    }
  }

}
