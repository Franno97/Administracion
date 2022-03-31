import type { ChequeoPrevioInput, RegistroPersonaOutput, ValidarCodigoVerificacionInput } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistroPersonaProcesoService {
  apiName = 'RegistroPersona';

  enviarCodigoVerificacion = (numeroRegistro: string) =>
    this.restService.request<any, RegistroPersonaOutput>({
      method: 'POST',
      url: '/api/RegistroPersona/RegistroPersonaProceso/enviarcodigo',
      params: { numeroRegistro },
    },
    { apiName: this.apiName });

  obtenerInformacionPersona = (numeroRegistro: string) =>
    this.restService.request<any, RegistroPersonaOutput>({
      method: 'GET',
      url: `/api/RegistroPersona/RegistroPersonaProceso/obtenerinformacionpersona/${numeroRegistro}`,
    },
    { apiName: this.apiName });

  rechazarRegistro = (numeroRegistro: string) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/RegistroPersona/RegistroPersonaProceso/rechazarRegistro',
      params: { numeroRegistro },
    },
    { apiName: this.apiName });

  registrarPersona = (numeroRegistro: string) =>
    this.restService.request<any, RegistroPersonaOutput>({
      method: 'POST',
      url: '/api/RegistroPersona/RegistroPersonaProceso/registrarPersona',
      params: { numeroRegistro },
    },
    { apiName: this.apiName });

  validarCodigoVerificacion = (input: ValidarCodigoVerificacionInput) =>
    this.restService.request<any, RegistroPersonaOutput>({
      method: 'POST',
      url: '/api/RegistroPersona/RegistroPersonaProceso/validarcodigo',
      body: input,
    },
    { apiName: this.apiName });

  verificacionPrevia = (input: ChequeoPrevioInput) =>
    this.restService.request<any, RegistroPersonaOutput>({
      method: 'POST',
      url: '/api/RegistroPersona/RegistroPersonaProceso/verificacionprevia',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
