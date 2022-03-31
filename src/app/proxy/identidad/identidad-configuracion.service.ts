import type { ActualizarIdentidadConfiguracionDtoDto, IdentidadConfiguracionDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentidadConfiguracionService {
  apiName = 'Identidad';

  actualizar = (input: ActualizarIdentidadConfiguracionDtoDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/identidad/identidad-configuracion',
      body: input,
    },
    { apiName: this.apiName });

  obtener = () =>
    this.restService.request<any, IdentidadConfiguracionDto>({
      method: 'GET',
      url: '/api/identidad/identidad-configuracion',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
