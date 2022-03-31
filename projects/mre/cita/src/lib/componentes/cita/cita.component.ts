import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';

import { UnidadAdministrativaCalendarioService, UnidadAdministrativaCalendarioDto, CrearActualizarUnidadAdministrativaDto } from '@mre/cita/proxy/cita';
import { Horario, PlanDiario } from '@mre/cita/proxy/models';
import { UnidadAdministrativaInfoDto, UnidadAdministrativaService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

const acciones = { 'crear': 'Crear', 'editar': 'Editar', 'ver': 'Visualizar' };
@Component({
  selector: 'lib-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
  providers: [ListService],
})
export class CitaComponent implements OnInit {

  lunes: PlanDiario = { dia: "Lunes", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  martes: PlanDiario = { dia: "Martes", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  miercoles: PlanDiario = { dia: "Miercoles", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  jueves: PlanDiario = { dia: "Jueves", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  viernes: PlanDiario = { dia: "Viernes", horario: { inicio: '08:00', fin: '17:00' }, descanso: null };
  sabado: PlanDiario = { dia: "Sabado", horario: { inicio: '', fin: '' }, descanso: null };
  domingo: PlanDiario = { dia: "Domingo", horario: { inicio: '', fin: '' }, descanso: null };
  diasSemana: PlanDiario[] = [this.lunes, this.martes, this.miercoles, this.jueves, this.viernes, this.sabado, this.domingo];

  listaCalendario = { items: [], totalCount: 0 } as PagedResultDto<UnidadAdministrativaCalendarioDto>;

  listaUnidadAdministrativa: UnidadAdministrativaInfoDto[];

  form: FormGroup;

  planTrabajoForm: FormGroup;

  configuraciones: FormArray = new FormArray([]);

  selectedUnidadAdministrativaCalendario = {} as UnidadAdministrativaCalendarioDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  horario: Horario;

  checked = false;

  accion = '';

  constructor(public readonly list: ListService,
    private unidadAdministrativaCalendarioService: UnidadAdministrativaCalendarioService,
    private unidadAdministrativaService: UnidadAdministrativaService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista(): void {
    const UnidadAdministrativaCalendarioStreamCreator = (query) => this.unidadAdministrativaCalendarioService.getList(query);

    let listaTemporal = { items: [], totalCount: 0 } as PagedResultDto<UnidadAdministrativaCalendarioDto>;

    this.list.hookToQuery(UnidadAdministrativaCalendarioStreamCreator).subscribe(respuesta => {
      listaTemporal = respuesta;
      this.listaCalendario.totalCount = respuesta.totalCount;
      this.listaCalendario.items = [];

      //Obtener los únicos
      const listaUnicos = listaTemporal.items.filter((item, i, arr) => arr.findIndex((t) => t.id === item.id) === i);

      //Obtner los ids
      const listaIds = listaUnicos.map(function (obj) {
        return obj.unidadAdministrativaId;
      });

      let listaUnidadesAdministrativas: UnidadAdministrativaInfoDto[] = [];
      const request = this.unidadAdministrativaService.obtenerPorListaIdsByIds(listaIds);
      request.subscribe(respuesta => {
        listaUnidadesAdministrativas = respuesta.items;

        this.publicarListaCalendario(listaTemporal, listaUnidadesAdministrativas);
      });

    });
  }

  publicarListaCalendario(listaTemporal: PagedResultDto<UnidadAdministrativaCalendarioDto>,
    listaUnidadesAdministrativas: UnidadAdministrativaInfoDto[]): void {
    for (let i = 0; i < listaTemporal.items.length; i++) {
      const unidadAdministrativa: UnidadAdministrativaInfoDto = listaUnidadesAdministrativas.find(x => x.id == listaTemporal.items[i].unidadAdministrativaId);

      const calendario: UnidadAdministrativaCalendarioDto = {
        id: listaTemporal.items[i].id,
        unidadAdministrativaId: listaTemporal.items[i].unidadAdministrativaId,
        unidadAdministrativaNombre: unidadAdministrativa.nombre,
        planTrabajo: listaTemporal.items[i].planTrabajo,
      };
      this.listaCalendario.items.push(calendario);
    }
  }

  buildPlanTrabajo() {
    this.planTrabajoForm = this.fb.group({
      configuraciones: this.configuraciones
    });
  }

  agregarPlanesDiarios(accion: string) {
    let configuraciones: PlanDiario[] = [];
    if (accion === acciones.editar) {
      configuraciones = this.selectedUnidadAdministrativaCalendario.planTrabajo.configuraciones;
    } else {
      configuraciones = this.diasSemana;
    }
    configuraciones.forEach(item => {
      this.horario = item.horario;
      const inicio = item?.horario?.inicio ? item.horario.inicio : '';
      const fin = item?.horario?.fin ? item.horario.fin : '';
      if (accion === acciones.editar) {
        item.dia = this.obtenerNombreDiaPorOrden(Number(item.dia));
      }

      const planDiario = this.fb.group({
        horario: this.fb.group({
          inicio: inicio === '' ? new FormControl({ value: '', disabled: true }) : new FormControl({ value: inicio, disabled: false }),
          fin: fin === '' ? new FormControl({ value: ' ', disabled: true }) : new FormControl({ value: fin, disabled: false })
        }),
        dia: [item.dia, Validators.required]

      })
      this.configuraciones.push(planDiario);
    });
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

  crear() {
    this.accion = '';
    this.configuraciones.clear();
    this.submitted = false;
    this.obtenerUnidadesAdministrativas();
    this.selectedUnidadAdministrativaCalendario = {} as UnidadAdministrativaCalendarioDto;
    this.buildForm();
    this.buildPlanTrabajo();
    this.agregarPlanesDiarios(acciones.crear);

    this.isModalOpen = true;
  }

  editUnidadAdministrativaCalendario(id: string, accion: string) {
    this.configuraciones.clear();
    this.submitted = false;
    this.accion = accion;
    this.unidadAdministrativaCalendarioService.get(id).subscribe(respuesta => {
      this.selectedUnidadAdministrativaCalendario = respuesta;
      this.obtenerUnidadesAdministrativas();
      this.buildForm();
      this.form.get('unidadAdministrativaId').disable();
      this.buildPlanTrabajo();
      this.agregarPlanesDiarios(acciones.editar);
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      unidadAdministrativaId: [this.selectedUnidadAdministrativaCalendario.unidadAdministrativaId || null, Validators.required],
      planTrabajo: this.planTrabajoForm
    });
  }

  obtenerUnidadesAdministrativas() {
    this.unidadAdministrativaService.getLookupAdministrativeUnit().subscribe(respuesta => {
      this.listaUnidadAdministrativa = respuesta.items;
    })
  }

  guardar() {
    this.submitted = true;
    if (this.selectedUnidadAdministrativaCalendario.id) {
      this.form.get('unidadAdministrativaId').enable();
    }

    this.form.controls['planTrabajo'].patchValue(this.planTrabajoForm.value);
    if (this.form.invalid) {
      return;
    }

    const modelo: CrearActualizarUnidadAdministrativaDto = this.obtenerFormulario(this.form.value);

    this.modalBusy = true;
    const request = this.selectedUnidadAdministrativaCalendario.id
      ? this.unidadAdministrativaCalendarioService.update(this.selectedUnidadAdministrativaCalendario.id, modelo)
      : this.unidadAdministrativaCalendarioService.create(this.form.value);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
        this.configuraciones.clear();
        this.planTrabajoForm.reset();
      });
  }

  obtenerFormulario(modelo: CrearActualizarUnidadAdministrativaDto): CrearActualizarUnidadAdministrativaDto {
    for (let i = 0; i < modelo.planTrabajo.configuraciones.length; i++) {
      modelo.planTrabajo.configuraciones[i].dia = (i + 1).toString();
    }
    return modelo;
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.unidadAdministrativaCalendarioService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

}
