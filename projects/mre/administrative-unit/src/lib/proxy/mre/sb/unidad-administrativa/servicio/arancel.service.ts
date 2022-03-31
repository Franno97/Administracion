import type { ArancelDto, ArancelLookupDto, CrearActualizarArancelDto, CrearActualizarJerarquiaArancelariaDto, GetJerarquiaArancelariaInput, JerarquiaArancelariaDto, ObtenerArancelInput } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArancelService {
  apiName = 'UnidadAdministrativa';

  actualizarJerarquiaArancelaria = (arancelId: string, jerarquiaId: string, input: CrearActualizarJerarquiaArancelariaDto) =>
    this.restService.request<any, JerarquiaArancelariaDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/arancel/${arancelId}/jerarquiaarancelaria/${jerarquiaId}`,
      body: input,
    },
    { apiName: this.apiName });

  agregarJerarquiaArancelaria = (arancelId: string, input: CrearActualizarJerarquiaArancelariaDto) =>
    this.restService.request<any, JerarquiaArancelariaDto>({
      method: 'POST',
      url: `/api/unidad-administrativa/arancel/${arancelId}/jerarquiaarancelaria`,
      body: input,
    },
    { apiName: this.apiName });

  changeState = (id: string, isActive: boolean) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/unidad-administrativa/arancel/${id}/state/${isActive}`,
    },
    { apiName: this.apiName });

  create = (input: CrearActualizarArancelDto) =>
    this.restService.request<any, ArancelDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/arancel',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/arancel/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ArancelDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/arancel/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: ObtenerArancelInput) =>
    this.restService.request<any, PagedResultDto<ArancelDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/arancel',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<ArancelLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/arancel/lookup',
    },
    { apiName: this.apiName });

  obtenerJerarquiaArancelaria = (arancelId: string, jerarquiaId: string) =>
    this.restService.request<any, JerarquiaArancelariaDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/arancel/${arancelId}/jerarquiaarancelaria/${jerarquiaId}`,
    },
    { apiName: this.apiName });

  obtenerJerarquiasArancelarias = (arancelId: string, input: GetJerarquiaArancelariaInput) =>
    this.restService.request<any, PagedResultDto<JerarquiaArancelariaDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/arancel/${arancelId}/jerarquiaarancelaria`,
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  quitarJerarquiaArancelaria = (arancelId: string, jerarquiaId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/arancel/${arancelId}/jerarquiaarancelaria/${jerarquiaId}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarArancelDto) =>
    this.restService.request<any, ArancelDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/arancel/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
