import type { CategoriaDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiName = 'AuditoriaConf';

  create = (input: CategoriaDto) =>
    this.restService.request<any, CategoriaDto>({
      method: 'POST',
      url: '/api/auditoria-conf/categoria',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/auditoria-conf/categoria/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, CategoriaDto>({
      method: 'GET',
      url: `/api/auditoria-conf/categoria/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<CategoriaDto>>({
      method: 'GET',
      url: '/api/auditoria-conf/categoria',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<CategoriaDto>>({
      method: 'GET',
      url: '/api/auditoria-conf/categoria/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: CategoriaDto) =>
    this.restService.request<any, CategoriaDto>({
      method: 'PUT',
      url: `/api/auditoria-conf/categoria/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
