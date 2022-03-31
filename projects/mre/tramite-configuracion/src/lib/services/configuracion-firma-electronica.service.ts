import { RestOccurError, RestService, Rest } from '@abp/ng.core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseWrapper, BaseRestService, ResultadoPaginadoResponse } from '@mre/comunes';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ActualizarConfiguracionFirmaElectronicaRequest, ConfiguracionFirmaElectronicaResponse, CrearConfiguracionFirmaElectronicaRequest, ObtenerListaConfiguracionFirmaElectronicaRequest } from '../models/models';
import { Store } from '@ngxs/store';
import { asyncScheduler, from, Observable, of, scheduled, throwError } from 'rxjs';
import { ConfirmationService, DEFAULT_ERROR_LOCALIZATIONS, DEFAULT_ERROR_MESSAGES } from '@abp/ng.theme.shared';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionFirmaElectronicaService extends BaseRestService {

  apiName = 'Tramite';

  crear = (input: CrearConfiguracionFirmaElectronicaRequest) =>
    this.restService.request<any, ApiResponseWrapper<string>>({
      method: 'POST',
      url: '/api/ConfiguracionFirmaElectronica',
      body: input,
    },
      { apiName: this.apiName })
      .pipe(
        switchMap(respuesta => this.procesarResponse<string>(respuesta))
      );


  actualizar = (input: ActualizarConfiguracionFirmaElectronicaRequest) =>
    this.restService.request<any, ApiResponseWrapper<void>>({
      method: 'PUT',
      url: `/api/ConfiguracionFirmaElectronica`,
      body: input,
    },
      { apiName: this.apiName }).pipe(
        switchMap(respuesta => this.procesarResponse<void>(respuesta))
      );

  borrar = (id: string) =>
    this.restService.request<any, ApiResponseWrapper<void>>({
      method: 'DELETE',
      url: `/api/ConfiguracionFirmaElectronica/${id}`,
    },
      { apiName: this.apiName }).pipe(
        switchMap(respuesta => this.procesarResponse<void>(respuesta))
      );

      
  obtener = (id: string) =>
    this.restService.request<any, ApiResponseWrapper<ConfiguracionFirmaElectronicaResponse>>({
      method: 'GET',
      url: `/api/ConfiguracionFirmaElectronica/${id}`,
    },
      { apiName: this.apiName }).pipe(
        switchMap(respuesta => this.procesarResponse<ConfiguracionFirmaElectronicaResponse>(respuesta))
      );

  obtenerLista = (input: ObtenerListaConfiguracionFirmaElectronicaRequest) =>
    this.restService.request<any, ApiResponseWrapper<ResultadoPaginadoResponse<ConfiguracionFirmaElectronicaResponse>>>({
      method: 'GET',
      url: '/api/ConfiguracionFirmaElectronica',
      params: { saltar: input.saltar, maximoResultado: input.maximoResultado, servicioId: input.servicioId, tipoDocumentoCodigo: input.tipoDocumentoCodigo  , orden: input.orden},
    },
      { apiName: this.apiName }).pipe(
        switchMap(respuesta => this.procesarResponse<ResultadoPaginadoResponse<ConfiguracionFirmaElectronicaResponse>>(respuesta))
      );


  constructor(private restService: RestService,
    protected confirmationService: ConfirmationService) { 
      super(confirmationService);
    }
}

