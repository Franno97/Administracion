import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PartidaArancelariaService, PartidaArancelariaServicioInfoDto, ServicioDto, ServicioService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

@Component({
  selector: 'lib-tariff-heading-service',
  templateUrl: './tariff-heading-service.component.html',
  styleUrls: ['./tariff-heading-service.component.css'],
  providers: [ListService],
})
export class TariffHeadingServiceComponent implements OnInit {

  tariffHeadingServiceDto = { items: [], totalCount: 0 } as PagedResultDto<PartidaArancelariaServicioInfoDto>;

  service: ServicioDto[];

  form: FormGroup;

  isModalOpen = false;
  selectedtariffHeadingService = {} as PartidaArancelariaServicioInfoDto;
  modalBusy = false;
  submitted = false;
  isActive = false;

  tariffHeadingId = '';
  tariffName = '';

  constructor(public readonly list: ListService,
    private serviceService: ServicioService,
    private fb: FormBuilder,
    private tariffHeadingService: PartidaArancelariaService,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }


  ngOnInit(): void {
    this.tariffHeadingId = this.route.snapshot.params.id;
    this.tariffName = this.route.snapshot.params.name;
    const tariffHeadingServiceStreamCreator = (query) => this.tariffHeadingService.getServices(this.tariffHeadingId, query);

    this.list.hookToQuery(tariffHeadingServiceStreamCreator).subscribe((response) => {
      this.tariffHeadingServiceDto = response;
    });
  }


  addService() {
    this.selectedtariffHeadingService = {} as PartidaArancelariaServicioInfoDto;
    this.getServices();
    this.buildForm();
    this.isModalOpen = true;
  }

  private getServices() {
    this.serviceService.getLookup(true).subscribe((response) => {
      this.service = response.items;
    });
  }


  buildForm() {
    this.form = this.fb.group({
      servicioId: [this.selectedtariffHeadingService.servicioId || null,
      [Validators.required]],
    });
  }

  save() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    this.tariffHeadingService.addService(this.tariffHeadingId, this.form.value)
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
      });
  }

  removeService(serviceId: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.tariffHeadingService.removeService(this.tariffHeadingId, serviceId).subscribe(() => this.list.get());
      }
    });
  }

}
