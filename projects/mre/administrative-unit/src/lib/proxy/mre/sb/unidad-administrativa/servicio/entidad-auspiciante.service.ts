import type { EntidadAuspicianteDto, EntidadAuspicianteLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntidadAuspicianteService {
  apiName = 'UnidadAdministrativa';

  create = (input: EntidadAuspicianteDto) =>
    this.restService.request<any, EntidadAuspicianteDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/entidad-auspiciante',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/entidad-auspiciante/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, EntidadAuspicianteDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/entidad-auspiciante/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<EntidadAuspicianteDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/entidad-auspiciante',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<EntidadAuspicianteLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/entidad-auspiciante/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: EntidadAuspicianteDto) =>
    this.restService.request<any, EntidadAuspicianteDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/entidad-auspiciante/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
