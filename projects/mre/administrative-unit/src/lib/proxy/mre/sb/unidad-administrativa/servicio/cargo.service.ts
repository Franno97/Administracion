import type { CargoDto, CargoLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  apiName = 'UnidadAdministrativa';

  create = (input: CargoDto) =>
    this.restService.request<any, CargoDto>({
      method: 'POST',
      url: '/api/AdministrativeUnit/cargo',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/AdministrativeUnit/cargo/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, CargoDto>({
      method: 'GET',
      url: `/api/AdministrativeUnit/cargo/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<CargoDto>>({
      method: 'GET',
      url: '/api/AdministrativeUnit/cargo',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<CargoLookupDto>>({
      method: 'GET',
      url: '/api/AdministrativeUnit/cargo/lookup',
    },
    { apiName: this.apiName });

  update = (id: string, input: CargoDto) =>
    this.restService.request<any, CargoDto>({
      method: 'PUT',
      url: `/api/AdministrativeUnit/cargo/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
