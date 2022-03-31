import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';

import { finalize } from 'rxjs/operators';
import { ArancelDto, ArancelService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { MonedaLookupDto, MonedaService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';


@Component({
  selector: 'lib-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css'],
  providers: [ListService],
})
export class TariffComponent implements OnInit {

  tariff = { items: [], totalCount: 0 } as PagedResultDto<ArancelDto>;

  currency: MonedaLookupDto[];

  form: FormGroup;

  isModalOpen = false;
  selectedTariff = {} as ArancelDto;
  modalBusy = false;
  submitted =false;
  isActive = false;

  constructor(public readonly list: ListService,
    private currencyService: MonedaService,
    private fb: FormBuilder,
    private tariffService: ArancelService,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit(): void {
    const tariffStreamCreator = (query) => this.tariffService.getList(query);

    this.list.hookToQuery(tariffStreamCreator).subscribe((response) => {
      this.tariff = response;
    });
  }

  createTariff() {
    this.selectedTariff = {} as ArancelDto;
    this.getCurrency();
    this.buildForm();
    this.isModalOpen = true;
  }

  editTariff(id: string) {
    this.getCurrency();
    this.tariffService.get(id).subscribe((response) => {
      this.selectedTariff = response;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  private getCurrency(){
    this.currencyService.getLookup().subscribe((response) => {
      this.currency = response.items;
    });
  }
  

  buildForm() {
    this.form = this.fb.group({
      descripcion: [this.selectedTariff.descripcion || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(256),
      Validators.pattern(/^[a-zA-Z0-9-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]],
      monedaId: [this.selectedTariff.monedaId || null,
      [Validators.required]],
      IsActive: [this.selectedTariff.activo || this.isActive]
    });
  }

  save() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.selectedTariff.id
      ? this.tariffService.update(this.selectedTariff.id, this.form.value)
      : this.tariffService.create(this.form.value);

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
        this.tariffService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  activate(id: string){
    const isActive = true;

    this.confirmation.warn('AdministrativeUnit::Tariff:AreYouSureToActive', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.tariffService.changeState(id, isActive).subscribe(() => {
          this.list.get();
        })
      }
    });
    
  }

}
