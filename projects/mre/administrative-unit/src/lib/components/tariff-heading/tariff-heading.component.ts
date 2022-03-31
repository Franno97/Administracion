import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { JerarquiaArancelariaLookupDto, JerarquiaArancelariaService, PartidaArancelariaDto, PartidaArancelariaService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

@Component({
  selector: 'lib-tariff-heading',
  templateUrl: './tariff-heading.component.html',
  styleUrls: ['./tariff-heading.component.css'],
  providers: [ListService],
})
export class TariffHeadingComponent implements OnInit {
  private sub: any;
  jerarquiaId: string;
  jerarquiaDescripcion : string;


  tariffHeading = { items: [], totalCount: 0 } as PagedResultDto<PartidaArancelariaDto>;

  tariffHierarchy: JerarquiaArancelariaLookupDto[];

  form: FormGroup;

  isModalOpen = false;
  selectedTariffHeading = {} as PartidaArancelariaDto;
  modalBusy = false;
  submitted = false;
  isActive = false;

  constructor(public readonly list: ListService,
    private jerarquiaService: JerarquiaArancelariaService,
    private fb: FormBuilder,
    private tariffHeadingService: PartidaArancelariaService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.jerarquiaId = params['id']; 
      this.jerarquiaDescripcion = params['descripcion']; 

      const tariffHeadingStreamCreator = (query) => this.jerarquiaService.obtenerPartidasArancelarias(this.jerarquiaId, query);

      this.list.hookToQuery(tariffHeadingStreamCreator).subscribe((response) => {
          this.tariffHeading = response;
        });
 
    });
  }

  createTariffHeading() {
    this.selectedTariffHeading = {} as PartidaArancelariaDto;
    //this.getTariffHierarchy();
    this.buildForm();
    this.isModalOpen = true;
  }


  editTariffHeading(partidaId: string) {
    this.jerarquiaService.obtenerPartidaArancelaria(this.jerarquiaId,partidaId).subscribe((response) => {
      this.selectedTariffHeading = response;
      //this.isNew = false;
      //this.loadCatalogs();
      this.buildForm();
      this.isModalOpen = true;

    });
  }

  buildForm() {
    this.form = this.fb.group({
      jerarquia: [this.jerarquiaDescripcion],
      descripcion: [this.selectedTariffHeading.descripcion || '',
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(256)]],
      numeroPartida: [this.selectedTariffHeading.numeroPartida || '',
      [Validators.required,
        Validators.minLength(0),
        Validators.maxLength(4)]],
        valor: [this.selectedTariffHeading.valor || '', [Validators.required,
        Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]]
    });
  }

  save() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.selectedTariffHeading.id
      ? this.jerarquiaService.actualizarPartidaArancelaria(this.jerarquiaId, this.selectedTariffHeading.id, this.form.value)
      : this.jerarquiaService.agregarPartidaArancelaria(this.jerarquiaId, this.form.value);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
      });
  }

  delete(partidaId: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.jerarquiaService.quitarPartidaArancelaria(this.jerarquiaId, partidaId).subscribe(() => this.list.get());
      }
    });
  }

}
