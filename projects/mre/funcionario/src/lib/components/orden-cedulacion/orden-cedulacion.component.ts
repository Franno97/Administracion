import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { FacturarServicioRequest, FacturarServicioResponse, FinalizarTramiteRequest, GenerarOrdenCedulacionRequest, GenerarOrdenCedulacionResponse, OrdenCedulacionDto, PagoDetalleDto, PagoDto } from '../../modelos/modelos';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObtenerSignatarioInput, SignatarioDto, UnidadAdministrativaService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { UsuarioService } from '@proxy/identidad';
import { Subject } from 'rxjs';
import { SignatarioConUsuarioDto } from 'projects/mre/administrative-unit/src/lib/components/add-signer/add-signer.component';
import { VisaElectronica, VisaService } from '@mre/visa';
import { TramiteService } from '../../services/tramite.service';
import { Catalogo, CatalogoService, CatalogoCodigos } from '@mre/catalogo';
import { OrdenCedulacionService } from '../../services/orden-cedulacion.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'orden-cedulacion',
  templateUrl: './orden-cedulacion.component.html',
  styleUrls: ['./orden-cedulacion.component.css']
})
export class OrdenCedulacionComponent implements OnInit  {
  readonly CODIGO_GENERO_MASCULINO = 'M';
  readonly GENERO_MASCULINO = 'MASCULINO';
  readonly CODIGO_GENERO_FEMENINO = 'F';
  readonly GENERO_FEMENINO = 'FEMENINO'
  readonly GENERO_DEFAULT = 'GENERO';
  readonly CODIGO_ESTADO_CIVIL_CASADO = 'CASADO';
  readonly CODIGO_CATALOGO_NACIONALIDAD = 'Nacionalidad';
  readonly TEXTO_SI = 'SI';
  readonly TEXTO_NO = 'NO';
  readonly EstadoFirmada = 4;

  submitted = false;
  isModalOpen = false;

  signatarios : ListResultDto<SignatarioConUsuarioDto>;
  signatarioSeleccionado = {} as SignatarioConUsuarioDto;

  nombres: string;
  apellidos: string;
  nacionalidad: string;
  estadoCivil: string;
  tipoVisa: string;

  date: Date;

  // data: any;
  tramiteId: string;
  tramiteVisaId: string;
  unidadAdministrativaId: string;
  servicioId: string;

  form: FormGroup;
  formPago: FormGroup;

  conyugeNombre: string;
  conyugePrimerApellido: string;
  conyugeSegundoApellido: string;
  conyugeCorreoElectronico: string;
  fechaNacimiento: Date;
  genero: string;

  pagoOrdenCedulacion = {} as PagoDto;
  pagoDetalle = {} as PagoDetalleDto;
  ordenCedulacion = {} as OrdenCedulacionDto;
  generarOrdenCedulacionResponse = {} as GenerarOrdenCedulacionResponse;
  facturarServicioResponse = {} as FacturarServicioResponse;
  comprobantePago: string;
  ordenCedulacionPdf: string;


  mostrarSectionInicial: boolean = false;
  mostrarFormularioConyuge: boolean = false;
  mostrarSectionPago: boolean = false;
  mostrarSectionFactura: boolean = false;
  mostrarSectionOrdenCedulacion: boolean = false;
  mostrarSectionFinalizar: boolean = false;
  mostrarFormularioSignatario: boolean = false;
  procesando: boolean= false;

  visaElectronica: VisaElectronica;
  catalogoNacionalidades: Catalogo[];
  nacionalidadSeleccionada = {} as Catalogo;
  mensajeFinalizado: string;

  @Input() data: TramitesObj;

  @Output() eventoProcesoFinalizado: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(
    private fb: FormBuilder,
    private ordenCedulacionService: OrdenCedulacionService,
    private confirmation: ConfirmationService,
    private modalService: NgbModal,
    private unidadAdministrativaService: UnidadAdministrativaService,
    private usuarioService: UsuarioService,
    private tramiteService: TramiteService,
    private visaService: VisaService,
    private catalogoService: CatalogoService,
    public datepipe: DatePipe
  ) { }


  ngOnInit(): void {

  }

  validarTramite() {
    if (this.data) {
      this.tramiteId = this.data.id;
      
      this.ordenCedulacionService.validarTramite(this.tramiteId).subscribe(response => {
        if(response) {
          this.visualizar();
        }
      });

    }else{
      throw new Error("Entrada 'Data' es requerida"); 
    }
  }

