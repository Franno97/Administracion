import type { PartidaArancelariaServicioDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PartidaArancelariaServicioService {
  apiName = 'UnidadAdministrativa';

  obtenerPartidaArancelariaPorServicio = (servicioId: string) =>
    this.restService.request<any, ListResultDto<PartidaArancelariaServicioDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/partida-arancelaria-servicio/${servicioId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
