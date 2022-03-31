import type { TipoCuentaBancariaDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoCuentaBancariaService {
  apiName = 'UnidadAdministrativa';

  create = (input: TipoCuentaBancariaDto) =>
    this.restService.request<any, TipoCuentaBancariaDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/tipo-cuenta-bancaria',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/tipo-cuenta-bancaria/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TipoCuentaBancariaDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/tipo-cuenta-bancaria/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TipoCuentaBancariaDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/tipo-cuenta-bancaria',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<TipoCuentaBancariaDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/tipo-cuenta-bancaria/obtener-lista-info',
    },
    { apiName: this.apiName });

  update = (id: string, input: TipoCuentaBancariaDto) =>
    this.restService.request<any, TipoCuentaBancariaDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/tipo-cuenta-bancaria/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
