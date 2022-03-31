import type { BancoDto, BancoLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  apiName = 'UnidadAdministrativa';

  create = (input: BancoDto) =>
    this.restService.request<any, BancoDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/banco',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/banco/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, BancoDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/banco/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<BancoDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/banco',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<BancoLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/banco/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: BancoDto) =>
    this.restService.request<any, BancoDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/banco/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
