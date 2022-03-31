import type { NivelDto, NivelLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NivelService {
  apiName = 'UnidadAdministrativa';

  create = (input: NivelDto) =>
    this.restService.request<any, NivelDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/nivel',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/nivel/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, NivelDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/nivel/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<NivelDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/nivel',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<NivelLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/nivel/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: NivelDto) =>
    this.restService.request<any, NivelDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/nivel/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
