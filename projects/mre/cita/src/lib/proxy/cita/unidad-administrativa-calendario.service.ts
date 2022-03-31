import type { CrearActualizarUnidadAdministrativaDto, UnidadAdministrativaCalendarioDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnidadAdministrativaCalendarioService {
  apiName = 'Cita';

  create = (input: CrearActualizarUnidadAdministrativaDto) =>
    this.restService.request<any, UnidadAdministrativaCalendarioDto>({
      method: 'POST',
      url: '/api/cita/unidad-adminsitrativa-calendario',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/cita/unidad-adminsitrativa-calendario/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, UnidadAdministrativaCalendarioDto>({
      method: 'GET',
      url: `/api/cita/unidad-adminsitrativa-calendario/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<UnidadAdministrativaCalendarioDto>>({
      method: 'GET',
      url: '/api/cita/unidad-adminsitrativa-calendario',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarUnidadAdministrativaDto) =>
    this.restService.request<any, UnidadAdministrativaCalendarioDto>({
      method: 'PUT',
      url: `/api/cita/unidad-adminsitrativa-calendario/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
