import { EnvironmentService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RespuestaBuscarVisaPorNumeroServicio,
  SolicitudBuscarVisaPorNumeroServicio
} from '../../modelos/externos-api-servicio-modelos';


@Injectable({
  providedIn: 'root'
})
export class ExternosApiService {
  apiUrl = '';
  apiEsigex = '';

  constructor(
    private http: HttpClient,
    private servicioEnvironment: EnvironmentService
  ) {
    this.apiUrl = this.servicioEnvironment.getApiUrl('Externo');
    this.apiUrl = this.apiUrl + '/api/'
    this.apiEsigex = this.apiUrl + 'esigex/';
  }

  postBuscarVisaPorNumero(solicitud: SolicitudBuscarVisaPorNumeroServicio): Observable<RespuestaBuscarVisaPorNumeroServicio> {
    const url = this.apiUrl + 'BuscarVisaPorNumero';
    return this.http.post<RespuestaBuscarVisaPorNumeroServicio>(url, solicitud);
  }

}
