import type { ProfesionDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfesionService {
  apiName = 'RegistroPersona';

  buscarPorCodigoMapeo = (valor: string) =>
    this.restService.request<any, ProfesionDto>({
      method: 'GET',
      url: `/api/RegistroPersona/Profesion/buscarPorCodigoMapeo/${valor}`,
    },
    { apiName: this.apiName });

  buscarPorNombre = (valor: string) =>
    this.restService.request<any, ProfesionDto>({
      method: 'GET',
      url: `/api/RegistroPersona/Profesion/buscarPorNombre/${valor}`,
    },
    { apiName: this.apiName });

  create = (input: ProfesionDto) =>
    this.restService.request<any, ProfesionDto>({
      method: 'POST',
      url: '/api/RegistroPersona/Profesion',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/RegistroPersona/Profesion/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ProfesionDto>({
      method: 'GET',
      url: `/api/RegistroPersona/Profesion/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ProfesionDto>>({
      method: 'GET',
      url: '/api/RegistroPersona/Profesion',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: ProfesionDto) =>
    this.restService.request<any, ProfesionDto>({
      method: 'PUT',
      url: `/api/RegistroPersona/Profesion/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
