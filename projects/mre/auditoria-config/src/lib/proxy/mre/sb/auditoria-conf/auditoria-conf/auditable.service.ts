import type { AuditableDto, CrearActualizarAuditableDto, ObtenerAuditableInput } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuditableService {
  apiName = 'AuditoriaConf';

  create = (input: CrearActualizarAuditableDto) =>
    this.restService.request<any, AuditableDto>({
      method: 'POST',
      url: '/api/auditoria-conf/auditable',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/auditoria-conf/auditable/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, AuditableDto>({
      method: 'GET',
      url: `/api/auditoria-conf/auditable/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: ObtenerAuditableInput) =>
    this.restService.request<any, PagedResultDto<AuditableDto>>({
      method: 'GET',
      url: '/api/auditoria-conf/auditable',
      params: { filter: input.filter, categoriaId: input.categoriaId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarAuditableDto) =>
    this.restService.request<any, AuditableDto>({
      method: 'PUT',
      url: `/api/auditoria-conf/auditable/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
