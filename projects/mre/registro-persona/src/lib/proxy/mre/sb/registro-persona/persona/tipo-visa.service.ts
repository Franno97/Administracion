import type { TipoVisaDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoVisaService {
  apiName = 'RegistroPersona';

  buscarPorCodigoMapeo = (valor: string) =>
    this.restService.request<any, TipoVisaDto>({
      method: 'GET',
      url: `/api/RegistroPersona/TipoVisa/buscarPorCodigoMapeo/${valor}`,
    },
    { apiName: this.apiName });

  buscarPorNombre = (valor: string) =>
    this.restService.request<any, TipoVisaDto>({
      method: 'GET',
      url: `/api/RegistroPersona/TipoVisa/buscarPorNombre/${valor}`,
    },
    { apiName: this.apiName });

  create = (input: TipoVisaDto) =>
    this.restService.request<any, TipoVisaDto>({
      method: 'POST',
      url: '/api/RegistroPersona/TipoVisa',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/RegistroPersona/TipoVisa/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TipoVisaDto>({
      method: 'GET',
      url: `/api/RegistroPersona/TipoVisa/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TipoVisaDto>>({
      method: 'GET',
      url: '/api/RegistroPersona/TipoVisa',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: TipoVisaDto) =>
    this.restService.request<any, TipoVisaDto>({
      method: 'PUT',
      url: `/api/RegistroPersona/TipoVisa/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
