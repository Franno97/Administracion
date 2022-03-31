import type { CrearActualizarPersonaDto, ObtenerPersonaInputDto, PersonaDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  apiName = 'RegistroPersona';

  create = (input: CrearActualizarPersonaDto) =>
    this.restService.request<any, PersonaDto>({
      method: 'POST',
      url: '/api/RegistroPersona/persona',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/RegistroPersona/persona/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, PersonaDto>({
      method: 'GET',
      url: `/api/RegistroPersona/persona/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: ObtenerPersonaInputDto) =>
    this.restService.request<any, PagedResultDto<PersonaDto>>({
      method: 'GET',
      url: '/api/RegistroPersona/persona',
      params: { filtro: input.filtro, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  obtenerPersonaActual = () =>
    this.restService.request<any, PersonaDto>({
      method: 'GET',
      url: '/api/RegistroPersona/persona/actual',
    },
    { apiName: this.apiName });

  obtenerPersonaPorNombreUsuario = (nombreUsuario: string) =>
    this.restService.request<any, PersonaDto>({
      method: 'GET',
      url: `/api/RegistroPersona/persona/usuario/${nombreUsuario}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarPersonaDto) =>
    this.restService.request<any, PersonaDto>({
      method: 'PUT',
      url: `/api/RegistroPersona/persona/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
