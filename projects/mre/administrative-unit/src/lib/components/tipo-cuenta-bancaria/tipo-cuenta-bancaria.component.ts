

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';


import { TipoCuentaBancariaService, TipoCuentaBancariaDto } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';


@Component({
  selector: 'lib-tipo-cuenta-bancaria',
  templateUrl: './tipo-cuenta-bancaria.component.html',
  providers: [ListService],
})
export class TipoCuentaBancariaComponent implements OnInit {

  tipoCuentaBancaria = { items: [], totalCount: 0 } as PagedResultDto<TipoCuentaBancariaDto>;

  form: FormGroup;

  selectedTipoCuentaBancaria = {} as TipoCuentaBancariaDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private tipoCuentaBancariaService: TipoCuentaBancariaService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService) {
  }

  ngOnInit() {
    const tipoCuentaBancariaStreamCreator = (query) => this.tipoCuentaBancariaService.getList(query);

    this.list.hookToQuery(tipoCuentaBancariaStreamCreator).subscribe((response) => {
      this.tipoCuentaBancaria = response;
    });
  }

  createTipoCuentaBancaria() {
    this.selectedTipoCuentaBancaria = {} as TipoCuentaBancariaDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editTipoCuentaBancaria(id: string) {
    this.tipoCuentaBancariaService.get(id).subscribe((tipoCuentaBancaria) => {
      this.selectedTipoCuentaBancaria = tipoCuentaBancaria;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedTipoCuentaBancaria.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedTipoCuentaBancaria.nombre || null,
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

    const request = this.selectedTipoCuentaBancaria.id
      ? this.tipoCuentaBancariaService.update(this.selectedTipoCuentaBancaria.id, this.form.value)
      : this.tipoCuentaBancariaService.create(this.form.value);

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
        this.tipoCuentaBancariaService.delete(id).subscribe(() => this.list.get());
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
