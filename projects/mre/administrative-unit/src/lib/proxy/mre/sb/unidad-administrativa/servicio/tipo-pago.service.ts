import type { TipoPagoDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoPagoService {
  apiName = 'UnidadAdministrativa';

  create = (input: TipoPagoDto) =>
    this.restService.request<any, TipoPagoDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/tipo-pago',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/tipo-pago/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TipoPagoDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/tipo-pago/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TipoPagoDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/tipo-pago',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<TipoPagoDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/tipo-pago/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: TipoPagoDto) =>
    this.restService.request<any, TipoPagoDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/tipo-pago/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
