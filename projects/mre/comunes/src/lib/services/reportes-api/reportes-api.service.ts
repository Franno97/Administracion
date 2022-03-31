import { EnvironmentService } from "@abp/ng.core";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RespuestaGenerarVisaPorTramiteId, SolicitudGenerarVisaPorTramiteId } from "../../modelos/reportes-api-servicio-modelo";

@Injectable({
    providedIn: 'root'
})
export class ReportesApiService {

    apiUrl = '';

    constructor(
        private http: HttpClient,
        private servicioEnvironment: EnvironmentService
    ) {
        this.apiUrl = this.servicioEnvironment.getApiUrl('Reporte');
        this.apiUrl = this.apiUrl + '/api/Reporte/'
    }

    // Descargar el fichero pdf de la visa
    postGenerarVisaPorTramiteId(solicitud: SolicitudGenerarVisaPorTramiteId): Observable<RespuestaGenerarVisaPorTramiteId> {
        const url = this.apiUrl + 'GenerarVisaPorTramiteId';
        return this.http.post<RespuestaGenerarVisaPorTramiteId>(url, solicitud);
    }

}