import type { CrearActualizarJerarquiaArancelariaDto, CrearActualizarPartidaArancelariaDto, GetJerarquiaArancelariaInput, GetPartidaArancelariaInput, JerarquiaArancelariaDto, JerarquiaArancelariaLookupDto, PartidaArancelariaDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JerarquiaArancelariaService {
  apiName = 'UnidadAdministrativa';

  actualizarPartidaArancelaria = (jerarquiaArancelariaId: string, partidaArancelariaId: string, input: CrearActualizarPartidaArancelariaDto) =>
    this.restService.request<any, PartidaArancelariaDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/jerarquia-arancelaria/${jerarquiaArancelariaId}/partidaarancelaria/${partidaArancelariaId}`,
      body: input,
    },
    { apiName: this.apiName });

  agregarPartidaArancelaria = (jerarquiaArancelariaId: string, input: CrearActualizarPartidaArancelariaDto) =>
    this.restService.request<any, PartidaArancelariaDto>({
      method: 'POST',
      url: `/api/unidad-administrativa/jerarquia-arancelaria/${jerarquiaArancelariaId}/partidaarancelaria`,
      body: input,
    },
    { apiName: this.apiName });

  create = (input: CrearActualizarJerarquiaArancelariaDto) =>
    this.restService.request<any, JerarquiaArancelariaDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/jerarquia-arancelaria',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/jerarquia-arancelaria/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, JerarquiaArancelariaDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/jerarquia-arancelaria/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetJerarquiaArancelariaInput) =>
    this.restService.request<any, PagedResultDto<JerarquiaArancelariaDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/jerarquia-arancelaria',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<JerarquiaArancelariaLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/jerarquia-arancelaria/lookup',
    },
    { apiName: this.apiName });

  obtenerPartidaArancelaria = (jerarquiaArancelariaId: string, partidaArancelariaId: string) =>
    this.restService.request<any, PartidaArancelariaDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/jerarquia-arancelaria/${jerarquiaArancelariaId}/partidaarancelaria/${partidaArancelariaId}`,
    },
    { apiName: this.apiName });

  obtenerPartidasArancelarias = (jerarquiaArancelariaId: string, input: GetPartidaArancelariaInput) =>
    this.restService.request<any, PagedResultDto<PartidaArancelariaDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/jerarquia-arancelaria/${jerarquiaArancelariaId}/partidaarancelaria`,
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  quitarPartidaArancelaria = (jerarquiaArancelariaId: string, partidaArancelariaId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/jerarquia-arancelaria/${jerarquiaArancelariaId}/partidaarancelaria/${partidaArancelariaId}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarJerarquiaArancelariaDto) =>
    this.restService.request<any, JerarquiaArancelariaDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/jerarquia-arancelaria/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
