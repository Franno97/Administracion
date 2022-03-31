import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateUpdateFeriadoDto, FeriadoDto, FeriadoService, GetFeriadoInput } from '@mre/cita/proxy/feriado';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'lib-feriado',
  templateUrl: './feriado.component.html',
  styleUrls: ['./feriado.component.css'],
  providers: [ListService],
})
export class FeriadoComponent implements OnInit {

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  unidadAdministrativaCalendarioId: string;
  unidadAdministrativaNombre: string;
  listaFeriado = { items: [], totalCount: 0 } as PagedResultDto<FeriadoDto>;
  ventanaAbierta = false;
  ventanaOcupada = false;
  submitted = false;

  feriadoSeleccionado = {} as FeriadoDto;

  formulario: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private servicioFeriado: FeriadoService,
    private fb: FormBuilder,
    private servicioConfirmacion: ConfirmationService,
    public readonly servicioLista: ListService<GetFeriadoInput>
  ) { }

  ngOnInit(): void {
    this.unidadAdministrativaCalendarioId = this.route.snapshot.params.id;
    this.unidadAdministrativaNombre = this.route.snapshot.params.nombre;
    this.cargarDatos();
  }

  cargarDatos(): void {
    const feriadoStreamCreator = (query) => this.servicioFeriado
      .getList({ ...query, unidadAdministrativaCalendarioId: this.unidadAdministrativaCalendarioId });

    this.servicioLista.hookToQuery(feriadoStreamCreator).subscribe(respuesta => {
      this.listaFeriado = respuesta;
    });
  }

  crear(): void {
    this.feriadoSeleccionado = {} as FeriadoDto;
    this.construirFormulario();
    this.getMinDate();
    this.getMaxDate();
    this.ventanaAbierta = true;
  }

  editar(id: string): void {
    this.servicioFeriado.get(id).subscribe((respuesta) => {
      this.feriadoSeleccionado = respuesta;
      this.construirFormulario();
      this.getMinDate();
      this.getMaxDate();
      this.ventanaAbierta = true;
    });
  }

  eliminar(id: string): void {
    this.servicioConfirmacion.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.servicioFeriado.delete(id).subscribe(() => this.servicioLista.get());
      }
    });
  }

  guardar(): void {
    this.submitted = true;

    if (this.formulario.invalid) {
      return;
    }

    this.ventanaOcupada = true;

    let temporalDate: NgbDateStruct = this.formulario.controls.inicio.value;
    let initialDate = new Date(temporalDate.year, temporalDate.month - 1, temporalDate.day);
    const inicioIso = initialDate.toISOString();

    temporalDate = this.formulario.controls.fin.value;
    let finishDate = new Date(temporalDate.year, temporalDate.month - 1, temporalDate.day);
    const FinIso = finishDate.toISOString();

    if(initialDate > finishDate) {
      this.showDateValidationMessage();
      this.ventanaOcupada = false;
      return;
    }


    const feriadoCrearDto: CreateUpdateFeriadoDto = {
      descripcion: this.formulario.controls.descripcion.value,
      inicio: inicioIso,
      fin: FinIso,
      unidadAdministrativaCalendarioId: this.unidadAdministrativaCalendarioId
    };

    const request = this.feriadoSeleccionado.id
      ? this.servicioFeriado.update(this.feriadoSeleccionado.id, feriadoCrearDto)
      : this.servicioFeriado.create(feriadoCrearDto);

    request.pipe(finalize(() => (this.ventanaOcupada = false)))
      .subscribe(() => {
        this.ventanaAbierta = false;
        this.formulario.reset();
        this.servicioLista.get()
      });

  }

  construirFormulario() {
    let inicio: any = null;
    let final: any = null;
    if (this.feriadoSeleccionado.id) {
      let fecha = new Date(this.feriadoSeleccionado.inicio);
      inicio = { day: fecha.getDate(), month: fecha.getMonth() + 1, year: fecha.getFullYear() };
      fecha = new Date(this.feriadoSeleccionado.fin);
      final = { day: fecha.getDate(), month: fecha.getMonth() + 1, year: fecha.getFullYear() };
    }

    this.formulario = this.fb.group({
      descripcion: [this.feriadoSeleccionado.descripcion || null, [Validators.required]],
      inicio: [inicio, [Validators.required]],
      fin: [final, [Validators.required]],
    });

  }

  getMaxDate() {
    let today: Date = new Date();
    this.maxDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }

  getMinDate() {
    let today: Date = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }

  showDateValidationMessage() {
    const options: Partial<Confirmation.Options> = {
      hideCancelBtn: true,
      hideYesBtn: false,
      dismissible: false,
      yesText: 'Cita::Cita:FechasValidacionAceptar',
    };

    const confirmationStatus$ = this.servicioConfirmacion.error(
        'Cita::Cita:FechasValidacionMensaje',
        'Cita::Cita:FechasValidacionTitulo',
        options);
  }

}
