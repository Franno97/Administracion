import type { CountryDto, RegionDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeograficaService {
  apiName = 'UnidadAdministrativa';

  getCountries = () =>
    this.restService.request<any, ListResultDto<CountryDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/geographical/country',
    },
    { apiName: this.apiName });

  getCountry = (countryCode: string) =>
    this.restService.request<any, CountryDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/geographical/${countryCode}/country`,
    },
    { apiName: this.apiName });

  getRegionByCountryCode = (countryCode: string) =>
    this.restService.request<any, ListResultDto<RegionDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/geographical/${countryCode}/regions`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
