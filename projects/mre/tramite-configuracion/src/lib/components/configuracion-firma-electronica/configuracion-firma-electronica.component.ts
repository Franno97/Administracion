import { ListService, RestOccurError, RestService } from '@abp/ng.core';
import { HttpStatusCode } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ApiResponseWrapper, ResultadoPaginadoResponse, TABLA_MAXIMO_RESULTADO } from '@mre/comunes';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { ConfiguracionFirmaElectronicaResponse, ObtenerListaConfiguracionFirmaElectronicaRequest } from '../../models/models';
import { ConfiguracionFirmaElectronicaService } from '../../services/configuracion-firma-electronica.service';
import { Store } from '@ngxs/store';
import { of, throwError } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { ServicioDto, ServicioService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { Catalogo, CatalogoService, CatalogoCodigos } from '@mre/catalogo';


@Component({
  selector: 'lib-configuracion-firma-electronica',
  templateUrl: './configuracion-firma-electronica.component.html'
})
export class ConfiguracionFirmaElectronicaComponent implements OnInit {

  configuracionFirmaElectronica = { items: [], totalRegistros: 0 } as ResultadoPaginadoResponse<ConfiguracionFirmaElectronicaResponse>;

  form: FormGroup;

  configuracionFirmaElectronicaSeleccionada = {} as ConfiguracionFirmaElectronicaResponse;

  servicios : ServicioDto[];
  catalogoTipoDocumentos : Catalogo[];

  modeloFirma = [] as ModeloFirma[];

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  //paginacion
  pagina = 0;
  maximoResultado:number;

  //Ordenamiento
  ordenColumna = '';
  ordenDireccion = '';

  //mensajes
  spanishNgxDatatableMessages = {
    emptyMessage: 'No hay datos disponibles',
    totalMessage: 'Total',
    selectedMessage: 'Seleccionado',
  };



  constructor(
    private servicioService: ServicioService,
    private catalogoService:CatalogoService,
    private configuracionFirmaElectronicaService: ConfiguracionFirmaElectronicaService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private restService: RestService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.maximoResultado= maximoResultado;

      this.modeloFirma.push({codigo:"QR",descripcion:"QR"});
      this.modeloFirma.push({codigo:"INFO1",descripcion:"Información 1"});
      this.modeloFirma.push({codigo:"INFO2",descripcion:"Información 2"});
      this.modeloFirma.push({codigo:"INFO3",descripcion:"Información 3"});
      
  }

  ngOnInit() {
    this.obtenerLista();
  }

  catalogos(){
      this.servicioService.getLookup(true).subscribe((respuesta) => {
            this.servicios = respuesta.items;
      });   

      this.catalogoService.consultarCatalogoPorCatalogoCabeceraCodigo(CatalogoCodigos.TIPO_DOCUMENTO).subscribe((respuesta) => {
        this.catalogoTipoDocumentos = respuesta;
      });    
     
  }

  obtenerLista(){
    
    let obtenerListaConfiguracionFirmaElectronicaRequest = {} as ObtenerListaConfiguracionFirmaElectronicaRequest;
    obtenerListaConfiguracionFirmaElectronicaRequest.saltar = this.pagina * this.maximoResultado;
    obtenerListaConfiguracionFirmaElectronicaRequest.maximoResultado = this.maximoResultado;
    obtenerListaConfiguracionFirmaElectronicaRequest.orden =  this.ordenColumna ? `${this.ordenColumna} ${this.ordenDireccion}` : undefined;

    this.configuracionFirmaElectronicaService.obtenerLista(obtenerListaConfiguracionFirmaElectronicaRequest).subscribe((respuesta)=>{
       this.configuracionFirmaElectronica= respuesta;
    });

  }

  setPaginacion(pageInfo){
    this.pagina = pageInfo.offset;
    this.obtenerLista();
  }

  setOrdenamiento(event){
   
    const ordenamiento = event.sorts[0];
    this.ordenColumna = ordenamiento.prop;
    this.ordenDireccion = ordenamiento.dir;
    this.obtenerLista();
  }

  crear() {
    this.configuracionFirmaElectronicaSeleccionada = {} as ConfiguracionFirmaElectronicaResponse;
    this.catalogos();
    this.buildForm();
    this.isModalOpen = true;
  }

  editar(id: string) {
    this.configuracionFirmaElectronicaService.obtener(id).subscribe((respuesta) => {
     
      this.configuracionFirmaElectronicaSeleccionada = respuesta;
      this.catalogos();
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    
    this.form = this.fb.group({
      servicioId: [this.configuracionFirmaElectronicaSeleccionada.servicioId || null, Validators.required],
      servicioNombre: [this.configuracionFirmaElectronicaSeleccionada.servicioNombre || null, Validators.required],
      tipoDocumentoCodigo: [this.configuracionFirmaElectronicaSeleccionada.tipoDocumentoCodigo || null, Validators.required],
      modeloFirma: [this.configuracionFirmaElectronicaSeleccionada.modeloFirma || null, Validators.required],
      tamanioFirma: [this.configuracionFirmaElectronicaSeleccionada.tamanioFirma, [Validators.required,
        Validators.min(1),
        Validators.max(5)]
      ],
      posicionX: [this.configuracionFirmaElectronicaSeleccionada.posicionX, Validators.required],
      posicionY: [this.configuracionFirmaElectronicaSeleccionada.posicionY, Validators.required],
      numeroPagina: [this.configuracionFirmaElectronicaSeleccionada.numeroPagina, [Validators.required,
        Validators.min(1)]
      ]
    });
  
  }

  guardar() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

      if (!this.configuracionFirmaElectronicaSeleccionada.id){
        const peticionCrear = this.configuracionFirmaElectronicaService.crear(this.form.value);

        peticionCrear
          .pipe(finalize(() => (this.modalBusy = false)))
          .subscribe(() => {
            this.isModalOpen = false;
            this.submitted = false;
            this.form.reset();
            this.obtenerLista();
          }); 
    
      }else{

        let actualizarConfiguracionFirmaElectronicaRequest = {...this.form.value,id:this.configuracionFirmaElectronicaSeleccionada.id};

        const peticionActualizar = this.configuracionFirmaElectronicaService.actualizar(actualizarConfiguracionFirmaElectronicaRequest);

        peticionActualizar
          .pipe(finalize(() => (this.modalBusy = false)))
          .subscribe(() => {
            this.isModalOpen = false;
            this.submitted = false;
            this.form.reset();
            this.obtenerLista();
          }); 
      }
  }

  borrar(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.configuracionFirmaElectronicaService.borrar(id).subscribe(
          () => {
            this.obtenerLista();
          }
        );
      }
    });
  }


  isRequired(name: string) {
    const validator = this.form.get(name).validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }

  cambiaServicio(e){

    const { servicioId } = this.form.value;
    
    let servicio = this.servicios.filter(x=>x.id==servicioId);
   
    if (servicio.length==1){
      this.form.patchValue({
        servicioNombre: servicio[0].nombre
      });
    }else{
      this.form.patchValue({
        servicioNombre: null
      });
    } 

  }

  getDescripcion(value) {
    const elemento = this.modeloFirma.filter(x => x.codigo === value);
    return elemento.length==1?elemento[0].descripcion:"---";
  }

}

interface ModeloFirma {
  codigo?: string;
  descripcion?: string
}


