import type { TipoServicioDto, TipoServicioLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoServicioService {
  apiName = 'UnidadAdministrativa';

  create = (input: TipoServicioDto) =>
    this.restService.request<any, TipoServicioDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/servicio-tipo',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/servicio-tipo/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TipoServicioDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/servicio-tipo/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TipoServicioDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/servicio-tipo',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<TipoServicioLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/servicio-tipo/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: TipoServicioDto) =>
    this.restService.request<any, TipoServicioDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/servicio-tipo/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
