import type { ActualizarPersonaConfiguracionDto, PersonaConfiguracionDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonaConfiguracionService {
  apiName = 'RegistroPersona';

  actualizar = (input: ActualizarPersonaConfiguracionDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/RegistroPersona/personaConfiguracion',
      body: input,
    },
    { apiName: this.apiName });

  obtener = () =>
    this.restService.request<any, PersonaConfiguracionDto>({
      method: 'GET',
      url: '/api/RegistroPersona/personaConfiguracion',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
