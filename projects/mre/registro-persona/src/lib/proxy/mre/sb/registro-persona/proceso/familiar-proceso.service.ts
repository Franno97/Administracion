import type { ChequeoPrevioInput, RegistroPersonaOutput, ValidarCodigoVerificacionInput } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PersonaDto } from '../persona/models';

@Injectable({
  providedIn: 'root',
})
export class FamiliarProcesoService {
  apiName = 'RegistroPersona';

  enviarCodigoVerificacion = (numeroRegistro: string) =>
    this.restService.request<any, RegistroPersonaOutput>({
      method: 'POST',
      url: '/api/RegistroPersona/FamiliarProceso/enviarcodigo',
      params: { numeroRegistro },
    },
    { apiName: this.apiName });

  guardarPersona = (numeroRegistro: string) =>
    this.restService.request<any, PersonaDto>({
      method: 'POST',
      url: '/api/RegistroPersona/FamiliarProceso/guardarpersona',
      params: { numeroRegistro },
    },
    { apiName: this.apiName });

  obtenerInformacionPersona = (numeroRegistro: string) =>
    this.restService.request<any, PersonaDto>({
      method: 'GET',
      url: `/api/RegistroPersona/FamiliarProceso/obtenerinformacionpersona/${numeroRegistro}`,
    },
    { apiName: this.apiName });

  validarCodigoVerificacion = (input: ValidarCodigoVerificacionInput) =>
    this.restService.request<any, RegistroPersonaOutput>({
      method: 'POST',
      url: '/api/RegistroPersona/FamiliarProceso/validarcodigo',
      body: input,
    },
    { apiName: this.apiName });

  verificacionPrevia = (input: ChequeoPrevioInput) =>
    this.restService.request<any, RegistroPersonaOutput>({
      method: 'POST',
      url: '/api/RegistroPersona/FamiliarProceso/verificacionprevia',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
