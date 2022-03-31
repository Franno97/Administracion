import type { ActualizarExoneracionDto, ConvenioDto, ConvenioLookupDto, CrearActualizarConvenioDto, CrearExoneracionDto, ExonerationDto, GetConvenioInput, GetExoneracionInput } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConvenioService {
  apiName = 'UnidadAdministrativa';

  addExoneration = (agreementId: string, input: CrearExoneracionDto) =>
    this.restService.request<any, ExonerationDto>({
      method: 'POST',
      url: `/api/unidad-administrativa/convenio/${agreementId}/exoneration`,
      body: input,
    },
    { apiName: this.apiName });

  create = (input: CrearActualizarConvenioDto) =>
    this.restService.request<any, ConvenioDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/convenio',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/convenio/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ConvenioDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/convenio/${id}`,
    },
    { apiName: this.apiName });

  getExoneration = (agreementId: string, serviceId: string) =>
    this.restService.request<any, ExonerationDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/convenio/${agreementId}/exoneration/${serviceId}`,
    },
    { apiName: this.apiName });

  getExonerations = (agreementId: string, input: GetExoneracionInput) =>
    this.restService.request<any, PagedResultDto<ExonerationDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/convenio/${agreementId}/exoneration`,
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getList = (input: GetConvenioInput) =>
    this.restService.request<any, PagedResultDto<ConvenioDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/convenio',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<ConvenioLookupDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/convenio/lookup',
    },
    { apiName: this.apiName });

  obtenerExoneracionPorServicio = (serviceId: string) =>
    this.restService.request<any, ListResultDto<ExonerationDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/convenio/exoneration/${serviceId}`,
    },
    { apiName: this.apiName });

  removeExoneration = (agreementId: string, serviceId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/convenio/${agreementId}/exoneration/${serviceId}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarConvenioDto) =>
    this.restService.request<any, ConvenioDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/convenio/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  updateExoneration = (agreementId: string, serviceId: string, input: ActualizarExoneracionDto) =>
    this.restService.request<any, ExonerationDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/convenio/${agreementId}/exoneration/${serviceId}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
