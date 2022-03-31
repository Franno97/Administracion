import { Component, Inject, OnInit } from '@angular/core';
import { ListResultDto, ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { finalize } from 'rxjs/operators';

import { ServicioService, ServicioDto, TipoPagoDto, TipoPagoService, } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';

import { UnidadAdministrativaService, UnidadAdministrativaServicioDto} 
from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';

import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';


@Component({
  selector: 'lib-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css'],
  providers: [ListService],
})
export class AddServicesComponent implements OnInit {
  

  private sub: any;
  administrativeUnitId: string;
  administrativeUnitName : string;

  administrativeUnitServices = { items: [], totalCount: 0 } as PagedResultDto<UnidadAdministrativaServicioDto>;

  selectedAdministrativeUnitService = {} as UnidadAdministrativaServicioDto;

  service : ServicioDto[];
  paymentType : TipoPagoDto[];
 
  submitted = false;
  form: FormGroup;

  isModalOpen = false;

  isNew=false;
 
  modalBusy = false;

  constructor(
    public readonly list: ListService<UnidadAdministrativaServicioDto>,
    private serviceService: ServicioService,
    private administrativeUnitService: UnidadAdministrativaService,
    private paymentTypeService: TipoPagoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

    
  ngOnInit(): void {
    
    this.sub = this.route.params.subscribe(params => {
      this.administrativeUnitId = params['id']; 
 
      //TODO:.. Recuperar la informacion correspondiente....
      this.administrativeUnitName = params['name']; 
 
      const administrativeUnitServiceStreamCreator = (query) => this.administrativeUnitService.obtenerServicios(this. administrativeUnitId, { ...query, isActive:  true});

      this.list.hookToQuery(administrativeUnitServiceStreamCreator).subscribe((response) => {
        this.administrativeUnitServices = response;
      });
 
    });

  }

  

  addService() {
    this.selectedAdministrativeUnitService = {} as UnidadAdministrativaServicioDto; 
    this.selectedAdministrativeUnitService.unidadAdministrativaId = this.administrativeUnitId;
    this.selectedAdministrativeUnitService.activo = true;
    this.isNew = true;
    this.loadCatalogs();
    this.buildForm()
    this.isModalOpen = true;
  }

  edit(serviceId: string) {
    this.administrativeUnitService.obtenerServicio(this.administrativeUnitId,serviceId).subscribe((response) => {
      
      this.selectedAdministrativeUnitService = response;
      this.isNew = false;
      this.loadCatalogs();
      this.buildForm();
      this.isModalOpen = true;

    });
  }


  loadCatalogs(){
     
    this.paymentTypeService.getLookup().subscribe((response) => {
      this.paymentType = response.items;
    });

    if (this.isNew){
     
      this.serviceService.getLookup(true).subscribe((responseServices) => {
        
        this.administrativeUnitService.getLookup(this.administrativeUnitId).subscribe((responseUsedServices) => {
          let result = responseServices.items.filter(first => 
            responseUsedServices.items.some(({id}) => first.id === id));
            this.service = result;
          });

      });
    }
    
  }
 
  buildForm() {
    this.form = this.fb.group({
      servicioId: [this.selectedAdministrativeUnitService.servicioId || null, Validators.required],
      tipoPagoId: [this.selectedAdministrativeUnitService.tipoPagoId || null, Validators.required],
      activo: [this.selectedAdministrativeUnitService.activo , Validators.required] 
    });
  }

  save() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.isNew
      ? this.administrativeUnitService.agregarServicio(this.administrativeUnitId, this.form.value)
      : this.administrativeUnitService.actualizarServicio(this.administrativeUnitId, this.selectedAdministrativeUnitService.servicioId, this.form.value);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
      });
  }

  delete(serviceId: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.administrativeUnitService.eliminarServicio(this.administrativeUnitId,serviceId).subscribe(
          () => this.list.get()
        );
      }
    });
  } 

}
