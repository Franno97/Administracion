import { EnvironmentService } from '@abp/ng.core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SolicitudGrabarDocumentoZipGestion, SolicitudGrabarSoporteGestion, SolicitudObtenerArchivoBase64PorUrl } from '../../modelos/documentos-api-servicio-modelo';


@Injectable({
  providedIn: 'root'
})
export class DocumentosApiService {
  apiUrl = '';

  constructor(
    private http: HttpClient,
    private servicioEnvironment: EnvironmentService
  ) {
    this.apiUrl = this.servicioEnvironment.getApiUrl('Documento');
    this.apiUrl = this.apiUrl + '/api/sharepoint/'
  }

  // Subir documento hacia el sharepoint
  postGrabarSoporteGestion(solicitud: SolicitudGrabarSoporteGestion): Observable<any> {
    const url = this.apiUrl + 'grabarSoporteGestion';

    let formData = new FormData();

    formData.append('myfile', solicitud.archivo);
    formData.append('codigoMDG', solicitud.codigoMDG);

    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          //return { status: 'progress', message: progress };
          break;
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  }

  // Obtiene un documento desde el Sharepoint
  postObtenerArchivoBase64PorUrl(solicitud: SolicitudObtenerArchivoBase64PorUrl): Observable<any> {
    const url = this.apiUrl + 'obtenerArchivoBase64PorUrl';
    return this.http.post(url, solicitud);
  }

  postGrabarDocumentoZip(solicitud: SolicitudGrabarDocumentoZipGestion): Observable<any> {
    const url = this.apiUrl + 'GrabarDocumentoZipAsync';

    let formData = new FormData();

    formData.append('tramiteId', solicitud.tramiteId);
    // formData.append('archivos', solicitud.archivos);

    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  }

}
