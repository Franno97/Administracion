import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { finalize } from 'rxjs/operators';
import { NgbDateNativeAdapter, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ConvenioDto, ConvenioService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

@Component({
  selector: 'lib-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AgreementComponent implements OnInit {

  agreement = { items: [], totalCount: 0 } as PagedResultDto<ConvenioDto>;

  form: FormGroup;

  isModalOpen = false;
  selectedAgreement = {} as ConvenioDto;
  modalBusy = false;
  submitted = false;
  isActive = false;

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  constructor(public readonly list: ListService,
    private readonly agreementService: ConvenioService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit(): void {
    const agreementStreamCreator = (query) => this.agreementService.getList(query);

    this.list.hookToQuery(agreementStreamCreator).subscribe((response) => {
      this.agreement = response;
    });
  }

  createAgreement() {
    this.selectedAgreement = {} as ConvenioDto;
    this.buildForm();
    this.isModalOpen = true;
    const current = new Date();
   this.getMinDate();
    this.getMaxDate();
  }

  editAgreement(id: string) {
    this.agreementService.get(id).subscribe((response) => {
      this.selectedAgreement = response;
      this.buildForm();
      this.getMinDate();
      this.getMaxDate();
      this.isModalOpen = true;
    });
  }

  onSelectCreationDate(event: NgbDateStruct) {
    this.getMaxDate();
  }

  getMaxDate() {
    let today: Date = new Date();
    this.maxDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }

  onSelectExpirationDate(event: NgbDateStruct) {
this.getMinDate();
  }

  getMinDate() {
    let today: Date = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() +1 };
  }


  buildForm() {
    this.form = this.fb.group({
      descripcion: [this.selectedAgreement.descripcion || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(256)]],
      fechaCreacion: [this.selectedAgreement.fechaCreacion ? new Date(this.selectedAgreement.fechaCreacion) : null,
      [Validators.required]],
      fechaExpiracion: [this.selectedAgreement.fechaExpiracion ? new Date(this.selectedAgreement.fechaExpiracion) : null]
    });
  }

  save() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.selectedAgreement.id
      ? this.agreementService.update(this.selectedAgreement.id, this.form.value)
      : this.agreementService.create(this.form.value);

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
        this.agreementService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

}
