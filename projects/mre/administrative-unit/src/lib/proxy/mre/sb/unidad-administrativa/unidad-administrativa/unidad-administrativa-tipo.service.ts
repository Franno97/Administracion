import type { UnidadAdministrativaTipoDto, UnidadAdministrativaTipoInfoDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnidadAdministrativaTipoService {
  apiName = 'UnidadAdministrativa';

  create = (input: UnidadAdministrativaTipoDto) =>
    this.restService.request<any, UnidadAdministrativaTipoDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/unidad-administrativa-tipo',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/unidad-administrativa-tipo/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, UnidadAdministrativaTipoDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa-tipo/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<UnidadAdministrativaTipoDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/unidad-administrativa-tipo',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  obtenerListaInfo = () =>
    this.restService.request<any, ListResultDto<UnidadAdministrativaTipoInfoDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/unidad-administrativa-tipo/obtener-lista-info',
    },
    { apiName: this.apiName });

  update = (id: string, input: UnidadAdministrativaTipoDto) =>
    this.restService.request<any, UnidadAdministrativaTipoDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/unidad-administrativa-tipo/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
