import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ArancelLookupDto, ArancelService, JerarquiaArancelariaDto, JerarquiaArancelariaService, TipoArancelLookupDto, TipoArancelService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

@Component({
  selector: 'lib-tariff-hierarchy',
  templateUrl: './tariff-hierarchy.component.html',
  styleUrls: ['./tariff-hierarchy.component.css'],
  providers: [ListService],
})
export class TariffHierarchyComponent implements OnInit {
  private sub: any;
  arancelId: string;
  arancelDescripcion : string;


  tariffHierarchy = { items: [], totalCount: 0 } as PagedResultDto<JerarquiaArancelariaDto>;

  tariff: ArancelLookupDto[];

  tariffType: TipoArancelLookupDto[];

  form: FormGroup;

  isModalOpen = false;
  selectedTariffHierarchy  = {} as JerarquiaArancelariaDto;
  modalBusy = false;
  submitted = false;

  //isNew=false;

  constructor(public readonly list: ListService,
    private fb: FormBuilder,
    private tariffHierarchyService: JerarquiaArancelariaService,
    private arancelService: ArancelService,
    private tariffTypeService: TipoArancelService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.arancelId = params['id']; 
      this.arancelDescripcion = params['descripcion']; 

      const tariffStreamCreator = (query) => this.arancelService.obtenerJerarquiasArancelarias(this.arancelId, query);

      this.list.hookToQuery(tariffStreamCreator).subscribe((response) => {
          this.tariffHierarchy = response;
        });
 
    });
  }

  createTariffHierarchy() {
    this.selectedTariffHierarchy = {} as JerarquiaArancelariaDto;
    this.loadCatalogs();
    this.buildForm();
    this.isModalOpen = true;
  }


  editTariffHierarchy(jerarquiaId: string) {
    this.arancelService.obtenerJerarquiaArancelaria(this.arancelId,jerarquiaId).subscribe((response) => {
      
      this.selectedTariffHierarchy = response;
      //this.isNew = false;
      this.loadCatalogs();
      this.buildForm();
      this.isModalOpen = true;

    });
  }
  

  private loadCatalogs() {
    this.arancelService.getLookup().subscribe((response) => {
      this.tariff = response.items;
    });

    this.tariffTypeService.getLookup().subscribe((response) => {
      this.tariffType = response.items;
    });
  }


  buildForm() {
    this.form = this.fb.group({
      arancel: [this.arancelDescripcion],
      tipoArancelId: [this.selectedTariffHierarchy.tipoArancelId || null,
      [Validators.required]],
      descripcion: [this.selectedTariffHierarchy.descripcion || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(256),
      Validators.pattern(/^[a-zA-Z0-9-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]],
      orden: [this.selectedTariffHierarchy.orden, [Validators.required, Validators.min(1), Validators.max(200)]],
      numeroJerarquia: [this.selectedTariffHierarchy.numeroJerarquia, [Validators.required, Validators.min(1), Validators.max(200)]],
    });
  }

  save() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.selectedTariffHierarchy.id
      ? this.arancelService.actualizarJerarquiaArancelaria(this.arancelId, this.selectedTariffHierarchy.id, this.form.value)
      : this.arancelService.agregarJerarquiaArancelaria(this.arancelId, this.form.value);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
      });
  }

  delete(jerarquiaId: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.arancelService.quitarJerarquiaArancelaria(this.arancelId, jerarquiaId).subscribe(() => this.list.get());
      }
    });
  }

}
