

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';


import { TipoExoneracionService, TipoExoneracionDto } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';


@Component({
  selector: 'tipo-exoneracion',
  templateUrl: './tipo-exoneracion.component.html',
  providers: [ListService],
})
export class TipoExoneracionComponent implements OnInit {

  tipoExoneracion = { items: [], totalCount: 0 } as PagedResultDto<TipoExoneracionDto>;

  form: FormGroup;

  selectedTipoExoneracion = {} as TipoExoneracionDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private tipoExoneracionService: TipoExoneracionService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService) {
  }

  ngOnInit() {
    const tipoExoneracionStreamCreator = (query) => this.tipoExoneracionService.getList(query);

    this.list.hookToQuery(tipoExoneracionStreamCreator).subscribe((response) => {
      this.tipoExoneracion = response;
    });
  }

  createTipoExoneracion() {
    this.selectedTipoExoneracion = {} as TipoExoneracionDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editTipoExoneracion(id: string) {
    this.tipoExoneracionService.get(id).subscribe((tipoExoneracion) => {
      this.selectedTipoExoneracion = tipoExoneracion;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

 

  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedTipoExoneracion.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedTipoExoneracion.nombre || null,
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

    const request = this.selectedTipoExoneracion.id
      ? this.tipoExoneracionService.update(this.selectedTipoExoneracion.id, this.form.value)
      : this.tipoExoneracionService.create(this.form.value);

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
        this.tipoExoneracionService.delete(id).subscribe(() => this.list.get());
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
