import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiResponseWrapper, BaseRestService, MeensajeOnBoardService } from '@mre/comunes';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FiltroTramitesPorRol, RespuestaFiltroTramitePorRol } from '../models/tramites-modelos';
import { MovimientoRequest } from '../models/movimiento-request';
import { TramitesObj } from '../models/tramites-obj';
import { UpdateMovimiento } from '../models/update-movimiento';
import { UpdateRequisito } from '../models/update-requisito';
import { EnvironmentService, RestService } from '@abp/ng.core';
import { ConfirmationService } from '@abp/ng.theme.shared';

@Injectable({
  providedIn: 'root',
})
export class TramitesPendientesService extends BaseRestService {

  // apiUrl: string = 'http://172.31.3.40:86/api/Tramite/';
  // apiUrlMovimiento = 'http://172.31.3.40:86/api/Movimiento/'
  //apiUrlRolEstado = 'http://172.31.3.40:86/api/RolEstado/';
  //apiUrlSoporteGestionInformacion = 'http://172.31.3.40:86/api/SoporteGestion/';
  apiUrlLinks = "http://172.31.3.18/SharePointMensajes/api/links";
  // apiUrlSoporteGestion = 'http://172.31.3.18/SharePointArchivos/api/sharepoint/grabarSoporteGestion';
  // apiUrlMultasSubsanacion = 'http://172.31.3.40:88/api/Multa/';
  // apiUrlDocumentos = 'http://172.31.3.40:86/api/Documento/';
  formData: FormGroup;

  apiName = 'Tramite';

  apiUrl = '';

  constructor(private http: HttpClient,
    private modalService: NgbActiveModal,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private restService: RestService,
    protected confirmationService: ConfirmationService,
    private servicioEnvironment: EnvironmentService
  ) {
    super(confirmationService);
    this.apiUrl = this.servicioEnvironment.getApiUrl('Tramite');
  }

  /* postGuardarMultaSubsanacion(dataObj: RegistrarMulta): Observable<any> {
    let url = this.apiUrlMultasSubsanacion + 'RegistrarMulta';
    return this.http.post(url, dataObj);
  } */

  updateObservacionRequisitos(docomentosArr: Array<UpdateRequisito>): Observable<any> {
    const url = this.apiUrl + "/api/Documento/ActualizarDocumento";

    return this.http.put(url, { documentos: docomentosArr });
  }

  /* getTramitesByRol(rol: string, id: string): Observable<any> {
    let url = this.apiUrl + "ConsultarTramitePorFiltrosRol";
    return this.http.post(url, {
      nombreRol: rol,
      usuarioId: id,
      estado: '',
      filtroTipo: 'Ninguno',
      filtroTexto: '',
    });
  } */

  consultarTramitePorFiltrosRol = (filtro: FiltroTramitesPorRol) =>
    this.restService.request<any, ApiResponseWrapper<RespuestaFiltroTramitePorRol>>({
      method: 'POST',
      url: '/api/Tramite/ConsultarTramitePorFiltrosRol',
      body: filtro,
    },
      { apiName: this.apiName }).pipe(
        switchMap(respuesta => this.procesarResponse<RespuestaFiltroTramitePorRol>(respuesta))
      );

  /* getTramitesByRol(filtro: FiltroTramitesPorRol): Observable<any> {
    let url = this.apiUrl + "ConsultarTramitePorFiltrosRol";
    return this.http.post(url, filtro);
  } */

  /* getTramitesByID(idParams: string): Observable<any> {
    let url = this.apiUrl + "ConsultarTramitesPorCiudadanoId";
    return this.http.post(url, {
      id: idParams
    })
  } */
  //----------------------------------
  getLinks(): Observable<any> {
    return this.http.get(this.apiUrlLinks);
  }
  // ---------------------------------------------------------
  /* grabarArchivoSoporteGestionSharePoint(dataObj: any): Observable<any> {
    let formData = new FormData();

    formData.append('myfile', dataObj.myfile);
    formData.append('codigoMDG', dataObj.codigoMDG);

    return this.http.post(this.apiUrlSoporteGestion, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  } */

