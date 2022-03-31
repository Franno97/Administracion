import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';

import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ConvenioService, EntidadAuspicianteLookupDto, EntidadAuspicianteService, ExonerationDto, ServicioDto, ServicioService, TipoExoneracionLookupDto, TipoExoneracionService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { CountryDto, GeograficaService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/geografica';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

@Component({
  selector: 'lib-exoneration',
  templateUrl: './exoneration.component.html',
  styleUrls: ['./exoneration.component.css'],
  providers: [ListService],
})
export class ExonerationComponent implements OnInit {
  EXONERACION_POR_DISCAPACIDAD= "EXONERACION POR DISCAPACIDAD";
  EXONERACION_POR_EDAD= "EXONERACION POR EDAD";
  EXONERACION_POR_ENTIDAD_AUSPICIANTE= "EXONERACION POR ENTIDAD AUSPICIANTE";
  EXONERACION_POR_NACIONALIDAD= "EXONERACION POR NACIONALIDAD";

  exoneration = { items: [], totalCount: 0 } as PagedResultDto<ExonerationDto>;

  service: ServicioDto[];

  form: FormGroup;

  isModalOpen = false;
  isExoneracionDiscapacidad= false;
  isExoneracionEdad= false;
  isExoneracionEntidad= false;
  isExoneracionNacionalidad= false;

  selectedExoneration = {} as ExonerationDto;
  modalBusy = false;
  submitted = false;
  isActive = false;
  tipoExoneracion: TipoExoneracionLookupDto[];
  entidadAuspiciante: EntidadAuspicianteLookupDto[];
  paises : CountryDto [];

  agreementId = '';
  agreementName = '';

  constructor(public readonly list: ListService,
    private serviceService: ServicioService,
    private fb: FormBuilder,
    private agreementService: ConvenioService,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService,
    private tipoExoneracionService: TipoExoneracionService,
    private entidadAuspicianteService: EntidadAuspicianteService,
    private geographycalService: GeograficaService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }


  ngOnInit(): void {
    this.loadCatalogs();
    this.agreementId = this.route.snapshot.params.id;
    this.agreementName = this.route.snapshot.params.name;
    const ExonerationStreamCreator = (query) => this.agreementService.getExonerations(this.agreementId, query);

    this.list.hookToQuery(ExonerationStreamCreator).subscribe((response) => {
      this.exoneration = response;
    });
    
  }


  addExoneration() {
    this.selectedExoneration = {} as ExonerationDto;
    this.getServices();
    this.loadCatalogs();
    this.setOptionalFields();
    this.buildForm();
    this.isModalOpen = true;
  }

  editExoneration(serviceId: string){
    this.agreementService.getExoneration(this.agreementId, serviceId).subscribe((response) => {
      this.selectedExoneration = response;
      this.getServices();
      this.onSelectTipoExoneracion(this.selectedExoneration.tipoExoneracionId);
      this.buildForm();
      this.form.get('servicioId').disable();
      this.isModalOpen = true;
    });
  }

  private getServices() {
    this.serviceService.getLookup(true).subscribe((response) => {
      this.service = response.items;
    });
  }

  private loadCatalogs() {
    this.tipoExoneracionService.getLookup().subscribe((response) => {
      this.tipoExoneracion = response.items;
    });
    this.entidadAuspicianteService.getLookup().subscribe((response) => {
      this.entidadAuspiciante = response.items;
    });
    this.geographycalService.getCountries().subscribe((response) => {
      this.paises = response.items;
    });
  }

  buildForm() {
    console.log(this.selectedExoneration.tipoExoneracionId);
    this.form = this.fb.group({
      servicioId: [this.selectedExoneration.servicioId || null,
      [Validators.required]],
      valor: [this.selectedExoneration.valor || '',
      [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
      tipoExoneracionId: [this.selectedExoneration.tipoExoneracionId || null, [Validators.required]],
      entidadAuspicianteId: [this.selectedExoneration.entidadAuspicianteId || null],
      paisId: [this.selectedExoneration.paisId || null],
      edadInicial: [this.selectedExoneration.edadInicial || null],
      edadFinal: [this.selectedExoneration.edadFinal || null],
      discapacitado: [this.selectedExoneration.discapacitado || null]
    });
  }

  save() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.selectedExoneration.convenioId
      ? this.agreementService.updateExoneration(this.agreementId, this.form.get('servicioId').value, this.form.value)
      : this.agreementService.addExoneration(this.agreementId, this.form.value);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
      });
  }

  removeExoneration(serviceId: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.agreementService.removeExoneration(this.agreementId, serviceId).subscribe(() => this.list.get());
      }
    });
  }

  onSelectTipoExoneracion(target: string): void {
    this.tipoExoneracionService.get(target).subscribe((response) => {
      this.isExoneracionDiscapacidad= response.nombre.toUpperCase() == this.EXONERACION_POR_DISCAPACIDAD;
      this.isExoneracionEdad= response.nombre.toUpperCase() == this.EXONERACION_POR_EDAD;
      this.isExoneracionEntidad= response.nombre.toUpperCase() == this.EXONERACION_POR_ENTIDAD_AUSPICIANTE;
      this.isExoneracionNacionalidad= response.nombre.toUpperCase() == this.EXONERACION_POR_NACIONALIDAD;
    });
  }

  setOptionalFields() {
    this.isExoneracionDiscapacidad= false;
    this.isExoneracionEdad= false;
    this.isExoneracionEntidad= false;
    this.isExoneracionNacionalidad= false;
  }

}
