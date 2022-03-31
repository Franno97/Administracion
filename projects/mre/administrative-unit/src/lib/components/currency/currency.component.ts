

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { MonedaDto, MonedaService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';


@Component({
  selector: 'lib-currency',
  templateUrl: './currency.component.html',
  providers: [ListService],
})
export class CurrencyComponent implements OnInit {

  currency = { items: [], totalCount: 0 } as PagedResultDto<MonedaDto>;

  form: FormGroup;

  selectedCurrency = {} as MonedaDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private currencyService: MonedaService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }
  ngOnInit() {
    const currencyStreamCreator = (query) => this.currencyService.getList(query);

    this.list.hookToQuery(currencyStreamCreator).subscribe((response) => {
      this.currency = response;
    });
  }

  createCurrency() {
    this.selectedCurrency = {} as MonedaDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editCurrency(id: string) {
    this.currencyService.get(id).subscribe((currency) => {
      this.selectedCurrency = currency;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedCurrency.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedCurrency.nombre || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(80)]],
      simbolo: [this.selectedCurrency.simbolo || null,
      []]
    });
  }

  save() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.selectedCurrency.id
      ? this.currencyService.update(this.selectedCurrency.id, this.form.value)
      : this.currencyService.create(this.form.value);

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
        this.currencyService.delete(id).subscribe(() => this.list.get());
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
