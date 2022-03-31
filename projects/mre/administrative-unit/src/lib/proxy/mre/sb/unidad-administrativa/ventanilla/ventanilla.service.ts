import type { CrearActualizarVentanillaDto, GetVentanillaInputDto, VentanillaDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VentanillaService {
  apiName = 'UnidadAdministrativa';

  create = (input: CrearActualizarVentanillaDto) =>
    this.restService.request<any, VentanillaDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/ventanilla',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/ventanilla/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, VentanillaDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/ventanilla/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetVentanillaInputDto) =>
    this.restService.request<any, PagedResultDto<VentanillaDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/ventanilla',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  obtenerPorUnidadAdministrativaId = (unidadAdministrativaId: string) =>
    this.restService.request<any, PagedResultDto<VentanillaDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/ventanilla/unidad-administrativa/${unidadAdministrativaId}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarVentanillaDto) =>
    this.restService.request<any, VentanillaDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/ventanilla/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