  visualizar() {
      this.tramiteService.ConsultarTramitePorId(this.tramiteId).subscribe(response => {
        this.unidadAdministrativaId = response.unidadAdministrativaIdCEV;
        this.servicioId = response.servicioId;
        this.tramiteVisaId= response.origenId;
        this.obtenerInformacionVisa();
        this.loadCatalogs();
      });
  }


  obtenerInformacionVisa() {
    //Obtener informacion de la visa
    this.visaService.consultarVisaElectronicaPorTramiteId(this.tramiteVisaId).subscribe(respuesta => {
      this.visaElectronica = respuesta;
      this.cargarInformacionGeneral();
    });
  }

  cargarInformacionGeneral() {
    this.nombres = this.data.beneficiario.nombres;
    this.apellidos = this.data.beneficiario.primerApellido + " " + this.data.beneficiario.segundoApellido;
    this.nacionalidad = this.data.beneficiario.nacionalidad;
    this.estadoCivil = this.data.beneficiario.estadoCivil;
    this.fechaNacimiento = this.data.beneficiario.fechaNacimiento;

    if (this.data.beneficiario.genero == this.CODIGO_GENERO_MASCULINO) {
      this.genero = this.GENERO_MASCULINO
    }
    else if (this.data.beneficiario.genero == this.CODIGO_GENERO_FEMENINO) {
      this.genero = this.GENERO_FEMENINO
    } else {
      this.genero = this.GENERO_DEFAULT
    }

    this.mostrarSectionInicial = true;
    this.isModalOpen = true;
  }

  buildForm() {
    if(this.mostrarFormularioSignatario){
      if(this.mostrarFormularioConyuge) {
        this.form = this.fb.group({
          conyugeNombre: [this.conyugeNombre || null, [Validators.required]],
          conyugePrimerApellido: [this.conyugePrimerApellido || null, [Validators.required]],
          conyugeSegundoApellido: [this.conyugeSegundoApellido || null, [Validators.required]],
          conyugeNacionalidad: [null, [Validators.required]],
          conyugeCorreoElectronico: [this.conyugeCorreoElectronico, [Validators.required]],
          observacion:  [null],
          signatario: [null, [Validators.required]],
        });
      } else {
        this.form = this.fb.group({
          observacion:  [null],
          signatario: [null, [Validators.required]],
        });
      }
    } else {
      this.form = this.fb.group({
      });
    }
    
    this.procesando= false;
  }

  obtenerPago() {
    this.procesando= true;

    this.ordenCedulacionService.obtenerPago(this.tramiteId).subscribe(response => {
      this.pagoOrdenCedulacion = response;
      this.buildPagoForm();
      this.mostrarSectionInicial = false;
      this.mostrarSectionPago = true;
    });
  }

  buildPagoForm() {
    if (this.pagoOrdenCedulacion.pagoDetalles.length > 0) {
      this.pagoDetalle = this.pagoOrdenCedulacion.pagoDetalles[0];
    }

    this.formPago = this.fb.group({
      servicio: [this.pagoDetalle.servicio || null],
      documentoIdentificacion: [this.pagoOrdenCedulacion.documentoIdentificacion || null],
      arancel: [this.pagoDetalle.arancel || null],
      partidaArancelaria: [this.pagoDetalle.partidaArancelaria || null],
      numeroPartida: [this.pagoDetalle.numeroPartida || null],
      valorArancel: [this.pagoDetalle.valorArancel || null],
      valorDescuento: [this.pagoDetalle.valorDescuento || null],
      valorTotal: [this.pagoDetalle.valorTotal || null],

      ordenPago: [this.pagoDetalle.ordenPago || null],
      numeroTransaccion: [this.pagoDetalle.numeroTransaccion || null],
      facturado: [this.pagoDetalle.estaFacturado ? this.TEXTO_SI : this.TEXTO_NO || null],
      observacionPago: [this.pagoOrdenCedulacion.observacion || null],
    });

    this.comprobantePago = this.pagoDetalle.comprobantePago;

    this.procesando= false;
  }

  facturarServicio() {
    this.procesando = true;

    const facturarRequest: FacturarServicioRequest = {
      tramiteId: this.tramiteId,
      pagoId: this.pagoOrdenCedulacion.id
    };
    this.ordenCedulacionService.facturarServicio(facturarRequest).subscribe(response => {
      this.facturarServicioResponse = response;
      this.mostrarResultadoFacturar();
    });
    
  }

  mostrarResultadoFacturar() {
    this.mostrarSectionPago = false;
    this.mostrarSectionFactura= true;
    this.mostrarFormularioConyuge= this.estadoCivil == this.CODIGO_ESTADO_CIVIL_CASADO;
    this.mostrarFormularioSignatario = this.facturarServicioResponse.estadoOrden != this.EstadoFirmada;
    this.buildForm();
  }

