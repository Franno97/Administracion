import type { TipoDocumentoIdentidadDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoIdentidadService {
  apiName = 'RegistroPersona';

  buscarPorCodigoMapeo = (valor: string) =>
    this.restService.request<any, TipoDocumentoIdentidadDto>({
      method: 'GET',
      url: `/api/RegistroPersona/TipoDocumentoIdentidad/buscarPorCodigoMapeo/${valor}`,
    },
    { apiName: this.apiName });

  buscarPorNombre = (valor: string) =>
    this.restService.request<any, TipoDocumentoIdentidadDto>({
      method: 'GET',
      url: `/api/RegistroPersona/TipoDocumentoIdentidad/buscarPorNombre/${valor}`,
    },
    { apiName: this.apiName });

  create = (input: TipoDocumentoIdentidadDto) =>
    this.restService.request<any, TipoDocumentoIdentidadDto>({
      method: 'POST',
      url: '/api/RegistroPersona/TipoDocumentoIdentidad',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/RegistroPersona/TipoDocumentoIdentidad/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TipoDocumentoIdentidadDto>({
      method: 'GET',
      url: `/api/RegistroPersona/TipoDocumentoIdentidad/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TipoDocumentoIdentidadDto>>({
      method: 'GET',
      url: '/api/RegistroPersona/TipoDocumentoIdentidad',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<TipoDocumentoIdentidadDto>>({
      method: 'GET',
      url: '/api/RegistroPersona/TipoDocumentoIdentidad/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: TipoDocumentoIdentidadDto) =>
    this.restService.request<any, TipoDocumentoIdentidadDto>({
      method: 'PUT',
      url: `/api/RegistroPersona/TipoDocumentoIdentidad/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
