import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseWrapper } from '@mre/comunes';
import { Observable, of, throwError } from 'rxjs';
import { ConfirmationService, DEFAULT_ERROR_LOCALIZATIONS, DEFAULT_ERROR_MESSAGES } from '@abp/ng.theme.shared';

@Injectable({
  providedIn: 'root'
})
export class BaseRestService {

  protected procesarResponse<T>(respuesta:ApiResponseWrapper<T>): Observable<T> {
    if (respuesta.httpStatusCode !== HttpStatusCode.Ok) {
      
      this.confirmationService.error(respuesta.message, {
        key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
        defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
      }, {
        hideCancelBtn: true,
        yesText: 'AbpAccount::Close',
      });

      return throwError(respuesta.message);
    }
    return of(respuesta.result);
  }
 

  constructor(protected confirmationService: ConfirmationService) { }
}

