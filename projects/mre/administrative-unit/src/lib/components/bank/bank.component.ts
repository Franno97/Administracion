


import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { BancoDto, BancoService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';




@Component({
  selector: 'lib-bank',
  templateUrl: './bank.component.html',
  providers: [ListService],
})
export class BankComponent implements OnInit {

  bank = { items: [], totalCount: 0 } as PagedResultDto<BancoDto>;

  form: FormGroup;

  selectedBank = {} as BancoDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private bankService: BancoService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit() {
    const bankStreamCreator = (query) => this.bankService.getList(query);

    this.list.hookToQuery(bankStreamCreator).subscribe((response) => {
      this.bank = response;
    });
  }

  createBank() {
    this.selectedBank = {} as BancoDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editBank(id: string) {
    this.bankService.get(id).subscribe((bank) => {
      this.selectedBank = bank;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  
  
  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedBank.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedBank.nombre || null,
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

    const request = this.selectedBank.id
      ? this.bankService.update(this.selectedBank.id, this.form.value)
      : this.bankService.create(this.form.value);

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
        this.bankService.delete(id).subscribe(() => this.list.get());
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
