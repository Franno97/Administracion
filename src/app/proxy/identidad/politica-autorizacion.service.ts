import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PoliticaAutorizacionService {
  apiName = 'Identidad';

  obtenerLista = () =>
    this.restService.request<any, Record<string, boolean>>({
      method: 'GET',
      url: '/api/identidad/politica-autorizacion',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