  generarOrden() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.procesando= true;

    if(this.mostrarFormularioConyuge) {
      let codigoNacionalidad= this.form.controls['conyugeNacionalidad'].value;
      this.nacionalidadSeleccionada = this.catalogoNacionalidades.find(x => x.codigo == codigoNacionalidad);
    }

    const ordenCedulacionRequest = this.mapearRequestOrdenCedulacion();
    
    this.ordenCedulacionService.generarOrdenCedulacion(ordenCedulacionRequest).subscribe( response => {
      this.generarOrdenCedulacionResponse = response;

      this.ordenCedulacionPdf = this.generarOrdenCedulacionResponse.ordenCedulacion;

      this.mostrarSectionFactura = false;
      this.mostrarSectionOrdenCedulacion = true;

      this.procesando= false;
    });

  }

  finalizarTramite() {
    this.procesando= true;

    const finalizarRequest: FinalizarTramiteRequest = {
      tramiteId: this.tramiteId
    };
    
    this.ordenCedulacionService.finalizarTramite(finalizarRequest).subscribe(response => {
      this.mensajeFinalizado = response.mensaje;
      this.mostrarSectionOrdenCedulacion = false;
      this.mostrarSectionFinalizar = true;
      
      this.procesando = false;
    });
    
  }

  mostrarMensaje(mensaje: string) {
    const options: Partial<Confirmation.Options> = {
      hideCancelBtn: true,
      yesText: 'Aceptar',
    };

    const confirmationStatus$ = this.confirmation.error(mensaje, 'No se ha logrado obtener el pago',
      options)
  }

  private loadCatalogs() {

    let buscarSignatariosInput = {} as ObtenerSignatarioInput;
    buscarSignatariosInput.servicioId = this.servicioId;

    this.unidadAdministrativaService.buscarSignatarios(this.unidadAdministrativaId, buscarSignatariosInput)
      .subscribe(response => {
        let signatariosData = { items: [], totalCount: 0 } as ListResultDto<SignatarioConUsuarioDto>;
        signatariosData.items = response.items.map(item => ({ ...item, nombres: "", apellidos: "" }));

        // Obtener datos de usuarios
        let userIds = response.items.map(({ usuarioId }) => usuarioId);

        this.usuarioService.obtenerLista(userIds).subscribe((response) => {

          signatariosData.items.forEach(item => {
            item.nombres = response.find(u => u.id == item.usuarioId).name;
            item.apellidos = response.find(u => u.id == item.usuarioId).surname;
          });

          this.signatarios = signatariosData;
        });

      });

    //Obtener catalogo de nacionalidad
    this.catalogoService.consultarCatalogoPorCatalogoCabeceraCodigo(CatalogoCodigos.NACIONALIDAD).subscribe((respuesta) => {
      this.catalogoNacionalidades = respuesta;
    });

  }

  formatearFecha() {
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.date, 'dd-MM-yyyy');
  }

  mapearRequestOrdenCedulacion() : GenerarOrdenCedulacionRequest {
    let ordenCedulacionRequest = {} as GenerarOrdenCedulacionRequest;
    if(this.mostrarFormularioConyuge && this.mostrarFormularioSignatario) {
      ordenCedulacionRequest.conyugeNombres= this.form.controls['conyugeNombre'].value;
      ordenCedulacionRequest.conyugePrimerApellido= this.form.controls['conyugePrimerApellido'].value;
      ordenCedulacionRequest.conyugeSegundoApellido= this.form.controls['conyugeSegundoApellido'].value;
      ordenCedulacionRequest.conyugeNacionalidadCodigo= this.nacionalidadSeleccionada.codigo;
      ordenCedulacionRequest.conyugeNacionalidad= this.nacionalidadSeleccionada.descripcion;
      ordenCedulacionRequest.conyugeCorreoElectronico= this.form.controls['conyugeCorreoElectronico'].value;
    }
    if(this.mostrarFormularioSignatario) {
      ordenCedulacionRequest.observacion= this.form.controls['observacion'].value;
      ordenCedulacionRequest.usuarioId= this.form.controls['signatario'].value;
    }
    ordenCedulacionRequest.tramiteId= this.tramiteId;
    ordenCedulacionRequest.pagoId= this.pagoOrdenCedulacion.id;
    
      
    return ordenCedulacionRequest;
  }

  finalizarProceso() {
    this.modalService.dismissAll();
    //TODO: ...notificar al padre...
    this.eventoProcesoFinalizado.emit(this.tramiteId);  
  }

}