  grabarInformacionArchivo(dataObj: any): Observable<any> {
    const url = this.apiUrl + "/api/SoporteGestion/CrearSoporteGestion";
    // let url = this.apiUrlSoporteGestionInformacion + 'CrearSoporteGestion';
    return this.http.post(url, dataObj);
  }

  // Guardar movimiento de tramites
  // ---------------------------------------------------------
  getConsultarSiguientesEstadosPorEstadoActual(estadoActual: number): Observable<any> {
    const url = this.apiUrl + "/api/RolEstado/ConsultarSiguientesEstadosPorEstadoActual?estadoActual=" + estadoActual;
    // return this.http.get(this.apiUrlRolEstado + "ConsultarSiguientesEstadosPorEstadoActual?estadoActual=" + estadoActual);
    return this.http.get(url);
  }

  postCrearMovimiento(dataObj: MovimientoRequest): Observable<any> {
    const url = this.apiUrl + '/api/Movimiento/CrearMovimiento';
    // return this.http.post(this.apiUrlMovimiento + "CrearMovimiento", dataObj);
    return this.http.post(url, dataObj);
  }
  postCrearMovimientoTramite(dataObj: MovimientoRequest, modalService: NgbActiveModal = this.modalService, option: string = '', title: string = "Información", msg: string = "Desea continuar con la operación?", confirmation: boolean = true) {
    if (confirmation) {
      this.meensajeOnBoardService.showMensajePopupConfirmacion(title, msg, option).then(res => {
        if (res)
          this.postCrearMovimiento(dataObj).subscribe(res => {
            this.meensajeOnBoardService.showMensajePredefinido("success");

            modalService.dismiss();
          });
      });
    }
  }
  updateMoviento(dataObj: UpdateMovimiento): Observable<any> {
    const url = this.apiUrl + '/api/Movimiento/ActualizarMovimiento';
    // return this.http.put(this.apiUrlMovimiento + 'ActualizarMovimiento', dataObj);
    return this.http.put(url, dataObj);
  }
  //---------------------------------------------------------
  setReactiveForm(data: FormGroup) {
    this.formData = data;
  }
  getReacitveForm(): FormGroup {
    return this.formData;
  }
  patchValuetoForm(data: TramitesObj) {

    this.formData.patchValue({
      numberMDG: ['OJOJOJOJ'],
      cedulaSolicitante: data.solicitante.cedula,
      nacionalidadSolicitante: data.solicitante.nacionalidad,
      nombreCompletSolicitanteo: data.solicitante.nombres,
      paisSolicitante: data.solicitante.pais,
      ciudadSolicitante: data.solicitante.ciudad,
      paisConsuladoUnidadAdministrativaSolicitante: data.solicitante.consuladoPais,
      direccionSolicitante: data.solicitante.direccion,
      telefonoSolicitante: data.solicitante.telefono,
      edadSolicitante: data.solicitante.edad,
      nombreConsuladoUnidadAdministrativaSolicitante: data.solicitante.consuladoNombre,
      correoSolicitante: data.solicitante.correo,
      // --------------------------------------
      fechaSolicitudBeneficiario: (new Date(data.fecha)).toISOString().substring(0, 10),
      primerApellidoBeneficiario: data.beneficiario.primerApellido,
      segundoApellidoBeneficiario: data.beneficiario.segundoApellido,
      nombreCompletoBeneficiario: data.beneficiario.nombres,
      numberMDGBeneficiario: data.beneficiario.codigoMDG,
      paisNacimientoBeneficiario: data.beneficiario.paisNacimiento,
      ciudadNacimientoBeneficiario: data.beneficiario.ciudadNacimiento,
      fechaNacimientoBeneficiario: (new Date(data.beneficiario.fechaNacimiento)).toISOString().substring(0, 10),
      // edadBeneficiario:data.beneficiario.edad,
      edadBeneficiario: (new Date()).getFullYear() - (new Date(data.beneficiario.fechaNacimiento)).getFullYear(),
      estadoCivilBeneficiario: data.beneficiario.estadoCivil,
      nacionalidadBeneficiario: data.beneficiario.nacionalidad,
      generoBeneficiario: data.beneficiario.genero,
      emailBeneficiario: data.beneficiario.correo,
      calidadMigratoria: data.calidadMigratoria,
      grupoBeneficiario: data.grupo,
      // tipoVisaBeneficiario:data.tipoVisa,
      actividadDesarrollarBeneficiario: data.actividad,
      discapacidadBeneficiario: data.beneficiario.poseeDiscapacidad,
      porcientoDiscapacidadBeneficiario: data.beneficiario.porcentajeDiscapacidad,
      numeroCarnetConadisBeneficiario: data.beneficiario.carnetConadis,
      // --------------------------------------
      // Domicilio
      // --------------------------------------
      paisDomicilioBeneficiario: data.beneficiario.domicilio.pais,
      provinciaDomicilioBeneficiario: data.beneficiario.domicilio.provincia,
      ciudadDomicilioBeneficiario: data.beneficiario.domicilio.ciudad,
      telefonoDomicilioBeneficiario: data.beneficiario.domicilio.telefonoDomicilio,
      celularDomicilioBeneficiario: data.beneficiario.domicilio.telefonoCelular,
      direccionDomicilioBeneficiario: data.beneficiario.domicilio.direccion,
      telefonoTrabajoDomicilioBeneficiario: data.beneficiario.domicilio.telefonoTrabajo,
      // --------------------------------------
      // Pasaporte
      // --------------------------------------
      numeroPasaporteBeneficiario: data.beneficiario.pasaporte.numero,
      fechaEmisionPasaporteBeneficiario: (new Date(data.beneficiario.pasaporte.fechaEmision)).toISOString().substring(0, 10),
      paisEmisionPasaporteBeneficiario: data.beneficiario.pasaporte.paisEmision,
      nombreCompletoPasaporteBeneficiario: data.beneficiario.pasaporte.nombres,
      fechaExpiracionPasaporteBeneficiario: (new Date(data.beneficiario.pasaporte.fechaExpiracion)).toISOString().substring(0, 10),
      ciudadEmisionPasaporteBeneficiario: data.beneficiario.pasaporte.ciudadEmision,
      fechaNacimientoPasaporteBeneficiario: (new Date(data.beneficiario.pasaporte.fechaNacimiento)).toISOString().substring(0, 10),
      // --------------------------------------
      // Visa
      // --------------------------------------
      tieneVisaBeneficiario: data.beneficiario.visa.poseeVisa,
      numeroVisaBeneficiario: data.beneficiario.visa.numeroVisa,
      fechaEmisionVisaBeneficiario: (new Date(data.beneficiario.visa.fechaConcesion)).toISOString().substring(0, 10),
      tipoVisaBeneficiario: data.beneficiario.visa.nombreActoConsularVisa,
      fechaExpiracionVisaBeneficiario: (new Date(data.beneficiario.visa.fechaCaducidad)).toISOString().substring(0, 10),

    });
  }

  guardarObservRequisitosContinuarProcGuardado(observacionesRequisitos: any, movimiento: MovimientoRequest, modalService: NgbActiveModal) {
    let requisitosArr: Array<UpdateRequisito> = [];
    let requisito: UpdateRequisito;
    let temp: any;
    for (let item in observacionesRequisitos) {
      temp = observacionesRequisitos[item];
      requisito = {
        tramiteId: temp.tramiteId,
        documentoId: temp.id,
        descripcion: temp.observacion
      };
      requisitosArr.push(requisito);
    }
    if (requisitosArr.length)
      this.updateObservacionRequisitos(requisitosArr).subscribe(res => {
        this.postCrearMovimientoTramite(movimiento, modalService);
      });
    else
      this.postCrearMovimientoTramite(movimiento, modalService);
  }

}

