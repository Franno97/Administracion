import type { CrearActualizarSecuencialLibroDto, SecuencialLibroDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecuencialLibroService {
  apiName = 'UnidadAdministrativa';

  create = (input: CrearActualizarSecuencialLibroDto) =>
    this.restService.request<any, SecuencialLibroDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/secuencial-libro',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/secuencial-libro/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, SecuencialLibroDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/secuencial-libro/${id}`,
    },
    { apiName: this.apiName });

  getByAdministrativeUnitService = (serviceId: string, administrativeUnitId: string) =>
    this.restService.request<any, PagedResultDto<SecuencialLibroDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/secuencial-libro/${administrativeUnitId}/servicio/${serviceId}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<SecuencialLibroDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/secuencial-libro',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarSecuencialLibroDto) =>
    this.restService.request<any, SecuencialLibroDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/secuencial-libro/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
