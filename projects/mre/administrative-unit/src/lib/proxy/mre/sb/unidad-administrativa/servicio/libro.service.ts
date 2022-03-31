import type { LibroDto, LibroLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  apiName = 'UnidadAdministrativa';

  create = (input: LibroDto) =>
    this.restService.request<any, LibroDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/libro',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/libro/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, LibroDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/libro/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<LibroDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/libro',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<LibroLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/libro/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: LibroDto) =>
    this.restService.request<any, LibroDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/libro/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
