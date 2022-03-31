import { RestService } from "@abp/ng.core";
import { Injectable } from "@angular/core";
import { ConfirmationService } from "@abp/ng.theme.shared";
import { ApiResponseWrapper, BaseRestService } from "@mre/comunes";
import { switchMap } from "rxjs/operators";
import { Tramite } from "../modelos/modelos";

@Injectable({
    providedIn: 'root'
  })
export class TramiteService extends BaseRestService {

    apiName = 'Tramite';

    ConsultarTramitePorId = (tramiteId: string) =>
    this.restService.request<any,ApiResponseWrapper<Tramite>>({
      method: 'POST',
      url: '/api/Tramite/ConsultarTramitePorId',
      body: { id: tramiteId },
    },
      { apiName: this.apiName }).pipe(
        switchMap(respuesta => this.procesarResponse<Tramite>(respuesta))
      );

        

    constructor(private restService: RestService,
        protected confirmationService: ConfirmationService) { 
          super(confirmationService);
    }
}