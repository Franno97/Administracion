import type { MonedaDto, MonedaLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  apiName = 'UnidadAdministrativa';

  create = (input: MonedaDto) =>
    this.restService.request<any, MonedaDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/moneda',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/moneda/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, MonedaDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/moneda/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<MonedaDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/moneda',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<MonedaLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/moneda/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: MonedaDto) =>
    this.restService.request<any, MonedaDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/moneda/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
