import { RestService } from "@abp/ng.core";
import { Injectable } from "@angular/core";
import { ConfirmationService } from "@abp/ng.theme.shared";
import { ApiResponseWrapper, BaseRestService } from "@mre/comunes";
import { switchMap } from "rxjs/operators";
import { VisaElectronica } from "../models/visa";

@Injectable({
    providedIn: 'root'
  })
export class VisaService extends BaseRestService {

    apiName = 'Visa';

    consultarVisaElectronicaPorTramiteId = (tramiteId: string) =>
    this.restService.request<any,ApiResponseWrapper<VisaElectronica>>({
      method: 'POST',
      url: '/api/VisaElectronica/ConsultarVisaElectronicaPorTramiteId',
      body: { tramiteId: tramiteId },
    },
      { apiName: this.apiName }).pipe(
        switchMap(respuesta => this.procesarResponse<VisaElectronica>(respuesta))
      );

        

    constructor(private restService: RestService,
        protected confirmationService: ConfirmationService) { 
          super(confirmationService);
    }
}