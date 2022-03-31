import type { CrearActualizarPartidaArancelariaDto, CrearPartidaArancelariaServicioDto, GetPartidaArancelariaInput, ObtenerPartidaArancelariaServicioInputDto, PartidaArancelariaDto, PartidaArancelariaLookupDto, PartidaArancelariaServicioInfoDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PartidaArancelariaService {
  apiName = 'UnidadAdministrativa';

  addService = (tariffHeadingId: string, input: CrearPartidaArancelariaServicioDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/unidad-administrativa/partida-arancelaria/${tariffHeadingId}/service`,
      body: input,
    },
    { apiName: this.apiName });

  create = (input: CrearActualizarPartidaArancelariaDto) =>
    this.restService.request<any, PartidaArancelariaDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/partida-arancelaria',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/partida-arancelaria/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, PartidaArancelariaDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/partida-arancelaria/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetPartidaArancelariaInput) =>
    this.restService.request<any, PagedResultDto<PartidaArancelariaDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/partida-arancelaria',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<PartidaArancelariaLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/partida-arancelaria/lookup',
    },
    { apiName: this.apiName });

  getServices = (tariffHeadingId: string, input: ObtenerPartidaArancelariaServicioInputDto) =>
    this.restService.request<any, PagedResultDto<PartidaArancelariaServicioInfoDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/partida-arancelaria/${tariffHeadingId}/service`,
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  removeService = (tariffHeadingId: string, serviceId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/partida-arancelaria/${tariffHeadingId}/service/${serviceId}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarPartidaArancelariaDto) =>
    this.restService.request<any, PartidaArancelariaDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/partida-arancelaria/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
