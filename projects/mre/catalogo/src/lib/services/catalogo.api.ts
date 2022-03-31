import { RestService } from "@abp/ng.core";
import { ConfirmationService } from "@abp/ng.theme.shared";
import { Injectable } from "@angular/core";
import { ApiResponseWrapper, BaseRestService } from "@mre/comunes";
import { switchMap } from "rxjs/operators";
import { Catalogo } from "../models";

@Injectable({
    providedIn: 'root'
  })
export class CatalogoService extends BaseRestService {

    apiName = 'Catalogo';

   consultarCatalogoPorCatalogoCabeceraCodigo = (codigoCatalogo: string) =>
      this.restService.request<any,ApiResponseWrapper<Catalogo[]>>({
        method: 'GET',
        url: '/api/Catalogo/ConsultarCatalogoPorCatalogoCabeceraCodigo',
        params: { codigoCatalogo: codigoCatalogo },
      },
        { apiName: this.apiName }).pipe(
          switchMap(respuesta => this.procesarResponse<Catalogo[]>(respuesta))
        );

    consultarCatalogoPorCodigo = (codigoCatalogo: string, codigo: string) =>
        this.restService.request<any,ApiResponseWrapper<Catalogo>>({
          method: 'GET',
          url: '/api/Catalogo/ConsultarCatalogoPorCodigo',
          params: { codigoCatalogo: codigoCatalogo, codigo:codigo },
        },
          { apiName: this.apiName }).pipe(
            switchMap(respuesta => this.procesarResponse<Catalogo>(respuesta))
          );
  
      consultarCatalogoPorCodigoMdg = (codigoCatalogo: string, codigoMdg: string) =>
          this.restService.request<any,ApiResponseWrapper<Catalogo>>({
            method: 'GET',
            url: '/api/Catalogo/ConsultarCatalogoPorCodigoMdg',
            params: { codigoCatalogo: codigoCatalogo, codigoMdg:codigoMdg },
          },
            { apiName: this.apiName }).pipe(
              switchMap(respuesta => this.procesarResponse<Catalogo>(respuesta))
            );

      consultarCatalogoPorCodigoEsigex = (codigoCatalogo: string, codigoEsigex: string) =>
            this.restService.request<any,ApiResponseWrapper<Catalogo>>({
              method: 'GET',
              url: '/api/Catalogo/ConsultarCatalogoPorCodigoEsigex',
              params: { codigoCatalogo: codigoCatalogo, codigoEsigex:codigoEsigex },
            },
              { apiName: this.apiName }).pipe(
                switchMap(respuesta => this.procesarResponse<Catalogo>(respuesta))
              );

      consultarCatalogoPorCodigoOtro = (codigoCatalogo: string, codigoOtro: string) =>
            this.restService.request<any,ApiResponseWrapper<Catalogo>>({
              method: 'GET',
              url: '/api/Catalogo/ConsultarCatalogoPorCodigoOtro',
              params: { codigoCatalogo: codigoCatalogo, codigoOtro:codigoOtro },
            },
              { apiName: this.apiName }).pipe(
                switchMap(respuesta => this.procesarResponse<Catalogo>(respuesta))
              );

        

    constructor(private restService: RestService,
        protected confirmationService: ConfirmationService) { 
          super(confirmationService);
    }
}
