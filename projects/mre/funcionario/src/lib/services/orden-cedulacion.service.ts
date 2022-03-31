import { RestService } from "@abp/ng.core";
import { Injectable } from "@angular/core";
import { ConfirmationService } from "@abp/ng.theme.shared";
import { ApiResponseWrapper, BaseRestService } from "@mre/comunes";
import { switchMap } from "rxjs/operators";
import { FacturarServicioRequest, FacturarServicioResponse, FinalizarTramiteRequest, FinalizarTramiteResponse, GenerarOrdenCedulacionRequest, GenerarOrdenCedulacionResponse, PagoDto } from "../modelos/modelos";


@Injectable({
    providedIn: 'root'
  })
export class OrdenCedulacionService extends BaseRestService {

    apiName = 'Tramite';

    validarTramite = (tramiteId: string) =>
            this.restService.request<any,ApiResponseWrapper<boolean>>({
              method: 'GET',
              url: '/api/OrdenCedulacion/validar-tramite',
              params: { tramiteId: tramiteId },
            },
              { apiName: this.apiName }).pipe(
                switchMap(respuesta => this.procesarResponse<boolean>(respuesta))
              );

    obtenerPago = (tramiteId: string) =>
            this.restService.request<any,ApiResponseWrapper<PagoDto>>({
              method: 'GET',
              url: '/api/OrdenCedulacion/obtener-pago',
              params: { tramiteId: tramiteId },
            },
              { apiName: this.apiName }).pipe(
                switchMap(respuesta => this.procesarResponse<PagoDto>(respuesta))
              );


    facturarServicio = (request: FacturarServicioRequest) =>
            this.restService.request<any,ApiResponseWrapper<FacturarServicioResponse>>({
              method: 'POST',
              url: '/api/OrdenCedulacion/facturar-servicio',
              body: request,
            },
              { apiName: this.apiName }).pipe(
                switchMap(respuesta => this.procesarResponse<FacturarServicioResponse>(respuesta))
              );


    generarOrdenCedulacion = (request: GenerarOrdenCedulacionRequest) =>
              this.restService.request<any,ApiResponseWrapper<GenerarOrdenCedulacionResponse>>({
                method: 'POST',
                url: '/api/OrdenCedulacion/generar-orden-cedulacion',
                body: request,
              },
                { apiName: this.apiName }).pipe(
                  switchMap(respuesta => this.procesarResponse<GenerarOrdenCedulacionResponse>(respuesta))
                );


    finalizarTramite = (request: FinalizarTramiteRequest) =>
                this.restService.request<any,ApiResponseWrapper<FinalizarTramiteResponse>>({
                  method: 'POST',
                  url: '/api/OrdenCedulacion/finalizar-tramite',
                  body: request,
                },
                  { apiName: this.apiName }).pipe(
                    switchMap(respuesta => this.procesarResponse<FinalizarTramiteResponse>(respuesta))
                  );

        

    constructor(private restService: RestService,
        protected confirmationService: ConfirmationService) { 
          super(confirmationService);
    }
}