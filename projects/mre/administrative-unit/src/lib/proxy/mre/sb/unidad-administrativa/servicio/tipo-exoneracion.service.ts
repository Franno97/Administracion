import type { TipoExoneracionDto, TipoExoneracionLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoExoneracionService {
  apiName = 'UnidadAdministrativa';

  create = (input: TipoExoneracionDto) =>
    this.restService.request<any, TipoExoneracionDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/tipo-exoneracion',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/tipo-exoneracion/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TipoExoneracionDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/tipo-exoneracion/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TipoExoneracionDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/tipo-exoneracion',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<TipoExoneracionLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/tipo-exoneracion/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: TipoExoneracionDto) =>
    this.restService.request<any, TipoExoneracionDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/tipo-exoneracion/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
