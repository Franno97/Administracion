

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { TipoServicioDto, TipoServicioService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';




@Component({
  selector: 'lib-service-type',
  templateUrl: './service-type.component.html',
  providers: [ListService],
})
export class ServiceTypeComponent implements OnInit {

  serviceType = { items: [], totalCount: 0 } as PagedResultDto<TipoServicioDto>;

  form: FormGroup;

  selectedServiceType = {} as TipoServicioDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private serviceTypeService: TipoServicioService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit() {
    const serviceTypeStreamCreator = (query) => this.serviceTypeService.getList(query);

    this.list.hookToQuery(serviceTypeStreamCreator).subscribe((response) => {
      this.serviceType = response;
    });
  }

  createServiceType() {
    this.selectedServiceType = {} as TipoServicioDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editServiceType(id: string) {
    this.serviceTypeService.get(id).subscribe((serviceType) => {
      this.selectedServiceType = serviceType;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  

  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedServiceType.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedServiceType.nombre || null,
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

    const request = this.selectedServiceType.id
      ? this.serviceTypeService.update(this.selectedServiceType.id, this.form.value)
      : this.serviceTypeService.create(this.form.value);

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
        this.serviceTypeService.delete(id).subscribe(() => this.list.get());
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
