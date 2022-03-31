


import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { TipoPagoDto, TipoPagoService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';




@Component({
  selector: 'payment-type',
  templateUrl: './payment-type.component.html',
  providers: [ListService],
})
export class PaymentTypeComponent implements OnInit {

  paymentType = { items: [], totalCount: 0 } as PagedResultDto<TipoPagoDto>;

  form: FormGroup;

  selectedPaymentType = {} as TipoPagoDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private paymentTypeService: TipoPagoService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit() {
    const paymentTypeStreamCreator = (query) => this.paymentTypeService.getList(query);

    this.list.hookToQuery(paymentTypeStreamCreator).subscribe((response) => {
      this.paymentType = response;
    });
  }

  createPaymentType() {
    this.selectedPaymentType = {} as TipoPagoDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editPaymentType(id: string) {
    this.paymentTypeService.get(id).subscribe((paymentType) => {
      this.selectedPaymentType = paymentType;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  


  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedPaymentType.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedPaymentType.nombre || null,
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

    const request = this.selectedPaymentType.id
      ? this.paymentTypeService.update(this.selectedPaymentType.id, this.form.value)
      : this.paymentTypeService.create(this.form.value);

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
        this.paymentTypeService.delete(id).subscribe(() => this.list.get());
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
