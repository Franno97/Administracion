

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';


import { EntidadAuspicianteService, EntidadAuspicianteDto } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';


@Component({
  selector: 'lib-entidad-auspiciante',
  templateUrl: './entidad-auspiciante.component.html',
  providers: [ListService],
})
export class EntidadAuspicianteComponent implements OnInit {

  entidadAuspiciante = { items: [], totalCount: 0 } as PagedResultDto<EntidadAuspicianteDto>;

  form: FormGroup;

  selectedEntidadAuspiciante = {} as EntidadAuspicianteDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private entityService: EntidadAuspicianteService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService) {
  }

  ngOnInit() {
    const entityStreamCreator = (query) => this.entityService.getList(query);

    this.list.hookToQuery(entityStreamCreator).subscribe((response) => {
      this.entidadAuspiciante = response;
    });
  }

  createEntidadAuspiciante() {
    this.selectedEntidadAuspiciante = {} as EntidadAuspicianteDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editEntidadAuspiciante(id: string) {
    this.entityService.get(id).subscribe((entity) => {
      this.selectedEntidadAuspiciante = entity;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedEntidadAuspiciante.id || null, [Validators.required,
        Validators.minLength(0),
        Validators.maxLength(4),
        Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedEntidadAuspiciante.nombre || null, [Validators.required,
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

    const request = this.selectedEntidadAuspiciante.id
      ? this.entityService.update(this.selectedEntidadAuspiciante.id, this.form.value)
      : this.entityService.create(this.form.value);

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
        this.entityService.delete(id).subscribe(() => this.list.get());
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
