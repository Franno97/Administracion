import type { AuditarBuscarInputDto, AuditarObjetoBuscarDto, AuditarObjetoDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuditarService {
  apiName = 'AuditoriaConf';

  buscar = (input: AuditarBuscarInputDto) =>
    this.restService.request<any, PagedResultDto<AuditarObjetoBuscarDto>>({
      method: 'GET',
      url: '/api/auditoria-conf/auditar/buscar',
      params: { categoriaId: input.categoriaId, filtro: input.filtro, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  configurar = (input: AuditarObjetoDto) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/auditoria-conf/auditar',
      body: input,
    },
    { apiName: this.apiName });

  eliminar = (item: string) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/auditoria-conf/auditar/${item}`,
    },
    { apiName: this.apiName });

  obtener = (item: string) =>
    this.restService.request<any, AuditarObjetoDto>({
      method: 'GET',
      url: `/api/auditoria-conf/auditar/${item}`,
    },
    { apiName: this.apiName });

  obtenerLista = (categoriaId: string) =>
    this.restService.request<any, AuditarObjetoDto[]>({
      method: 'GET',
      url: '/api/auditoria-conf/auditar',
      params: { categoriaId },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
