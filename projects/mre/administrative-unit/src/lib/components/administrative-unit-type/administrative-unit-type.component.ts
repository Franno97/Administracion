import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { UnidadAdministrativaTipoDto, UnidadAdministrativaTipoService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

 


@Component({
  selector: 'lib-administrative-unit-type',
  templateUrl: './administrative-unit-type.component.html',
  providers: [ListService],
})
export class AdministrativeUnitTypeComponent implements OnInit {

  administrativeUnitType = { items: [], totalCount: 0 } as PagedResultDto<UnidadAdministrativaTipoDto>;

  form: FormGroup;

  selectedAdministrativeUnitType = {} as UnidadAdministrativaTipoDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;


  constructor(public readonly list: ListService,
    private administrativeUnitTypeService: UnidadAdministrativaTipoService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      
      this.list.maxResultCount = maximoResultado;
  }

  ngOnInit() {
    const administrativeUnitTypeStreamCreator = (query) => this.administrativeUnitTypeService.getList(query);

    this.list.hookToQuery(administrativeUnitTypeStreamCreator).subscribe((response) => {
      this.administrativeUnitType = response;
    });
  }

  createAdministrativeUnitType() {
    this.selectedAdministrativeUnitType = {} as UnidadAdministrativaTipoDto;
    this.buildForm();
    this.isModalOpen = true; 
  }

  editAdministrativeUnitType(id: string) {
    this.administrativeUnitTypeService.get(id).subscribe((administrativeUnitType) => {
      this.selectedAdministrativeUnitType = administrativeUnitType;
      this.buildForm();
      this.isModalOpen = true; 
    });
  }

  
  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedAdministrativeUnitType.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedAdministrativeUnitType.nombre || null,
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

    const request = this.selectedAdministrativeUnitType.id
      ? this.administrativeUnitTypeService.update(this.selectedAdministrativeUnitType.id, this.form.value)
      : this.administrativeUnitTypeService.create(this.form.value);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.administrativeUnitTypeService.delete(id).subscribe(() => this.list.get());
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
