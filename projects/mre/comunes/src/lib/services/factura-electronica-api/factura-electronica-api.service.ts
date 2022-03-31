import { EnvironmentService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudCrearPdfServicio } from '../../modelos/factura-electronica-api-servicio-modelos';


@Injectable({
  providedIn: 'root'
})
export class FacturaElectronicaApiService {
  apiUrl = '';

  constructor(
    private http: HttpClient,
    private servicioEnvironment: EnvironmentService
  ) {
    this.apiUrl = this.servicioEnvironment.getApiUrl('FacturaElectronica');
    this.apiUrl = this.apiUrl + '/api/FacturaElectronica/'
  }

  postCrearPdf(solicitud: SolicitudCrearPdfServicio): Observable<any> {
    const url = this.apiUrl + 'CrearPDF';
    return this.http.post(url, solicitud);
  }

}
