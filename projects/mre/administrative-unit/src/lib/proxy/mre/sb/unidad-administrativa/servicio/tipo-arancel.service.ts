import type { TipoArancelDto, TipoArancelLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoArancelService {
  apiName = 'UnidadAdministrativa';

  create = (input: TipoArancelDto) =>
    this.restService.request<any, TipoArancelDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/tipo-arancel',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/tipo-arancel/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TipoArancelDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/tipo-arancel/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TipoArancelDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/tipo-arancel',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<TipoArancelLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/tipo-arancel/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: TipoArancelDto) =>
    this.restService.request<any, TipoArancelDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/tipo-arancel/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
