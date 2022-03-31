import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { CargoDto, CargoService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';



@Component({
  selector: 'lib-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
  providers: [ListService],
})
export class PositionComponent implements OnInit {

  position = { items: [], totalCount: 0 } as PagedResultDto<CargoDto>;

  form: FormGroup;

  selectedPosition = {} as CargoDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private positionService: CargoService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit() {
    const positionStreamCreator = (query) => this.positionService.getList(query);

    this.list.hookToQuery(positionStreamCreator).subscribe((response) => {
      this.position = response;
    });
  }

  createPosition() {
    this.selectedPosition = {} as CargoDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editPosition(id: string) {
    this.positionService.get(id).subscribe((position) => {
      this.selectedPosition = position;
      this.buildForm();
      this.isModalOpen = true;
    });
  }


  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedPosition.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedPosition.nombre || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(80),
      Validators.pattern(/^[a-zA-Z0-9-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]]
    });

  }
  save() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.selectedPosition.id
      ? this.positionService.update(this.selectedPosition.id, this.form.value)
      : this.positionService.create(this.form.value);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
      });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.positionService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

}
