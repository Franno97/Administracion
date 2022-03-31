import type { OcupacionDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OcupacionService {
  apiName = 'RegistroPersona';

  buscarPorCodigoMapeo = (valor: string) =>
    this.restService.request<any, OcupacionDto>({
      method: 'GET',
      url: `/api/RegistroPersona/Ocupacion/buscarPorCodigoMapeo/${valor}`,
    },
    { apiName: this.apiName });

  buscarPorNombre = (valor: string) =>
    this.restService.request<any, OcupacionDto>({
      method: 'GET',
      url: `/api/RegistroPersona/Ocupacion/buscarPorNombre/${valor}`,
    },
    { apiName: this.apiName });

  create = (input: OcupacionDto) =>
    this.restService.request<any, OcupacionDto>({
      method: 'POST',
      url: '/api/RegistroPersona/Ocupacion',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/RegistroPersona/Ocupacion/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, OcupacionDto>({
      method: 'GET',
      url: `/api/RegistroPersona/Ocupacion/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<OcupacionDto>>({
      method: 'GET',
      url: '/api/RegistroPersona/Ocupacion',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: OcupacionDto) =>
    this.restService.request<any, OcupacionDto>({
      method: 'PUT',
      url: `/api/RegistroPersona/Ocupacion/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
