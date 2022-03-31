import type { CrearActualizarServicioDto, GetServicioInput, ServicioDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  apiName = 'UnidadAdministrativa';

  create = (input: CrearActualizarServicioDto) =>
    this.restService.request<any, ServicioDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/servicio',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/servicio/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ServicioDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/servicio/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetServicioInput) =>
    this.restService.request<any, PagedResultDto<ServicioDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/servicio',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = (isActive: boolean) =>
    this.restService.request<any, ListResultDto<ServicioDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/servicio/lookup',
      params: { isActive },
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarServicioDto) =>
    this.restService.request<any, ServicioDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/servicio/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
