import type { CreateUpdateFeriadoDto, FeriadoDto, GetFeriadoInput } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeriadoService {
  apiName = 'Cita';

  create = (entrada: CreateUpdateFeriadoDto) =>
    this.restService.request<any, FeriadoDto>({
      method: 'POST',
      url: '/api/cita/feriado',
      body: entrada,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/cita/feriado/${id}`,
    },
    { apiName: this.apiName });

  esFeriadoByDia = (dia: string) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/cita/feriado/esFeriado',
      params: { dia },
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, FeriadoDto>({
      method: 'GET',
      url: `/api/cita/feriado/${id}`,
    },
    { apiName: this.apiName });

  getList = (entrada: GetFeriadoInput) =>
    this.restService.request<any, PagedResultDto<FeriadoDto>>({
      method: 'GET',
      url: '/api/cita/feriado',
      params: { filter: entrada.filter, unidadAdministrativaCalendarioId: entrada.unidadAdministrativaCalendarioId, sorting: entrada.sorting, skipCount: entrada.skipCount, maxResultCount: entrada.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, entrada: CreateUpdateFeriadoDto) =>
    this.restService.request<any, FeriadoDto>({
      method: 'PUT',
      url: `/api/cita/feriado/${id}`,
      body: entrada,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
