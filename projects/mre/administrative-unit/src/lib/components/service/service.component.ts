import { Component, Inject, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { GetServicioInput, ServicioDto, ServicioService, TipoServicioLookupDto, TipoServicioService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { finalize } from 'rxjs/operators';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';


@Component({
  selector: 'lib-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [ListService],
})
export class ServiceComponent implements OnInit {
  service = { items: [], totalCount: 0 } as PagedResultDto<ServicioDto>;

  serviceType : TipoServicioLookupDto[];

  form: FormGroup;

  isModalOpen = false;

  activo = false;

  modalBusy = false;

  submitted = false;

  atencionPresencial = false;

  atencionSemiPresencial = false;

  atencionVirtual = false;

  services = [];

  selectedService = {} as ServicioDto;

  constructor(
    public readonly list: ListService<GetServicioInput>,
    public readonly listServiceType: ListService,
    public readonly listTariffType: ListService,
    private serviceService: ServicioService,
    private serviceTypeService: TipoServicioService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit(): void {
    const serviceStreamCreator = (query) => this.serviceService.getList(query);

    this.list.hookToQuery(serviceStreamCreator).subscribe((response) => {
      this.service = response;
      this.services = this.service.items.map(s =>{
        const service = { name: s.nombre, serviceType: s.tipoServicio, status: ""}
        if(s.activo){
          service.status = 'Active'
        } else{
          service.status = 'Inactive'
        }
        return service;
      })
    });

    this.loadCatalogs();
  }

  private loadCatalogs() {
    this.serviceTypeService.getLookup().subscribe((response) => {
      this.serviceType = response.items;
    });
  }

  createService() {
    this.selectedService = {} as ServicioDto;
    this.buildForm()
    this.isModalOpen = true;
  }

  editService(id: string) {
    this.serviceService.get(id).subscribe((service) => {
      this.selectedService = service;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.serviceService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.activo = this.selectedService.activo;
    this.atencionPresencial = this.selectedService.atencionPresencial;
    this.atencionSemiPresencial = this.selectedService.atencionSemiPresencial;
    this.atencionVirtual = this.selectedService.atencionVirtual;
    this.form = this.fb.group({
      nombre: [this.selectedService.nombre || '', [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(80)]],
      atencionPresencial: [this.selectedService.atencionPresencial],
      atencionSemiPresencial: [this.selectedService.atencionSemiPresencial],
      atencionVirtual: [this.selectedService.atencionVirtual],
      tipoServicioId: [this.selectedService.tipoServicioId || null, Validators.required],
      activo: [!!this.selectedService.activo || false],
    });
  }

  save() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.selectedService.id
      ? this.serviceService.update(this.selectedService.id, this.form.value)
      : this.serviceService.create(this.form.value);

    request
    .pipe(finalize(() => (this.modalBusy = false)))
    .subscribe(() => {
      this.isModalOpen = false;
      this.submitted = false;
      this.form.reset();
      this.list.get();
    });
  }

}
