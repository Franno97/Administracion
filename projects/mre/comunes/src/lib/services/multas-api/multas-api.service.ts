import { EnvironmentService } from "@abp/ng.core";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegistrarMulta } from "projects/mre/switch-funcionario-perito-consultor/src/lib/models/registrar-multa";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MultasApiService {
    apiUrl = '';

    constructor(
        private http: HttpClient,
        private servicioEnvironment: EnvironmentService
    ) {
        this.apiUrl = this.servicioEnvironment.getApiUrl('Multa');
    }

    registrarMulta(solicitud: RegistrarMulta): Observable<any> {
        const url = this.apiUrl + '/api/Multa/RegistrarMulta';
        return this.http.post(url, solicitud);
    }


}