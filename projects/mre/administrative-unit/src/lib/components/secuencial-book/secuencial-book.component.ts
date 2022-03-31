import { Component, Inject, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { finalize } from 'rxjs/operators';
import { LibroLookupDto, LibroService, SecuencialLibroDto, SecuencialLibroService, ServicioDto } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

@Component({
  selector: 'lib-secuencial-book',
  templateUrl: './secuencial-book.component.html',
  styleUrls: ['./secuencial-book.component.css'],
  providers: [ListService]
})
export class SecuencialBookComponent implements OnInit {
  seqeuntialBook = { items: [], totalCount: 0 } as PagedResultDto<SecuencialLibroDto>;

  books: LibroLookupDto[];

  submitted = false;
  form: FormGroup;

  isModalOpen = false;
  selectedSequentialBook = {} as SecuencialLibroDto;

  serviceId = '';
  administrativeUnitId = '';
  serviceName = '';
  service = {} as ServicioDto;
  modalBusy = false;
  constructor(
    public readonly list: ListService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sequentialBookService: SecuencialLibroService,
    private bookService: LibroService,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.params.serviceId;
    this.serviceName = this.route.snapshot.params.serviceName;
    this.administrativeUnitId = this.route.snapshot.params.administrativeUnitId;

    this.sequentialBookService.getByAdministrativeUnitService(this.serviceId, this.administrativeUnitId).subscribe((response) =>{
      this.seqeuntialBook = response;
    })
  }

  create() {
    this.loadBooks();
    this.selectedSequentialBook = {} as SecuencialLibroDto;
    this.buildForm()
    this.isModalOpen = true;
  }

  edit(id: string) {
    this.loadBooks();
    this.sequentialBookService.get(id).subscribe((response) => {
      this.selectedSequentialBook = response;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  loadBooks(){
    this.bookService.getLookup().subscribe((response) =>{
      this.books = response.items;
    })
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.sequentialBookService.delete(id).subscribe(() => {
          this.sequentialBookService.getByAdministrativeUnitService(this.serviceId, this.administrativeUnitId).subscribe((response) => {
            this.seqeuntialBook = response;
          })
        });
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      servicioId: [this.selectedSequentialBook.servicioId || this.serviceId, Validators.required],
      unidadAdministrativaId: [this.selectedSequentialBook.unidadAdministrativaId || this.administrativeUnitId, Validators.required],
      libroId: [this.selectedSequentialBook.libroId || null, Validators.required],
      numeroPaginaPorVolumen: [this.selectedSequentialBook.numeroPaginaPorVolumen || '', [Validators.required]],
      volumenActual: [this.selectedSequentialBook.volumenActual || '', [Validators.required]],
      siguientePagina: [this.selectedSequentialBook.siguientePagina || '', [Validators.required]],
      anio: [this.selectedSequentialBook.anio || '', [Validators.required]]
    });
  }

  save() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;
    const request = this.selectedSequentialBook.id
      ? this.sequentialBookService.update(this.selectedSequentialBook.id, this.form.value)
      : this.sequentialBookService.create(this.form.value);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.sequentialBookService.getByAdministrativeUnitService(this.serviceId, this.administrativeUnitId).subscribe((response) => {
          this.seqeuntialBook = response;
        })
      });
  }

}
