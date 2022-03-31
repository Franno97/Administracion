import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurarFirmaElectronicaService {

  apiName = 'UnidadAdministrativa';
  

  constructor(protected restService: RestService) { }

  permitida = () =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: `/api/unidad-administrativa/configurar-firma-electronica/permitida`,
    },
    { apiName: this.apiName });

   existe = () =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: `/api/unidad-administrativa/configurar-firma-electronica/existe`,
    },
    { apiName: this.apiName });
 

    AgregarMiFirma = (formData:FormData) =>
      this.restService.request<any, boolean>({
        method: 'PUT',
        url: `/api/unidad-administrativa/configurar-firma-electronica`,
        body: formData
      },
      { apiName: this.apiName });
  
  borrarMiFirma = () =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/configurar-firma-electronica`,
    },
    { apiName: this.apiName });
 
    borrarFirmaElectronica = (unidadAdministrativaId: string, userId: string, servicioId: string) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/configurar-firma-electronica/eliminar-firma-usuario?unidadAdministrativaId=${unidadAdministrativaId}&usuarioId=${userId}&servicioId=${servicioId}`,
    },
    { apiName: this.apiName });

}
