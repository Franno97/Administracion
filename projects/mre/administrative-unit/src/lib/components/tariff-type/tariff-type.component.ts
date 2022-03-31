
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { TipoArancelDto, TipoArancelService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';




@Component({
  selector: 'lib-tariff-type',
  templateUrl: './tariff-type.component.html',
  providers: [ListService],
})
export class TariffTypeComponent implements OnInit {

  tariffType = { items: [], totalCount: 0 } as PagedResultDto<TipoArancelDto>;

  form: FormGroup;

  selectedTariffType = {} as TipoArancelDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private tariffTypeService: TipoArancelService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit() {
    const tariffTypeStreamCreator = (query) => this.tariffTypeService.getList(query);

    this.list.hookToQuery(tariffTypeStreamCreator).subscribe((response) => {
      this.tariffType = response;
    });
  }

  createTariffType() {
    this.selectedTariffType = {} as TipoArancelDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editTariffType(id: string) {
    this.tariffTypeService.get(id).subscribe((tariffType) => {
      this.selectedTariffType = tariffType;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

 

  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedTariffType.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(8),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedTariffType.nombre || null,
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

    const request = this.selectedTariffType.id
      ? this.tariffTypeService.update(this.selectedTariffType.id, this.form.value)
      : this.tariffTypeService.create(this.form.value);

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
        this.tariffTypeService.delete(id).subscribe(() => this.list.get());
      }
    });
  }


  isRequired(name: string) {
    const validator = this.form.get(name).validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }

}
